import { Router } from 'express'
import {
  getShopItems,
  purchaseCosmetic,
  equipCosmetic,
  purchaseStreakFreeze,
  randomizeAvatar,
  equipAvatar,
  claimStarterAvatar,
} from '../controllers/shopController.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const shopRoutes = Router()

shopRoutes.use(requireAuth)
shopRoutes.get('/items', getShopItems)
shopRoutes.post('/purchase', purchaseCosmetic)
shopRoutes.post('/equip', equipCosmetic)
shopRoutes.post('/streak-freeze', purchaseStreakFreeze)
shopRoutes.post('/avatar/randomize', randomizeAvatar)
shopRoutes.post('/avatar/equip', equipAvatar)
shopRoutes.post('/avatar/claim-starter', claimStarterAvatar)
