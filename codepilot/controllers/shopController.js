import crypto from 'crypto'
import { Cosmetic } from '../models/Cosmetic.js'
import { User } from '../models/User.js'
import { checkAndAwardBadges } from '../utils/badges.js'

const STREAK_FREEZE_COST = 100
const AVATAR_RANDOMIZE_COST = 250

// The three slots equipCosmetic handles — deliberately not the full
// COSMETIC_TYPES list, since 'avatar' is equipped through the separate
// equipAvatar endpoint (a DiceBear avatar needs a style+seed pair, not the
// single CSS `value` the other three slots store).
const EQUIPPABLE_SLOT_TYPES = ['background', 'border', 'theme']

// Curated DiceBear "character" styles (see the style-picker mockup) that a
// randomize pull can land on — deliberately excludes DiceBear's more
// abstract/geometric styles (shapes, rings, identicon) so every pull reads
// as a character. Rendered as a plain <img src="https://api.dicebear.com/..">
// client-side, no npm dependency either side.
const AVATAR_STYLES = [
  'adventurer',
  'adventurer-neutral',
  'avataaars',
  'avataaars-neutral',
  'big-ears',
  'big-ears-neutral',
  'bottts',
  'bottts-neutral',
  'fun-emoji',
  'notionists',
  'personas',
  'pixel-art',
]

// A style-appropriate noun keeps pulled names from reading as random word
// salad ("Copper bot" for a bottts-style pull, "Kite face" for a human-style
// one) — falls back to "avatar" for anything not explicitly mapped.
const STYLE_NOUNS = {
  bottts: 'bot',
  'bottts-neutral': 'bot',
  'pixel-art': 'bot',
  adventurer: 'face',
  'adventurer-neutral': 'face',
  avataaars: 'face',
  'avataaars-neutral': 'face',
  'big-ears': 'face',
  'big-ears-neutral': 'face',
  notionists: 'spirit',
  personas: 'spirit',
  'fun-emoji': 'face',
}

const NAME_ADJECTIVES = [
  'Copper',
  'Atlas',
  'Kite',
  'Ember',
  'Neon',
  'Gold',
  'Slate',
  'Jade',
  'Cobalt',
  'Amber',
  'Frost',
  'Solar',
  'Lunar',
  'Crimson',
  'Azure',
  'Onyx',
  'Violet',
  'Coral',
  'Storm',
  'Nova',
]

function generateAvatarName(style) {
  const adjective = NAME_ADJECTIVES[Math.floor(Math.random() * NAME_ADJECTIVES.length)]
  const noun = STYLE_NOUNS[style] || 'avatar'
  return `${adjective} ${noun}`
}

// GET /api/shop/items
// The buyable catalog (background/border/theme — purchased via
// purchaseCosmetic) PLUS this user's own avatar pulls (never purchased
// individually, only ever created via randomizeAvatar, but shown here too
// so the Cosmetics page is the one place to browse *and* equip everything).
// Each item is annotated with owned/equipped state for one-call rendering.
export async function getShopItems(req, res) {
  const [catalogItems, avatarItems, user] = await Promise.all([
    Cosmetic.find({ owner: null }).sort('type pointsCost'),
    Cosmetic.find({ owner: req.session.userId, type: 'avatar' }).sort('-createdAt'),
    User.findById(req.session.userId),
  ])

  const ownedIds = new Set(user.ownedCosmetics.map((id) => String(id)))
  const equippedIds = new Set(
    EQUIPPABLE_SLOT_TYPES.map((type) => user.equippedCosmetics[type]?.cosmeticId).filter(Boolean).map(String)
  )
  const equippedAvatarId = user.equippedAvatarCosmeticId ? String(user.equippedAvatarCosmeticId) : null

  const catalog = catalogItems.map((item) => ({
    id: item._id,
    name: item.name,
    type: item.type,
    value: item.value,
    pointsCost: item.pointsCost,
    owned: ownedIds.has(String(item._id)),
    equipped: equippedIds.has(String(item._id)),
  }))

  const avatars = avatarItems.map((item) => ({
    id: item._id,
    name: item.name,
    type: 'avatar',
    dicebearStyle: item.dicebearStyle,
    dicebearSeed: item.dicebearSeed,
    pointsCost: 0,
    owned: true, // every pull is always owned by whoever pulled it
    equipped: String(item._id) === equippedAvatarId,
  }))

  res.json({
    items: [...avatars, ...catalog],
    points: user.points,
    streakFreezeCount: user.streakFreezeCount,
    catalogSize: catalogItems.length,
  })
}

// POST /api/shop/purchase  { cosmeticId }
// Atomic: the guard (enough points, not already owned) lives in the
// findOneAndUpdate filter itself, not a separate read-then-write, so two
// rapid double-submits can't both succeed against the same balance.
export async function purchaseCosmetic(req, res) {
  const { cosmeticId } = req.body
  const cosmetic = await Cosmetic.findOne({ _id: cosmeticId, owner: null })
  if (!cosmetic) {
    return res.status(404).json({ error: 'cosmetic not found' })
  }

  const user = await User.findOneAndUpdate(
    { _id: req.session.userId, points: { $gte: cosmetic.pointsCost }, ownedCosmetics: { $ne: cosmetic._id } },
    { $inc: { points: -cosmetic.pointsCost }, $addToSet: { ownedCosmetics: cosmetic._id } },
    { new: true }
  )
  if (!user) {
    return res.status(400).json({ error: 'already owned or not enough points' })
  }

  await checkAndAwardBadges(req.session.userId)
  res.json({ totalPoints: user.points })
}

// POST /api/shop/equip  { type, cosmeticId }
// cosmeticId: null clears that slot (un-equip), reverting to no cosmetic.
// Avatar equipping is handled by equipAvatar instead — see EQUIPPABLE_SLOT_TYPES.
export async function equipCosmetic(req, res) {
  const { type, cosmeticId } = req.body
  if (!EQUIPPABLE_SLOT_TYPES.includes(type)) {
    return res.status(400).json({ error: 'invalid cosmetic type' })
  }

  let value = null
  if (cosmeticId !== null) {
    const user = await User.findOne({ _id: req.session.userId, ownedCosmetics: cosmeticId })
    if (!user) {
      return res.status(400).json({ error: 'cosmetic not owned' })
    }
    const cosmetic = await Cosmetic.findById(cosmeticId)
    if (!cosmetic || cosmetic.type !== type) {
      return res.status(400).json({ error: 'cosmetic does not match slot type' })
    }
    value = cosmetic.value
  }

  const user = await User.findByIdAndUpdate(
    req.session.userId,
    { $set: { [`equippedCosmetics.${type}`]: { cosmeticId, value } } },
    { new: true }
  )

  res.json({ equippedCosmetics: user.equippedCosmetics })
}

// POST /api/shop/streak-freeze
// A consumable, not a Cosmetic — bought directly against points, not
// routed through ownedCosmetics/equip.
export async function purchaseStreakFreeze(req, res) {
  const user = await User.findOneAndUpdate(
    { _id: req.session.userId, points: { $gte: STREAK_FREEZE_COST } },
    { $inc: { points: -STREAK_FREEZE_COST, streakFreezeCount: 1 } },
    { new: true }
  )
  if (!user) {
    return res.status(400).json({ error: 'not enough points' })
  }

  res.json({ totalPoints: user.points, streakFreezeCount: user.streakFreezeCount })
}

// The one free starter avatar granted during onboarding (see
// claimStarterAvatar) — a small fixed set, not the full random AVATAR_STYLES
// pool, and a fixed seed per style rather than a random one, so the
// onboarding picker's preview is deterministic (every "Bot" pick looks the
// same going in, unlike a paid randomize() pull).
const STARTER_AVATAR_OPTIONS = {
  bottts: { name: 'Starter Bot', seed: 'starter' },
  adventurer: { name: 'Starter Adventurer', seed: 'starter' },
  notionists: { name: 'Starter Notionist', seed: 'starter' },
}

// POST /api/shop/avatar/claim-starter  { style }
// The onboarding avatar picker — free, one of 3 fixed styles/seeds (not the
// full random pool). No special one-time guard: it's only ever exposed
// through the onboarding UI, which itself only shows once
// (!hasCompletedOnboarding), the same trust model already used for that
// flag. Same shape as randomizeAvatar otherwise (creates an owned,
// auto-equipped avatar Cosmetic).
export async function claimStarterAvatar(req, res) {
  const { style } = req.body
  const option = STARTER_AVATAR_OPTIONS[style]
  if (!option) {
    return res.status(400).json({ error: 'invalid starter avatar style' })
  }

  const cosmetic = await Cosmetic.create({
    name: option.name,
    type: 'avatar',
    owner: req.session.userId,
    dicebearStyle: style,
    dicebearSeed: option.seed,
  })

  await User.findByIdAndUpdate(req.session.userId, {
    $addToSet: { ownedCosmetics: cosmetic._id },
    $set: { avatarStyle: style, avatarSeed: option.seed, equippedAvatarCosmeticId: cosmetic._id },
  })

  res.json({ avatarStyle: style, avatarSeed: option.seed })
}

// POST /api/shop/avatar/randomize
// The paid way to get a *new* avatar after onboarding — costs points and
// hands back a completely random style+seed, permanently added to inventory
// (never overwritten or lost — see equipAvatar to re-equip an earlier pull).
// Atomic points guard, same pattern as purchaseCosmetic/purchaseStreakFreeze.
export async function randomizeAvatar(req, res) {
  const user = await User.findOneAndUpdate(
    { _id: req.session.userId, points: { $gte: AVATAR_RANDOMIZE_COST } },
    { $inc: { points: -AVATAR_RANDOMIZE_COST } },
    { new: true }
  )
  if (!user) {
    return res.status(400).json({ error: 'not enough points' })
  }

  const dicebearStyle = AVATAR_STYLES[Math.floor(Math.random() * AVATAR_STYLES.length)]
  const dicebearSeed = crypto.randomBytes(8).toString('hex')
  const name = generateAvatarName(dicebearStyle)

  const cosmetic = await Cosmetic.create({
    name,
    type: 'avatar',
    owner: user._id,
    dicebearStyle,
    dicebearSeed,
  })

  const updated = await User.findByIdAndUpdate(
    user._id,
    {
      $addToSet: { ownedCosmetics: cosmetic._id },
      $set: { avatarStyle: dicebearStyle, avatarSeed: dicebearSeed, equippedAvatarCosmeticId: cosmetic._id },
    },
    { new: true }
  )

  await checkAndAwardBadges(req.session.userId)

  res.json({
    totalPoints: updated.points,
    avatar: { id: cosmetic._id, name, dicebearStyle, dicebearSeed },
  })
}

// POST /api/shop/avatar/equip  { cosmeticId }
// Re-equip a previously pulled avatar from inventory — free, ownership-checked.
export async function equipAvatar(req, res) {
  const { cosmeticId } = req.body
  const cosmetic = await Cosmetic.findOne({ _id: cosmeticId, type: 'avatar', owner: req.session.userId })
  if (!cosmetic) {
    return res.status(400).json({ error: 'avatar not owned' })
  }

  await User.findByIdAndUpdate(req.session.userId, {
    avatarStyle: cosmetic.dicebearStyle,
    avatarSeed: cosmetic.dicebearSeed,
    equippedAvatarCosmeticId: cosmetic._id,
  })

  res.json({ avatarStyle: cosmetic.dicebearStyle, avatarSeed: cosmetic.dicebearSeed })
}
