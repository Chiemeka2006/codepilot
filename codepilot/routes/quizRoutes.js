import { Router } from 'express'
import { getNextQuestion, submitAnswer, getHint, getLanguageProgress } from '../controllers/quizController.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const quizRoutes = Router()

quizRoutes.use(requireAuth)
quizRoutes.get('/:language/progress', getLanguageProgress)
quizRoutes.get('/:language/:chapterSlug/:topicSlug/next', getNextQuestion)
quizRoutes.post('/:language/:chapterSlug/:topicSlug/answer', submitAnswer)
quizRoutes.post('/:language/:chapterSlug/:topicSlug/hint', getHint)
