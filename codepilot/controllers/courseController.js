import { Chapter } from '../models/Chapter.js'
import { Progress } from '../models/Progress.js'
import { User } from '../models/User.js'
import { recordActivity } from '../utils/activity.js'
import { awardPoints } from '../utils/points.js'
import { checkAndAwardBadges } from '../utils/badges.js'

const WORDS_PER_MINUTE = 200
const TOPIC_COMPLETION_POINTS = 5

// Estimated from the topic's own Markdown length — not authored per topic,
// so it can never drift out of sync as content changes. Strips HTML tags and
// Markdown punctuation before counting so decorative snippet-card/callout
// markup doesn't inflate the word count.
function estimateReadingMinutes(markdown) {
  const text = markdown.replace(/<[^>]*>/g, ' ').replace(/[`*_#>|-]/g, ' ')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

// Sidebar tree for a language: chapter + topic titles/slugs/order (+ a
// computed reading-time estimate), with each topic's actual content
// stripped back out before responding — the sidebar never needs lesson
// body text, just enough to render and link the nav.
export async function getChapters(req, res) {
  const { language } = req.params
  const chapters = await Chapter.find({ language }).sort('order').lean()
  chapters.forEach((chapter) => {
    // Mongoose sorts the top-level chapter query, but not each chapter's
    // embedded topics array — that has to be sorted separately.
    chapter.topics.sort((a, b) => a.order - b.order)
    chapter.topics.forEach((topic) => {
      topic.readingMinutes = estimateReadingMinutes(topic.content)
      delete topic.content
    })
  })
  res.json({ chapters })
}

// One topic's full content, plus its chapter's title for a breadcrumb.
// Prev/next navigation is derived client-side from the sidebar tree the
// frontend already has loaded, rather than computed here.
//
// Also the trigger point for Phase 8's "chapter/topic completion" points:
// the first time a given user opens this topic, it's auto-marked complete
// (topicCompletedAt on Progress) and awarded a flat one-time point bonus —
// no separate "mark as read" action anywhere in the UI.
export async function getTopic(req, res) {
  const { language, chapterSlug, topicSlug } = req.params

  const chapter = await Chapter.findOne({ language, slug: chapterSlug })
  if (!chapter) {
    return res.status(404).json({ error: 'chapter not found' })
  }

  const topic = chapter.topics.find((t) => t.slug === topicSlug)
  if (!topic) {
    return res.status(404).json({ error: 'topic not found' })
  }

  const topicJson = topic.toObject()
  topicJson.readingMinutes = estimateReadingMinutes(topic.content)

  // Unconditional on every view (not just first-time completions) — powers
  // the home page's "pick up where you left off" card, which needs to
  // survive a refresh or logging in elsewhere, unlike the client-side-only
  // session state that used to be the only record of this.
  await User.findByIdAndUpdate(req.session.userId, {
    lastViewedTopic: {
      language,
      chapterSlug,
      topicSlug,
      chapterTitle: chapter.title,
      topicTitle: topic.title,
      updatedAt: new Date(),
    },
  })

  // Ensure the Progress doc exists (same $setOnInsert pattern
  // quizController.getNextQuestion uses), then atomically flip
  // topicCompletedAt from null — only the request that wins this race
  // (in practice, only ever the very first view) awards points, so two
  // concurrent requests for the same topic can't double-award.
  await Progress.findOneAndUpdate(
    { user: req.session.userId, topicId: topic._id },
    { $setOnInsert: { user: req.session.userId, topicId: topic._id, language, chapterSlug, topicSlug } },
    { upsert: true }
  )
  const justCompleted = await Progress.findOneAndUpdate(
    { user: req.session.userId, topicId: topic._id, topicCompletedAt: null },
    { $set: { topicCompletedAt: new Date() } }
  )

  let pointsAwarded = 0
  let totalPoints
  if (justCompleted) {
    pointsAwarded = TOPIC_COMPLETION_POINTS
    totalPoints = await awardPoints(req.session.userId, pointsAwarded)
    await recordActivity(req.session.userId, { pointsEarned: pointsAwarded, completedTopic: true })
    await checkAndAwardBadges(req.session.userId)
  }

  res.json({ chapterTitle: chapter.title, topic: topicJson, pointsAwarded, totalPoints })
}
