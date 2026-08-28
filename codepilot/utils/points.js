import { User } from '../models/User.js'

// The one place `points` gets incremented for actually *earning* something
// (quiz banking, topic completion) — keeps `lifetimePointsEarned` (used by
// the "High Roller" badge) permanently in sync, since that counter must
// never move when points are spent, only when they're earned. Purchases
// still just `$inc: { points: -cost }` directly; they never call this.
export async function awardPoints(userId, amount) {
  const user = await User.findByIdAndUpdate(
    userId,
    { $inc: { points: amount, lifetimePointsEarned: amount } },
    { new: true }
  )
  return user.points
}
