import { User } from '../models/User.js'
import { sendOtpSms } from '../utils/sms.js'

const OTP_TTL_MS = 10 * 60 * 1000 // 10 minutes
const RESEND_COOLDOWN_MS = 60 * 1000 // 1 minute between sends — real per-message SMS cost
const MAX_OTP_ATTEMPTS = 5

// Accepts common Nigerian phone formats (080..., +234..., 234..., with or
// without spaces/dashes) and normalizes to E.164 for Termii. Returns null
// for anything that doesn't look like a valid Nigerian mobile number —
// scoped the same way the Baze-only email domain check is, since this
// project targets Baze University (Nigeria) students only for now.
function normalizeNigerianPhone(raw) {
  const digits = String(raw).replace(/[\s-]/g, '')
  if (/^0\d{10}$/.test(digits)) return `+234${digits.slice(1)}`
  if (/^234\d{10}$/.test(digits)) return `+${digits}`
  if (/^\+234\d{10}$/.test(digits)) return digits
  return null
}

function generateOtp() {
  return String(Math.floor(1000 + Math.random() * 9000)) // 1000-9999
}

// POST /api/users/phone/send-otp  { phoneNumber }
export async function sendPhoneOtp(req, res) {
  const { phoneNumber } = req.body
  if (!phoneNumber) {
    return res.status(400).json({ error: 'phone number is required' })
  }
  const normalized = normalizeNigerianPhone(phoneNumber)
  if (!normalized) {
    return res.status(400).json({ error: 'enter a valid Nigerian phone number, e.g. 08012345678' })
  }

  const user = await User.findById(req.session.userId)

  if (user.phoneOtpSentAt && Date.now() - user.phoneOtpSentAt.getTime() < RESEND_COOLDOWN_MS) {
    const waitSeconds = Math.ceil((RESEND_COOLDOWN_MS - (Date.now() - user.phoneOtpSentAt.getTime())) / 1000)
    return res.status(429).json({ error: `Please wait ${waitSeconds}s before requesting another code.` })
  }

  const code = generateOtp()

  try {
    await sendOtpSms(normalized, code)
  } catch (err) {
    console.error('sendOtpSms failed:', err)
    return res.status(502).json({ error: 'Could not send the verification code — please try again.' })
  }

  user.phoneNumber = normalized
  user.phoneOtpCode = code
  user.phoneOtpExpiresAt = new Date(Date.now() + OTP_TTL_MS)
  user.phoneOtpAttempts = 0
  user.phoneOtpSentAt = new Date()
  await user.save()

  res.json({ ok: true })
}

// POST /api/users/phone/verify-otp  { code }
export async function verifyPhoneOtp(req, res) {
  const { code } = req.body
  const user = await User.findById(req.session.userId)

  if (!user.phoneOtpCode || !user.phoneOtpExpiresAt) {
    return res.status(400).json({ error: 'Request a verification code first.' })
  }
  if (user.phoneOtpExpiresAt.getTime() < Date.now()) {
    return res.status(400).json({ error: 'That code has expired — request a new one.' })
  }
  if (user.phoneOtpAttempts >= MAX_OTP_ATTEMPTS) {
    return res.status(400).json({ error: 'Too many incorrect attempts — request a new code.' })
  }
  if (!code || code !== user.phoneOtpCode) {
    user.phoneOtpAttempts += 1
    await user.save()
    return res.status(400).json({ error: 'Incorrect code — please try again.' })
  }

  user.phoneVerified = true
  user.phoneOtpCode = null
  user.phoneOtpExpiresAt = null
  user.phoneOtpAttempts = 0
  await user.save()

  res.json({ user: user.toPublicJSON() })
}
