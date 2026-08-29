import { User } from '../models/User.js'

const MS_PER_DAY = 24 * 60 * 60 * 1000
const WINDOW_DAYS = { week: 7, month: 30 }
const METRICS = ['points', 'streaks', 'quizzes']
const PERIODS = ['week', 'month', 'all']

function utcMidnight(date) {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
}

// Sums `daysBack` calendar days of dailyActivityLog ending `offsetDays` days
// ago (offsetDays=0 -> window ends today). Used both for the current window
// and, shifted by exactly `daysBack`, for the immediately preceding one (rank
// movement).
function sumInWindow(dailyActivityLog, todayMs, daysBack, offsetDays) {
  const endMs = todayMs - offsetDays * MS_PER_DAY
  const startMs = endMs - (daysBack - 1) * MS_PER_DAY
  let points = 0
  let quizzes = 0
  for (const entry of dailyActivityLog) {
    const dayMs = utcMidnight(entry.date)
    if (dayMs >= startMs && dayMs <= endMs) {
      points += entry.pointsEarned
      quizzes += entry.quizzesFinished || 0
    }
  }
  return { points, quizzes }
}

// GET /api/leaderboard?metric=points|streaks|quizzes&period=week|month|all
//
// Ranks every user (minus anyone who's opted out via showOnLeaderboard,
// except the requester themself — they always see their own row) by the
// selected metric for the selected period. Computed live over the User
// collection rather than a denormalized leaderboard table — fine at this
// scale, revisit if the user count grows enough to make a full scan/sort on
// every request expensive.
//
// Points/quizzes are summed from each user's dailyActivityLog — a rolling
// N-day window (last 7 or last 30 days including today), not a true calendar
// week/month, matching the same simplification homeController's
// pointsThisWeek already makes. "All time" instead reads the lifetime
// counters directly. Streaks are always the user's live currentStreak — a
// streak has no historical "sum," so switching period tabs doesn't change
// its value.
//
// Rank movement (vs. the immediately preceding period of equal length) is
// only computed for period=week: dailyActivityLog is capped at 31 entries
// (see models/User.js), which covers a 7+7-day week comparison but not a
// 30+30-day month one, so movement comes back null for period=month and for
// metric=streaks (a live value has no distinct "previous period" to diff
// against). The frontend renders a null movement as "—".
export async function getLeaderboard(req, res) {
  const userId = req.session.userId
  const metric = METRICS.includes(req.query.metric) ? req.query.metric : 'points'
  const period = PERIODS.includes(req.query.period) ? req.query.period : 'week'

  const users = await User.find(
    { $or: [{ showOnLeaderboard: { $ne: false } }, { _id: userId }] },
    {
      name: 1,
      avatarSeed: 1,
      avatarStyle: 1,
      'equippedCosmetics.border': 1,
      currentStreak: 1,
      lifetimePointsEarned: 1,
      lifetimeQuizzesFinished: 1,
      dailyActivityLog: 1,
    }
  ).lean()

  const todayMs = utcMidnight(new Date())
  const daysBack = WINDOW_DAYS[period]
  const canComputeMovement = period === 'week' && metric !== 'streaks'

  const entries = users.map((u) => {
    const log = u.dailyActivityLog || []
    const windowStats =
      period === 'all'
        ? { points: u.lifetimePointsEarned || 0, quizzes: u.lifetimeQuizzesFinished || 0 }
        : sumInWindow(log, todayMs, daysBack, 0)

    const value = metric === 'streaks' ? u.currentStreak || 0 : metric === 'points' ? windowStats.points : windowStats.quizzes

    let prevValue = null
    if (canComputeMovement) {
      const prevStats = sumInWindow(log, todayMs, daysBack, daysBack)
      prevValue = metric === 'points' ? prevStats.points : prevStats.quizzes
    }

    return {
      id: String(u._id),
      name: u.name,
      avatarSeed: u.avatarSeed,
      avatarStyle: u.avatarStyle,
      borderColor: u.equippedCosmetics?.border?.value || null,
      streak: u.currentStreak || 0,
      points: windowStats.points,
      quizzesFinished: windowStats.quizzes,
      isMe: String(u._id) === String(userId),
      value,
      prevValue,
    }
  })

  entries.sort((a, b) => b.value - a.value)
  entries.forEach((e, i) => {
    e.rank = i + 1
  })

  if (canComputeMovement) {
    const prevRankById = new Map(
      [...entries].sort((a, b) => b.prevValue - a.prevValue).map((e, i) => [e.id, i + 1])
    )
    entries.forEach((e) => {
      e.movement = prevRankById.get(e.id) - e.rank
    })
  } else {
    entries.forEach((e) => {
      e.movement = null
    })
  }

  entries.forEach((e) => {
    delete e.value
    delete e.prevValue
  })

  res.json({
    leaderboard: entries,
    me: entries.find((e) => e.isMe) || null,
    metric,
    period,
  })
}
