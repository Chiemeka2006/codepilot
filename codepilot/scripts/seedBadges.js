// Seeds the badge catalog (Profile page's Inventory > Badges tab). Safe to
// re-run — each badge is upserted by `name`. criteriaKey must match a key in
// utils/badges.js's CRITERIA map, or the badge can never actually be earned.
import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import { Badge } from '../models/Badge.js'

const badges = [
  {
    name: 'First Steps',
    description: 'Complete your first topic.',
    icon: 'bookOpen',
    criteriaKey: 'first_steps',
  },
  {
    name: 'Bookworm',
    description: 'Complete 25 topics.',
    icon: 'bookOpen',
    criteriaKey: 'bookworm',
  },
  {
    name: 'Week Warrior',
    description: 'Reach a 7-day streak.',
    icon: 'flame',
    criteriaKey: 'week_warrior',
  },
  {
    name: 'Quiz Master',
    description: 'Reach the hard difficulty band on any topic.',
    icon: 'graduationCap',
    criteriaKey: 'quiz_master',
  },
  {
    name: 'Collector',
    description: 'Own 5 cosmetics.',
    icon: 'gem',
    criteriaKey: 'collector',
  },
  {
    name: 'High Roller',
    description: 'Earn 1,000 lifetime points.',
    icon: 'gem',
    criteriaKey: 'high_roller',
  },
]

await connectDB()
for (const badge of badges) {
  await Badge.findOneAndUpdate({ name: badge.name }, badge, { upsert: true, returnDocument: 'after' })
  console.log(`Seeded: ${badge.name}`)
}
await mongoose.disconnect()
process.exit(0)
