import { Router } from 'express'
import { getMe, updateMe } from '../controllers/userController.js'
import { sendEmailOtp, verifyEmailOtp } from '../controllers/emailVerificationController.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const userRoutes = Router()

userRoutes.use(requireAuth)
userRoutes.get('/me', getMe)
userRoutes.put('/me', updateMe)
userRoutes.post('/email/send-otp', sendEmailOtp)
userRoutes.post('/email/verify-otp', verifyEmailOtp)
