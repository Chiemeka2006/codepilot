import mongoose from 'mongoose'
import { LANGUAGE_NAMES } from '../shared/languages.js'

// Its own collection, not embedded in Chapter — unlike a chapter's topics
// (always fetched together), the adaptive engine needs to query questions
// independently: "give me one `easy` question for this topic that isn't in
// this user's recent history," across whichever topic/band is relevant right
// now, not "give me everything for this chapter."
//
// `type` is 'multiple-choice' for every question right now — 'code-based' is
// designed in from day one (so the schema never needs to change later) but
// won't have any real documents until code-based content is written for the
// medium/hard bands.
const questionSchema = new mongoose.Schema(
  {
    language: { type: String, required: true, enum: LANGUAGE_NAMES },
    chapterSlug: { type: String, required: true },
    topicId: { type: mongoose.Schema.Types.ObjectId, required: true },
    difficulty: { type: String, required: true, enum: ['easy', 'medium', 'hard'] },
    type: { type: String, required: true, enum: ['multiple-choice', 'code-based'], default: 'multiple-choice' },
    questionText: { type: String, required: true, trim: true },
    // Multiple-choice only, for now — code-based questions will need their
    // own fields (starter code, expected output) added when that content
    // actually gets written.
    choices: { type: [String], default: undefined },
    correctChoice: { type: Number }, // index into choices
    explanation: { type: String, required: true, trim: true },
    hint: { type: String, required: true, trim: true },
  },
  { timestamps: true }
)

questionSchema.index({ topicId: 1, difficulty: 1 })

export const Question = mongoose.model('Question', questionSchema)
