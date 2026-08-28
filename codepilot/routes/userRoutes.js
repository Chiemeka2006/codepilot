import { Router } from 'express'
import { getMe, updateMe } from '../controllers/userController.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const userRoutes = Router()

userRoutes.use(requireAuth)
userRoutes.get('/me', getMe)
userRoutes.put('/me', updateMe)
