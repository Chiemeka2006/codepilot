import { User } from '../models/User.js'
import { Cosmetic } from '../models/Cosmetic.js'
import { Badge } from '../models/Badge.js'
import { Progress } from '../models/Progress.js'

// GET /api/profile
// Everything the Profile page needs in one call: the full owned-cosmetics
// inventory across every type (unlike the Cosmetics page, which only shows
// the buyable background/border/theme catalog), the badge catalog annotated
// with earned state, streak-freeze count, and account fields.
export async function getProfile(req, res) {
  const user = await User.findById(req.session.userId)

  const [ownedCosmetics, allBadges, topicsCompleted] = await Promise.all([
    // Newest first — the Profile page's avatar "collection" strip shows the
    // most recently pulled ones, so recency has to be recoverable here
    // rather than relying on ownedCosmetics' array order.
    Cosmetic.find({ _id: { $in: user.ownedCosmetics } }).sort('-createdAt'),
    Badge.find(),
    Progress.countDocuments({ user: req.session.userId, topicCompletedAt: { $ne: null } }),
  ])

  const equippedIds = new Set(
    ['background', 'border', 'theme']
      .map((type) => user.equippedCosmetics[type]?.cosmeticId)
      .filter(Boolean)
      .map(String)
  )
  const equippedAvatarId = user.equippedAvatarCosmeticId ? String(user.equippedAvatarCosmeticId) : null

  const cosmetics = ownedCosmetics.map((item) => ({
    id: item._id,
    name: item.name,
    type: item.type,
    value: item.value,
    dicebearStyle: item.dicebearStyle,
    dicebearSeed: item.dicebearSeed,
    equipped: item.type === 'avatar' ? String(item._id) === equippedAvatarId : equippedIds.has(String(item._id)),
  }))

  const earnedMap = new Map(user.earnedBadges.map((e) => [String(e.badge), e.earnedAt]))
  const badges = allBadges.map((badge) => ({
    id: badge._id,
    name: badge.name,
    description: badge.description,
    icon: badge.icon,
    earned: earnedMap.has(String(badge._id)),
    earnedAt: earnedMap.get(String(badge._id)) || null,
  }))

  res.json({
    cosmetics,
    badges,
    streakFreezeCount: user.streakFreezeCount,
    currentStreak: user.currentStreak,
    points: user.points,
    topicsCompleted,
    account: {
      name: user.name,
      email: user.email,
      bio: user.bio,
      dailyStreakReminder: user.dailyStreakReminder,
      showOnLeaderboard: user.showOnLeaderboard,
      soundEffectsEnabled: user.soundEffectsEnabled,
    },
  })
}

// PUT /api/profile/account  { name?, bio?, dailyStreakReminder?, showOnLeaderboard?, soundEffectsEnabled? }
// Email is deliberately not editable here — it's the login identifier, and
// changing it would need real re-verification this project doesn't have.
export async function updateAccount(req, res) {
  const { name, bio, dailyStreakReminder, showOnLeaderboard, soundEffectsEnabled } = req.body

  const update = {}
  if (name !== undefined) {
    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'name cannot be empty' })
    }
    update.name = name.trim()
  }
  if (bio !== undefined) update.bio = String(bio).trim()
  if (dailyStreakReminder !== undefined) update.dailyStreakReminder = Boolean(dailyStreakReminder)
  if (showOnLeaderboard !== undefined) update.showOnLeaderboard = Boolean(showOnLeaderboard)
  if (soundEffectsEnabled !== undefined) update.soundEffectsEnabled = Boolean(soundEffectsEnabled)

  const user = await User.findByIdAndUpdate(req.session.userId, update, { new: true })
  res.json({ user: user.toPublicJSON() })
}

// DELETE /api/profile/account
// Removes the user, their per-topic Progress, and any avatar Cosmetics they
// personally own (owner: userId) — global catalog cosmetics (owner: null)
// are shared data and untouched. Destroys the session the same way logout does.
export async function deleteAccount(req, res) {
  const userId = req.session.userId
  await Promise.all([
    User.findByIdAndDelete(userId),
    Progress.deleteMany({ user: userId }),
    Cosmetic.deleteMany({ owner: userId }),
  ])

  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'account deleted, but could not clear session' })
    res.clearCookie('connect.sid')
    res.status(204).end()
  })
}
