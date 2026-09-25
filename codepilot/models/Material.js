import mongoose from 'mongoose'
import { LANGUAGE_NAMES } from '../shared/languages.js'
import { MATERIAL_TYPE_VALUES } from '../shared/materialTypes.js'

// Its own collection, not embedded — like Question, a lecturer's materials
// need to be queried independently across a mix of dimensions (author+status
// for the Studio list, status+type+language for the public library), not
// fetched "all together" the way a chapter's topics are.
//
// `content` (note/code) and `externalUrl` (slides/video) are each required
// only for the types that use them (see shared/materialTypes.js's
// `contentKind`) — a note document simply never gets an externalUrl value,
// no need for a validator forbidding the "wrong" field since the controller
// only ever writes the field appropriate to `type`.
const materialSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, enum: MATERIAL_TYPE_VALUES },
    title: { type: String, required: true, trim: true },
    content: {
      type: String,
      trim: true,
      required: function () {
        return this.type === 'note' || this.type === 'code'
      },
    },
    externalUrl: {
      type: String,
      trim: true,
      required: function () {
        return this.type === 'slides' || this.type === 'video'
      },
    },
    // 'General' covers materials not tied to a specific language track —
    // folded into the same enum (rather than a nullable field) so the
    // library's language filter always has a real, present value to filter
    // on instead of a special-cased "no language" branch.
    language: { type: String, enum: [...LANGUAGE_NAMES, 'General'], default: 'General' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
)

materialSchema.index({ status: 1, type: 1, language: 1 })
materialSchema.index({ author: 1, status: 1 })

export const Material = mongoose.model('Material', materialSchema)
