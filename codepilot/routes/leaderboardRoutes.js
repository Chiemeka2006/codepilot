import { Router } from 'express'
import { getLeaderboard } from '../controllers/leaderboardController.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const leaderboardRoutes = Router()

leaderboardRoutes.use(requireAuth)
leaderboardRoutes.get('/', getLeaderboard)
