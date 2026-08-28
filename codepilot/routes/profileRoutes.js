import { Router } from 'express'
import { getProfile, updateAccount, deleteAccount } from '../controllers/profileController.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const profileRoutes = Router()

profileRoutes.use(requireAuth)
profileRoutes.get('/', getProfile)
profileRoutes.put('/account', updateAccount)
profileRoutes.delete('/account', deleteAccount)
