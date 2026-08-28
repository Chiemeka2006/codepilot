import { Router } from 'express'
import { executeCode } from '../controllers/executeController.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const executeRoutes = Router()

executeRoutes.use(requireAuth)
executeRoutes.post('/', executeCode)
