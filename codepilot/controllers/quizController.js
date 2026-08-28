import { Chapter } from '../models/Chapter.js'
import { Question } from '../models/Question.js'
import { Progress } from '../models/Progress.js'
import { recordActivity } from '../utils/activity.js'
import { awardPoints } from '../utils/points.js'
import { checkAndAwardBadges } from '../utils/badges.js'

const BAND_ORDER = ['easy', 'medium', 'hard']
const BAND_POINTS = { easy: 10, medium: 20, hard: 40 }
const STREAK_TO_LEVEL_UP = 3
const PENALTY_PER_MISS = 10
const SESSION_QUESTION_CAP = 10
const RECENT_QUESTIONS_TRACKED = 5

// Topics have no standalone collection — they're embedded subdocuments on
// Chapter (see models/Chapter.js) — so every quiz endpoint needs to resolve
// language/chapterSlug/topicSlug down to the topic subdocument (for its _id)
// the same way courseController.getTopic does.
async function resolveTopic(language, chapterSlug, topicSlug, res) {
  const chapter = await Chapter.findOne({ language, slug: chapterSlug })
  if (!chapter) {
    res.status(404).json({ error: 'chapter not found' })
    return null
  }
  const topic = chapter.topics.find((t) => t.slug === topicSlug)
  if (!topic) {
    res.status(404).json({ error: 'topic not found' })
    return null
  }
  return topic
}

async function pickQuestion(topicId, difficulty, recentQuestionIds) {
  let pool = await Question.find({ topicId, difficulty, _id: { $nin: recentQuestionIds } })
  if (pool.length === 0) {
    // Recent-history pool exhausted (or never had enough questions to avoid
    // repeats in the first place) — better to repeat a question than to dead-end.
    pool = await Question.find({ topicId, difficulty })
  }
  if (pool.length === 0) return null
  return pool[Math.floor(Math.random() * pool.length)]
}

function sessionSummary(progress) {
  return {
    currentBand: progress.currentBand,
    questionsAnswered: progress.sessionQuestionsAnswered,
    cap: SESSION_QUESTION_CAP,
    rawPoints: progress.sessionRawPoints,
    penaltyPercent: progress.sessionPenaltyPercent,
  }
}

// GET /api/quiz/:language/:chapterSlug/:topicSlug/next
// Creates the Progress doc on first visit (starts at 'easy'), then serves one
// question from whichever band that doc currently says — the adaptive part
// is entirely "trust whatever the stored band currently is," recomputed
// after every answer in submitAnswer, not decided fresh here.
export async function getNextQuestion(req, res) {
  const { language, chapterSlug, topicSlug } = req.params
  const topic = await resolveTopic(language, chapterSlug, topicSlug, res)
  if (!topic) return

  const progress = await Progress.findOneAndUpdate(
    { user: req.session.userId, topicId: topic._id },
    { $setOnInsert: { user: req.session.userId, topicId: topic._id, language, chapterSlug, topicSlug } },
    { new: true, upsert: true }
  )

  const question = await pickQuestion(topic._id, progress.currentBand, progress.recentQuestionIds)
  if (!question) {
    return res.status(404).json({ error: `no ${progress.currentBand} questions written for this topic yet` })
  }

  res.json({
    question: {
      id: question._id,
      questionText: question.questionText,
      choices: question.choices,
      difficulty: question.difficulty,
      type: question.type,
    },
    session: sessionSummary(progress),
  })
}

// POST /api/quiz/:language/:chapterSlug/:topicSlug/answer  { questionId, choiceIndex }
export async function submitAnswer(req, res) {
  const { language, chapterSlug, topicSlug } = req.params
  const { questionId, choiceIndex } = req.body

  const topic = await resolveTopic(language, chapterSlug, topicSlug, res)
  if (!topic) return

  const question = await Question.findById(questionId)
  if (!question || String(question.topicId) !== String(topic._id)) {
    return res.status(404).json({ error: 'question not found' })
  }

  const progress = await Progress.findOne({ user: req.session.userId, topicId: topic._id })
  if (!progress) {
    return res.status(400).json({ error: 'call /next before /answer' })
  }

  const correct = choiceIndex === question.correctChoice
  const bandIndex = BAND_ORDER.indexOf(progress.currentBand)

  if (correct) {
    progress.correctStreak += 1
    progress.sessionRawPoints += BAND_POINTS[question.difficulty]
    if (progress.correctStreak >= STREAK_TO_LEVEL_UP) {
      progress.currentBand = BAND_ORDER[Math.min(bandIndex + 1, BAND_ORDER.length - 1)]
      progress.correctStreak = 0
    }
  } else {
    progress.correctStreak = 0
    progress.sessionPenaltyPercent = Math.min(100, progress.sessionPenaltyPercent + PENALTY_PER_MISS)
    progress.currentBand = BAND_ORDER[Math.max(bandIndex - 1, 0)]
  }

  progress.recentQuestionIds = [...progress.recentQuestionIds, question._id].slice(-RECENT_QUESTIONS_TRACKED)
  progress.sessionQuestionsAnswered += 1

  let roundComplete = false
  let bankedPoints = 0
  let totalPoints
  if (progress.sessionQuestionsAnswered >= SESSION_QUESTION_CAP) {
    bankedPoints = Math.round(progress.sessionRawPoints * (1 - progress.sessionPenaltyPercent / 100))
    totalPoints = await awardPoints(req.session.userId, bankedPoints)
    roundComplete = true
    progress.sessionQuestionsAnswered = 0
    progress.sessionRawPoints = 0
    progress.sessionPenaltyPercent = 0
    await recordActivity(req.session.userId, { pointsEarned: bankedPoints })
    await checkAndAwardBadges(req.session.userId)
  }

  await progress.save()

  res.json({
    correct,
    correctChoice: question.correctChoice,
    explanation: question.explanation,
    session: sessionSummary(progress),
    roundComplete,
    bankedPoints,
    totalPoints,
  })
}

// POST /api/quiz/:language/:chapterSlug/:topicSlug/hint  { questionId }
// Costs the same penalty as a wrong answer (see PROJECT context: one
// consistent penalty currency, only ever costs potential future points, never
// points already banked).
export async function getHint(req, res) {
  const { language, chapterSlug, topicSlug } = req.params
  const { questionId } = req.body

  const topic = await resolveTopic(language, chapterSlug, topicSlug, res)
  if (!topic) return

  const question = await Question.findById(questionId)
  if (!question || String(question.topicId) !== String(topic._id)) {
    return res.status(404).json({ error: 'question not found' })
  }

  const progress = await Progress.findOne({ user: req.session.userId, topicId: topic._id })
  if (!progress) {
    return res.status(400).json({ error: 'call /next before requesting a hint' })
  }

  progress.sessionPenaltyPercent = Math.min(100, progress.sessionPenaltyPercent + PENALTY_PER_MISS)
  await progress.save()

  res.json({ hint: question.hint, session: sessionSummary(progress) })
}

// GET /api/quiz/:language/progress
// Bulk fetch so the sidebar tree (and the quiz collection page) can show
// every topic's status in one call instead of one request per topic.
export async function getLanguageProgress(req, res) {
  const { language } = req.params
  const docs = await Progress.find({ user: req.session.userId, language }).lean()

  const byTopic = {}
  docs.forEach((p) => {
    byTopic[`${p.chapterSlug}/${p.topicSlug}`] = {
      currentBand: p.currentBand,
      mastered: p.currentBand === 'hard',
    }
  })
  res.json({ progress: byTopic })
}
