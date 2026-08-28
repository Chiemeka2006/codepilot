import { User } from '../models/User.js'
import { LANGUAGE_NAMES } from '../shared/languages.js'

const DAILY_GOAL_TIERS = ['chill', 'steady', 'serious']

export async function getMe(req, res) {
  const user = await User.findById(req.session.userId)
  res.json({ user: user.toPublicJSON() })
}

export async function updateMe(req, res) {
  const { languagesToLearn, completeOnboarding, dailyGoalTier } = req.body

  if (!Array.isArray(languagesToLearn)) {
    return res.status(400).json({ error: 'languagesToLearn must be an array' })
  }
  const unsupported = languagesToLearn.filter((lang) => !LANGUAGE_NAMES.includes(lang))
  if (unsupported.length > 0) {
    return res.status(400).json({ error: `unsupported languages: ${unsupported.join(', ')}` })
  }
  if (dailyGoalTier !== undefined && !DAILY_GOAL_TIERS.includes(dailyGoalTier)) {
    return res.status(400).json({ error: `dailyGoalTier must be one of: ${DAILY_GOAL_TIERS.join(', ')}` })
  }

  const update = { languagesToLearn }
  // Only ever flips onboarding to complete — the settings-page version of
  // this same request never sends this flag, so it's left untouched there.
  if (completeOnboarding === true) {
    update.hasCompletedOnboarding = true
  }
  if (dailyGoalTier !== undefined) {
    update.dailyGoalTier = dailyGoalTier
  }

  const user = await User.findByIdAndUpdate(req.session.userId, update, { new: true })
  res.json({ user: user.toPublicJSON() })
}
