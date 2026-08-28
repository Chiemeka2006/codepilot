import { User } from '../models/User.js'
import { Badge } from '../models/Badge.js'
import { Progress } from '../models/Progress.js'

// Each criteriaKey maps to a check against a shared `stats` object (computed
// once per call, not per badge, so two badges needing the same underlying
// count — e.g. First Steps and Bookworm both counting completed topics —
// don't issue duplicate queries).
const CRITERIA = {
  first_steps: (stats) => stats.completedTopics >= 1,
  bookworm: (stats) => stats.completedTopics >= 25,
  week_warrior: (stats) => stats.user.currentStreak >= 7,
  quiz_master: (stats) => stats.hardBandTopics >= 1,
  collector: (stats) => stats.user.ownedCosmetics.length >= 5,
  high_roller: (stats) => stats.user.lifetimePointsEarned >= 1000,
}

// Called after any event that could newly qualify a badge — quiz round
// banking, topic completion, a cosmetic purchase/avatar pull. Cheap no-op
// when nothing new is earned (the common case). Returns the badges just
// earned (if the frontend ever wants to show a toast for them).
export async function checkAndAwardBadges(userId) {
  const user = await User.findById(userId)
  const allBadges = await Badge.find()
  const earnedIds = new Set(user.earnedBadges.map((e) => String(e.badge)))
  const unearned = allBadges.filter((b) => !earnedIds.has(String(b._id)))
  if (unearned.length === 0) return []

  const [completedTopics, hardBandTopics] = await Promise.all([
    Progress.countDocuments({ user: userId, topicCompletedAt: { $ne: null } }),
    Progress.countDocuments({ user: userId, currentBand: 'hard' }),
  ])
  const stats = { user, completedTopics, hardBandTopics }

  const newlyEarned = unearned.filter((b) => CRITERIA[b.criteriaKey]?.(stats))
  if (newlyEarned.length === 0) return []

  user.earnedBadges.push(...newlyEarned.map((b) => ({ badge: b._id, earnedAt: new Date() })))
  await user.save()
  return newlyEarned
}
