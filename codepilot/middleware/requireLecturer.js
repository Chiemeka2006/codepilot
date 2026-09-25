import { User } from '../models/User.js'

// Mount after requireAuth. Attaches req.currentUser so the Studio and
// publish-gate handlers don't each re-fetch the user document themselves.
export async function requireLecturer(req, res, next) {
  const user = await User.findById(req.session.userId)
  if (!user || user.role !== 'lecturer') {
    return res.status(403).json({ error: 'lecturer access required' })
  }
  req.currentUser = user
  next()
}
