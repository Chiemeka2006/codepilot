import bcrypt from 'bcrypt'
import { User } from '../models/User.js'
import { sendLecturerVerificationEmail, sendStudentVerificationEmail } from '../utils/mailer.js'

const SALT_ROUNDS = 10

// Only students are restricted to this domain — lecturers use whatever
// staff email they already have, no domain check on that path.
const STUDENT_EMAIL_DOMAIN = '@bazeuniversity.edu.ng'
const MAX_ID_CARD_BYTES = 5 * 1024 * 1024 // 5MB, matches the frontend's own pre-upload check

export async function register(req, res) {
  const { email, password, name, role, university, coursesTaught, idCardImage, idCardExpirationDate } = req.body

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'email, password, and name are required' })
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'password must be at least 8 characters' })
  }

  // Permissive resolution rather than 400ing on a missing/garbage value —
  // only the auth page's own role toggle ever sends this, and it always
  // sends exactly 'student' or 'lecturer'.
  const resolvedRole = role === 'lecturer' ? 'lecturer' : 'student'

  if (resolvedRole === 'lecturer' && (!university || !university.trim() || !coursesTaught || !coursesTaught.trim())) {
    return res.status(400).json({ error: 'university and courses taught are required for lecturer accounts' })
  }

  let parsedExpirationDate = null
  if (resolvedRole === 'student') {
    // endsWith rather than includes — a naive "contains" check would let
    // something like fake@bazeuniversity.edu.ng.evil.com slip through.
    if (!email.toLowerCase().trim().endsWith(STUDENT_EMAIL_DOMAIN)) {
      return res.status(400).json({
        error: `Only Baze University students can register — your email must end in ${STUDENT_EMAIL_DOMAIN}.`,
        code: 'invalid_domain',
      })
    }
    if (!idCardImage || !idCardExpirationDate) {
      return res.status(400).json({ error: 'a photo of your student ID card and its expiration date are required' })
    }
    if (!idCardImage.startsWith('data:image/')) {
      return res.status(400).json({ error: 'the uploaded ID card file must be an image' })
    }
    // Rough decoded-size estimate from the base64 string length (base64 is
    // ~4/3 the size of the raw bytes) — good enough to reject an obviously
    // oversized upload without actually decoding it first.
    if (idCardImage.length * 0.75 > MAX_ID_CARD_BYTES) {
      return res.status(400).json({ error: 'ID card image is too large — please upload a photo under 5MB' })
    }
    // The frontend's <input type="month"> sends "YYYY-MM" — the card is
    // valid through the END of that month, not the start of it, so this
    // resolves to the last instant of the given month (in UTC, matching
    // this project's existing "day-gap math uses UTC calendar day"
    // convention elsewhere) rather than just new Date("YYYY-MM"), which
    // would parse to the 1st and make the card look expired a full month
    // early.
    const monthMatch = /^(\d{4})-(\d{2})$/.exec(idCardExpirationDate)
    if (!monthMatch) {
      return res.status(400).json({ error: 'invalid ID card expiration date' })
    }
    const [, yearStr, monthStr] = monthMatch
    // Date.UTC's month is 0-indexed, so passing the (1-indexed) month
    // number straight through as the month argument with day 0 lands on
    // the last day of the *previous* month relative to it — i.e. the last
    // day of the month the user actually picked.
    parsedExpirationDate = new Date(Date.UTC(Number(yearStr), Number(monthStr), 0, 23, 59, 59, 999))
    if (Number.isNaN(parsedExpirationDate.getTime())) {
      return res.status(400).json({ error: 'invalid ID card expiration date' })
    }
    if (parsedExpirationDate.getTime() < Date.now()) {
      return res.status(400).json({ error: 'Your student ID has already expired.' })
    }
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

  try {
    const user = await User.create({
      email,
      passwordHash,
      name,
      role: resolvedRole,
      // The onboarding gate (avatar pick + language/daily-goal selection) is
      // a student-only concept — lecturers skip straight to the Studio.
      ...(resolvedRole === 'lecturer'
        ? { university: university.trim(), coursesTaught: coursesTaught.trim(), hasCompletedOnboarding: true }
        : { idCardImage, idCardExpirationDate: parsedExpirationDate, studentVerified: false }),
    })

    if (user.role === 'lecturer') {
      // Fire-and-forget — never blocks/fails registration on mail outages.
      sendLecturerVerificationEmail({
        name: user.name,
        email: user.email,
        university: user.university,
        coursesTaught: user.coursesTaught,
      })
    } else {
      sendStudentVerificationEmail({
        name: user.name,
        email: user.email,
        idCardExpirationDate: user.idCardExpirationDate,
        idCardImage: user.idCardImage,
      })
    }

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
  const { email, password, role } = req.body

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

  // Credentials are valid at this point — a role-tab mismatch is a
  // selection error, not a security-sensitive fact worth hiding behind the
  // generic invalid-credentials message above.
  if (role && user.role !== role) {
    const expectedTab = user.role === 'lecturer' ? 'Lecturer' : 'Student'
    return res.status(403).json({ error: `This is a ${user.role} account — switch to the ${expectedTab} tab.` })
  }

  // Only checked at login, not on every request — a graduated student can
  // still ride out an already-active session for up to 7 days (this
  // project's cookie maxAge, middleware/session.js), but is blocked the
  // next time they need to log back in.
  if (user.role === 'student' && user.idCardExpirationDate && user.idCardExpirationDate.getTime() < Date.now()) {
    return res.status(403).json({ error: 'Your student ID has expired. Please contact the CodePilot team to renew your verification.' })
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
