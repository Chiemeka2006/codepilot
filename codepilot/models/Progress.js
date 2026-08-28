import mongoose from 'mongoose'

// One document per (user, topic) — this user's entire per-topic state, both
// the adaptive quiz engine's memory (currentBand/correctStreak/session
// fields) and, since Phase 8, whether the topic's lesson content has been
// viewed at all (topicCompletedAt). A separate collection rather than
// embedded on User: progress is never fetched "all at once" the way a
// chapter's topics are (each read/write only ever touches one topic's row),
// and it's written on every single quiz answer, so it wants its own small,
// frequently-updated document rather than growing an array on User.
const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    topicId: { type: mongoose.Schema.Types.ObjectId, required: true },
    // Denormalized off the topic itself so a topic can be identified/displayed
    // without a separate lookup into Chapter.topics (topics have no
    // standalone collection to populate() from).
    language: { type: String, required: true },
    chapterSlug: { type: String, required: true },
    topicSlug: { type: String, required: true },

    currentBand: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
    correctStreak: { type: Number, default: 0 },
    // Capped to the last few in application code — just enough to avoid an
    // immediate repeat, not a full answer history.
    recentQuestionIds: { type: [mongoose.Schema.Types.ObjectId], default: [] },

    // Reset at the start of every round (see quizController.js).
    sessionQuestionsAnswered: { type: Number, default: 0 },
    sessionRawPoints: { type: Number, default: 0 },
    sessionPenaltyPercent: { type: Number, default: 0 },

    // Set the first time this topic's lesson content is viewed (see
    // courseController.getTopic) — flipped exactly once, from null, via an
    // atomic findOneAndUpdate so concurrent requests can't double-award the
    // one-time completion points.
    topicCompletedAt: { type: Date, default: null },
  },
  { timestamps: true }
)

progressSchema.index({ user: 1, topicId: 1 }, { unique: true })

export const Progress = mongoose.model('Progress', progressSchema)
