// Seeds the Phase 8 shop's cosmetic catalog. Safe to re-run — each cosmetic
// is upserted by `name`, so running this again just overwrites the existing
// catalog rather than duplicating it.
import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import { Cosmetic } from '../models/Cosmetic.js'

// value semantics: background/border are CSS color values (applied around
// the user's avatar); theme is a CSS class name defined in
// src/tokens/colors.css that redefines the Playground's --pg-* tokens.
const cosmetics = [
  // Backgrounds — a colored glow rendered behind the avatar.
  { name: 'Ember Glow', type: 'background', value: '#f08f60', pointsCost: 75 },
  { name: 'Moss Glow', type: 'background', value: '#a2c46b', pointsCost: 75 },
  { name: 'Lake Glow', type: 'background', value: '#5e8bbe', pointsCost: 150 },
  { name: 'Golden Glow', type: 'background', value: '#e0a22f', pointsCost: 300 },

  // Borders — the avatar's outline/ring color.
  { name: 'Slate Ring', type: 'border', value: '#7c8798', pointsCost: 50 },
  { name: 'Clay Ring', type: 'border', value: '#b05a3c', pointsCost: 100 },
  { name: 'Honey Ring', type: 'border', value: '#c9a227', pointsCost: 150 },
  {
    name: 'Prism Ring',
    type: 'border',
    value: 'linear-gradient(135deg, #f08f60, #a2c46b, #5e8bbe, #c9a227)',
    pointsCost: 350,
  },

  // Themes — Playground code editor color schemes (see editor-theme-* in
  // src/tokens/colors.css).
  { name: 'Sunset', type: 'theme', value: 'editor-theme-sunset', pointsCost: 100 },
  { name: 'Ocean', type: 'theme', value: 'editor-theme-ocean', pointsCost: 100 },
  { name: 'Forest', type: 'theme', value: 'editor-theme-forest', pointsCost: 100 },
  { name: 'Midnight', type: 'theme', value: 'editor-theme-midnight', pointsCost: 250 },
]

await connectDB()
for (const cosmetic of cosmetics) {
  await Cosmetic.findOneAndUpdate({ name: cosmetic.name }, cosmetic, { upsert: true, returnDocument: 'after' })
  console.log(`Seeded: ${cosmetic.type} > ${cosmetic.name}`)
}
await mongoose.disconnect()
process.exit(0)
