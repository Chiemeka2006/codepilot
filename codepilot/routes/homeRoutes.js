import { Router } from 'express'
import { getHome } from '../controllers/homeController.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const homeRoutes = Router()

homeRoutes.use(requireAuth)
homeRoutes.get('/', getHome)
