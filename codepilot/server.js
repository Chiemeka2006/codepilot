import 'dotenv/config'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB } from './config/db.js'
import { sessionMiddleware } from './middleware/session.js'
import { authRoutes } from './routes/authRoutes.js'
import { userRoutes } from './routes/userRoutes.js'
import { courseRoutes } from './routes/courseRoutes.js'
import { executeRoutes } from './routes/executeRoutes.js'
import { quizRoutes } from './routes/quizRoutes.js'
import { shopRoutes } from './routes/shopRoutes.js'
import { profileRoutes } from './routes/profileRoutes.js'
import { homeRoutes } from './routes/homeRoutes.js'
import { leaderboardRoutes } from './routes/leaderboardRoutes.js'
import { materialRoutes } from './routes/materialRoutes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

// Default 100kb limit is too small for a registration request carrying a
// base64-encoded student ID card photo (models/User.js's idCardImage) —
// raised to give headroom over the 5MB raw-file cap enforced in
// authController.register (base64 inflates size by ~1/3, plus JSON overhead).
app.use(express.json({ limit: '8mb' }))
app.use(sessionMiddleware)

// Vite's build writes the bundled frontend to dist/ (see vite.config.js).
// Serving that folder as static files is what makes the built site visible —
// there's no separate frontend server or proxy involved.
app.use(express.static(path.join(__dirname, 'dist')))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/execute', executeRoutes)
app.use('/api/quiz', quizRoutes)
app.use('/api/shop', shopRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/home', homeRoutes)
app.use('/api/leaderboard', leaderboardRoutes)
app.use('/api/materials', materialRoutes)

// Anything that isn't a static asset or an API route falls back to
// index.html, so client-side routing (once added) still works on refresh.
// (Express 5 dropped bare '*' route patterns, so this is a path-less
// middleware rather than app.get('*', ...).)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const PORT = process.env.PORT || 3000

async function start() {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

start()
