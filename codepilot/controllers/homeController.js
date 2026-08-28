import { Chapter } from '../models/Chapter.js'
import { Progress } from '../models/Progress.js'
import { Question } from '../models/Question.js'
import { User } from '../models/User.js'
import { SUPPORTED_LANGUAGES } from '../shared/languages.js'

const MS_PER_DAY = 24 * 60 * 60 * 1000
const DAILY_GOAL_TARGETS = { chill: 1, steady: 2, serious: 4 }
const WORDS_PER_MINUTE = 200

function utcMidnight(date) {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
}

function estimateReadingMinutes(markdown) {
  const text = markdown.replace(/<[^>]*>/g, ' ').replace(/[`*_#>|-]/g, ' ')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

// GET /api/home
// Everything the dashboard needs in one call, mirroring the /api/profile
// aggregation pattern. Nothing here is fabricated — anything not yet
// meaningfully computable (e.g. question counts, before the question bank
// is populated) is a real query that will just read 0 for now.
export async function getHome(req, res) {
  const user = await User.findById(req.session.userId)
  const todayMs = utcMidnight(new Date())

  // ---- Streak / activity log ----
  const todayEntry = user.dailyActivityLog.find((e) => utcMidnight(e.date) === todayMs)
  const streakIncreasedToday = Boolean(todayEntry)
  const topicsCompletedToday = todayEntry?.topicsCompleted || 0

  const last7Ms = new Set(Array.from({ length: 7 }, (_, i) => todayMs - i * MS_PER_DAY))
  const pointsThisWeek = user.dailyActivityLog
    .filter((e) => last7Ms.has(utcMidnight(e.date)))
    .reduce((sum, e) => sum + e.pointsEarned, 0)

  // Current calendar week, Monday-first, regardless of where "today" falls
  // in it — future days in the week just read as inactive since no log
  // entry could exist for them yet.
  const todayDow = new Date(todayMs).getUTCDay() // 0=Sun..6=Sat
  const mondayOffset = (todayDow + 6) % 7
  const mondayMs = todayMs - mondayOffset * MS_PER_DAY
  const activeDaySet = new Set(user.dailyActivityLog.map((e) => utcMidnight(e.date)))
  const weekActivity = Array.from({ length: 7 }, (_, i) => {
    const dayMs = mondayMs + i * MS_PER_DAY
    return { date: new Date(dayMs), active: activeDaySet.has(dayMs) }
  })
  const daysPractisedThisWeek = weekActivity.filter((d) => d.active).length

  // ---- Daily goal ----
  const dailyGoalTarget = DAILY_GOAL_TARGETS[user.dailyGoalTier] ?? DAILY_GOAL_TARGETS.steady
  const topicsLeftToday = Math.max(0, dailyGoalTarget - topicsCompletedToday)

  // ---- Lifetime topics completed (same query the Profile page/badges use) ----
  const topicsCompletedTotal = await Progress.countDocuments({
    user: req.session.userId,
    topicCompletedAt: { $ne: null },
  })

  // ---- Last viewed topic ----
  let lastViewedTopic = null
  if (user.lastViewedTopic?.topicSlug) {
    const { language, chapterSlug, topicSlug, chapterTitle, topicTitle } = user.lastViewedTopic
    const chapter = await Chapter.findOne({ language, slug: chapterSlug })
    const topic = chapter?.topics.find((t) => t.slug === topicSlug)
    if (chapter && topic) {
      const chapterTopicIds = chapter.topics.map((t) => t._id)
      const completedInChapter = await Progress.countDocuments({
        user: req.session.userId,
        topicId: { $in: chapterTopicIds },
        topicCompletedAt: { $ne: null },
      })
      const questionCount = await Question.countDocuments({ topicId: topic._id })
      lastViewedTopic = {
        language,
        chapterSlug,
        topicSlug,
        chapterTitle,
        topicTitle,
        readingMinutes: estimateReadingMinutes(topic.content),
        questionCount,
        chapterProgressPercent: Math.round((completedInChapter / chapter.topics.length) * 100),
      }
    }
  }

  // ---- Per-language tracks ----
  const tracks = await Promise.all(
    user.languagesToLearn.map(async (language) => {
      const meta = SUPPORTED_LANGUAGES.find((l) => l.name === language)
      const chapters = await Chapter.find({ language }).sort('order')
      const totalTopics = chapters.reduce((sum, c) => sum + c.topics.length, 0)

      const completedDocs = await Progress.find({
        user: req.session.userId,
        language,
        topicCompletedAt: { $ne: null },
      })
        .sort('-topicCompletedAt')
        .limit(1)
      const completedCount = await Progress.countDocuments({
        user: req.session.userId,
        language,
        topicCompletedAt: { $ne: null },
      })

      let currentChapterLabel = 'Not started'
      if (completedDocs.length > 0) {
        const mostRecentChapterSlug = completedDocs[0].chapterSlug
        const chapterIndex = chapters.findIndex((c) => c.slug === mostRecentChapterSlug)
        if (chapterIndex !== -1) {
          currentChapterLabel = `Chapter ${chapterIndex + 1} of ${chapters.length}`
        }
      }

      return {
        language,
        glyph: meta?.glyph,
        color: meta?.color,
        currentChapterLabel,
        totalChapters: chapters.length,
        completedTopics: completedCount,
        totalTopics,
        progressPercent: totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0,
        started: completedCount > 0,
      }
    })
  )

  // ---- Quiz summary (real numbers only — no speculative "points on the
  // table" estimate, since that isn't meaningfully computable) ----
  const quizTotalTopics = tracks.reduce((sum, t) => sum + t.totalTopics, 0)
  const masteredCount = await Progress.countDocuments({
    user: req.session.userId,
    language: { $in: user.languagesToLearn },
    currentBand: 'hard',
  })

  res.json({
    currentStreak: user.currentStreak,
    streakIncreasedToday,
    points: user.points,
    pointsThisWeek,
    topicsCompletedTotal,
    topicsCompletedToday,
    dailyGoalTier: user.dailyGoalTier,
    dailyGoalTarget,
    topicsLeftToday,
    weekActivity,
    daysPractisedThisWeek,
    streakFreezeCount: user.streakFreezeCount,
    lastViewedTopic,
    tracks,
    quizSummary: {
      totalTopics: quizTotalTopics,
      masteredCount,
      languagesCount: user.languagesToLearn.length,
    },
  })
}
