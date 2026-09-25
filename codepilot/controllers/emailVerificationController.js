import { User } from '../models/User.js'
import { sendOtpEmail } from '../utils/mailer.js'

const OTP_TTL_MS = 10 * 60 * 1000 // 10 minutes
const RESEND_COOLDOWN_MS = 60 * 1000 // 1 minute between sends
const MAX_OTP_ATTEMPTS = 5

function generateOtp() {
  return String(Math.floor(1000 + Math.random() * 9000)) // 1000-9999
}

// POST /api/users/email/send-otp
// Always sends to the account's own registered email (never a
// client-supplied address) — for students that's already been checked to
// end in @bazeuniversity.edu.ng at registration, so this proves the student
// controls a real Baze mailbox.
export async function sendEmailOtp(req, res) {
  const user = await User.findById(req.session.userId)

  if (user.emailOtpSentAt && Date.now() - user.emailOtpSentAt.getTime() < RESEND_COOLDOWN_MS) {
    const waitSeconds = Math.ceil((RESEND_COOLDOWN_MS - (Date.now() - user.emailOtpSentAt.getTime())) / 1000)
    return res.status(429).json({ error: `Please wait ${waitSeconds}s before requesting another code.` })
  }

  const code = generateOtp()

  try {
    await sendOtpEmail(user.email, code)
  } catch (err) {
    console.error('sendOtpEmail failed:', err)
    return res.status(502).json({ error: 'Could not send the verification code — please try again.' })
  }

  user.emailOtpCode = code
  user.emailOtpExpiresAt = new Date(Date.now() + OTP_TTL_MS)
  user.emailOtpAttempts = 0
  user.emailOtpSentAt = new Date()
  await user.save()

  res.json({ ok: true })
}

// POST /api/users/email/verify-otp  { code }
export async function verifyEmailOtp(req, res) {
  const { code } = req.body
  const user = await User.findById(req.session.userId)

  if (!user.emailOtpCode || !user.emailOtpExpiresAt) {
    return res.status(400).json({ error: 'Request a verification code first.' })
  }
  if (user.emailOtpExpiresAt.getTime() < Date.now()) {
    return res.status(400).json({ error: 'That code has expired — request a new one.' })
  }
  if (user.emailOtpAttempts >= MAX_OTP_ATTEMPTS) {
    return res.status(400).json({ error: 'Too many incorrect attempts — request a new code.' })
  }
  if (!code || code !== user.emailOtpCode) {
    user.emailOtpAttempts += 1
    await user.save()
    return res.status(400).json({ error: 'Incorrect code — please try again.' })
  }

  user.emailVerified = true
  user.emailOtpCode = null
  user.emailOtpExpiresAt = null
  user.emailOtpAttempts = 0
  await user.save()

  res.json({ user: user.toPublicJSON() })
}
