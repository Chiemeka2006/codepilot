import mongoose from 'mongoose'
import { LANGUAGE_NAMES } from '../shared/languages.js'

// Embedded, not a separate collection/model — a chapter's topics are always
// fetched together with it (the whole tree renders in the sidebar at once),
// so there's no case where a topic needs to be queried independently of its
// parent chapter.
const topicSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, trim: true },
  order: { type: Number, required: true },
  // Markdown — rendered client-side with `marked` + the Tailwind typography
  // plugin's `prose` class.
  content: { type: String, required: true, default: '' },
})

const chapterSchema = new mongoose.Schema(
  {
    language: { type: String, required: true, enum: LANGUAGE_NAMES },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    order: { type: Number, required: true },
    topics: [topicSchema],
  },
  { timestamps: true }
)

// A chapter's slug only needs to be unique within its language, not globally.
chapterSchema.index({ language: 1, slug: 1 }, { unique: true })

export const Chapter = mongoose.model('Chapter', chapterSchema)
