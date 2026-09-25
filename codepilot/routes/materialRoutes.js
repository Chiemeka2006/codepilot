import { Router } from 'express'
import { requireAuth } from '../middleware/requireAuth.js'
import { requireLecturer } from '../middleware/requireLecturer.js'
import {
  getStudio,
  getOwnMaterial,
  createMaterial,
  updateMaterial,
  publishMaterial,
  unpublishMaterial,
  deleteMaterial,
  getLibrary,
  getLibraryMaterial,
} from '../controllers/materialController.js'

export const materialRoutes = Router()

materialRoutes.use(requireAuth)

// Open to any authenticated user (student or lecturer) — placed before the
// lecturer-only gate below so browsing the library never requires the
// lecturer role.
materialRoutes.get('/library', getLibrary)
materialRoutes.get('/library/:id', getLibraryMaterial)

materialRoutes.use(requireLecturer)
materialRoutes.get('/studio', getStudio)
materialRoutes.post('/', createMaterial)
materialRoutes.get('/:id', getOwnMaterial)
materialRoutes.put('/:id', updateMaterial)
materialRoutes.post('/:id/publish', publishMaterial)
materialRoutes.post('/:id/unpublish', unpublishMaterial)
materialRoutes.delete('/:id', deleteMaterial)
