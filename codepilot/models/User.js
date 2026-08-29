import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    // Hashing happens in the auth controller (Phase 2, via bcrypt) — this
    // model only defines where the hash is stored, never a plaintext password.
    passwordHash: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    languagesToLearn: {
      type: [String],
      default: [],
    },
    points: {
      type: Number,
      default: 0,
    },
    // Gates the first-login language-selection screen — true once a user
    // has been through it, so it never shows again after the first time.
    hasCompletedOnboarding: {
      type: Boolean,
      default: false,
    },
    // Phase 8 (Points System) — cosmetics/inventory.
    ownedCosmetics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cosmetic' }],
    // Denormalized per-slot value (not just the ref) so a normal page load
    // (topbar, editor mount) never needs to populate() the Cosmetic catalog
    // just to know what's currently equipped — same reasoning as Progress
    // denormalizing chapterSlug/topicSlug off Chapter.
    equippedCosmetics: {
      background: {
        cosmeticId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cosmetic', default: null },
        value: { type: String, default: null },
      },
      border: {
        cosmeticId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cosmetic', default: null },
        value: { type: String, default: null },
      },
      theme: {
        cosmeticId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cosmetic', default: null },
        value: { type: String, default: null },
      },
    },
    // Seed + style for the current DiceBear avatar (https://api.dicebear.com)
    // — null until the user's first randomize pull, rendered as an <img
    // src>, no npm dependency. Unlike equippedCosmetics' 3 CSS-value slots,
    // an avatar needs both a style and a seed, so it gets its own fields
    // rather than being squeezed into that shape.
    avatarSeed: {
      type: String,
      default: null,
    },
    avatarStyle: {
      type: String,
      default: null,
    },
    // Which owned avatar-type Cosmetic is currently active — lets the
    // Inventory tab mark the right pull "Equipped" without reverse-matching
    // on style+seed.
    equippedAvatarCosmeticId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cosmetic',
      default: null,
    },
    // Daily-activity streak (distinct from the quiz's adaptive-difficulty
    // "correctStreak" in Progress — an unrelated concept with a similar
    // name). Bumped by utils/streak.js, called from quiz round-banking and
    // topic-completion, never touched on a plain read.
    currentStreak: {
      type: Number,
      default: 0,
    },
    lastActivityDate: {
      type: Date,
      default: null,
    },
    streakFreezeCount: {
      type: Number,
      default: 0,
    },
    // Total points ever earned, never decremented by spending — unlike
    // `points` (a spendable balance), this is what badges like "High
    // Roller" check against. Kept in sync exclusively by utils/points.js's
    // awardPoints(), never touched by a purchase.
    lifetimePointsEarned: {
      type: Number,
      default: 0,
    },
    // Total banked quiz rounds ever completed — the "All time" leaderboard's
    // quizzes-done metric. Kept in sync exclusively by utils/activity.js's
    // recordActivity() when called with quizFinished:true.
    lifetimeQuizzesFinished: {
      type: Number,
      default: 0,
    },
    earnedBadges: [
      {
        badge: { type: mongoose.Schema.Types.ObjectId, ref: 'Badge', required: true },
        earnedAt: { type: Date, default: Date.now },
      },
    ],
    bio: {
      type: String,
      default: '',
      trim: true,
    },
    // Real, persisted preferences — but none of the systems they'd control
    // (notifications, a leaderboard, sound effects) exist yet, so toggling
    // these has no effect for now. Defaults match the profile page mockup.
    dailyStreakReminder: {
      type: Boolean,
      default: true,
    },
    showOnLeaderboard: {
      type: Boolean,
      default: true,
    },
    soundEffectsEnabled: {
      type: Boolean,
      default: false,
    },
    // Real daily goal (replaces the old client-only, unsaved radio on the
    // onboarding/languages pages) — maps to a topics-per-day target on the
    // home page (chill=1, steady=2, serious=4).
    dailyGoalTier: {
      type: String,
      enum: ['chill', 'steady', 'serious'],
      default: 'steady',
    },
    // One entry per calendar day (UTC) with any activity — powers the home
    // page's weekly calendar, "points this week", and "streak increased
    // today" without three separate ad-hoc counters, and (since the
    // Leaderboard) the rankings page's This week/This month windows.
    // Trimmed to the last 31 entries by utils/activity.js on every write —
    // bumped up from 14 specifically so a rolling 30-day "this month" window
    // has enough history; the home page still only ever displays the last 7.
    dailyActivityLog: [
      {
        date: { type: Date, required: true },
        pointsEarned: { type: Number, default: 0 },
        topicsCompleted: { type: Number, default: 0 },
        quizzesFinished: { type: Number, default: 0 },
      },
    ],
    // Updated on every lesson view (not just first-time completions) so the
    // home page's "pick up where you left off" card survives refresh/login
    // elsewhere — previously only client-side session state knew this.
    lastViewedTopic: {
      language: { type: String, default: null },
      chapterSlug: { type: String, default: null },
      topicSlug: { type: String, default: null },
      chapterTitle: { type: String, default: null },
      topicTitle: { type: String, default: null },
      updatedAt: { type: Date, default: null },
    },
  },
  { timestamps: true }
)

// Shape sent to the client — used anywhere a user gets serialized in a
// response, so passwordHash never accidentally leaks.
userSchema.methods.toPublicJSON = function () {
  return {
    id: this._id,
    email: this.email,
    name: this.name,
    createdAt: this.createdAt,
    languagesToLearn: this.languagesToLearn,
    points: this.points,
    hasCompletedOnboarding: this.hasCompletedOnboarding,
    ownedCosmetics: this.ownedCosmetics,
    equippedCosmetics: this.equippedCosmetics,
    avatarSeed: this.avatarSeed,
    avatarStyle: this.avatarStyle,
    equippedAvatarCosmeticId: this.equippedAvatarCosmeticId,
    currentStreak: this.currentStreak,
    streakFreezeCount: this.streakFreezeCount,
    lifetimePointsEarned: this.lifetimePointsEarned,
    lifetimeQuizzesFinished: this.lifetimeQuizzesFinished,
    bio: this.bio,
    dailyStreakReminder: this.dailyStreakReminder,
    showOnLeaderboard: this.showOnLeaderboard,
    soundEffectsEnabled: this.soundEffectsEnabled,
    dailyGoalTier: this.dailyGoalTier,
  }
}

export const User = mongoose.model('User', userSchema)
