import mongoose from 'mongoose'
import { COSMETIC_TYPES } from '../shared/cosmeticTypes.js'

// Its own collection (like Question), seeded via scripts/seedCosmetics.js —
// not a shared/-style static array, since purchase/ownership needs real
// per-user state to reference these by _id, not just validate against a
// fixed list.
//
// `value` semantics depend on `type`:
//  - background/border: a CSS color/gradient value, applied around the
//    user's avatar (see the topbar's avatar markup in src/main.js)
//  - theme: a CSS class name (e.g. "editor-theme-ocean") that redefines the
//    Playground's --pg-* custom properties (see src/tokens/colors.css) —
//    applied directly to the CodeMirror mount element, no editor-level code
//    changes needed.
//  - avatar: unused (null) — dicebearStyle/dicebearSeed carry the data instead.
//
// `owner: null` = a global catalog item (background/border/theme — shared
// across every user, seeded, has a real pointsCost). `owner: <userId>` = an
// avatar someone pulled via the paid randomize action — not part of anyone
// else's catalog, and reuses the exact same ownedCosmetics/equip machinery
// the catalog items use rather than a parallel system.
const cosmeticSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, enum: COSMETIC_TYPES },
    value: { type: String, default: null },
    pointsCost: { type: Number, default: 0 },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    dicebearStyle: { type: String, default: null },
    dicebearSeed: { type: String, default: null },
  },
  { timestamps: true }
)

export const Cosmetic = mongoose.model('Cosmetic', cosmeticSchema)
