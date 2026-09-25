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
    // Phase 11 (Lecturer Materials). A lecturer gets an entirely different
    // dashboard ("Studio") in place of the student experience — see
    // src/main.js's render() dispatcher. university/coursesTaught are
    // schema-optional (only meaningful for lecturers) since enforcing
    // "required for lecturers" at the schema level for two plain profile
    // strings isn't worth a conditional-required validator here — that
    // enforcement lives in authController.register instead.
    role: {
      type: String,
      enum: ['student', 'lecturer'],
      default: 'student',
    },
    // Gates the Publish action (see Material.js / materialController.js) —
    // flipped manually in MongoDB by the developer after reviewing the
    // verification email sent on lecturer registration (utils/mailer.js).
    // No in-app admin approval UI exists.
    lecturerVerified: {
      type: Boolean,
      default: false,
    },
    university: {
      type: String,
      default: '',
      trim: true,
    },
    // Plain free-text (e.g. "CSC301, CSC420"), not a separate collection —
    // only ever displayed back, never queried.
    coursesTaught: {
      type: String,
      default: '',
      trim: true,
    },
    // Student verification (added after Phase 11's lecturer flow, same
    // manual-review shape): a Baze University email is required at
    // registration (enforced in authController.register, not here), and a
    // photo of the student's ID card plus its expiration date are captured
    // so the developer can spot-check real students. Stored as a base64
    // data URI directly on the document — Render's free-tier disk is
    // ephemeral, same reasoning as why Material slides/video are external
    // links rather than uploads, but an ID photo has no natural public URL
    // to link to, so it goes in Mongo instead (small enough per-document to
    // be fine at this project's scale).
    idCardImage: {
      type: String,
      default: null,
    },
    idCardExpirationDate: {
      type: Date,
      default: null,
    },
    // Purely a manual-review bookkeeping flag, like lecturerVerified — it
    // does not gate anything in-app (a student gets full access immediately
    // on registration). The only automatic enforcement is the expiration
    // date check in authController.login.
    studentVerified: {
      type: Boolean,
      default: false,
    },
    // Email OTP verification — a new onboarding step inserted before the
    // avatar pick, students only (see src/main.js's renderOnboardingPage()
    // dispatcher). The code is always emailed to the account's own
    // registered address (controllers/emailVerificationController.js),
    // never a client-supplied one. This started as SMS/phone verification
    // via Termii, but Nigerian SMS needs a registered sender ID (business
    // documents), so it was switched to email. emailVerified is a real gate
    // (unlike studentVerified) — the onboarding dispatcher skips straight
    // past this step once it's true, so a student who verified in a
    // previous session but didn't finish avatar/language selection isn't
    // sent a second code.
    emailVerified: {
      type: Boolean,
      default: false,
    },
    // The four fields below are the pending-OTP's entire state — all
    // cleared back to null/0 the moment verification succeeds, so a
    // verified user carries no leftover OTP data. Stored in plain text
    // (not hashed): a 4-digit code that expires in 10 minutes is low
    // enough stakes that hashing buys little over the existing
    // attempt-cap + expiry protections below.
    emailOtpCode: {
      type: String,
      default: null,
    },
    emailOtpExpiresAt: {
      type: Date,
      default: null,
    },
    // Caps wrong guesses against a given code (a 4-digit space is only
    // 10,000 possibilities) — once exceeded, verify-otp refuses further
    // guesses against that code and the student must request a new one.
    emailOtpAttempts: {
      type: Number,
      default: 0,
    },
    // When the last OTP was actually sent — send-otp enforces a cooldown
    // off this (not off emailOtpExpiresAt) so a fresh code can't be
    // requested every few seconds.
    emailOtpSentAt: {
      type: Date,
      default: null,
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
    role: this.role,
    lecturerVerified: this.lecturerVerified,
    university: this.university,
    coursesTaught: this.coursesTaught,
    emailVerified: this.emailVerified,
  }
}

export const User = mongoose.model('User', userSchema)
