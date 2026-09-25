import nodemailer from 'nodemailer'

// Fixed destination, not deployment config — every lecturer registration
// notifies this one inbox, regardless of environment. GMAIL_USER/
// GMAIL_APP_PASSWORD (an app-specific password, not the real account
// password — requires 2FA on that Google account) are the sending
// credentials and do vary per environment, so those stay in .env.
const DEVELOPER_EMAIL = 'chiemekaokongwu112006@gmail.com'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

// Unlike the review emails below (informational, fire-and-forget), this one
// is awaited by its caller and throws on failure — a student can't finish
// onboarding without the code actually arriving, so a silent failure isn't
// acceptable here.
export async function sendOtpEmail(toEmail, code) {
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: toEmail,
    subject: 'Your CodePilot verification code',
    text: `Your OTP for CodePilot is ${code}.\nIt lasts for only 10 minutes so hurry`,
  })
}

// Called fire-and-forget (no await) from authController.register so a mail
// outage can never block or fail a registration — this never throws, it
// only logs, and there is no in-app record of whether the email actually
// arrived (verification itself is a manual DB flip, not gated on this
// succeeding).
export async function sendLecturerVerificationEmail({ name, email, university, coursesTaught }) {
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: DEVELOPER_EMAIL,
      subject: `New lecturer registration: ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `University: ${university}`,
        `Courses taught: ${coursesTaught}`,
        '',
        'Flip lecturerVerified to true on this user in MongoDB once verified.',
      ].join('\n'),
    })
  } catch (err) {
    console.error('sendLecturerVerificationEmail failed:', err)
  }
}

// Same fire-and-forget, never-throws contract as sendLecturerVerificationEmail
// above. The ID card image (a base64 data URI, e.g. "data:image/jpeg;base64,...")
// is attached to the email itself so the developer can review it straight from
// their inbox — no admin UI exists to view it any other way.
export async function sendStudentVerificationEmail({ name, email, idCardExpirationDate, idCardImage }) {
  try {
    const match = idCardImage.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/)
    const attachments = match
      ? [
          {
            filename: `id-card.${match[1].split('/')[1]}`,
            content: match[2],
            encoding: 'base64',
            contentType: match[1],
          },
        ]
      : []

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: DEVELOPER_EMAIL,
      subject: `New student registration: ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `ID card expires: ${new Date(idCardExpirationDate).toDateString()}`,
        '',
        'ID card photo is attached. Flip studentVerified to true on this user in MongoDB once verified.',
      ].join('\n'),
      attachments,
    })
  } catch (err) {
    console.error('sendStudentVerificationEmail failed:', err)
  }
}
