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
    const err = new Error(data?.error || 'request failed')
    // Lets callers branch on specific failure cases (e.g. the "not a Baze
    // University student" registration error) without string-matching the
    // message text.
    if (data?.code) err.code = data.code
    throw err
  }
  return data
}

export function register({ email, password, name, role, university, coursesTaught, idCardImage, idCardExpirationDate }) {
  return request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, name, role, university, coursesTaught, idCardImage, idCardExpirationDate }),
  })
}

export function login({ email, password, role }) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password, role }),
  })
}

export function logout() {
  return request('/api/auth/logout', { method: 'POST' })
}

export function fetchMe() {
  return request('/api/users/me')
}

export function sendPhoneOtp(phoneNumber) {
  return request('/api/users/phone/send-otp', {
    method: 'POST',
    body: JSON.stringify({ phoneNumber }),
  })
}

export function verifyPhoneOtp(code) {
  return request('/api/users/phone/verify-otp', {
    method: 'POST',
    body: JSON.stringify({ code }),
  })
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

// ---- Lecturer Materials (Phase 11) ----

export function fetchStudio() {
  return request('/api/materials/studio')
}

export function createMaterial(fields) {
  return request('/api/materials', { method: 'POST', body: JSON.stringify(fields) })
}

export function fetchOwnMaterial(id) {
  return request(`/api/materials/${id}`)
}

export function updateMaterial(id, fields) {
  return request(`/api/materials/${id}`, { method: 'PUT', body: JSON.stringify(fields) })
}

export function publishMaterial(id) {
  return request(`/api/materials/${id}/publish`, { method: 'POST' })
}

export function unpublishMaterial(id) {
  return request(`/api/materials/${id}/unpublish`, { method: 'POST' })
}

export function deleteMaterial(id) {
  return request(`/api/materials/${id}`, { method: 'DELETE' })
}

export function fetchLibrary(type, language) {
  const params = new URLSearchParams()
  if (type && type !== 'all') params.set('type', type)
  if (language && language !== 'all') params.set('language', language)
  const qs = params.toString()
  return request(`/api/materials/library${qs ? `?${qs}` : ''}`)
}

export function fetchLibraryMaterial(id) {
  return request(`/api/materials/library/${id}`)
}
