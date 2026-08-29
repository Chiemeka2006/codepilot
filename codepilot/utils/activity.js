import { User } from '../models/User.js'

const MS_PER_DAY = 24 * 60 * 60 * 1000
// 31, not 14 — the Leaderboard's "this month" rolling window needs 30 days
// of history to sum over; the home page still only ever displays the last 7.
const ACTIVITY_LOG_MAX_ENTRIES = 31

// Deliberately UTC calendar day, not per-user local time — a known
// simplification. This is a gamification stat, not a security boundary, so
// a user near a UTC day boundary occasionally seeing their streak/log tick a
// few hours "early/late" relative to their own clock is an acceptable
// tradeoff for not threading per-user timezones through the whole system.
function utcMidnight(date) {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
}

// Called from any "real activity" boundary — currently quizController's
// round-banking and courseController's first-topic-view — never from a plain
// read (GET /api/users/me), so opening the app doesn't itself count as
// activity. Handles two things in one call, since they always happen
// together: the daily streak (correction happens lazily, next real activity,
// not eagerly reconciled on every page load) and today's entry in
// dailyActivityLog (powers the home page's weekly calendar, "points this
// week"/"streak increased today", and the Leaderboard's period windows).
// quizFinished also bumps the lifetime counter the "All time" leaderboard
// view reads (see models/User.js's lifetimeQuizzesFinished).
export async function recordActivity(userId, { pointsEarned = 0, completedTopic = false, quizFinished = false } = {}) {
  const user = await User.findById(userId)
  const todayMs = utcMidnight(new Date())

  if (quizFinished) {
    user.lifetimeQuizzesFinished = (user.lifetimeQuizzesFinished || 0) + 1
  }

  if (!user.lastActivityDate) {
    user.currentStreak = 1
  } else {
    const dayGap = Math.round((todayMs - utcMidnight(user.lastActivityDate)) / MS_PER_DAY)
    if (dayGap === 1) {
      user.currentStreak += 1
    } else if (dayGap > 1) {
      if (user.streakFreezeCount > 0) {
        user.streakFreezeCount -= 1
      } else {
        user.currentStreak = 1
      }
    }
    // dayGap === 0: already active today, no change.
  }
  user.lastActivityDate = new Date(todayMs)

  const todayEntry = user.dailyActivityLog.find((e) => utcMidnight(e.date) === todayMs)
  if (todayEntry) {
    todayEntry.pointsEarned += pointsEarned
    if (completedTopic) todayEntry.topicsCompleted += 1
    if (quizFinished) todayEntry.quizzesFinished += 1
  } else {
    user.dailyActivityLog.push({
      date: new Date(todayMs),
      pointsEarned,
      topicsCompleted: completedTopic ? 1 : 0,
      quizzesFinished: quizFinished ? 1 : 0,
    })
  }
  // Oldest entries first isn't guaranteed by push order alone once entries
  // start getting mutated in place across days, so sort before trimming.
  user.dailyActivityLog.sort((a, b) => a.date - b.date)
  if (user.dailyActivityLog.length > ACTIVITY_LOG_MAX_ENTRIES) {
    user.dailyActivityLog = user.dailyActivityLog.slice(-ACTIVITY_LOG_MAX_ENTRIES)
  }

  await user.save()
  return user.currentStreak
}
