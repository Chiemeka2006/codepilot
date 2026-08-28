import bcrypt from 'bcrypt'
import { User } from '../models/User.js'

const SALT_ROUNDS = 10

export async function register(req, res) {
  const { email, password, name } = req.body

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'email, password, and name are required' })
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'password must be at least 8 characters' })
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

  try {
    const user = await User.create({ email, passwordHash, name })
    res.status(201).json({ user: user.toPublicJSON() })
  } catch (err) {
    // Mongo's duplicate-key error for the unique `email` index.
    if (err.code === 11000) {
      return res.status(409).json({ error: 'an account with that email already exists' })
    }
    throw err
  }
}

export async function login(req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' })
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() })

  // Same generic message whether the email is unknown or the password is
  // wrong — telling them apart would let an attacker enumerate real accounts.
  const invalidMessage = { error: 'invalid email or password' }
  if (!user) {
    return res.status(401).json(invalidMessage)
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash)
  if (!passwordMatches) {
    return res.status(401).json(invalidMessage)
  }

  // Regenerate the session on login so a session ID issued before
  // authentication can never be reused as an authenticated one (session
  // fixation protection). Errors here come from a callback, not this
  // function's own promise chain, so they're handled directly rather than
  // thrown (an uncaught throw in a callback would crash the process).
  req.session.regenerate((err) => {
    if (err) return res.status(500).json({ error: 'could not log in' })
    req.session.userId = user._id.toString()
    req.session.save((err) => {
      if (err) return res.status(500).json({ error: 'could not log in' })
      res.json({ user: user.toPublicJSON() })
    })
  })
}

export function logout(req, res) {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'could not log out' })
    res.clearCookie('connect.sid')
    res.status(204).end()
  })
}
