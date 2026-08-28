// Protects a route by checking for a logged-in session. Mount it in front of
// any route/controller that should only work for authenticated users, e.g.:
//   router.get('/me', requireAuth, me)
export function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'not logged in' })
  }
  next()
}
