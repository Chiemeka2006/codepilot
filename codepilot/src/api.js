// Thin wrapper around fetch for the auth endpoints. The session cookie is
// sent automatically because the frontend and API are served from the same
// origin (Express serves dist/, see server.js) — no credentials/CORS config
// needed.
async function request(path, options) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const data = res.status === 204 ? null : await res.json()
  if (!res.ok) {
    throw new Error(data?.error || 'request failed')
  }
  return data
}

export function register({ email, password, name }) {
  return request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, name }),
  })
}

export function login({ email, password }) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export function logout() {
  return request('/api/auth/logout', { method: 'POST' })
}

export function fetchMe() {
  return request('/api/users/me')
}

export function updateLanguages(languagesToLearn, dailyGoalTier) {
  return request('/api/users/me', {
    method: 'PUT',
    body: JSON.stringify({ languagesToLearn, ...(dailyGoalTier ? { dailyGoalTier } : {}) }),
  })
}

export function saveOnboarding(languagesToLearn, dailyGoalTier) {
  return request('/api/users/me', {
    method: 'PUT',
    body: JSON.stringify({ languagesToLearn, completeOnboarding: true, ...(dailyGoalTier ? { dailyGoalTier } : {}) }),
  })
}

export function fetchChapters(language) {
  return request(`/api/courses/${encodeURIComponent(language)}`)
}

export function fetchTopic(language, chapterSlug, topicSlug) {
  return request(
    `/api/courses/${encodeURIComponent(language)}/${encodeURIComponent(chapterSlug)}/${encodeURIComponent(topicSlug)}`
  )
}

export function executeCode(code, language) {
  return request('/api/execute', {
    method: 'POST',
    body: JSON.stringify({ code, language }),
  })
}

export function fetchQuizProgress(language) {
  return request(`/api/quiz/${encodeURIComponent(language)}/progress`)
}

export function fetchNextQuestion(language, chapterSlug, topicSlug) {
  return request(
    `/api/quiz/${encodeURIComponent(language)}/${encodeURIComponent(chapterSlug)}/${encodeURIComponent(topicSlug)}/next`
  )
}

export function submitQuizAnswer(language, chapterSlug, topicSlug, questionId, choiceIndex) {
  return request(
    `/api/quiz/${encodeURIComponent(language)}/${encodeURIComponent(chapterSlug)}/${encodeURIComponent(topicSlug)}/answer`,
    { method: 'POST', body: JSON.stringify({ questionId, choiceIndex }) }
  )
}

export function fetchQuizHint(language, chapterSlug, topicSlug, questionId) {
  return request(
    `/api/quiz/${encodeURIComponent(language)}/${encodeURIComponent(chapterSlug)}/${encodeURIComponent(topicSlug)}/hint`,
    { method: 'POST', body: JSON.stringify({ questionId }) }
  )
}

export function fetchShopItems() {
  return request('/api/shop/items')
}

export function purchaseCosmetic(cosmeticId) {
  return request('/api/shop/purchase', { method: 'POST', body: JSON.stringify({ cosmeticId }) })
}

export function equipCosmetic(type, cosmeticId) {
  return request('/api/shop/equip', { method: 'POST', body: JSON.stringify({ type, cosmeticId }) })
}

export function purchaseStreakFreeze() {
  return request('/api/shop/streak-freeze', { method: 'POST' })
}

export function randomizeAvatar() {
  return request('/api/shop/avatar/randomize', { method: 'POST' })
}

export function equipAvatar(cosmeticId) {
  return request('/api/shop/avatar/equip', { method: 'POST', body: JSON.stringify({ cosmeticId }) })
}

export function claimStarterAvatar(style) {
  return request('/api/shop/avatar/claim-starter', { method: 'POST', body: JSON.stringify({ style }) })
}

export function fetchProfile() {
  return request('/api/profile')
}

export function updateProfileAccount(fields) {
  return request('/api/profile/account', { method: 'PUT', body: JSON.stringify(fields) })
}

export function deleteAccount() {
  return request('/api/profile/account', { method: 'DELETE' })
}

export function fetchHome() {
  return request('/api/home')
}

export function fetchLeaderboard(metric, period) {
  return request(`/api/leaderboard?metric=${encodeURIComponent(metric)}&period=${encodeURIComponent(period)}`)
}
