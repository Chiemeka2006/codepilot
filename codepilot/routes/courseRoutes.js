import { Router } from 'express'
import { getChapters, getTopic } from '../controllers/courseController.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const courseRoutes = Router()

courseRoutes.use(requireAuth)
courseRoutes.get('/:language', getChapters)
courseRoutes.get('/:language/:chapterSlug/:topicSlug', getTopic)
