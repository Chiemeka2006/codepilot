// Seeds the quiz question bank from Markdown files dropped into
// scripts/question-content/. Safe to re-run: for each topic a file covers,
// it deletes that topic's existing questions and reinserts the current set,
// rather than diffing individual questions.
//
// Filename convention: {chapterSlug}-chapter-quiz.md (e.g. js-basics-chapter-quiz.md).
// Chapter slugs are unique across the whole app (see seedChapters.js — every
// language prefixes its own, like js-basics/java-basics/python-basics), so no
// separate language segment is needed in the filename.
//
// One file covers a whole chapter, laid out as:
//
//   ## Topic 1: <any descriptive title — matched by POSITION, not text>
//
//   ### Easy
//
//   1. Question stem (can wrap onto extra lines before the choices start).
//      A) First choice
//      B) Second choice
//      C) Third choice
//      D) Fourth choice
//      **Hint:** ...
//      **Answer:** B
//      **Explanation:** ...
//
//   2. ...
//   (10 under Easy, then ### Medium with 10 more numbered 11-20, then
//   ### Hard with 10 more numbered 21-30 — numbering restarts at 1 per topic)
//
//   ## Topic 2: ...
//   ...
//
// "Topic N" is matched to the Nth topic of the chapter in `order`, not by
// title text (the MD's topic titles are free-form descriptions, not
// guaranteed to match the seeded topic title exactly). A file doesn't need
// to cover every topic in the chapter — whatever topics it includes get
// (re)seeded; the rest are left alone.
//
// **Hint:**/**Answer:**/**Explanation:** markers can appear in any order and
// with or without bold asterisks. Inline code backticks are stripped from
// question/choice/explanation/hint text, since the quiz UI renders this text
// escaped-but-plain (no Markdown pass), so raw backticks would otherwise show
// up literally in the UI.
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import { Chapter } from '../models/Chapter.js'
import { Question } from '../models/Question.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CONTENT_DIR = path.join(__dirname, 'question-content')

const DIFFICULTIES = ['easy', 'medium', 'hard']

function stripInlineCode(s) {
  return s.replace(/`([^`]*)`/g, '$1')
}

// Returns [{ title, questions: [{ difficulty, questionText, choices, correctChoice, explanation, hint }] }]
// in the order topics appear in the file.
function parseChapterQuizMd(raw) {
  const lines = raw.replace(/\r\n/g, '\n').split('\n')
  const topics = []
  let currentTopic = null
  let currentDifficulty = null
  let current = null // { textLines, choices, correct, explanation, hint, stage }

  function pushQuestion() {
    if (!current || !currentTopic) return
    current.choices = current.choices.map((c) => (c ? stripInlineCode(c.trim()) : c))
    currentTopic.questions.push({
      difficulty: currentDifficulty,
      questionText: stripInlineCode(current.textLines.join('\n').trim()),
      choices: current.choices,
      correctChoice: current.correct ? current.correct.charCodeAt(0) - 65 : undefined,
      explanation: stripInlineCode(current.explanation.trim()),
      hint: stripInlineCode(current.hint.trim()),
    })
    current = null
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) continue
    if (/^-{3,}$/.test(line)) continue // horizontal rule separator between topics/at EOF
    if (/^\*[^*]/.test(line)) continue // italic trailer/annotation line (not a **bold** marker)

    const topicMatch = line.match(/^##\s*Topic\s*\d+\s*:\s*(.+)$/i)
    if (topicMatch) {
      pushQuestion()
      currentTopic = { title: topicMatch[1].trim(), questions: [] }
      topics.push(currentTopic)
      currentDifficulty = null
      continue
    }

    const difficultyMatch = line.match(/^###\s*(easy|medium|hard)\b/i)
    if (difficultyMatch) {
      pushQuestion()
      currentDifficulty = difficultyMatch[1].toLowerCase()
      continue
    }

    const questionMatch = line.match(/^\d+\.\s+(.*)$/)
    if (questionMatch) {
      pushQuestion()
      current = { textLines: [questionMatch[1]], choices: [], correct: null, explanation: '', hint: '', stage: 'text' }
      continue
    }

    if (!current) continue // stray line outside any question (e.g. the document's H1 title)

    const normalized = line.replace(/\*\*/g, '')

    const choiceMatch = normalized.match(/^([A-Da-d])\)\s*(.+)$/)
    if (choiceMatch) {
      current.choices[choiceMatch[1].toUpperCase().charCodeAt(0) - 65] = choiceMatch[2]
      current.stage = 'choices'
      continue
    }
    const hintMatch = normalized.match(/^hint\s*:\s*(.*)$/i)
    if (hintMatch) {
      current.hint = hintMatch[1]
      current.stage = 'hint'
      continue
    }
    const answerMatch = normalized.match(/^answer\s*:\s*([A-Da-d])/i)
    if (answerMatch) {
      current.correct = answerMatch[1].toUpperCase()
      current.stage = 'answer'
      continue
    }
    const explanationMatch = normalized.match(/^explanation\s*:\s*(.*)$/i)
    if (explanationMatch) {
      current.explanation = explanationMatch[1]
      current.stage = 'explanation'
      continue
    }

    // Continuation of whichever field is currently open.
    if (current.stage === 'text') current.textLines.push(rawLine.trim())
    else if (current.stage === 'explanation') current.explanation += ' ' + line
    else if (current.stage === 'hint') current.hint += ' ' + line
  }
  pushQuestion()

  return topics
}

await connectDB()

if (!fs.existsSync(CONTENT_DIR)) {
  console.log(`No ${path.relative(process.cwd(), CONTENT_DIR)} directory found — nothing to seed.`)
  await mongoose.disconnect()
  process.exit(0)
}

const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'))
if (files.length === 0) {
  console.log('question-content/ has no .md files — nothing to seed.')
}

for (const file of files) {
  const match = file.match(/^([a-z0-9-]+)-chapter-quiz\.md$/)
  if (!match) {
    console.warn(`Skipping ${file}: doesn't match {chapterSlug}-chapter-quiz.md`)
    continue
  }
  const chapterSlug = match[1]

  const matchingChapters = await Chapter.find({ slug: chapterSlug })
  if (matchingChapters.length === 0) {
    console.warn(`Skipping ${file}: no chapter with slug "${chapterSlug}" — run "npm run seed" first`)
    continue
  }
  if (matchingChapters.length > 1) {
    console.warn(`Skipping ${file}: slug "${chapterSlug}" matches more than one chapter — ambiguous, needs a real fix`)
    continue
  }
  const chapter = matchingChapters[0]
  const orderedTopics = [...chapter.topics].sort((a, b) => a.order - b.order)

  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8')
  const parsedTopics = parseChapterQuizMd(raw)

  if (parsedTopics.length > orderedTopics.length) {
    console.warn(
      `Skipping ${file}: file has ${parsedTopics.length} "## Topic N" sections but ${chapter.title} only has ${orderedTopics.length} topics`
    )
    continue
  }

  for (let i = 0; i < parsedTopics.length; i++) {
    const parsed = parsedTopics[i]
    const topic = orderedTopics[i]

    const bad = parsed.questions.filter(
      (q) =>
        !q.questionText ||
        q.choices.filter(Boolean).length !== 4 ||
        q.correctChoice === undefined ||
        q.correctChoice < 0 ||
        q.correctChoice > 3 ||
        !q.explanation ||
        !q.hint
    )
    if (bad.length > 0) {
      console.warn(
        `Skipping "${parsed.title}" (topic ${i + 1} in ${file}): ${bad.length} question(s) failed to parse cleanly — fix the source and re-run`
      )
      continue
    }

    await Question.deleteMany({ topicId: topic._id })
    await Question.insertMany(
      parsed.questions.map((q) => ({
        language: chapter.language,
        chapterSlug: chapter.slug,
        topicId: topic._id,
        ...q,
      }))
    )

    const counts = DIFFICULTIES.map((d) => `${d}: ${parsed.questions.filter((q) => q.difficulty === d).length}`).join(
      ', '
    )
    console.log(`Seeded ${parsed.questions.length} questions: ${chapter.language} > ${chapter.title} > ${topic.title} (${counts})`)
  }
}

await mongoose.disconnect()
