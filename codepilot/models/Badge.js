import mongoose from 'mongoose'

// A small fixed catalog (like Cosmetic's global/owner:null items) — seeded
// via scripts/seedBadges.js, never purchased. `criteriaKey` identifies which
// check in utils/badges.js decides whether a user has earned it; kept as a
// plain string rather than executable code so the catalog itself stays inert
// data, not logic.
const badgeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    icon: { type: String, required: true },
    criteriaKey: { type: String, required: true },
  },
  { timestamps: true }
)

export const Badge = mongoose.model('Badge', badgeSchema)
