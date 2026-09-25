// Termii's send endpoint — Nigeria-focused SMS delivery, matching the
// Baze-University-only scope the rest of student verification already has.
// TERMII_API_KEY is the account's live API key; TERMII_SENDER_ID is a
// registered Sender ID (Termii requires this to be approved on their
// dashboard before it'll actually deliver — 'N-Alert' below is Termii's
// shared generic sender ID, usable without an approval step, meant as a
// working default until a custom one is approved).
const TERMII_SEND_URL = 'https://api.ng.termii.com/api/sms/send'

// Unlike utils/mailer.js's verification emails (informational, fire-and-
// forget), this is awaited by its caller and throws on failure — the
// student can't proceed without the code actually arriving, so a silent
// failure here isn't acceptable the way a silently-failed lecturer-review
// email is.
export async function sendOtpSms(phoneNumber, code) {
  const res = await fetch(TERMII_SEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: process.env.TERMII_API_KEY,
      to: phoneNumber, // E.164, e.g. +2348012345678 — normalized by the caller
      from: process.env.TERMII_SENDER_ID || 'N-Alert',
      sms: `Your CodePilot verification code is ${code}. It expires in 10 minutes.`,
      type: 'plain',
      channel: 'generic',
    }),
  })

  const data = await res.json().catch(() => ({}))
  // Termii's success response carries a message_id; error responses don't.
  // Treat anything else (including a non-2xx status) as a failed send.
  if (!res.ok || !data.message_id) {
    throw new Error(data.message || 'failed to send SMS')
  }
  return data
}
