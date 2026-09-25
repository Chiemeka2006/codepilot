import {
  register,
  login,
  logout,
  fetchMe,
  updateLanguages,
  saveOnboarding,
  fetchChapters,
  fetchTopic,
  executeCode,
  fetchQuizProgress,
  fetchNextQuestion,
  submitQuizAnswer,
  fetchQuizHint,
  fetchShopItems,
  purchaseCosmetic,
  equipCosmetic,
  purchaseStreakFreeze,
  randomizeAvatar,
  equipAvatar,
  claimStarterAvatar,
  fetchProfile,
  updateProfileAccount,
  deleteAccount,
  fetchHome,
  fetchLeaderboard,
  fetchStudio,
  createMaterial,
  fetchOwnMaterial,
  updateMaterial,
  publishMaterial,
  unpublishMaterial,
  deleteMaterial,
  fetchLibrary,
  fetchLibraryMaterial,
  sendPhoneOtp,
  verifyPhoneOtp,
} from './api.js'
import { SUPPORTED_LANGUAGES, LANGUAGE_NAMES } from '../shared/languages.js'
import { MATERIAL_TYPES } from '../shared/materialTypes.js'
import { icons } from './icons.js'
import { initTheme, toggleTheme, currentTheme } from './theme.js'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { EditorView, basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { StreamLanguage, HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags } from '@lezer/highlight'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { sql } from '@codemirror/lang-sql'
import { html } from '@codemirror/lang-html'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { go } from '@codemirror/legacy-modes/mode/go'
import { rust } from '@codemirror/legacy-modes/mode/rust'

const app = document.querySelector('#app')

initTheme()

// ---- App state ----
// No framework here — re-render the relevant screen's innerHTML on every
// change and re-attach listeners each time (except for purely visual DOM
// tweaks like the password-visibility toggle, which mutate the DOM directly
// so a full re-render doesn't wipe out whatever the user already typed).
let user = null
// A lecturer's own account stays a lecturer server-side the whole time —
// this only changes what render()/renderAppShell() choose to show, so a
// lecturer can click through the student experience (dashboard, courses,
// quiz, playground) using their own account's data, without any real role
// change or backend call. Resets to false on logout and on every fresh
// login (never persisted), so a refresh mid-preview lands back on the
// Lecturer Dashboard — matches this app's existing "in-memory-only UI
// state resets are fine" convention (e.g. onboardingStep).
let viewingAsStudent = false
let authMode = 'login' // 'login' | 'register'
let authRole = 'student' // 'student' | 'lecturer' — the auth page's segmented toggle
// Set by the student register form's ID-card file input (read via
// FileReader, not FormData — a File object isn't JSON-serializable, so this
// holds the base64 data URI instead). Not reset on every render (re-renders
// destroy/recreate the <input type="file"> anyway, which always shows empty
// afterwards regardless — see renderRegisterForm's status line for how that
// gets clarified to the user).
let registerIdCardImageDataUri = ''
let error = ''
let notice = ''
// Carries the just-registered credentials over to the login form so the
// user isn't retyping what they just entered — cleared once consumed by
// renderLoginForm() so a later, unrelated visit to the login form starts
// blank again.
let prefillLoginEmail = ''
let prefillLoginPassword = ''
let languagesPageError = ''
let selectedLanguages = []
let selectedGoal = 'steady' // 'chill' | 'steady' | 'serious' — synced from user.dailyGoalTier, persisted via updateLanguages/saveOnboarding

// Onboarding is 2 steps: 1 = avatar pick (new), 2 = languages + daily goal
// (the whole page this used to be). Not persisted server-side — a refresh
// mid-onboarding restarts at step 1, which is an acceptable tradeoff (see
// handleAvatarStepNext, which just claims another free starter avatar in
// that rare case, no real harm done).
let onboardingStep = 1
let onboardingAvatarChoice = 'bottts'
let onboardingAvatarError = ''
let onboardingAvatarSaving = false

// Phone/OTP verification — a new step inserted BEFORE the avatar pick
// (students only; see renderOnboardingPage()'s dispatcher, which gates on
// the real, persisted `user.phoneVerified` rather than a step number, so a
// student who already verified in a past session skips straight past this
// on their next visit instead of being sent another OTP).
let onboardingPhoneNumber = ''
let onboardingPhoneOtpSent = false
let onboardingPhoneOtp = ''
let onboardingPhoneError = ''
let onboardingPhoneSaving = false

// Home page state
let homePageData = null
let homePageLoading = false
let homePageError = ''
let trackFilter = 'all' // 'all' | 'in-progress' | 'not-started'

// Course/sidebar state — populated lazily as tracks are expanded or a lesson
// is opened, just displayed by render(). Kept separate from the render cycle
// so navigating/expanding doesn't re-fetch data that's already loaded.
let chaptersByLanguage = {} // { [language]: chapters[] } — cache, one entry per expanded track
let expandedTracks = new Set() // which languages' trees are open in the sidebar
let expandedChapters = new Set() // which "language/chapterSlug" groups are open
let currentCourseLanguage = null // language of the lesson currently open, if any
let courseTopic = null
let courseTopicKey = null
let courseError = ''
let courseLoading = false
let leaveDialogOpen = false

// Mobile sidebar state — the persistent sidebar becomes an overlay below
// 768px, toggled via a hamburger button in the topbar (see renderAppShell).
let mobileMenuOpen = false

// Playground state
let playgroundLanguage = null
let playgroundEditor = null // the mounted CodeMirror EditorView, if any
let playgroundCode = {} // { [language]: code } — cache so switching languages doesn't lose work
let playgroundRunning = false
let playgroundResult = null
let playgroundError = ''

// Mini playground state — a small floating scratchpad reachable from the
// topbar's "Try it yourself" button on any page. Mirrors the main
// Playground's current language but keeps its own separate code/output, since
// the two can be open side by side (e.g. on the Playground page itself).
let miniPlaygroundOpen = false
let miniPlaygroundExpanded = false
let miniPlaygroundEditor = null
let miniPlaygroundCode = {} // { [language]: code }
let miniPlaygroundRunning = false
let miniPlaygroundResult = null
let miniPlaygroundError = ''

// Quiz state
let quizProgressByLanguage = {} // { [language]: { [chapterSlug/topicSlug]: {currentBand, mastered} } } — cache
let quizSearch = ''
let quizLanguageFilter = 'all'

let quizRoute = null // { language, chapterSlug, topicSlug } for the session currently loaded
let quizQuestion = null
let quizSessionInfo = null // { currentBand, questionsAnswered, cap, rawPoints, penaltyPercent }
let quizSelectedChoice = null
let quizAnswerResult = null // response from submitQuizAnswer, once the current question has been checked
let quizHint = null
let quizRoundComplete = null // { bankedPoints, totalPoints } shown right after a round finishes
let quizLoading = false
let quizError = ''

// Cosmetics page state — the buy-catalog (background/border/theme) PLUS
// the user's own avatar pulls, shown together so this one page can browse
// and equip everything, not just what's purchasable.
let shopItems = null // catalog + avatars, annotated with owned/equipped, refetched after each action
let shopLoading = false
let shopCatalogSize = 0 // from the API — lets "X of Y owned" exclude the unbounded avatar pool
let cosmeticsTab = 'everything' // 'everything' | 'avatar' | 'background' | 'border' | 'theme'
let cosmeticsSearch = ''

// Profile page state
let profilePageData = null // { cosmetics, badges, streakFreezeCount, currentStreak, points, account } from GET /api/profile
let profilePageLoading = false
let profileInventoryTab = 'cosmetics' // 'cosmetics' | 'powerups' | 'badges'
let deleteAccountDialogOpen = false

// Rankings page state — refetched whenever the metric or period changes
// (both are server-side, not a client-side re-sort of cached data).
let rankingsData = null // { leaderboard, me, metric, period } from GET /api/leaderboard
let rankingsLoading = false
let rankingsError = ''
let rankingsMetric = 'points' // 'points' | 'streaks' | 'quizzes'
let rankingsPeriod = 'week' // 'week' | 'month' | 'all'

// ---- Lecturer Materials (Phase 11) state ----

// Studio (lecturer home) state
let studioData = null // { lecturerVerified, name, university, stats, materials } from GET /api/materials/studio
let studioLoading = false
let studioError = ''
let studioFilter = 'all' // 'all' | 'published' | 'draft'

// New/edit material form state
let materialFormEditId = null // set when editing an existing material, null when creating
let materialFormType = 'note'
let materialFormTitle = ''
let materialFormContent = ''
let materialFormExternalUrl = ''
let materialFormLanguage = 'General'
let materialFormLoading = false // fetching an existing material to edit
let materialFormSaving = false
let materialFormError = ''

// Browse library state (shared between students and lecturers)
let libraryData = null // { materials } from GET /api/materials/library
let libraryLoading = false
let libraryError = ''
let libraryTypeFilter = 'all'
let libraryLanguageFilter = 'all'

// Material detail view state
let libraryMaterialData = null
let libraryMaterialLoading = false
let libraryMaterialError = ''

// Toast notifications — a global stack (any page using renderAppShell can
// trigger one), rendered bottom-right, auto-dismissing. Replaces the old
// per-page inline green "notice-text" success messages (shop purchases,
// avatar pulls, preference saves, points earned) with one consistent pattern.
let toasts = [] // { id, message, icon }
const TOAST_DURATION_MS = 4500

function showToast(message, { icon = icons.check, variant = 'success' } = {}) {
  const id = `${Date.now()}-${Math.random()}`
  toasts = [...toasts, { id, message, icon, variant }]
  render()
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id)
    render()
  }, TOAST_DURATION_MS)
}

function showErrorToast(message) {
  showToast(message, { icon: icons.alertCircle, variant: 'error' })
}

function dismissToast(id) {
  toasts = toasts.filter((t) => t.id !== id)
  render()
}

function renderToasts() {
  if (toasts.length === 0) return ''
  return `
    <div class="toast-stack">
      ${toasts
        .map(
          (t) => `
        <div class="toast-card ${t.variant === 'error' ? 'toast-error' : ''}" data-toast-id="${t.id}">
          <span class="toast-icon">${t.icon}</span>
          <p class="toast-message">${escapeHtml(t.message)}</p>
          <button type="button" class="toast-close" data-toast-close="${t.id}">${icons.x}</button>
        </div>
      `
        )
        .join('')}
    </div>
  `
}

function setUser(updatedUser) {
  user = updatedUser
  selectedLanguages = [...updatedUser.languagesToLearn]
  selectedGoal = updatedUser.dailyGoalTier || 'steady'
}

// Minimal hand-rolled router — no library, since there's only one dynamic
// route shape. Anything under /course/... is the lesson page; everything
// else is the existing login/onboarding/dashboard state machine.
function parseRoute() {
  const parts = window.location.pathname.split('/').filter(Boolean)
  if (parts[0] === 'course' && parts[1]) {
    return { name: 'course', language: decodeURIComponent(parts[1]), chapterSlug: parts[2], topicSlug: parts[3] }
  }
  if (parts[0] === 'playground') {
    return { name: 'playground' }
  }
  if (parts[0] === 'languages') {
    return { name: 'languages' }
  }
  if (parts[0] === 'cosmetics') {
    return { name: 'cosmetics' }
  }
  if (parts[0] === 'profile') {
    return { name: 'profile' }
  }
  if (parts[0] === 'rankings') {
    return { name: 'rankings' }
  }
  if (parts[0] === 'quiz') {
    if (parts[1] && parts[2] && parts[3]) {
      return { name: 'quiz-session', language: decodeURIComponent(parts[1]), chapterSlug: parts[2], topicSlug: parts[3] }
    }
    return { name: 'quiz-collection' }
  }
  if (parts[0] === 'studio') {
    if (parts[1] === 'new') return { name: 'studio-new' }
    if (parts[1] === 'edit' && parts[2]) return { name: 'studio-edit', id: parts[2] }
    return { name: 'studio' }
  }
  if (parts[0] === 'library') {
    if (parts[1]) return { name: 'library-item', id: decodeURIComponent(parts[1]) }
    return { name: 'library' }
  }
  return { name: 'home' }
}

// ---- Mobile sidebar (overlay on small screens) ----

function closeMobileMenu() {
  mobileMenuOpen = false
  document.body.classList.remove('mobile-menu-open')
  /* Toggle classes directly on existing DOM elements instead of calling render().
     Calling render() destroys/recreates the sidebar element, which kills the
     CSS transition — the sidebar would "just appear" instead of sliding. */
  const sidebar = document.querySelector('.app-sidebar')
  const overlay = document.querySelector('#sidebar-overlay')
  if (sidebar) sidebar.classList.remove('sidebar-open')
  if (overlay) overlay.classList.remove('overlay-open')
}

function toggleMobileMenu() {
  mobileMenuOpen = !mobileMenuOpen
  if (mobileMenuOpen) {
    document.body.classList.add('mobile-menu-open')
  } else {
    document.body.classList.remove('mobile-menu-open')
  }
  /* Toggle classes directly — no render() call. This lets the existing
     sidebar element play its slide-in/out transition. */
  const sidebar = document.querySelector('.app-sidebar')
  const overlay = document.querySelector('#sidebar-overlay')
  if (sidebar) sidebar.classList.toggle('sidebar-open', mobileMenuOpen)
  if (overlay) overlay.classList.toggle('overlay-open', mobileMenuOpen)
}

function goToDashboard() {
  leaveDialogOpen = false
  closeMobileMenu()
  window.history.pushState({}, '', '/')
  render()
}

function goToPlayground() {
  currentCourseLanguage = null
  closeMobileMenu()
  window.history.pushState({}, '', '/playground')
  render()
}

function goToLanguagesPage() {
  currentCourseLanguage = null
  closeMobileMenu()
  languagesPageError = ''
  window.history.pushState({}, '', '/languages')
  render()
}

function goToQuizCollection() {
  currentCourseLanguage = null
  closeMobileMenu()
  window.history.pushState({}, '', '/quiz')
  render()
}

function goToCosmeticsPage() {
  currentCourseLanguage = null
  closeMobileMenu()
  window.history.pushState({}, '', '/cosmetics')
  render()
}

function goToProfilePage() {
  currentCourseLanguage = null
  closeMobileMenu()
  window.history.pushState({}, '', '/profile')
  render()
}

function goToRankingsPage() {
  currentCourseLanguage = null
  closeMobileMenu()
  window.history.pushState({}, '', '/rankings')
  render()
}

function goToStudio() {
  closeMobileMenu()
  window.history.pushState({}, '', '/studio')
  render()
}

// Doesn't change the account's real role — only flips which shell/route
// chain render()/renderAppShell() pick, so a lecturer can click through
// the actual student experience (their own account's data — points,
// streak, languages — same as any student would see for that account).
function goToViewAsStudent() {
  viewingAsStudent = true
  closeMobileMenu()
  window.history.pushState({}, '', '/')
  render()
}

function goToViewAsLecturer() {
  viewingAsStudent = false
  closeMobileMenu()
  window.history.pushState({}, '', '/studio')
  render()
}

function goToNewMaterialPage() {
  closeMobileMenu()
  materialFormEditId = null
  materialFormType = 'note'
  materialFormTitle = ''
  materialFormContent = ''
  materialFormExternalUrl = ''
  materialFormLanguage = 'General'
  materialFormError = ''
  window.history.pushState({}, '', '/studio/new')
  render()
}

function goToEditMaterialPage(id) {
  closeMobileMenu()
  window.history.pushState({}, '', `/studio/edit/${id}`)
  render()
}

function goToLibraryPage() {
  closeMobileMenu()
  window.history.pushState({}, '', '/library')
  render()
}

function goToLibraryItem(id) {
  closeMobileMenu()
  window.history.pushState({}, '', `/library/${id}`)
  render()
}

function goToQuizSession(language, chapterSlug, topicSlug) {
  currentCourseLanguage = null
  closeMobileMenu()
  window.history.pushState({}, '', `/quiz/${encodeURIComponent(language)}/${chapterSlug}/${topicSlug}`)
  startQuizSession({ language, chapterSlug, topicSlug })
}

function openLeaveDialog() {
  leaveDialogOpen = true
  render()
}

function closeLeaveDialog() {
  leaveDialogOpen = false
  render()
}

window.addEventListener('popstate', () => {
  closeMobileMenu()
  const route = parseRoute()
  if (route.name === 'course' && user?.hasCompletedOnboarding) {
    goToCourse(route)
  } else {
    render()
  }
})

function render() {
  if (!user) {
    renderAuthPage()
  } else if (!user.hasCompletedOnboarding) {
    renderOnboardingPage()
  } else if (user.role === 'lecturer' && !viewingAsStudent) {
    const route = parseRoute()
    if (route.name === 'studio-new') renderNewMaterialPage()
    else if (route.name === 'studio-edit') renderNewMaterialPage(route.id)
    else if (route.name === 'library') renderBrowseLibraryPage()
    else if (route.name === 'library-item') renderMaterialDetailPage(route.id)
    else if (route.name === 'playground') renderPlaygroundPage()
    else if (route.name === 'profile') renderProfilePage()
    else renderStudioPage()
  } else if (parseRoute().name === 'course') {
    renderCoursePage(parseRoute())
  } else if (parseRoute().name === 'playground') {
    renderPlaygroundPage()
  } else if (parseRoute().name === 'languages') {
    renderLanguagesPage()
  } else if (parseRoute().name === 'cosmetics') {
    renderCosmeticsPage()
  } else if (parseRoute().name === 'profile') {
    renderProfilePage()
  } else if (parseRoute().name === 'rankings') {
    renderRankingsPage()
  } else if (parseRoute().name === 'quiz-collection') {
    renderQuizCollectionPage()
  } else if (parseRoute().name === 'quiz-session') {
    renderQuizSessionPage(parseRoute())
  } else if (parseRoute().name === 'library') {
    renderBrowseLibraryPage()
  } else if (parseRoute().name === 'library-item') {
    renderMaterialDetailPage(parseRoute().id)
  } else {
    renderDashboardPage()
  }
}

// ---- Shared pieces ----

// A real DiceBear avatar (no npm dependency — just an <img src> against the
// public HTTP API) when the user has a seed, falling back to the existing
// initial-letter circle if there's no seed yet or the image fails to load
// (onerror flips a class rather than swapping innerHTML, so no inline-JS
// string-escaping games are needed). Equipped border/background cosmetics
// (see the shop) are applied as inline styles since their values are
// per-user, not theme tokens.
function renderAvatar(u, { size = 36 } = {}) {
  const borderColor = u.equippedCosmetics?.border?.value || 'var(--border-accent)'
  const glow = u.equippedCosmetics?.background?.value
  const glowStyle = glow ? `box-shadow: 0 0 0 6px ${glow}33, 0 0 16px 2px ${glow}66;` : ''
  const initial = u.name.charAt(0).toUpperCase()
  const fallback = `<div class="icon-btn avatar-fallback" style="width:${size}px; height:${size}px; border-color:${borderColor}; font-weight:700;">${initial}</div>`

  if (!u.avatarSeed || !u.avatarStyle) return `<div style="${glowStyle} border-radius:999px;">${fallback}</div>`

  const src = `https://api.dicebear.com/9.x/${u.avatarStyle}/svg?seed=${encodeURIComponent(u.avatarSeed)}`
  return `
    <div class="avatar-wrap" style="width:${size}px; height:${size}px; ${glowStyle}">
      <img class="avatar-img" src="${src}" style="border-color:${borderColor};" onerror="this.closest('.avatar-wrap').classList.add('avatar-img-failed')" />
      ${fallback}
    </div>
  `
}

function themeToggleButton(id = 'theme-toggle') {
  return `<button id="${id}" class="icon-btn" title="Toggle theme">${
    currentTheme() === 'dark' ? icons.sun : icons.moon
  }</button>`
}

function bindThemeToggle(id = 'theme-toggle') {
  document.querySelector(`#${id}`).addEventListener('click', () => {
    toggleTheme()
    render()
  })
}

// ---- App shell (persistent sidebar + topbar, dashboard + course pages) ----

function renderSidebarTracks() {
  return selectedLanguages
    .map((lang) => {
      const langMeta = SUPPORTED_LANGUAGES.find((l) => l.name === lang)
      const expanded = expandedTracks.has(lang)
      const chapters = chaptersByLanguage[lang]

      let treeHtml = ''
      if (expanded) {
        if (!chapters) {
          treeHtml = '<p class="sidebar-loading">Loading…</p>'
        } else if (chapters.length === 0) {
          treeHtml = '<p class="sidebar-loading">No chapters yet.</p>'
        } else {
          treeHtml = chapters.map((chapter) => renderSidebarChapter(lang, chapter)).join('')
        }
      }

      return `
        <div class="sidebar-track">
          <button type="button" class="sidebar-track-header" data-lang="${lang}">
            <span class="lang-glyph sidebar-track-glyph" style="background:${langMeta.color}">${langMeta.glyph}</span>
            <span class="sidebar-track-name">${lang}</span>
            <span class="sidebar-chevron ${expanded ? 'open' : ''}">${icons.chevronDown}</span>
          </button>
          ${expanded ? `<div class="sidebar-tree">${treeHtml}</div>` : ''}
        </div>
      `
    })
    .join('')
}

function renderSidebarChapter(lang, chapter) {
  const chapterKey = `${lang}/${chapter.slug}`
  const chapterExpanded = expandedChapters.has(chapterKey)

  const topicsHtml = chapterExpanded
    ? chapter.topics
        .map((topic) => {
          const active =
            currentCourseLanguage === lang &&
            courseTopic &&
            courseTopic.chapterSlug === chapter.slug &&
            courseTopic.slug === topic.slug
          const status = quizProgressByLanguage[lang]?.[`${chapter.slug}/${topic.slug}`]
          const statusClass = status ? (status.mastered ? 'mastered' : 'in-progress') : ''
          const statusIcon = status ? (status.mastered ? icons.check : icons.dot) : icons.circle
          return `
            <button type="button" class="sidebar-topic ${
              active ? 'active' : ''
            }" data-lang="${lang}" data-chapter="${chapter.slug}" data-topic="${topic.slug}">
              <span class="topic-status ${statusClass}">${statusIcon}</span>
              <span class="sidebar-topic-title">${topic.title}</span>
            </button>
          `
        })
        .join('')
    : ''

  return `
    <div class="sidebar-chapter-group">
      <button type="button" class="sidebar-chapter-header" data-lang="${lang}" data-chapter="${chapter.slug}">
        <span class="sidebar-chevron sm ${chapterExpanded ? 'open' : ''}">${icons.chevronDown}</span>
        <span class="sidebar-chapter-name">${chapter.title}</span>
        <span class="sidebar-chapter-count">${chapter.topics.length}</span>
      </button>
      ${chapterExpanded ? `<div class="sidebar-topics">${topicsHtml}</div>` : ''}
    </div>
  `
}

async function toggleTrack(lang) {
  if (expandedTracks.has(lang)) {
    expandedTracks.delete(lang)
    render()
    return
  }
  expandedTracks.add(lang)
  render()
  if (!chaptersByLanguage[lang]) {
    try {
      const { chapters } = await fetchChapters(lang)
      chaptersByLanguage[lang] = chapters
    } catch {
      chaptersByLanguage[lang] = []
    }
    render()
  }
  if (!quizProgressByLanguage[lang]) {
    try {
      const { progress } = await fetchQuizProgress(lang)
      quizProgressByLanguage[lang] = progress
    } catch {
      quizProgressByLanguage[lang] = {}
    }
    render()
  }
}

function toggleChapter(lang, chapterSlug) {
  const key = `${lang}/${chapterSlug}`
  if (expandedChapters.has(key)) {
    expandedChapters.delete(key)
  } else {
    expandedChapters.add(key)
  }
  render()
}

function renderLecturerSidebarNav(routeName) {
  return `
    <nav class="sidebar-nav">
      <button type="button" class="sidebar-nav-item ${
        routeName === 'studio' ? 'active' : ''
      }" id="nav-studio">${icons.home} Dashboard</button>
      <button type="button" class="sidebar-nav-item ${
        routeName === 'studio-new' || routeName === 'studio-edit' ? 'active' : ''
      }" id="nav-new-material">${icons.plus} New material</button>
      <button type="button" class="sidebar-nav-item ${
        routeName === 'library' || routeName === 'library-item' ? 'active' : ''
      }" id="nav-library">${icons.bookOpen} Browse library</button>
      <button type="button" class="sidebar-nav-item" id="nav-view-as-student">${icons.eye} Student dashboard</button>
      <button type="button" class="sidebar-nav-item ${
        routeName === 'playground' ? 'active' : ''
      }" id="nav-playground">${icons.terminal} Playground</button>
    </nav>
    <div class="sidebar-bottom-group">
      <button type="button" class="sidebar-nav-item ${
        routeName === 'profile' ? 'active' : ''
      }" id="nav-profile">${icons.person} Profile</button>
      <button type="button" class="sidebar-nav-item sidebar-logout" id="nav-logout">${icons.logout} Log out</button>
      ${
        user.university
          ? `<div class="profile-card sidebar-lecturer-card"><p class="lang-meta">${escapeHtml(user.university)}</p></div>`
          : ''
      }
    </div>
  `
}

function renderStudentSidebarNav(routeName) {
  return `
    <nav class="sidebar-nav">
      ${
        user.role === 'lecturer'
          ? `<button type="button" class="sidebar-nav-item" id="nav-view-as-lecturer">${icons.home} Lecturer dashboard</button>`
          : ''
      }
      <button type="button" class="sidebar-nav-item ${
        routeName === 'home' || routeName === 'languages' ? 'active' : ''
      }" id="nav-home">${icons.home} Home</button>
      <button type="button" class="sidebar-nav-item ${
        routeName === 'quiz-collection' || routeName === 'quiz-session' ? 'active' : ''
      }" id="nav-quiz">${icons.clipboardList} Quiz collection</button>
      <button type="button" class="sidebar-nav-item ${
        routeName === 'rankings' ? 'active' : ''
      }" id="nav-rankings">${icons.trophy} Leaderboard</button>
      <button type="button" class="sidebar-nav-item ${
        routeName === 'library' || routeName === 'library-item' ? 'active' : ''
      }" id="nav-library">${icons.bookOpen} Lecturer library</button>
      <button type="button" class="sidebar-nav-item ${
        routeName === 'playground' ? 'active' : ''
      }" id="nav-playground">${icons.terminal} Playground</button>
      <button type="button" class="sidebar-nav-item ${
        routeName === 'cosmetics' ? 'active' : ''
      }" id="nav-cosmetics">${icons.shoppingBag} Cosmetics</button>
    </nav>
    <div class="sidebar-section-label">My languages</div>
    <div class="sidebar-tracks">${renderSidebarTracks()}</div>
    <button type="button" class="sidebar-nav-item sidebar-add-lang" id="nav-add-language">${
      icons.plus
    } Add a language</button>
    <button type="button" class="sidebar-nav-item ${
      routeName === 'profile' ? 'active' : ''
    }" id="nav-profile">${icons.person} Profile</button>
    <button type="button" class="sidebar-nav-item sidebar-logout" id="nav-logout">${icons.logout} Log out</button>
  `
}

function renderAppShell({ topLabel, mainHtml }) {
  const routeName = parseRoute().name
  const isLecturer = user.role === 'lecturer' && !viewingAsStudent
  const topbarExtra = isLecturer
    ? `<span class="verified-pill ${user.lecturerVerified ? '' : 'unverified'}">${icons.badgeCheck} ${
        user.lecturerVerified ? 'Verified lecturer' : 'Unverified'
      }</span>`
    : `
      <span class="stat-pill"><span class="stat-icon-flame">${icons.flame}</span>${user.currentStreak}</span>
      <span class="stat-pill"><span class="stat-icon-gem">${icons.gem}</span>${user.points.toLocaleString()}</span>
    `
  return `
    <div class="app-shell">
      <div class="sidebar-overlay ${mobileMenuOpen ? 'overlay-open' : ''}" id="sidebar-overlay"></div>
      <aside class="app-sidebar ${mobileMenuOpen ? 'sidebar-open' : ''}">
        <button type="button" class="sidebar-close-btn" id="sidebar-close" title="Close menu">${icons.x}</button>
        <div class="brand-logo brand-logo-sm sidebar-logo">code<span>pilot</span></div>
        ${isLecturer ? renderLecturerSidebarNav(routeName) : renderStudentSidebarNav(routeName)}
      </aside>
      <div class="app-main">
        <div class="app-topbar">
          <button type="button" class="mobile-menu-toggle" id="mobile-menu-toggle" title="Open menu">${
            icons.menu
          }</button>
          <span class="app-top-label">${topLabel}</span>
          <div style="display:flex; align-items:center; gap:0.6rem;">
            ${topbarExtra}
            ${themeToggleButton()}
            <button type="button" class="btn btn-primary btn-sm topbar-try-btn" id="try-it-yourself">${
              icons.terminal
            } <span class="try-btn-text">Try it yourself</span></button>
            <button type="button" class="bell-btn" title="Notifications">${icons.bell}</button>
            ${renderAvatar(user)}
          </div>
        </div>
        <div class="app-content">${mainHtml}</div>
      </div>
      ${renderMiniPlayground()}
      ${renderToasts()}
    </div>
  `
}

function bindAppShell() {
  bindThemeToggle()
  const menuToggle = document.querySelector('#mobile-menu-toggle')
  if (menuToggle) menuToggle.addEventListener('click', toggleMobileMenu)
  const sidebarClose = document.querySelector('#sidebar-close')
  if (sidebarClose) sidebarClose.addEventListener('click', closeMobileMenu)
  const sidebarOverlay = document.querySelector('#sidebar-overlay')
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeMobileMenu)
  document.querySelector('#nav-playground').addEventListener('click', goToPlayground)
  document.querySelector('#nav-profile').addEventListener('click', goToProfilePage)
  document.querySelector('#nav-logout').addEventListener('click', handleLogout)
  document.querySelector('#try-it-yourself').addEventListener('click', toggleMiniPlayground)

  if (user.role === 'lecturer' && !viewingAsStudent) {
    document.querySelector('#nav-studio').addEventListener('click', goToStudio)
    document.querySelector('#nav-new-material').addEventListener('click', goToNewMaterialPage)
    document.querySelector('#nav-library').addEventListener('click', goToLibraryPage)
    document.querySelector('#nav-view-as-student').addEventListener('click', goToViewAsStudent)
  } else {
    document.querySelector('#nav-home').addEventListener('click', goToDashboard)
    document.querySelector('#nav-add-language').addEventListener('click', goToLanguagesPage)
    document.querySelector('#nav-quiz').addEventListener('click', goToQuizCollection)
    document.querySelector('#nav-rankings').addEventListener('click', goToRankingsPage)
    document.querySelector('#nav-library').addEventListener('click', goToLibraryPage)
    document.querySelector('#nav-cosmetics').addEventListener('click', goToCosmeticsPage)
    const viewAsLecturerBtn = document.querySelector('#nav-view-as-lecturer')
    if (viewAsLecturerBtn) viewAsLecturerBtn.addEventListener('click', goToViewAsLecturer)
    document.querySelectorAll('.sidebar-track-header').forEach((btn) => {
      btn.addEventListener('click', () => toggleTrack(btn.dataset.lang))
    })
    document.querySelectorAll('.sidebar-chapter-header').forEach((btn) => {
      btn.addEventListener('click', () => toggleChapter(btn.dataset.lang, btn.dataset.chapter))
    })
    document.querySelectorAll('.sidebar-topic').forEach((btn) => {
      btn.addEventListener('click', () => {
        closeMobileMenu()
        openTopic(btn.dataset.lang, btn.dataset.chapter, btn.dataset.topic)
      })
    })
  }

  if (miniPlaygroundOpen) {
    bindMiniPlayground()
    mountMiniPlaygroundEditor()
  }
  document.querySelectorAll('[data-toast-close]').forEach((btn) => {
    btn.addEventListener('click', () => dismissToast(btn.dataset.toastClose))
  })
}

function renderBrandPanel() {
  return `
    <div class="brand-panel">
      <div class="brand-logo">code<span>pilot</span></div>
      <div>
        <h1 class="brand-headline">Learn to code<br />without stress.</h1>
        <p class="brand-subtext">You don't have to sit through a 3 hour crash course just to write three lines of code. The chapters are short, there are key takeaways for each topic, and getting something wrong in the quiz actually tells you why.</p>
        <div class="code-card">
          <div class="code-card-tab">${icons.file} day-01.js</div>
          <div class="code-card-body">
            <div><span class="code-keyword">const</span> streak = 1;</div>
            <div class="code-comment">// keep going tomorrow</div>
          </div>
        </div>
      </div>
      <div class="brand-footer">
        <span class="brand-footer-note">Free for Baze University students</span>
      </div>
    </div>
  `
}

// ---- Auth (login / register) ----

function renderAuthPage() {
  app.innerHTML = `
    <div class="auth-shell">
      ${renderBrandPanel()}
      <div class="form-panel">
        <div class="form-topbar">
          <div class="segmented-control auth-role-toggle" role="tablist">
            <button type="button" class="segmented-option ${
              authRole === 'student' ? 'active' : ''
            }" data-auth-role="student">Student</button>
            <button type="button" class="segmented-option ${
              authRole === 'lecturer' ? 'active' : ''
            }" data-auth-role="lecturer">Lecturer</button>
          </div>
          <a href="#" id="topbar-auth-link" class="pill-link"><span class="pill-dot"></span> ${
            authMode === 'login' ? 'Register' : 'Log in'
          }</a>
          ${themeToggleButton()}
        </div>
        <div class="form-card">
          ${authMode === 'login' ? renderLoginForm() : renderRegisterForm()}
        </div>
      </div>
      ${renderToasts()}
    </div>
  `
  bindThemeToggle()
  document.querySelectorAll('[data-auth-role]').forEach((btn) => {
    btn.addEventListener('click', () => {
      authRole = btn.dataset.authRole
      error = ''
      render()
    })
  })
  document.querySelector('#topbar-auth-link').addEventListener('click', (e) => {
    e.preventDefault()
    switchAuthMode()
  })
  document.querySelector('#auth-form').addEventListener('submit', handleAuthSubmit)
  document.querySelector('#switch-mode').addEventListener('click', (e) => {
    e.preventDefault()
    switchAuthMode()
  })
  const oauthBtn = document.querySelector('#oauth-btn')
  if (oauthBtn) {
    oauthBtn.addEventListener('click', (e) => {
      e.preventDefault()
      notice = ''
      error = "GitHub sign-in isn't available yet."
      render()
    })
  }
  const forgotLink = document.querySelector('#forgot-password')
  if (forgotLink) {
    forgotLink.addEventListener('click', (e) => {
      e.preventDefault()
      notice = ''
      error = "Password reset isn't available yet."
      render()
    })
  }
  const idCardInput = document.querySelector('#reg-id-card')
  if (idCardInput) {
    // Mutates the status line directly rather than calling render() — same
    // reasoning as the password-visibility toggle above: a full re-render
    // would wipe whatever else the user has already typed into this form.
    // (The file input itself always shows empty after any re-render
    // regardless — browsers won't let JS restore a file input's selection —
    // which is exactly why this status line exists: it's the only way the
    // user can tell an image is still attached after, say, switching the
    // password visibility toggle triggers no re-render, but switching the
    // Student/Lecturer tab would.)
    idCardInput.addEventListener('change', () => {
      const file = idCardInput.files[0]
      const statusEl = document.querySelector('#id-card-status')
      registerIdCardImageDataUri = ''
      if (!file) {
        if (statusEl) statusEl.textContent = ''
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        if (statusEl) statusEl.textContent = 'Image is too large — please choose a photo under 5MB.'
        idCardInput.value = ''
        return
      }
      const reader = new FileReader()
      reader.onload = () => {
        registerIdCardImageDataUri = reader.result
        if (statusEl) statusEl.textContent = 'Image selected.'
      }
      reader.readAsDataURL(file)
    })
  }
  document.querySelectorAll('.toggle-password-visibility').forEach((passwordToggle) => {
    passwordToggle.addEventListener('click', () => {
      const input = passwordToggle.previousElementSibling
      const showing = input.type === 'text'
      input.type = showing ? 'password' : 'text'
      passwordToggle.innerHTML = showing ? icons.eye : icons.eyeOff
    })
  })
  document.querySelectorAll('[data-toast-close]').forEach((btn) => {
    btn.addEventListener('click', () => dismissToast(btn.dataset.toastClose))
  })
}

function switchAuthMode() {
  authMode = authMode === 'login' ? 'register' : 'login'
  error = ''
  notice = ''
  render()
}

function renderLoginForm() {
  // Consumed once, then cleared, so a later unrelated visit to this form
  // (e.g. after logging out) starts blank rather than reshowing stale
  // just-registered credentials.
  const emailValue = prefillLoginEmail
  const passwordValue = prefillLoginPassword
  prefillLoginEmail = ''
  prefillLoginPassword = ''
  return `
    <h1 class="form-title">Welcome back</h1>
    <p class="form-subtext">Log in so you don't lose your streak.</p>
    <p class="form-tagline">Every topic finished is one less thing standing between you and actually being good at this.</p>
    <form id="auth-form" class="form-fields">
      <div>
        <label class="field-label" for="email">Email</label>
        <div class="input-wrap">
          <span class="input-icon">${icons.envelope}</span>
          <input id="email" name="email" type="email" placeholder="you@uni.edu" required class="input input-with-icon" value="${escapeHtml(
            emailValue
          )}" />
        </div>
      </div>
      <div>
        <label class="field-label" for="login-password">Password</label>
        <div class="input-wrap">
          <input id="login-password" name="password" type="password" placeholder="Password" required class="input input-with-icon-right" value="${escapeHtml(
            passwordValue
          )}" />
          <button type="button" class="input-icon-right toggle-password-visibility">${icons.eye}</button>
        </div>
      </div>
      <div style="display:flex; align-items:center; justify-content:space-between;">
        <label class="checkbox-row">
          <input type="checkbox" name="keepSignedIn" checked />
          Keep me signed in
        </label>
        <a href="#" id="forgot-password" style="font-size:0.8125rem; color: var(--text-link); text-decoration:none;">Forgot password?</a>
      </div>
      <button type="submit" class="btn btn-primary">Log in</button>
    </form>
    ${error ? `<p class="error-text" style="margin-top:0.75rem;">${error}</p>` : ''}
    ${notice ? `<p class="notice-text" style="margin-top:0.75rem;">${notice}</p>` : ''}
    <div class="divider">or</div>
    <button type="button" id="oauth-btn" class="btn btn-secondary">${icons.github} Continue with GitHub</button>
    <p class="footer-note">New here? <a href="#" id="switch-mode">Create an account</a></p>
  `
}

function renderRegisterForm() {
  return `
    <h1 class="form-title">Create your account</h1>
    <p class="form-subtext">Free with a university email. Takes about a minute.</p>
    <form id="auth-form" class="form-fields">
      <div>
        <label class="field-label" for="name">Name</label>
        <div class="input-wrap">
          <span class="input-icon">${icons.person}</span>
          <input id="name" name="name" type="text" placeholder="Maya Okoro" required class="input input-with-icon" />
        </div>
      </div>
      <div>
        <label class="field-label" for="reg-email">${authRole === 'lecturer' ? 'University email' : 'Baze University email'}</label>
        <div class="input-wrap">
          <span class="input-icon">${icons.envelope}</span>
          <input id="reg-email" name="email" type="email" placeholder="${
            authRole === 'lecturer' ? 'you@uni.edu' : 'you@bazeuniversity.edu.ng'
          }" required class="input input-with-icon" />
        </div>
        <p class="helper-text">${
          authRole === 'lecturer'
            ? 'We use this to verify your student status.'
            : 'Must end in @bazeuniversity.edu.ng — this is Baze University students only for now.'
        }</p>
      </div>
      <div>
        <label class="field-label" for="reg-password">Password</label>
        <div class="input-wrap">
          <input id="reg-password" name="password" type="password" placeholder="8+ characters" required minlength="8" class="input input-with-icon-right" />
          <button type="button" class="input-icon-right toggle-password-visibility">${icons.eye}</button>
        </div>
      </div>
      ${
        authRole === 'lecturer'
          ? `
        <div>
          <label class="field-label" for="reg-university">University / institution</label>
          <div class="input-wrap">
            <span class="input-icon">${icons.graduationCap}</span>
            <input id="reg-university" name="university" type="text" placeholder="Baze University" required class="input input-with-icon" />
          </div>
        </div>
        <div>
          <label class="field-label" for="reg-courses">Courses you teach</label>
          <input id="reg-courses" name="coursesTaught" type="text" placeholder="CSC301, CSC420" required class="input" />
          <p class="helper-text">Used only to verify your lecturer account — sent to the CodePilot team, never shown publicly.</p>
        </div>
      `
          : `
        <div>
          <label class="field-label" for="reg-id-card">Student ID card photo</label>
          <input id="reg-id-card" type="file" accept="image/*" required class="input" />
          <p class="helper-text" id="id-card-status">${registerIdCardImageDataUri ? 'Image selected.' : ''}</p>
        </div>
        <div>
          <label class="field-label" for="reg-id-expiry">ID card expiration (month/year)</label>
          <input id="reg-id-expiry" name="idCardExpirationDate" type="month" required class="input" />
        </div>
      `
      }
      <label class="checkbox-row">
        <input type="checkbox" name="agree" required />
        I agree to the terms and privacy notice
      </label>
      <button type="submit" class="btn btn-primary">Create account ${icons.arrowRight}</button>
    </form>
    ${error ? `<p class="error-text" style="margin-top:0.75rem;">${error}</p>` : ''}
    ${notice ? `<p class="notice-text" style="margin-top:0.75rem;">${notice}</p>` : ''}
    <div class="divider">or</div>
    <button type="button" id="oauth-btn" class="btn btn-secondary">${icons.github} Sign up with GitHub</button>
    <p class="footer-note">Already have an account? <a href="#" id="switch-mode">Log in</a></p>
  `
}

async function handleAuthSubmit(e) {
  e.preventDefault()
  const payload = { ...Object.fromEntries(new FormData(e.target)), role: authRole }
  // The file input deliberately has no `name` attribute (see its change
  // handler above), so FormData never picks it up — it's added here as the
  // base64 string FileReader already produced.
  if (authMode === 'register' && authRole === 'student') {
    payload.idCardImage = registerIdCardImageDataUri
  }

  try {
    if (authMode === 'register') {
      await register(payload)
      authMode = 'login'
      prefillLoginEmail = payload.email
      prefillLoginPassword = payload.password
      registerIdCardImageDataUri = ''
      error = ''
      notice = 'Account created — log in below.'
    } else {
      const { user: loggedInUser } = await login(payload)
      setUser(loggedInUser)
      error = ''
      notice = ''
    }
  } catch (err) {
    // The "not a Baze University student" registration error gets a toast
    // (matching how e.g. an avatar-equip confirmation shows) instead of the
    // usual inline error text — everything else stays inline as before.
    if (err.code === 'invalid_domain') {
      showErrorToast(err.message)
      error = ''
    } else {
      error = err.message
    }
    notice = ''
  }
  render()
}

// ---- Shared language tile grid (onboarding + dashboard settings) ----

function renderLangGrid(gridId) {
  const tiles = SUPPORTED_LANGUAGES.map((lang) => {
    const selected = selectedLanguages.includes(lang.name)
    return `
      <button type="button" class="lang-tile ${selected ? 'selected' : ''}" data-lang="${lang.name}">
        <span class="lang-radio">${selected ? icons.check : ''}</span>
        <span class="lang-glyph" style="background:${lang.color}">${lang.glyph}</span>
        <div class="lang-name">${lang.name}</div>
        <div class="lang-meta">${lang.chapters} chapters &middot; ${lang.topics} topics</div>
      </button>
    `
  }).join('')
  return `<div class="lang-grid" id="${gridId}">${tiles}</div>`
}

function bindLangGrid(gridId, onChange) {
  document.querySelector(`#${gridId}`).addEventListener('click', (e) => {
    const tile = e.target.closest('.lang-tile')
    if (!tile) return
    const lang = tile.dataset.lang
    selectedLanguages = selectedLanguages.includes(lang)
      ? selectedLanguages.filter((l) => l !== lang)
      : [...selectedLanguages, lang]
    onChange()
  })
}

function topicsUnlocked() {
  return SUPPORTED_LANGUAGES.filter((lang) => selectedLanguages.includes(lang.name)).reduce(
    (sum, lang) => sum + lang.topics,
    0
  )
}

// ---- Onboarding (first login only) ----

// Onboarding is 2 steps — step 1 (new) picks a free starter avatar, step 2
// is languages + daily goal (the whole page this used to be, single-step).
function renderOnboardingPage() {
  // Gated on the real, persisted phoneVerified flag (not a step counter) —
  // a refresh mid-onboarding still restarts the avatar/language steps from
  // scratch (harmless, see their own comments), but must NOT re-send an
  // OTP to someone who already verified, since each send costs real money.
  if (!user.phoneVerified) {
    renderOnboardingPhoneStep()
  } else if (onboardingStep === 1) {
    renderOnboardingAvatarStep()
  } else {
    renderOnboardingLanguagesStep()
  }
}

function renderOnboardingPhoneStep() {
  app.innerHTML = `
    <div class="onboarding-page">
      <div class="onboarding-topbar">
        <div class="onboarding-topbar-left">
          <div class="brand-logo brand-logo-sm">code<span>pilot</span></div>
          <span class="setup-chip">&bull; First-time setup</span>
        </div>
        <div style="display:flex; align-items:center; gap:0.6rem;">
          ${themeToggleButton()}
          ${renderAvatar(user)}
        </div>
      </div>
      <div class="onboarding-body">
        <span class="setup-chip setup-chip-mobile">&bull; First-time setup</span>
        <p class="eyebrow">WELCOME, ${user.name.toUpperCase()} &middot; STEP 1 OF 3</p>
        <h1 class="onboarding-heading">Verify your phone number.</h1>
        <p class="onboarding-subtext">We text a 4-digit code to confirm you're a real Baze University student before you can start.</p>

        <div class="progress-row">
          <span>Setting up your account</span>
          <span>Step 1 of 3</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:33%"></div></div>

        <div class="form-card" style="max-width:420px; margin-top:1.5rem;">
          <div>
            <label class="field-label" for="onboarding-phone-number">Phone number</label>
            <div class="input-wrap">
              <span class="input-icon">${icons.phone}</span>
              <input id="onboarding-phone-number" type="tel" placeholder="08012345678" class="input input-with-icon" value="${escapeHtml(
                onboardingPhoneNumber
              )}" ${onboardingPhoneOtpSent ? 'disabled' : ''} />
            </div>
          </div>
          ${
            onboardingPhoneOtpSent
              ? `
            <div style="margin-top:1rem;">
              <label class="field-label" for="onboarding-phone-otp">4-digit code</label>
              <input id="onboarding-phone-otp" type="text" inputmode="numeric" maxlength="4" placeholder="1234" class="input" value="${escapeHtml(
                onboardingPhoneOtp
              )}" />
              <p class="helper-text">Sent to ${escapeHtml(onboardingPhoneNumber)}.</p>
            </div>
            <div style="display:flex; gap:0.6rem; margin-top:1.25rem; flex-wrap:wrap;">
              <button type="button" id="onboarding-phone-verify" class="btn btn-primary" ${
                onboardingPhoneSaving ? 'disabled' : ''
              }>Verify ${icons.arrowRight}</button>
              <button type="button" id="onboarding-phone-resend" class="btn btn-secondary" ${
                onboardingPhoneSaving ? 'disabled' : ''
              }>Resend code</button>
            </div>
          `
              : `
            <div style="margin-top:1.25rem;">
              <button type="button" id="onboarding-phone-send" class="btn btn-primary" ${
                onboardingPhoneSaving ? 'disabled' : ''
              }>Send code ${icons.arrowRight}</button>
            </div>
          `
          }
          ${onboardingPhoneError ? `<p class="error-text" style="margin-top:0.75rem;">${escapeHtml(onboardingPhoneError)}</p>` : ''}
        </div>
      </div>
    </div>
  `
  bindThemeToggle()
  const sendBtn = document.querySelector('#onboarding-phone-send')
  if (sendBtn) sendBtn.addEventListener('click', handleSendPhoneOtp)
  const verifyBtn = document.querySelector('#onboarding-phone-verify')
  if (verifyBtn) verifyBtn.addEventListener('click', handleVerifyPhoneOtp)
  const resendBtn = document.querySelector('#onboarding-phone-resend')
  if (resendBtn) resendBtn.addEventListener('click', handleSendPhoneOtp)
  const numberInput = document.querySelector('#onboarding-phone-number')
  if (numberInput) numberInput.addEventListener('input', (e) => { onboardingPhoneNumber = e.target.value })
  const otpInput = document.querySelector('#onboarding-phone-otp')
  if (otpInput) otpInput.addEventListener('input', (e) => { onboardingPhoneOtp = e.target.value })
}

async function handleSendPhoneOtp() {
  onboardingPhoneError = ''
  onboardingPhoneSaving = true
  render()
  try {
    await sendPhoneOtp(onboardingPhoneNumber)
    onboardingPhoneOtpSent = true
    onboardingPhoneOtp = ''
  } catch (err) {
    onboardingPhoneError = err.message
  }
  onboardingPhoneSaving = false
  render()
}

async function handleVerifyPhoneOtp() {
  onboardingPhoneError = ''
  onboardingPhoneSaving = true
  render()
  try {
    const { user: updatedUser } = await verifyPhoneOtp(onboardingPhoneOtp)
    setUser(updatedUser)
    // render() below now skips straight past this step since
    // user.phoneVerified is true — no explicit step-advance needed here.
  } catch (err) {
    onboardingPhoneError = err.message
  }
  onboardingPhoneSaving = false
  render()
}

// A small fixed set (not the full random AVATAR_STYLES pool) with a fixed
// seed, matching shopController.js's STARTER_AVATAR_OPTIONS exactly — keeps
// the picker's preview deterministic rather than reflecting a real random pull.
const STARTER_AVATAR_CHOICES = [
  { style: 'bottts', label: 'Bot', description: 'Robot heads' },
  { style: 'adventurer', label: 'Adventurer', description: 'Illustrated faces' },
  { style: 'notionists', label: 'Notionist', description: 'Line drawn' },
]
const STARTER_AVATAR_SEED = 'starter'

function renderOnboardingAvatarStep() {
  const previewUser = { ...user, avatarStyle: onboardingAvatarChoice, avatarSeed: STARTER_AVATAR_SEED }
  const selectedMeta = STARTER_AVATAR_CHOICES.find((c) => c.style === onboardingAvatarChoice)

  const cardsHtml = STARTER_AVATAR_CHOICES.map((choice) => {
    const selected = onboardingAvatarChoice === choice.style
    const cardPreviewUser = { ...user, avatarStyle: choice.style, avatarSeed: STARTER_AVATAR_SEED }
    return `
      <button type="button" class="onboarding-avatar-card ${
        selected ? 'selected' : ''
      }" data-style="${choice.style}">
        <span class="onboarding-avatar-check">${selected ? icons.check : ''}</span>
        ${renderAvatar(cardPreviewUser, { size: 72 })}
        <p class="lang-name" style="margin-top:0.75rem; margin-bottom:0.15rem;">${choice.label}</p>
        <p class="lang-meta">${choice.description}</p>
      </button>
    `
  }).join('')

  app.innerHTML = `
    <div class="onboarding-page">
      <div class="onboarding-topbar">
        <div class="onboarding-topbar-left">
          <div class="brand-logo brand-logo-sm">code<span>pilot</span></div>
          <span class="setup-chip">&bull; First-time setup</span>
        </div>
        <div style="display:flex; align-items:center; gap:0.6rem;">
          ${themeToggleButton()}
          ${renderAvatar(previewUser)}
        </div>
      </div>
      <div class="onboarding-body">
        <span class="setup-chip setup-chip-mobile">&bull; First-time setup</span>
        <p class="eyebrow">WELCOME, ${user.name.toUpperCase()} &middot; STEP 2 OF 3</p>
        <h1 class="onboarding-heading">Pick your avatar.</h1>
        <p class="onboarding-subtext">This is how you show up on leaderboards. Three to start with — you can change it, and unlock more, from your profile.</p>

        <div class="progress-row">
          <span>Setting up your account</span>
          <span>Step 2 of 3</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:66%"></div></div>

        <div class="onboarding-avatar-grid">${cardsHtml}</div>

        <div class="onboarding-avatar-footer">
          <div class="onboarding-avatar-footer-preview">
            ${renderAvatar(previewUser, { size: 28 })}
            <span>${selectedMeta.label} selected</span>
          </div>
          <button type="button" id="onboarding-avatar-next" class="btn btn-primary btn-sm" ${
            onboardingAvatarSaving ? 'disabled' : ''
          }>Next &mdash; pick your languages ${icons.arrowRight}</button>
        </div>
        <p class="onboarding-hint">More avatars and cosmetics unlock with points in the shop.</p>
        ${onboardingAvatarError ? `<p class="error-text">${escapeHtml(onboardingAvatarError)}</p>` : ''}
      </div>
    </div>
  `
  bindThemeToggle()
  document.querySelectorAll('.onboarding-avatar-card').forEach((card) => {
    card.addEventListener('click', () => {
      onboardingAvatarChoice = card.dataset.style
      render()
    })
  })
  document.querySelector('#onboarding-avatar-next').addEventListener('click', handleAvatarStepNext)
}

async function handleAvatarStepNext() {
  onboardingAvatarError = ''
  onboardingAvatarSaving = true
  render()
  try {
    const result = await claimStarterAvatar(onboardingAvatarChoice)
    user.avatarStyle = result.avatarStyle
    user.avatarSeed = result.avatarSeed
    onboardingStep = 2
  } catch (err) {
    onboardingAvatarError = err.message
  }
  onboardingAvatarSaving = false
  render()
}

function renderOnboardingLanguagesStep() {
  const chips = selectedLanguages
    .map(
      (lang) =>
        `<span class="chip">${lang}<button type="button" data-lang="${lang}" class="remove-chip">${icons.x}</button></span>`
    )
    .join('')

  app.innerHTML = `
    <div class="onboarding-page">
      <div class="onboarding-topbar">
        <div class="onboarding-topbar-left">
          <div class="brand-logo brand-logo-sm">code<span>pilot</span></div>
          <span class="setup-chip">&bull; First-time setup</span>
        </div>
        <div style="display:flex; align-items:center; gap:0.6rem;">
          <span class="stat-pill"><span class="stat-icon-flame">${icons.flame}</span>${user.currentStreak}</span>
          <span class="stat-pill"><span class="stat-icon-gem">${icons.gem}</span>${user.points.toLocaleString()}</span>
          ${themeToggleButton()}
          <button type="button" class="bell-btn" title="Notifications">${icons.bell}</button>
          ${renderAvatar(user)}
        </div>
      </div>
      <div class="onboarding-body">
        <span class="setup-chip setup-chip-mobile">&bull; First-time setup</span>
        <p class="eyebrow">WELCOME, ${user.name.toUpperCase()} &middot; STEP 3 OF 3</p>
        <h1 class="onboarding-heading">What do you want to learn?</h1>
        <p class="onboarding-subtext">Pick as many languages as you like — each one adds its chapters and topics to your sidebar. You can add or drop a language any time from your settings.</p>

        <div class="progress-row">
          <span>Setting up your account</span>
          <span>Step 3 of 3</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:100%"></div></div>

        ${renderLangGrid('onboarding-lang-grid')}

        <div class="goal-card">
          <p class="goal-title">How hard do you want to push?</p>
          <p class="goal-subtext">This just sets your daily goal. You can change it whenever.</p>
          <div class="goal-options">
            ${renderGoalOption('chill', 'Chill', '1 topic a day')}
            ${renderGoalOption('steady', 'Steady', '2 topics a day')}
            ${renderGoalOption('serious', 'Serious', '4 topics a day')}
          </div>
        </div>
      </div>
      <div class="onboarding-footer">
        <div class="onboarding-footer-row">
          <div class="chip-row">${chips}</div>
          <div class="onboarding-footer-right">
            <span class="topics-unlocked">${topicsUnlocked()} topics unlocked</span>
            <button type="button" id="finish-onboarding" class="btn btn-primary" ${
              selectedLanguages.length === 0 ? 'disabled' : ''
            }>Go to my dashboard ${icons.arrowRight}</button>
          </div>
        </div>
        <p class="onboarding-hint">You only see this screen on your first login.</p>
        ${error ? `<p class="error-text" style="text-align:center; margin:0;">${error}</p>` : ''}
      </div>
    </div>
  `
  bindThemeToggle()
  bindLangGrid('onboarding-lang-grid', render)
  document.querySelectorAll('.remove-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedLanguages = selectedLanguages.filter((l) => l !== btn.dataset.lang)
      render()
    })
  })
  document.querySelectorAll('input[name="dailyGoal"]').forEach((radio) => {
    radio.addEventListener('change', (e) => {
      selectedGoal = e.target.value
      render()
    })
  })
  document.querySelector('#finish-onboarding').addEventListener('click', handleFinishOnboarding)
}

function renderGoalOption(value, title, subtext) {
  const checked = selectedGoal === value ? 'checked' : ''
  return `
    <label class="goal-option">
      <input type="radio" name="dailyGoal" value="${value}" ${checked} />
      <span>
        <span class="goal-option-title">${title}</span><br />
        <span class="goal-option-subtext">${subtext}</span>
      </span>
    </label>
  `
}

async function handleFinishOnboarding() {
  try {
    const { user: updatedUser } = await saveOnboarding(selectedLanguages, selectedGoal)
    setUser(updatedUser)
    error = ''
  } catch (err) {
    error = err.message
  }
  render()
}

// ---- Dashboard ----

function homeDataReady() {
  return homePageData !== null
}

async function loadHomeData() {
  homePageLoading = true
  try {
    homePageData = await fetchHome()
  } catch (err) {
    homePageError = err.message
    homePageData = {
      currentStreak: 0,
      streakIncreasedToday: false,
      points: 0,
      pointsThisWeek: 0,
      topicsCompletedTotal: 0,
      topicsCompletedToday: 0,
      dailyGoalTarget: 2,
      topicsLeftToday: 2,
      weekActivity: [],
      daysPractisedThisWeek: 0,
      streakFreezeCount: 0,
      lastViewedTopic: null,
      tracks: [],
      quizSummary: { totalTopics: 0, masteredCount: 0, languagesCount: 0 },
    }
  }
  homePageLoading = false
  render()
}

function getGreetingWord() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Morning'
  if (hour < 18) return 'Afternoon'
  return 'Evening'
}

function getDayTimeLabel() {
  const now = new Date()
  const day = now.toLocaleDateString(undefined, { weekday: 'long' }).toUpperCase()
  const time = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false })
  return `${day} &middot; ${time}`
}

const WEEKDAY_LETTERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

function renderHomeTrackTile(track) {
  const statusLabel = track.started ? track.currentChapterLabel : 'Not started'
  return `
    <button type="button" class="lang-tile home-track-tile" data-lang="${track.language}">
      <span class="lang-glyph" style="background:${track.color}">${track.glyph}</span>
      <div class="lang-name">${track.language}</div>
      <div class="lang-meta" style="margin-bottom:0.6rem;">${statusLabel}</div>
      <div class="progress-track" style="margin-bottom:0;">
        <div class="progress-fill" style="width:${track.progressPercent}%"></div>
      </div>
    </button>
  `
}

function renderDashboardPage() {
  currentCourseLanguage = null

  if (!homeDataReady()) {
    app.innerHTML = renderAppShell({ topLabel: 'Home', mainHtml: '<p>Loading…</p>' })
    bindAppShell()
    if (!homePageLoading) loadHomeData()
    return
  }

  const {
    currentStreak,
    streakIncreasedToday,
    points,
    pointsThisWeek,
    topicsCompletedTotal,
    weekActivity,
    daysPractisedThisWeek,
    lastViewedTopic,
    tracks,
    quizSummary,
  } = homePageData

  const firstName = user.name.split(' ')[0]
  const goalSubtext = 'Make sure you work hard to get on the leaderboard.'

  const matchingTrack = lastViewedTopic ? tracks.find((t) => t.language === lastViewedTopic.language) : null
  const continueCta = lastViewedTopic
    ? `<button type="button" class="btn btn-primary btn-sm home-continue-btn" id="home-continue-cta">${icons.arrowRight} Continue ${
        matchingTrack ? matchingTrack.currentChapterLabel : lastViewedTopic.chapterTitle
      }</button>`
    : ''

  const resumeCardHtml = lastViewedTopic
    ? `
      <div class="profile-card home-resume-card">
        <div class="home-resume-header">
          <p class="lang-name" style="margin-bottom:0;">Pick up where you left off</p>
          <span class="shop-cost-pill">${lastViewedTopic.currentChapterLabel || lastViewedTopic.chapterTitle}</span>
        </div>
        <p class="lang-meta" style="margin-bottom:1rem;">${lastViewedTopic.language} &middot; ${escapeHtml(
          lastViewedTopic.chapterTitle
        )}</p>
        <div class="home-resume-row">
          <span class="lang-glyph" style="background:${
            SUPPORTED_LANGUAGES.find((l) => l.name === lastViewedTopic.language)?.color || '#888'
          }">${SUPPORTED_LANGUAGES.find((l) => l.name === lastViewedTopic.language)?.glyph || ''}</span>
          <div style="flex:1; min-width:0;">
            <p class="lang-name" style="margin-bottom:0.15rem;">${escapeHtml(lastViewedTopic.topicTitle)}</p>
            <p class="lang-meta">${lastViewedTopic.readingMinutes} min &middot; ${
              lastViewedTopic.questionCount
            } question${lastViewedTopic.questionCount === 1 ? '' : 's'}</p>
          </div>
          <button type="button" class="btn btn-primary btn-sm" id="home-resume-btn">Resume ${icons.arrowRight}</button>
        </div>
        <div class="home-resume-footer">
          <span class="lang-meta">Chapter progress</span>
          <span class="lang-meta">${lastViewedTopic.chapterProgressPercent}%</span>
        </div>
        <div class="progress-track" style="margin-bottom:0;">
          <div class="progress-fill" style="width:${lastViewedTopic.chapterProgressPercent}%"></div>
        </div>
      </div>
    `
    : `
      <div class="profile-card home-resume-card">
        <p class="lang-name">Pick up where you left off</p>
        <p class="lang-meta" style="margin-bottom:1rem;">You haven't opened a lesson yet.</p>
        <button type="button" class="btn btn-primary btn-sm" id="home-browse-tracks">Browse your languages ${
          icons.arrowRight
        }</button>
      </div>
    `

  const weekCalendarHtml = weekActivity
    .map((day, i) => {
      const isToday = new Date(day.date).toDateString() === new Date().toDateString()
      return `
      <div class="home-week-day">
        <span class="home-week-dot ${day.active ? 'active' : ''} ${isToday ? 'today' : ''}">${
          day.active ? icons.flame : ''
        }</span>
        <span class="home-week-label">${WEEKDAY_LETTERS[i]}</span>
      </div>
    `
    })
    .join('')

  const filteredTracks =
    trackFilter === 'all'
      ? tracks
      : trackFilter === 'in-progress'
        ? tracks.filter((t) => t.started)
        : tracks.filter((t) => !t.started)

  const mainHtml = `
    <div class="home-greeting-row">
      <div>
        <p class="eyebrow">${getDayTimeLabel()}</p>
        <h1 class="onboarding-heading" style="margin-bottom:0.25rem;">${getGreetingWord()}, ${escapeHtml(
          firstName
        )}.</h1>
        <p class="lang-meta">${goalSubtext}</p>
      </div>
      ${continueCta}
    </div>

    ${homePageError ? `<p class="error-text">${escapeHtml(homePageError)}</p>` : ''}

    <div class="profile-stat-row" style="margin-bottom: var(--sp-6);">
      <div class="profile-stat-tile">
        <div class="profile-stat-top-row">
          <span class="stat-icon-gem">${icons.gem}</span>
          <span class="profile-stat-number">${points.toLocaleString()}</span>
        </div>
        <p class="lang-meta">points${pointsThisWeek > 0 ? ` &middot; +${pointsThisWeek} this week` : ''}</p>
      </div>
      <div class="profile-stat-tile">
        <div class="profile-stat-top-row">
          <span class="stat-icon-flame">${icons.flame}</span>
          <span class="profile-stat-number">${currentStreak}</span>
        </div>
        <p class="lang-meta">day streak${streakIncreasedToday ? ' &middot; +1 today' : ''}</p>
      </div>
      <div class="profile-stat-tile">
        <div class="profile-stat-top-row">
          <span class="stat-icon-topics">${icons.checkCircle}</span>
          <span class="profile-stat-number">${topicsCompletedTotal}</span>
        </div>
        <p class="lang-meta">lessons done</p>
      </div>
    </div>

    <div class="home-two-col-row">
      ${resumeCardHtml}
      <div class="profile-card">
        <p class="lang-name">This week</p>
        <p class="lang-meta" style="margin-bottom:1rem;">${daysPractisedThisWeek} of 7 days practised</p>
        <div class="home-week-row">${weekCalendarHtml}</div>
        <p class="lang-meta" style="margin-top:1rem;">Don't worry if you miss a day, a streak freeze can help you.</p>
      </div>
    </div>

    <div class="languages-section-header">
      <h2 class="goal-title" style="margin-bottom:0;">My languages</h2>
      <div class="filter-pill-row">
        <button type="button" class="filter-pill ${trackFilter === 'all' ? 'active' : ''}" data-track-filter="all">All</button>
        <button type="button" class="filter-pill ${
          trackFilter === 'in-progress' ? 'active' : ''
        }" data-track-filter="in-progress">In progress</button>
        <button type="button" class="filter-pill ${
          trackFilter === 'not-started' ? 'active' : ''
        }" data-track-filter="not-started">Not started</button>
      </div>
    </div>
    <div class="lang-grid">
      ${
        filteredTracks.map(renderHomeTrackTile).join('') ||
        '<p class="playground-output-placeholder">No languages match this filter.</p>'
      }
    </div>

    <div class="home-two-col-row">
      <div class="profile-card">
        <p class="lang-name">Quiz collection</p>
        <p class="lang-meta" style="margin-bottom:1rem;">Grouped by language, then by difficulty.</p>
        <p class="lang-meta" style="margin-bottom:1rem;">${quizSummary.totalTopics} quizzes across ${
          quizSummary.languagesCount
        } language${quizSummary.languagesCount === 1 ? '' : 's'} &middot; ${
          quizSummary.masteredCount
        } mastered</p>
        <button type="button" class="btn btn-secondary btn-sm" id="home-browse-quizzes">${
          icons.clipboardList
        } Browse quizzes</button>
      </div>
      <div class="profile-card">
        <p class="lang-name">Playground</p>
        <p class="lang-meta" style="margin-bottom:1rem;">Only lets you code in the languages you've added to your sidebar.</p>
        <p class="lang-meta" style="margin-bottom:1rem;">Good for practicing code without having to leave the website and go elsewhere to code.</p>
        <button type="button" class="btn btn-secondary btn-sm" id="home-open-editor">${
          icons.terminal
        } Open editor</button>
      </div>
    </div>
  `

  app.innerHTML = renderAppShell({ topLabel: 'Home', mainHtml })
  bindAppShell()

  const continueBtn = document.querySelector('#home-continue-cta')
  if (continueBtn && lastViewedTopic) {
    continueBtn.addEventListener('click', () =>
      openTopic(lastViewedTopic.language, lastViewedTopic.chapterSlug, lastViewedTopic.topicSlug)
    )
  }
  const resumeBtn = document.querySelector('#home-resume-btn')
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () =>
      openTopic(lastViewedTopic.language, lastViewedTopic.chapterSlug, lastViewedTopic.topicSlug)
    )
  }
  const browseTracksBtn = document.querySelector('#home-browse-tracks')
  if (browseTracksBtn) browseTracksBtn.addEventListener('click', goToLanguagesPage)
  document.querySelector('#home-browse-quizzes').addEventListener('click', goToQuizCollection)
  document.querySelector('#home-open-editor').addEventListener('click', goToPlayground)
  document.querySelectorAll('.home-track-tile').forEach((tile) => {
    tile.addEventListener('click', () => {
      const lang = tile.dataset.lang
      window.history.pushState({}, '', `/course/${encodeURIComponent(lang)}`)
      goToCourse({ name: 'course', language: lang })
    })
  })
  document.querySelectorAll('[data-track-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      trackFilter = btn.dataset.trackFilter
      render()
    })
  })
}

async function handleSavePreferences() {
  try {
    const { user: updatedUser } = await updateLanguages(selectedLanguages, selectedGoal)
    setUser(updatedUser)
    showToast('Preferences saved.', { icon: icons.check })
  } catch (err) {
    languagesPageError = err.message
  }
  render()
}

function renderLanguagesPage() {
  currentCourseLanguage = null

  const original = user.languagesToLearn
  const pendingAdds = selectedLanguages.filter((l) => !original.includes(l))
  const pendingRemoves = original.filter((l) => !selectedLanguages.includes(l))
  const hasChanges = pendingAdds.length > 0 || pendingRemoves.length > 0

  const totalTopics = SUPPORTED_LANGUAGES.filter((l) => selectedLanguages.includes(l.name)).reduce(
    (sum, l) => sum + l.topics,
    0
  )
  const progressPct = Math.round((selectedLanguages.length / SUPPORTED_LANGUAGES.length) * 100)

  const addedLangs = SUPPORTED_LANGUAGES.filter((l) => selectedLanguages.includes(l.name))
  const availableLangs = SUPPORTED_LANGUAGES.filter((l) => !selectedLanguages.includes(l.name))

  const renderLanguageTile = (lang, added) => `
    <button type="button" class="lang-tile language-page-tile ${
      added ? 'selected' : ''
    }" data-lang="${lang.name}" data-lang-name="${lang.name.toLowerCase()}">
      ${
        added
          ? `<span class="language-added-pill">${icons.check} Added</span>`
          : '<span class="lang-radio"></span>'
      }
      <span class="lang-glyph" style="background:${lang.color}">${lang.glyph}</span>
      <div class="lang-name">${lang.name}</div>
      <div class="lang-meta">${lang.chapters} chapters &middot; ${lang.topics} topics</div>
    </button>
  `

  const pendingChips = [
    ...pendingAdds.map(
      (l) =>
        `<span class="chip">+ ${l} <button type="button" class="chip-remove" data-lang="${l}">${icons.x}</button></span>`
    ),
    ...pendingRemoves.map(
      (l) =>
        `<span class="chip">&minus; ${l} <button type="button" class="chip-remove" data-lang="${l}">${icons.x}</button></span>`
    ),
  ].join('')

  const mainHtml = `
    <div class="languages-page-header">
      <div>
        <p class="eyebrow">YOUR LEARNING</p>
        <h1 class="onboarding-heading" style="margin-bottom:0.5rem;">Languages you're learning</h1>
        <p class="onboarding-subtext" style="max-width:60ch; margin-bottom:0;">Add a language and it shows up in your sidebar, chapters and all. Remove one and nothing gets deleted — it just stops showing until you bring it back.</p>
      </div>
      <div class="input-wrap languages-search-wrap">
        <span class="input-icon">${icons.search}</span>
        <input type="text" id="language-search" placeholder="Search languages" class="input input-with-icon languages-search-input" />
      </div>
    </div>

    ${languagesPageError ? `<p class="error-text">${escapeHtml(languagesPageError)}</p>` : ''}

    <div class="languages-summary-row">
      <span>${selectedLanguages.length} of ${SUPPORTED_LANGUAGES.length} languages</span>
      <span>${totalTopics} topics on your sidebar</span>
    </div>
    <div class="progress-track" style="margin-bottom: var(--sp-6);">
      <div class="progress-fill" style="width:${progressPct}%"></div>
    </div>

    <div class="languages-section-header">
      <h2 class="goal-title" style="margin-bottom:0;">On your sidebar</h2>
      <span class="languages-count-badge">${addedLangs.length}</span>
    </div>
    <div class="lang-grid" style="margin-bottom: var(--sp-6);">
      ${
        addedLangs.map((l) => renderLanguageTile(l, true)).join('') ||
        '<p class="playground-output-placeholder">No languages yet — add one below.</p>'
      }
    </div>

    <div class="languages-section-header">
      <h2 class="goal-title" style="margin-bottom:0;">Available to add</h2>
      <span class="languages-count-badge">${availableLangs.length}</span>
    </div>
    <div class="lang-grid" style="margin-bottom: var(--sp-6);">
      ${availableLangs.map((l) => renderLanguageTile(l, false)).join('')}
    </div>

    <div class="goal-card" style="margin-bottom: 6rem;">
      <p class="goal-title">Daily goal</p>
      <p class="goal-subtext">Sets how many topics keep your streak alive. Switch it any time.</p>
      <div class="goal-options">
        ${renderGoalOption('chill', 'Chill', '1 topic a day')}
        ${renderGoalOption('steady', 'Steady', '2 topics a day')}
        ${renderGoalOption('serious', 'Serious', '4 topics a day')}
      </div>
    </div>

    <div class="languages-pending-bar">
      <div class="chip-row">${
        pendingChips || '<span class="languages-no-changes">No changes yet.</span>'
      }</div>
      <div class="languages-pending-actions">
        <button type="button" class="pill-link" id="languages-reset" ${hasChanges ? '' : 'disabled'}>Reset</button>
        <button type="button" class="btn btn-primary btn-sm" id="languages-save" ${
          hasChanges ? '' : 'disabled'
        }>${icons.check} Save languages</button>
      </div>
    </div>
  `

  app.innerHTML = renderAppShell({ topLabel: 'Home', mainHtml })
  bindAppShell()

  function toggleLanguage(lang) {
    selectedLanguages = selectedLanguages.includes(lang)
      ? selectedLanguages.filter((l) => l !== lang)
      : [...selectedLanguages, lang]
    render()
  }

  document.querySelectorAll('.language-page-tile').forEach((btn) => {
    btn.addEventListener('click', () => toggleLanguage(btn.dataset.lang))
  })
  document.querySelectorAll('.chip-remove').forEach((btn) => {
    btn.addEventListener('click', () => toggleLanguage(btn.dataset.lang))
  })
  document.querySelectorAll('input[name="dailyGoal"]').forEach((radio) => {
    radio.addEventListener('change', (e) => {
      selectedGoal = e.target.value
      render()
    })
  })
  document.querySelector('#languages-reset').addEventListener('click', () => {
    selectedLanguages = [...user.languagesToLearn]
    render()
  })
  document.querySelector('#languages-save').addEventListener('click', handleSavePreferences)
  document.querySelector('#language-search').addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase()
    document.querySelectorAll('.language-page-tile').forEach((tile) => {
      tile.style.display = tile.dataset.langName.includes(q) ? '' : 'none'
    })
  })
}

// ---- Quiz collection ----

function quizCollectionDataReady() {
  return selectedLanguages.every((lang) => chaptersByLanguage[lang] && quizProgressByLanguage[lang])
}

async function loadQuizCollectionData() {
  await Promise.all(
    selectedLanguages.map(async (lang) => {
      if (!chaptersByLanguage[lang]) {
        try {
          const { chapters } = await fetchChapters(lang)
          chaptersByLanguage[lang] = chapters
        } catch {
          chaptersByLanguage[lang] = []
        }
      }
      if (!quizProgressByLanguage[lang]) {
        try {
          const { progress } = await fetchQuizProgress(lang)
          quizProgressByLanguage[lang] = progress
        } catch {
          quizProgressByLanguage[lang] = {}
        }
      }
    })
  )
  render()
}

function renderQuizCollectionPage() {
  currentCourseLanguage = null

  if (!quizCollectionDataReady()) {
    app.innerHTML = renderAppShell({ topLabel: 'Quiz collection', mainHtml: '<p>Loading…</p>' })
    bindAppShell()
    loadQuizCollectionData()
    return
  }

  let totalTopics = 0
  let practicedTopics = 0
  selectedLanguages.forEach((lang) => {
    ;(chaptersByLanguage[lang] || []).forEach((chapter) => {
      totalTopics += chapter.topics.length
    })
    practicedTopics += Object.keys(quizProgressByLanguage[lang] || {}).length
  })

  const languageFilterPills = ['all', ...selectedLanguages]
    .map((lang) => {
      const active = quizLanguageFilter === lang
      return `<button type="button" class="filter-pill ${active ? 'active' : ''}" data-lang-filter="${lang}">${
        lang === 'all' ? 'All languages' : lang
      }</button>`
    })
    .join('')

  const languagesToShow = quizLanguageFilter === 'all' ? selectedLanguages : [quizLanguageFilter]

  const sectionsHtml = languagesToShow
    .map((lang) => {
      const langMeta = SUPPORTED_LANGUAGES.find((l) => l.name === lang)
      const chapters = chaptersByLanguage[lang] || []
      const progress = quizProgressByLanguage[lang] || {}

      const cardsHtml = chapters
        .flatMap((chapter) => chapter.topics.map((topic) => ({ chapter, topic })))
        .map(({ chapter, topic }) => {
          const status = progress[`${chapter.slug}/${topic.slug}`]
          const statusClass = !status ? '' : status.mastered ? 'mastered' : 'in-progress'
          const statusLabel = !status ? 'Not started' : status.mastered ? 'Mastered' : `In progress · ${status.currentBand}`
          const buttonLabel = !status ? 'Start practicing' : 'Continue practicing'
          return `
            <div class="quiz-topic-card" data-topic-title="${topic.title.toLowerCase()}">
              <span class="quiz-topic-status-pill ${statusClass}">${statusLabel}</span>
              <p class="quiz-topic-title">${topic.title}</p>
              <p class="quiz-topic-chapter">${chapter.title}</p>
              <button type="button" class="btn btn-primary btn-sm quiz-topic-start" data-lang="${lang}" data-chapter="${chapter.slug}" data-topic="${topic.slug}">${buttonLabel} ${icons.arrowRight}</button>
            </div>
          `
        })
        .join('')

      if (!cardsHtml) return ''

      return `
        <div class="quiz-language-section">
          <div class="quiz-language-header">
            <span class="lang-glyph" style="background:${langMeta.color}">${langMeta.glyph}</span>
            <span class="quiz-language-name">${lang}</span>
          </div>
          <div class="quiz-topic-grid">${cardsHtml}</div>
        </div>
      `
    })
    .join('')

  const mainHtml = `
    <div class="languages-page-header">
      <div>
        <p class="eyebrow">QUIZ COLLECTION</p>
        <h1 class="onboarding-heading" style="margin-bottom:0.5rem;">Test what stuck.</h1>
        <p class="onboarding-subtext" style="max-width:60ch; margin-bottom:0;">Question difficulty increases when you're doing well, and decreases when you're not. Points are only stored once you've answered all 10 questions in the quiz.</p>
      </div>
      <div class="input-wrap languages-search-wrap">
        <span class="input-icon">${icons.search}</span>
        <input type="text" id="quiz-search" placeholder="Search topics" class="input input-with-icon languages-search-input" />
      </div>
    </div>

    <div class="quiz-summary-row">
      <div class="quiz-summary-stat">
        <span class="quiz-summary-value">${practicedTopics} / ${totalTopics}</span>
        <span class="quiz-summary-label">topics practiced</span>
      </div>
      <div class="quiz-summary-stat">
        <span class="quiz-summary-value">${user.points.toLocaleString()}</span>
        <span class="quiz-summary-label">points banked</span>
      </div>
    </div>

    <div class="filter-pill-row">${languageFilterPills}</div>

    ${sectionsHtml || '<p class="playground-output-placeholder">No topics yet for your selected languages.</p>'}
  `

  app.innerHTML = renderAppShell({ topLabel: 'Quiz collection', mainHtml })
  bindAppShell()

  document.querySelectorAll('[data-lang-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      quizLanguageFilter = btn.dataset.langFilter
      render()
    })
  })
  document.querySelectorAll('.quiz-topic-start').forEach((btn) => {
    btn.addEventListener('click', () => {
      goToQuizSession(btn.dataset.lang, btn.dataset.chapter, btn.dataset.topic)
    })
  })
  const searchInput = document.querySelector('#quiz-search')
  searchInput.value = quizSearch
  searchInput.addEventListener('input', (e) => {
    quizSearch = e.target.value
    const q = quizSearch.trim().toLowerCase()
    document.querySelectorAll('.quiz-topic-card').forEach((card) => {
      card.style.display = card.dataset.topicTitle.includes(q) ? '' : 'none'
    })
  })
}

// ---- Lecturer Materials (Phase 11) ----

function materialTypeMeta(type) {
  return MATERIAL_TYPES.find((t) => t.value === type) || MATERIAL_TYPES[0]
}

function relativeTimeFromNow(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays <= 0) return 'today'
  if (diffDays === 1) return 'yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  const diffWeeks = Math.floor(diffDays / 7)
  if (diffWeeks < 5) return `${diffWeeks} week${diffWeeks === 1 ? '' : 's'} ago`
  return new Date(dateStr).toLocaleDateString()
}

function studioDataReady() {
  return studioData !== null
}

async function loadStudioData() {
  studioLoading = true
  studioError = ''
  try {
    studioData = await fetchStudio()
  } catch (err) {
    studioError = err.message
    studioData = { lecturerVerified: false, name: user.name, university: user.university, stats: { publishedCount: 0, draftCount: 0 }, materials: [] }
  }
  studioLoading = false
  render()
}

function renderStudioPage() {
  if (!studioDataReady()) {
    app.innerHTML = renderAppShell({ topLabel: 'Studio', mainHtml: '<p>Loading…</p>' })
    bindAppShell()
    if (!studioLoading) loadStudioData()
    return
  }

  const { stats, materials } = studioData

  const summarySentence = `${stats.publishedCount} published material${
    stats.publishedCount === 1 ? '' : 's'
  }. ${stats.draftCount} draft${stats.draftCount === 1 ? ' is' : 's are'} still unpublished.`

  const filteredMaterials =
    studioFilter === 'all' ? materials : materials.filter((m) => m.status === studioFilter)

  const materialsHtml = filteredMaterials
    .map((m) => {
      const typeMeta = materialTypeMeta(m.type)
      return `
        <div class="profile-card material-row">
          <span class="material-type-icon">${icons[typeMeta.iconKey] || icons.file}</span>
          <div style="flex:1; min-width:0;">
            <p class="lang-name" style="margin-bottom:0.15rem;">${escapeHtml(m.title)}</p>
            <p class="lang-meta">${typeMeta.label} &middot; ${relativeTimeFromNow(m.updatedAt)}</p>
          </div>
          ${m.status === 'draft' ? '<span class="material-draft-badge">Draft</span>' : ''}
          <button type="button" class="icon-btn material-edit-btn" data-material-edit="${m.id}" title="Edit">${icons.pencil}</button>
          ${
            m.status === 'published'
              ? `<button type="button" class="icon-btn material-edit-btn" data-material-unpublish="${m.id}" title="Unpublish">${icons.eyeOff}</button>`
              : ''
          }
          <button type="button" class="icon-btn material-edit-btn" data-material-delete="${m.id}" title="Delete">${icons.x}</button>
        </div>
      `
    })
    .join('')

  const mainHtml = `
    <div class="languages-page-header">
      <div>
        <p class="eyebrow">LECTURER STUDIO</p>
        <h1 class="onboarding-heading" style="margin-bottom:0.5rem;">Good ${getGreetingWord().toLowerCase()}, ${escapeHtml(
          user.name
        )}.</h1>
        <p class="onboarding-subtext" style="max-width:65ch; margin-bottom:0;">${summarySentence}</p>
      </div>
      <button type="button" class="btn btn-primary btn-sm" id="studio-new-material">${icons.plus} New material</button>
    </div>

    ${studioError ? `<p class="error-text">${escapeHtml(studioError)}</p>` : ''}

    <div class="profile-stat-row" style="margin-bottom: var(--sp-6);">
      <div class="profile-stat-tile">
        <div class="profile-stat-top-row">
          <span class="stat-icon-topics">${icons.checkCircle}</span>
          <span class="profile-stat-number">${stats.publishedCount}</span>
        </div>
        <p class="lang-meta">published materials</p>
      </div>
      <div class="profile-stat-tile">
        <div class="profile-stat-top-row">
          <span class="stat-icon-draft">${icons.clock}</span>
          <span class="profile-stat-number">${stats.draftCount}</span>
        </div>
        <p class="lang-meta">drafts unpublished</p>
      </div>
    </div>

    <div class="languages-section-header">
      <h2 class="goal-title" style="margin-bottom:0;">Your materials</h2>
      <div class="filter-pill-row">
        <button type="button" class="filter-pill ${studioFilter === 'all' ? 'active' : ''}" data-studio-filter="all">All ${materials.length}</button>
        <button type="button" class="filter-pill ${studioFilter === 'published' ? 'active' : ''}" data-studio-filter="published">Published ${stats.publishedCount}</button>
        <button type="button" class="filter-pill ${studioFilter === 'draft' ? 'active' : ''}" data-studio-filter="draft">Drafts ${stats.draftCount}</button>
      </div>
    </div>
    <div class="material-row-list">
      ${materialsHtml || '<p class="playground-output-placeholder">No materials yet — create your first one.</p>'}
    </div>

    <div class="profile-card" style="margin-top: var(--sp-6);">
      <p class="lang-name" style="margin-bottom:0.15rem;">Posting as ${escapeHtml(user.name)}</p>
      <p class="lang-meta">${escapeHtml(user.university || 'No institution on file')}. Your name and institution appear on everything you post.</p>
    </div>
  `

  app.innerHTML = renderAppShell({ topLabel: 'Studio', mainHtml })
  bindAppShell()

  document.querySelector('#studio-new-material').addEventListener('click', goToNewMaterialPage)
  document.querySelectorAll('[data-studio-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      studioFilter = btn.dataset.studioFilter
      render()
    })
  })
  document.querySelectorAll('[data-material-edit]').forEach((btn) => {
    btn.addEventListener('click', () => goToEditMaterialPage(btn.dataset.materialEdit))
  })
  document.querySelectorAll('[data-material-unpublish]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        await unpublishMaterial(btn.dataset.materialUnpublish)
        studioData = null
        showToast('Material unpublished.')
        render()
      } catch (err) {
        showErrorToast(err.message)
      }
    })
  })
  document.querySelectorAll('[data-material-delete]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!window.confirm('Delete this material? This cannot be undone.')) return
      try {
        await deleteMaterial(btn.dataset.materialDelete)
        studioData = null
        showToast('Material deleted.')
        render()
      } catch (err) {
        showErrorToast(err.message)
      }
    })
  })
}

async function loadMaterialForEdit(id) {
  materialFormLoading = true
  materialFormError = ''
  try {
    const { material } = await fetchOwnMaterial(id)
    materialFormEditId = material._id
    materialFormType = material.type
    materialFormTitle = material.title
    materialFormContent = material.content || ''
    materialFormExternalUrl = material.externalUrl || ''
    materialFormLanguage = material.language
  } catch (err) {
    materialFormError = err.message
  }
  materialFormLoading = false
  render()
}

function renderNewMaterialPage(editId = null) {
  if (editId && materialFormEditId !== editId && !materialFormLoading) {
    loadMaterialForEdit(editId)
  }
  if (editId && (materialFormLoading || materialFormEditId !== editId)) {
    app.innerHTML = renderAppShell({ topLabel: 'Edit material', mainHtml: '<p>Loading…</p>' })
    bindAppShell()
    return
  }

  const typeMeta = materialTypeMeta(materialFormType)
  const languageOptions = ['General', ...LANGUAGE_NAMES]
    .map((lang) => `<option value="${lang}" ${materialFormLanguage === lang ? 'selected' : ''}>${lang}</option>`)
    .join('')

  const typePillsHtml = MATERIAL_TYPES.map(
    (t) => `
      <button type="button" class="filter-pill ${materialFormType === t.value ? 'active' : ''}" data-material-type="${t.value}">${
        icons[t.iconKey] || ''
      } ${t.label}</button>
    `
  ).join('')

  const contentFieldHtml =
    typeMeta.contentKind === 'markdown'
      ? `
        <div>
          <label class="field-label" for="material-content">Content (Markdown)</label>
          <textarea id="material-content" class="input" rows="12" placeholder="${
            materialFormType === 'code' ? 'Explain the example, then drop in a fenced code block:\n\n```js\nconsole.log(\'hello\')\n```' : 'Write your notes in Markdown…'
          }">${escapeHtml(materialFormContent)}</textarea>
        </div>
      `
      : `
        <div>
          <label class="field-label" for="material-url">${
            materialFormType === 'video' ? 'Video link (YouTube, Vimeo, etc.)' : 'Slides link (Google Slides, Drive, etc.)'
          }</label>
          <input id="material-url" type="url" class="input" placeholder="https://…" value="${escapeHtml(materialFormExternalUrl)}" />
        </div>
      `

  const publishDisabled = !user.lecturerVerified
  const mainHtml = `
    <p class="eyebrow">${editId ? 'EDIT MATERIAL' : 'NEW MATERIAL'}</p>
    <h1 class="onboarding-heading" style="margin-bottom:1rem;">${editId ? 'Edit your material' : 'Create a new material'}</h1>

    ${materialFormError ? `<p class="error-text">${escapeHtml(materialFormError)}</p>` : ''}

    <div class="form-card" style="max-width:640px;">
      <label class="field-label">Type</label>
      <div class="filter-pill-row" style="margin-bottom:1rem;">${typePillsHtml}</div>

      <div style="margin-bottom:1rem;">
        <label class="field-label" for="material-title">Title</label>
        <input id="material-title" type="text" class="input" placeholder="e.g. Closures, explained with the counter you already wrote" value="${escapeHtml(
          materialFormTitle
        )}" />
      </div>

      <div style="margin-bottom:1rem;">${contentFieldHtml}</div>

      <div style="margin-bottom:1.25rem;">
        <label class="field-label" for="material-language">Language (optional)</label>
        <select id="material-language" class="input">${languageOptions}</select>
      </div>

      <div style="display:flex; gap:0.6rem; flex-wrap:wrap; align-items:center;">
        <button type="button" class="btn btn-secondary" id="material-save-draft">Save as draft</button>
        <button type="button" class="btn btn-primary" id="material-publish" ${
          publishDisabled ? 'disabled title="Your lecturer account isn\'t verified yet — publishing is disabled until then."' : ''
        }>Publish</button>
        ${publishDisabled ? '<span class="lang-meta">Publishing unlocks once your lecturer account is verified.</span>' : ''}
      </div>
    </div>
  `

  app.innerHTML = renderAppShell({ topLabel: editId ? 'Edit material' : 'New material', mainHtml })
  bindAppShell()

  document.querySelectorAll('[data-material-type]').forEach((btn) => {
    btn.addEventListener('click', () => {
      materialFormType = btn.dataset.materialType
      render()
    })
  })

  function readFormIntoState() {
    materialFormTitle = document.querySelector('#material-title').value
    const contentEl = document.querySelector('#material-content')
    const urlEl = document.querySelector('#material-url')
    if (contentEl) materialFormContent = contentEl.value
    if (urlEl) materialFormExternalUrl = urlEl.value
    materialFormLanguage = document.querySelector('#material-language').value
  }

  async function saveMaterial({ publish }) {
    if (materialFormSaving) return
    readFormIntoState()
    if (!materialFormTitle.trim()) {
      materialFormError = 'title is required'
      render()
      return
    }
    materialFormSaving = true
    materialFormError = ''
    render()
    try {
      const fields = {
        type: materialFormType,
        title: materialFormTitle,
        language: materialFormLanguage,
        content: typeMeta.contentKind === 'markdown' ? materialFormContent : undefined,
        externalUrl: typeMeta.contentKind === 'url' ? materialFormExternalUrl : undefined,
      }
      let id = materialFormEditId
      if (id) {
        await updateMaterial(id, fields)
      } else {
        const { material } = await createMaterial(fields)
        id = material._id
        materialFormEditId = id
      }
      if (publish) await publishMaterial(id)
      studioData = null // force a refetch so Studio shows the new/updated material
      showToast(publish ? 'Material published.' : 'Draft saved.')
      goToStudio()
    } catch (err) {
      materialFormError = err.message
      materialFormSaving = false
      render()
    }
  }

  document.querySelector('#material-save-draft').addEventListener('click', () => saveMaterial({ publish: false }))
  const publishBtn = document.querySelector('#material-publish')
  if (!publishDisabled) {
    publishBtn.addEventListener('click', () => saveMaterial({ publish: true }))
  }
}

function libraryDataReady() {
  return libraryData !== null
}

async function loadLibraryData() {
  libraryLoading = true
  libraryError = ''
  try {
    libraryData = await fetchLibrary(libraryTypeFilter, libraryLanguageFilter)
  } catch (err) {
    libraryError = err.message
    libraryData = { materials: [] }
  }
  libraryLoading = false
  render()
}

function renderBrowseLibraryPage() {
  if (!libraryDataReady()) {
    app.innerHTML = renderAppShell({ topLabel: 'Browse library', mainHtml: '<p>Loading…</p>' })
    bindAppShell()
    if (!libraryLoading) loadLibraryData()
    return
  }

  const { materials } = libraryData

  const typePillsHtml = ['all', ...MATERIAL_TYPES.map((t) => t.value)]
    .map((value) => {
      const label = value === 'all' ? 'All types' : materialTypeMeta(value).label
      return `<button type="button" class="filter-pill ${
        libraryTypeFilter === value ? 'active' : ''
      }" data-library-type-filter="${value}">${label}</button>`
    })
    .join('')

  const languageOptions = ['all', 'General', ...LANGUAGE_NAMES]
    .map(
      (lang) =>
        `<option value="${lang}" ${libraryLanguageFilter === lang ? 'selected' : ''}>${
          lang === 'all' ? 'All languages' : lang
        }</option>`
    )
    .join('')

  const cardsHtml = materials
    .map((m) => {
      const typeMeta = materialTypeMeta(m.type)
      return `
        <button type="button" class="profile-card material-row" data-library-item="${m.id}" style="text-align:left; width:100%; cursor:pointer;">
          <span class="material-type-icon">${icons[typeMeta.iconKey] || icons.file}</span>
          <div style="flex:1; min-width:0;">
            <p class="lang-name" style="margin-bottom:0.15rem;">${escapeHtml(m.title)}</p>
            <p class="lang-meta">${escapeHtml(m.authorName)}${
              m.authorUniversity ? ` &middot; ${escapeHtml(m.authorUniversity)}` : ''
            } &middot; ${m.language}</p>
          </div>
        </button>
      `
    })
    .join('')

  const mainHtml = `
    <div class="languages-page-header">
      <div>
        <p class="eyebrow">BROWSE LIBRARY</p>
        <h1 class="onboarding-heading" style="margin-bottom:0.5rem;">Materials from your lecturers.</h1>
        <p class="onboarding-subtext" style="max-width:60ch; margin-bottom:0;">Notes, code examples, slides, and videos posted by verified lecturers.</p>
      </div>
      <select id="library-language-filter" class="input" style="max-width:200px;">${languageOptions}</select>
    </div>

    ${libraryError ? `<p class="error-text">${escapeHtml(libraryError)}</p>` : ''}

    <div class="filter-pill-row">${typePillsHtml}</div>

    <div class="material-row-list">
      ${cardsHtml || '<p class="playground-output-placeholder">No materials match this filter yet.</p>'}
    </div>
  `

  app.innerHTML = renderAppShell({ topLabel: 'Browse library', mainHtml })
  bindAppShell()

  document.querySelectorAll('[data-library-type-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      libraryTypeFilter = btn.dataset.libraryTypeFilter
      libraryData = null
      render()
    })
  })
  document.querySelector('#library-language-filter').addEventListener('change', (e) => {
    libraryLanguageFilter = e.target.value
    libraryData = null
    render()
  })
  document.querySelectorAll('[data-library-item]').forEach((btn) => {
    btn.addEventListener('click', () => goToLibraryItem(btn.dataset.libraryItem))
  })
}

async function loadLibraryMaterial(id) {
  libraryMaterialLoading = true
  libraryMaterialError = ''
  try {
    const { material } = await fetchLibraryMaterial(id)
    libraryMaterialData = material
  } catch (err) {
    libraryMaterialError = err.message
    libraryMaterialData = null
  }
  libraryMaterialLoading = false
  render()
}

function renderMaterialDetailPage(id) {
  if (!libraryMaterialData || libraryMaterialData.id !== id) {
    app.innerHTML = renderAppShell({ topLabel: 'Material', mainHtml: '<p>Loading…</p>' })
    bindAppShell()
    if (!libraryMaterialLoading) loadLibraryMaterial(id)
    return
  }

  const m = libraryMaterialData
  const typeMeta = materialTypeMeta(m.type)

  const bodyHtml =
    typeMeta.contentKind === 'markdown'
      ? `<div class="prose">${DOMPurify.sanitize(marked.parse(m.content || ''))}</div>`
      : `
        <div class="profile-card">
          <p class="lang-meta" style="margin-bottom:1rem;">${
            m.type === 'video' ? 'This material is a video hosted externally.' : 'This material is a slide deck hosted externally.'
          }</p>
          <a href="${escapeHtml(m.externalUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">${
            icons[typeMeta.iconKey] || ''
          } Open ${typeMeta.label.toLowerCase()} ${icons.arrowRight}</a>
        </div>
      `

  const mainHtml = `
    ${libraryMaterialError ? `<p class="error-text">${escapeHtml(libraryMaterialError)}</p>` : ''}
    <p class="eyebrow">${typeMeta.label.toUpperCase()} &middot; ${escapeHtml(m.language)}</p>
    <h1 class="onboarding-heading" style="margin-bottom:0.25rem;">${escapeHtml(m.title)}</h1>
    <p class="lang-meta" style="margin-bottom:1.5rem;">${escapeHtml(m.authorName)}${
      m.authorUniversity ? ` &middot; ${escapeHtml(m.authorUniversity)}` : ''
    }</p>
    ${bodyHtml}
  `

  app.innerHTML = renderAppShell({ topLabel: 'Material', mainHtml })
  bindAppShell()
}

// ---- Rankings (leaderboard) ----

const RANKING_METRICS = [
  { id: 'points', label: 'Points', icon: icons.gem },
  { id: 'streaks', label: 'Streaks', icon: icons.flame },
  { id: 'quizzes', label: 'Quizzes done', icon: icons.clipboardList },
]
const RANKING_PERIODS = [
  { id: 'week', label: 'This week' },
  { id: 'month', label: 'This month' },
  { id: 'all', label: 'All time' },
]

async function loadRankingsData() {
  rankingsLoading = true
  rankingsError = ''
  render()
  try {
    rankingsData = await fetchLeaderboard(rankingsMetric, rankingsPeriod)
  } catch (err) {
    rankingsError = err.message
  }
  rankingsLoading = false
  render()
}

function setRankingsMetric(metric) {
  if (metric === rankingsMetric) return
  rankingsMetric = metric
  loadRankingsData()
}

function setRankingsPeriod(period) {
  if (period === rankingsPeriod) return
  rankingsPeriod = period
  loadRankingsData()
}

function renderRankingsRow(entry) {
  const handle = `@${entry.name.toLowerCase().replace(/\s+/g, '')}`
  const avatarUser = {
    name: entry.name,
    avatarSeed: entry.avatarSeed,
    avatarStyle: entry.avatarStyle,
    equippedCosmetics: { border: { value: entry.borderColor } },
  }
  return `
    <div class="leaderboard-row ${entry.isMe ? 'me' : ''}">
      <span class="leaderboard-rank">${entry.rank <= 3 ? `#${entry.rank}` : entry.rank}</span>
      <div class="leaderboard-learner">
        ${renderAvatar(avatarUser, { size: 34 })}
        <div class="leaderboard-learner-info">
          <span class="leaderboard-learner-name">${escapeHtml(entry.name)}${
    entry.isMe ? '<span class="leaderboard-you-pill">You</span>' : ''
  }</span>
          <span class="leaderboard-learner-handle">${escapeHtml(handle)}</span>
        </div>
      </div>
      <span class="leaderboard-col leaderboard-streak"><span class="stat-icon-flame">${icons.flame}</span>${entry.streak}</span>
      <span class="leaderboard-col leaderboard-quizzes"><span class="stat-icon-quiz">${icons.clipboardList}</span>${entry.quizzesFinished}</span>
      <span class="leaderboard-col leaderboard-points"><span class="stat-icon-gem">${icons.gem}</span>${entry.points.toLocaleString()}</span>
    </div>
  `
}

function renderRankingsPage() {
  currentCourseLanguage = null

  if (!rankingsData && !rankingsLoading && !rankingsError) {
    loadRankingsData()
  }

  const metricPills = RANKING_METRICS.map(
    (m) =>
      `<button type="button" class="segmented-option ${
        rankingsMetric === m.id ? 'active' : ''
      }" data-ranking-metric="${m.id}">${m.icon} ${m.label}</button>`
  ).join('')

  const periodPills = RANKING_PERIODS.map(
    (p) =>
      `<button type="button" class="segmented-option ${
        rankingsPeriod === p.id ? 'active' : ''
      }" data-ranking-period="${p.id}">${p.label}</button>`
  ).join('')

  let bodyHtml
  if (rankingsError) {
    bodyHtml = `<p class="error-text">${escapeHtml(rankingsError)}</p>`
  } else if (rankingsLoading || !rankingsData) {
    bodyHtml = '<p>Loading…</p>'
  } else {
    const me = rankingsData.me
    const periodLabel = RANKING_PERIODS.find((p) => p.id === rankingsPeriod)?.label.toLowerCase() || 'this period'

    bodyHtml = `
      <div class="cosmetics-stats-row">
        <div class="profile-card cosmetics-stat-card">
          <div>
            <p class="quiz-summary-value">${me ? `#${me.rank}` : '—'}</p>
            <p class="quiz-summary-label">my rank</p>
          </div>
        </div>
        <div class="profile-card cosmetics-stat-card">
          <div>
            <p class="quiz-summary-value">${(me?.points ?? 0).toLocaleString()}</p>
            <p class="quiz-summary-label">points ${periodLabel}</p>
          </div>
        </div>
        <div class="profile-card cosmetics-stat-card">
          <div>
            <p class="quiz-summary-value">${me?.quizzesFinished ?? 0}</p>
            <p class="quiz-summary-label">quizzes finished</p>
          </div>
        </div>
      </div>

      <div class="segmented-row">
        <div class="segmented-control">${metricPills}</div>
        <div class="segmented-control">${periodPills}</div>
      </div>

      <div class="leaderboard-table">
        <div class="leaderboard-row leaderboard-head">
          <span class="leaderboard-rank">#</span>
          <span class="leaderboard-learner">Learner</span>
          <span class="leaderboard-col">Streak</span>
          <span class="leaderboard-col">Quizzes</span>
          <span class="leaderboard-col">Points</span>
        </div>
        ${rankingsData.leaderboard.map(renderRankingsRow).join('')}
      </div>
    `
  }

  const mainHtml = `
    <div class="languages-page-header">
      <div>
        <p class="eyebrow">RANKINGS</p>
        <h1 class="onboarding-heading" style="margin-bottom:0.5rem;">Where you stand.</h1>
        <p class="onboarding-subtext" style="max-width:60ch; margin-bottom:0;">Pick a metric and a time period below. You're ranked against everyone on the platform.</p>
      </div>
    </div>
    ${bodyHtml}
  `

  app.innerHTML = renderAppShell({ topLabel: 'Rankings', mainHtml })
  bindAppShell()

  document.querySelectorAll('[data-ranking-metric]').forEach((btn) => {
    btn.addEventListener('click', () => setRankingsMetric(btn.dataset.rankingMetric))
  })
  document.querySelectorAll('[data-ranking-period]').forEach((btn) => {
    btn.addEventListener('click', () => setRankingsPeriod(btn.dataset.rankingPeriod))
  })
}

// ---- Quiz session (the adaptive quiz-taking page) ----

async function startQuizSession(route) {
  quizRoute = route
  quizQuestion = null
  quizSessionInfo = null
  quizSelectedChoice = null
  quizAnswerResult = null
  quizHint = null
  quizRoundComplete = null
  quizError = ''
  quizLoading = true
  render()

  try {
    const { question, session } = await fetchNextQuestion(route.language, route.chapterSlug, route.topicSlug)
    quizQuestion = question
    quizSessionInfo = session
  } catch (err) {
    quizError = err.message
  }
  quizLoading = false
  render()
}

function startNewRound() {
  quizRoundComplete = null
  startQuizSession(quizRoute)
}

async function checkQuizAnswer() {
  if (quizSelectedChoice === null) return
  try {
    const result = await submitQuizAnswer(
      quizRoute.language,
      quizRoute.chapterSlug,
      quizRoute.topicSlug,
      quizQuestion.id,
      quizSelectedChoice
    )
    quizAnswerResult = result
    quizSessionInfo = result.session

    const progressKey = `${quizRoute.chapterSlug}/${quizRoute.topicSlug}`
    if (quizProgressByLanguage[quizRoute.language]) {
      quizProgressByLanguage[quizRoute.language][progressKey] = {
        currentBand: result.session.currentBand,
        mastered: result.session.currentBand === 'hard',
      }
    }

    if (result.roundComplete) {
      quizRoundComplete = { bankedPoints: result.bankedPoints, totalPoints: result.totalPoints }
      if (result.totalPoints !== undefined) user.points = result.totalPoints
    }
  } catch (err) {
    quizError = err.message
  }
  render()
}

async function requestQuizHintForCurrentQuestion() {
  try {
    const { hint, session } = await fetchQuizHint(
      quizRoute.language,
      quizRoute.chapterSlug,
      quizRoute.topicSlug,
      quizQuestion.id
    )
    quizHint = hint
    quizSessionInfo = session
  } catch (err) {
    quizError = err.message
  }
  render()
}

function advanceToNextQuizQuestion() {
  startQuizSession(quizRoute)
}

function renderQuizQuestion() {
  const checked = !!quizAnswerResult
  const [firstLine, ...codeLines] = quizQuestion.questionText.split('\n')
  const codeBlock = codeLines.length > 0 ? `<pre class="quiz-code-block">${escapeHtml(codeLines.join('\n'))}</pre>` : ''

  const choicesHtml = quizQuestion.choices
    .map((choice, i) => {
      let cls = 'quiz-choice'
      if (checked) {
        if (i === quizAnswerResult.correctChoice) cls += ' correct'
        else if (i === quizSelectedChoice) cls += ' incorrect'
      } else if (i === quizSelectedChoice) {
        cls += ' selected'
      }
      return `
        <button type="button" class="${cls}" data-choice="${i}" ${checked ? 'disabled' : ''}>
          <span class="quiz-choice-letter">${String.fromCharCode(65 + i)}</span>
          <span class="quiz-choice-text">${escapeHtml(choice)}</span>
        </button>
      `
    })
    .join('')

  const chapter = chaptersByLanguage[quizRoute.language]?.find((c) => c.slug === quizRoute.chapterSlug)

  return `
    <p class="eyebrow">${quizRoute.language.toUpperCase()} &middot; ${(chapter?.title || '').toUpperCase()}</p>
    <h2 class="quiz-question-text">${escapeHtml(firstLine)}</h2>
    ${codeBlock}
    <div class="quiz-choices">${choicesHtml}</div>
    ${
      checked
        ? `<div class="quiz-explanation ${quizAnswerResult.correct ? 'correct' : 'incorrect'}">
             <p class="quiz-explanation-label">${quizAnswerResult.correct ? 'Correct' : 'Not quite'}</p>
             <p>${escapeHtml(quizAnswerResult.explanation)}</p>
           </div>`
        : ''
    }
    ${quizHint ? `<div class="quiz-hint-box">${icons.lightbulb}<span>${escapeHtml(quizHint)}</span></div>` : ''}
    <div class="quiz-footer">
      ${
        !checked
          ? `<button type="button" class="pill-link" id="quiz-hint-btn" ${quizHint ? 'disabled' : ''}>${icons.lightbulb} Hint</button>`
          : '<span></span>'
      }
      ${
        checked
          ? `<button type="button" class="btn btn-primary" id="quiz-next-btn">Next question ${icons.arrowRight}</button>`
          : `<button type="button" class="btn btn-primary" id="quiz-check-btn" ${
              quizSelectedChoice === null ? 'disabled' : ''
            }>Check answer</button>`
      }
    </div>
  `
}

function bindQuizQuestion() {
  document.querySelectorAll('.quiz-choice').forEach((btn) => {
    btn.addEventListener('click', () => {
      quizSelectedChoice = Number(btn.dataset.choice)
      render()
    })
  })
  const hintBtn = document.querySelector('#quiz-hint-btn')
  if (hintBtn) hintBtn.addEventListener('click', requestQuizHintForCurrentQuestion)
  const checkBtn = document.querySelector('#quiz-check-btn')
  if (checkBtn) checkBtn.addEventListener('click', checkQuizAnswer)
  const nextBtn = document.querySelector('#quiz-next-btn')
  if (nextBtn) nextBtn.addEventListener('click', advanceToNextQuizQuestion)
}

function renderQuizRoundComplete() {
  return `
    <div class="quiz-round-complete">
      <p class="quiz-round-complete-label">Round complete</p>
      <p class="quiz-round-complete-points">+${quizRoundComplete.bankedPoints} pts</p>
      <p class="quiz-round-complete-total">${quizRoundComplete.totalPoints.toLocaleString()} points total</p>
      <div class="quiz-round-complete-actions">
        <button type="button" class="btn btn-secondary btn-sm" id="quiz-back-to-collection">Back to Quiz collection</button>
        <button type="button" class="btn btn-primary" id="quiz-practice-again">Practice again ${icons.arrowRight}</button>
      </div>
    </div>
  `
}

function bindQuizRoundComplete() {
  document.querySelector('#quiz-back-to-collection').addEventListener('click', goToQuizCollection)
  document.querySelector('#quiz-practice-again').addEventListener('click', startNewRound)
}

function renderQuizSessionPage(route) {
  const routeMatches =
    quizRoute &&
    quizRoute.language === route.language &&
    quizRoute.chapterSlug === route.chapterSlug &&
    quizRoute.topicSlug === route.topicSlug

  if (!routeMatches) {
    app.innerHTML = renderAppShell({ topLabel: 'Quiz collection', mainHtml: '<p>Loading…</p>' })
    bindAppShell()
    if (!quizLoading) startQuizSession(route)
    return
  }

  if (quizError) {
    const mainHtml = `<p class="error-text">${escapeHtml(quizError)}</p><button type="button" class="btn btn-secondary btn-sm" id="quiz-back" style="width:auto;">Back to Quiz collection</button>`
    app.innerHTML = renderAppShell({ topLabel: 'Quiz collection', mainHtml })
    bindAppShell()
    document.querySelector('#quiz-back').addEventListener('click', goToQuizCollection)
    return
  }

  const langMeta = SUPPORTED_LANGUAGES.find((l) => l.name === route.language)
  const chapter = chaptersByLanguage[route.language]?.find((c) => c.slug === route.chapterSlug)
  const topic = chapter?.topics.find((t) => t.slug === route.topicSlug)

  const bodyHtml = quizRoundComplete
    ? renderQuizRoundComplete()
    : quizLoading || !quizQuestion
      ? '<p>Loading…</p>'
      : renderQuizQuestion()

  const cap = quizSessionInfo?.cap || 10
  const answeredSoFar = quizSessionInfo?.questionsAnswered || 0
  const segments = Array.from({ length: cap })
    .map((_, i) => `<span class="lesson-segment ${i < answeredSoFar ? 'filled' : ''}"></span>`)
    .join('')

  const mainHtml = `
    <div class="lesson-header">
      <button type="button" class="lesson-close-btn" id="quiz-close" title="Back to Quiz collection">${icons.x}</button>
      <span class="lang-glyph lesson-header-glyph" style="background:${langMeta.color}">${langMeta.glyph}</span>
      <div class="lesson-header-info">
        <div class="lesson-header-top">
          <span class="lesson-chapter-name">${topic?.title || route.topicSlug}</span>
          <span class="lesson-topic-count">Question ${Math.min(answeredSoFar + 1, cap)} of ${cap}</span>
        </div>
        <div class="lesson-segments">${segments}</div>
      </div>
      ${
        quizSessionInfo && !quizRoundComplete
          ? `<span class="quiz-band-pill ${quizSessionInfo.currentBand}">${quizSessionInfo.currentBand}</span>
             <span class="quiz-points-pill">${icons.gem} ${quizSessionInfo.rawPoints} pts</span>`
          : ''
      }
    </div>
    <div class="quiz-session-body">${bodyHtml}</div>
  `

  const breadcrumb = `Quiz collection <span class="breadcrumb-sep">&rsaquo;</span> ${route.language} <span class="breadcrumb-sep">&rsaquo;</span> ${
    topic?.title || route.topicSlug
  }`

  app.innerHTML = renderAppShell({ topLabel: breadcrumb, mainHtml })
  bindAppShell()

  document.querySelector('#quiz-close').addEventListener('click', goToQuizCollection)
  if (quizRoundComplete) {
    bindQuizRoundComplete()
  } else if (quizQuestion) {
    bindQuizQuestion()
  }
}

async function handleLogout() {
  await logout()
  closeMobileMenu()
  user = null
  authMode = 'login'
  viewingAsStudent = false
  chaptersByLanguage = {}
  expandedTracks = new Set()
  expandedChapters = new Set()
  currentCourseLanguage = null
  courseTopic = null
  courseTopicKey = null
  playgroundLanguage = null
  playgroundEditor = null
  playgroundCode = {}
  playgroundResult = null
  playgroundError = ''
  shopItems = null
  profilePageData = null
  profileInventoryTab = 'cosmetics'
  deleteAccountDialogOpen = false
  homePageData = null
  homePageError = ''
  trackFilter = 'all'
  toasts = []
  onboardingStep = 1
  onboardingAvatarChoice = 'bottts'
  onboardingAvatarError = ''
  onboardingAvatarSaving = false
  onboardingPhoneNumber = ''
  onboardingPhoneOtpSent = false
  onboardingPhoneOtp = ''
  onboardingPhoneError = ''
  onboardingPhoneSaving = false
  window.history.pushState({}, '', '/')
  render()
}

// ---- Course / lesson page ----
// The sidebar built by renderAppShell() IS the course navigation — there's
// no separate course-only layout. Opening a topic just expands its track
// in that same persistent sidebar and swaps the main content area.

function flattenTopics(chapters) {
  const flat = []
  chapters.forEach((chapter) => {
    chapter.topics.forEach((topic) => {
      flat.push({
        chapterSlug: chapter.slug,
        chapterTitle: chapter.title,
        topicSlug: topic.slug,
        topicTitle: topic.title,
      })
    })
  })
  return flat
}

function openTopic(language, chapterSlug, topicSlug) {
  closeMobileMenu()
  window.history.pushState({}, '', `/course/${encodeURIComponent(language)}/${chapterSlug}/${topicSlug}`)
  goToCourse({ name: 'course', language, chapterSlug, topicSlug })
}

async function goToCourse(route) {
  if (courseLoading) return
  courseLoading = true
  courseError = ''
  currentCourseLanguage = route.language
  expandedTracks.add(route.language)
  render()

  try {
    if (!chaptersByLanguage[route.language]) {
      const { chapters } = await fetchChapters(route.language)
      chaptersByLanguage[route.language] = chapters
    }
    const chapters = chaptersByLanguage[route.language]

    let { chapterSlug, topicSlug } = route
    if (!chapterSlug || !topicSlug) {
      const firstChapter = chapters[0]
      chapterSlug = firstChapter?.slug
      topicSlug = firstChapter?.topics[0]?.slug
      if (chapterSlug && topicSlug) {
        window.history.replaceState(
          {},
          '',
          `/course/${encodeURIComponent(route.language)}/${chapterSlug}/${topicSlug}`
        )
      }
    }

    if (!chapterSlug || !topicSlug) {
      courseTopic = null
      courseError = `No chapters yet for ${route.language}.`
      return
    }

    expandedChapters.add(`${route.language}/${chapterSlug}`)

    const key = `${route.language}/${chapterSlug}/${topicSlug}`
    if (courseTopicKey !== key) {
      const data = await fetchTopic(route.language, chapterSlug, topicSlug)
      courseTopic = { ...data.topic, chapterTitle: data.chapterTitle, chapterSlug }
      courseTopicKey = key
      // First-ever view of this topic banks a small completion bonus
      // (see courseController.getTopic) — sync it the same way quiz-round
      // banking does: assign totalPoints directly, no refetch.
      if (data.pointsAwarded > 0 && data.totalPoints !== undefined) {
        user.points = data.totalPoints
        showToast(`+${data.pointsAwarded} points earned!`, { icon: icons.gem })
      }
    }
  } catch (err) {
    courseError = err.message
  } finally {
    courseLoading = false
    render()
  }
}

function renderCoursePage(route) {
  const language = route.language
  const chapters = chaptersByLanguage[language]
  const dataReady =
    chapters &&
    courseTopic &&
    (!route.chapterSlug || route.chapterSlug === courseTopic.chapterSlug) &&
    (!route.topicSlug || route.topicSlug === courseTopic.slug)

  if (courseError) {
    app.innerHTML = renderAppShell({ topLabel: language, mainHtml: `<p class="error-text">${courseError}</p>` })
    bindAppShell()
    return
  }

  if (!dataReady) {
    app.innerHTML = renderAppShell({ topLabel: language, mainHtml: '<p>Loading…</p>' })
    bindAppShell()
    if (!courseLoading) goToCourse(route)
    return
  }

  const flat = flattenTopics(chapters)
  const currentIndex = flat.findIndex(
    (t) => t.chapterSlug === courseTopic.chapterSlug && t.topicSlug === courseTopic.slug
  )
  const prev = currentIndex > 0 ? flat[currentIndex - 1] : null
  const next = currentIndex >= 0 && currentIndex < flat.length - 1 ? flat[currentIndex + 1] : null

  const chapter = chapters.find((c) => c.slug === courseTopic.chapterSlug)
  const topicIndexInChapter = chapter.topics.findIndex((t) => t.slug === courseTopic.slug)
  const langMeta = SUPPORTED_LANGUAGES.find((l) => l.name === language)

  const segments = chapter.topics
    .map((_, i) => `<span class="lesson-segment ${i <= topicIndexInChapter ? 'filled' : ''}"></span>`)
    .join('')

  const tocItems = chapter.topics
    .map((t) => {
      const active = t.slug === courseTopic.slug
      return `
        <button type="button" class="lesson-toc-item ${
          active ? 'active' : ''
        }" data-lang="${language}" data-chapter="${chapter.slug}" data-topic="${t.slug}">
          <span class="lesson-toc-icon">${active ? icons.bookOpen : icons.circle}</span>
          <span class="lesson-toc-title">${t.title}</span>
          <span class="lesson-toc-time">${t.readingMinutes}m</span>
        </button>
      `
    })
    .join('')

  const mainHtml = `
    <div class="lesson-header">
      <button type="button" class="lesson-close-btn" id="lesson-close" title="Leave this chapter">${icons.x}</button>
      <span class="lang-glyph lesson-header-glyph" style="background:${langMeta.color}">${langMeta.glyph}</span>
      <div class="lesson-header-info">
        <div class="lesson-header-top">
          <span class="lesson-chapter-name">${chapter.title}</span>
          <span class="lesson-topic-count">Topic ${topicIndexInChapter + 1} of ${chapter.topics.length}</span>
        </div>
        <div class="lesson-segments">${segments}</div>
      </div>
      <span class="lesson-status-pill">${icons.bookOpen} Reading</span>
      <span class="lesson-time-pill">${icons.clock} ${courseTopic.readingMinutes} min</span>
    </div>
    <div class="lesson-layout">
      <div class="lesson-main">
        <p class="eyebrow">${courseTopic.chapterTitle}</p>
        <h1 class="onboarding-heading" style="margin-bottom:1.25rem;">${courseTopic.title}</h1>
        <div class="prose">${marked.parse(courseTopic.content)}</div>
        <div class="course-nav-row">
          ${
            prev
              ? `<button type="button" class="btn btn-secondary btn-sm course-prev" data-lang="${language}" data-chapter="${prev.chapterSlug}" data-topic="${prev.topicSlug}">&larr; ${prev.topicTitle}</button>`
              : '<span></span>'
          }
          ${
            next
              ? `<button type="button" class="btn btn-primary btn-sm course-next" data-lang="${language}" data-chapter="${next.chapterSlug}" data-topic="${next.topicSlug}">${next.topicTitle} &rarr;</button>`
              : '<span></span>'
          }
        </div>
      </div>
      <aside class="lesson-toc">
        <p class="lesson-toc-label">In this chapter</p>
        <div class="lesson-toc-list">${tocItems}</div>
        <div class="lesson-toc-note">Quizzes for this chapter will be on the Quiz collection page.</div>
      </aside>
    </div>
  `

  const breadcrumb = `${language} <span class="breadcrumb-sep">&rsaquo;</span> ${chapter.title} <span class="breadcrumb-sep">&rsaquo;</span> ${courseTopic.title}`

  app.innerHTML =
    renderAppShell({ topLabel: breadcrumb, mainHtml }) +
    (leaveDialogOpen
      ? `
    <div class="dialog-overlay" id="leave-dialog-overlay">
      <div class="dialog-card">
        <div class="dialog-header">
          <h2 class="dialog-title">Leave this chapter?</h2>
          <button type="button" class="dialog-close-x" id="leave-dialog-x">${icons.x}</button>
        </div>
        <p class="dialog-body">You can find this topic again any time from the sidebar.</p>
        <div class="dialog-actions">
          <button type="button" class="btn btn-secondary btn-sm" id="leave-dialog-keep">Keep reading</button>
          <button type="button" class="btn btn-sm dialog-leave-btn" id="leave-dialog-leave">Leave</button>
        </div>
      </div>
    </div>
  `
      : '')

  bindAppShell()
  document.querySelector('#lesson-close').addEventListener('click', openLeaveDialog)
  document.querySelectorAll('.lesson-toc-item').forEach((btn) => {
    btn.addEventListener('click', () => openTopic(btn.dataset.lang, btn.dataset.chapter, btn.dataset.topic))
  })
  const prevBtn = document.querySelector('.course-prev')
  if (prevBtn) {
    prevBtn.addEventListener('click', () =>
      openTopic(prevBtn.dataset.lang, prevBtn.dataset.chapter, prevBtn.dataset.topic)
    )
  }
  const nextBtn = document.querySelector('.course-next')
  if (nextBtn) {
    nextBtn.addEventListener('click', () =>
      openTopic(nextBtn.dataset.lang, nextBtn.dataset.chapter, nextBtn.dataset.topic)
    )
  }
  document.querySelectorAll('.snippet-copy-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const code = btn.closest('.snippet-card').querySelector('.snippet-body').innerText
      navigator.clipboard.writeText(code)
      const original = btn.textContent
      btn.textContent = 'Copied!'
      setTimeout(() => {
        btn.textContent = original
      }, 1500)
    })
  })

  if (leaveDialogOpen) {
    document.querySelector('#leave-dialog-x').addEventListener('click', closeLeaveDialog)
    document.querySelector('#leave-dialog-keep').addEventListener('click', closeLeaveDialog)
    document.querySelector('#leave-dialog-leave').addEventListener('click', goToDashboard)
    document.querySelector('#leave-dialog-overlay').addEventListener('click', (e) => {
      if (e.target.id === 'leave-dialog-overlay') closeLeaveDialog()
    })
  }
}

// ---- Cosmetics (browse + equip everything: avatars, background/border/theme) ----

function shopDataReady() {
  return shopItems !== null
}

async function loadShopData() {
  shopLoading = true
  try {
    const data = await fetchShopItems()
    shopItems = data.items
    shopCatalogSize = data.catalogSize
  } catch (err) {
    showErrorToast(err.message)
    shopItems = []
  }
  shopLoading = false
  render()
}

const COSMETICS_TABS = [
  { tab: 'everything', label: 'Everything' },
  { tab: 'avatar', label: 'Avatars' },
  { tab: 'background', label: 'Backgrounds' },
  { tab: 'border', label: 'Borders' },
  { tab: 'theme', label: 'Editor themes' },
]

function renderCosmeticTile(item) {
  const isAvatar = item.type === 'avatar'
  const swatchHtml = isAvatar
    ? `<img class="cosmetic-swatch cosmetic-swatch-avatar" alt="" src="https://api.dicebear.com/9.x/${
        item.dicebearStyle
      }/svg?seed=${encodeURIComponent(item.dicebearSeed)}" />`
    : item.type === 'theme'
      ? `<span class="cosmetic-swatch ${item.value}"></span>`
      : `<span class="cosmetic-swatch" style="background:${item.value}"></span>`
  const badge = item.equipped
    ? `<span class="language-added-pill">${icons.check} Equipped</span>`
    : item.owned
      ? '<span class="lang-radio"></span>'
      : `<span class="shop-lock-pill">${icons.lock}</span>`
  const metaText = item.equipped
    ? 'Equipped'
    : item.owned
      ? 'Click to equip'
      : `<span class="shop-cost-pill">${item.pointsCost.toLocaleString()} pts</span>`

  return `
    <button type="button" class="lang-tile shop-tile ${item.equipped ? 'selected' : ''} ${
      !item.owned ? 'locked' : ''
    }" data-cosmetic-id="${item.id}" data-type="${item.type}" data-owned="${item.owned}" data-equipped="${
      item.equipped
    }" data-name="${item.name.toLowerCase()}">
      ${badge}
      ${swatchHtml}
      <div class="lang-name">${item.name}</div>
      <div class="lang-meta">${metaText}</div>
    </button>
  `
}

function renderCosmeticsPage() {
  currentCourseLanguage = null

  if (!shopDataReady()) {
    app.innerHTML = renderAppShell({ topLabel: 'Cosmetics shop', mainHtml: '<p>Loading…</p>' })
    bindAppShell()
    if (!shopLoading) loadShopData()
    return
  }

  const ownedAvatarCount = shopItems.filter((i) => i.type === 'avatar').length
  const totalOwned = shopItems.filter((i) => i.owned).length
  const totalAvailable = shopCatalogSize + ownedAvatarCount
  const equippedAvatar = shopItems.find((i) => i.type === 'avatar' && i.equipped)

  const visibleItems =
    cosmeticsTab === 'everything' ? shopItems : shopItems.filter((i) => i.type === cosmeticsTab)

  const tabsHtml = COSMETICS_TABS.map(
    ({ tab, label }) =>
      `<button type="button" class="filter-pill ${cosmeticsTab === tab ? 'active' : ''}" data-cosmetics-tab="${tab}">${label}</button>`
  ).join('')

  const randomizeCta =
    cosmeticsTab === 'everything' || cosmeticsTab === 'avatar'
      ? `<button type="button" class="btn btn-secondary btn-sm" id="cosmetics-randomize-avatar" style="margin-bottom:1rem;">${icons.refresh} Randomise new avatar (250 pts)</button>`
      : ''

  const mainHtml = `
    <div class="languages-page-header">
      <div>
        <p class="eyebrow">COSMETICS SHOP</p>
        <h1 class="onboarding-heading" style="margin-bottom:0.5rem;">Spend what you earned.</h1>
        <p class="onboarding-subtext" style="max-width:60ch; margin-bottom:0;">Points come from finishing quizzes and reading lessons. None of this changes how you learn, just how your profile looks.</p>
      </div>
      <div class="input-wrap languages-search-wrap">
        <span class="input-icon">${icons.search}</span>
        <input type="text" id="cosmetics-search" placeholder="Search cosmetics" class="input input-with-icon languages-search-input" />
      </div>
    </div>

    <div class="cosmetics-stats-row">
      <div class="profile-card cosmetics-stat-card">
        <span class="cosmetic-swatch badge-swatch">${icons.gem}</span>
        <div>
          <p class="lang-name" style="margin-bottom:0;">${user.points.toLocaleString()}</p>
          <p class="lang-meta">points to spend</p>
        </div>
      </div>
      <div class="profile-card cosmetics-stat-card">
        <span class="cosmetic-swatch badge-swatch">${icons.check}</span>
        <div>
          <p class="lang-name" style="margin-bottom:0;">${totalOwned} / ${totalAvailable}</p>
          <p class="lang-meta">cosmetics owned</p>
        </div>
      </div>
      <div class="profile-card cosmetics-stat-card">
        ${
          equippedAvatar
            ? `<img class="cosmetic-swatch cosmetic-swatch-avatar" alt="" src="https://api.dicebear.com/9.x/${
                equippedAvatar.dicebearStyle
              }/svg?seed=${encodeURIComponent(equippedAvatar.dicebearSeed)}" />`
            : `<span class="cosmetic-swatch badge-swatch">${icons.person}</span>`
        }
        <div>
          <p class="lang-name" style="margin-bottom:0;">${equippedAvatar ? equippedAvatar.name : 'No avatar yet'}</p>
          <p class="lang-meta">currently wearing</p>
        </div>
      </div>
    </div>

    <div class="filter-pill-row" style="margin-bottom:1rem;">${tabsHtml}</div>
    ${randomizeCta}
    <div class="lang-grid" id="cosmetics-grid" style="margin-bottom: var(--sp-6);">
      ${
        visibleItems.map(renderCosmeticTile).join('') ||
        '<p class="playground-output-placeholder">Nothing here yet.</p>'
      }
    </div>
  `

  app.innerHTML = renderAppShell({ topLabel: 'Cosmetics shop', mainHtml })
  bindAppShell()

  document.querySelectorAll('.shop-tile').forEach((tile) => {
    tile.addEventListener('click', () => {
      const { cosmeticId, type, owned, equipped } = tile.dataset
      if (type === 'avatar') {
        if (equipped !== 'true') handleAvatarEquip(cosmeticId)
      } else if (owned === 'false') {
        handlePurchase(cosmeticId)
      } else if (equipped === 'true') {
        handleEquip(type, null)
      } else {
        handleEquip(type, cosmeticId)
      }
    })
  })
  document.querySelectorAll('[data-cosmetics-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      cosmeticsTab = btn.dataset.cosmeticsTab
      render()
    })
  })
  const randomizeBtn = document.querySelector('#cosmetics-randomize-avatar')
  if (randomizeBtn) randomizeBtn.addEventListener('click', handleAvatarRandomize)
  const searchInput = document.querySelector('#cosmetics-search')
  searchInput.value = cosmeticsSearch
  searchInput.addEventListener('input', (e) => {
    cosmeticsSearch = e.target.value
    const q = cosmeticsSearch.trim().toLowerCase()
    document.querySelectorAll('#cosmetics-grid .shop-tile').forEach((tile) => {
      tile.style.display = tile.dataset.name.includes(q) ? '' : 'none'
    })
  })
}

async function handlePurchase(cosmeticId) {
  const itemName = shopItems.find((i) => String(i.id) === String(cosmeticId))?.name
  try {
    const result = await purchaseCosmetic(cosmeticId)
    user.points = result.totalPoints
    shopItems = null // refetch so owned/equipped state reflects the purchase
    profilePageData = null // Profile's inventory may also be showing this item
    showToast(itemName ? `${itemName} purchased!` : 'Purchased!', { icon: icons.check })
  } catch (err) {
    showErrorToast(err.message)
  }
  render()
}

async function handleEquip(type, cosmeticId) {
  try {
    const result = await equipCosmetic(type, cosmeticId)
    user.equippedCosmetics = result.equippedCosmetics
    shopItems = null // refetch so equipped state reflects the change
    profilePageData = null
    showToast(cosmeticId ? 'Equipped.' : 'Unequipped.', { icon: icons.check })
  } catch (err) {
    showErrorToast(err.message)
  }
  render()
}

// ---- Profile (avatar management, streak insurance, inventory, account) ----

function profileDataReady() {
  return profilePageData !== null
}

async function loadProfileData() {
  profilePageLoading = true
  try {
    profilePageData = await fetchProfile()
  } catch (err) {
    showErrorToast(err.message)
    profilePageData = { cosmetics: [], badges: [], streakFreezeCount: 0, currentStreak: 0, points: 0, account: {} }
  }
  profilePageLoading = false
  render()
}

function renderInventoryCosmeticTile(item) {
  const swatchHtml =
    item.type === 'avatar'
      ? `<img class="cosmetic-swatch cosmetic-swatch-avatar" alt="" src="https://api.dicebear.com/9.x/${
          item.dicebearStyle
        }/svg?seed=${encodeURIComponent(item.dicebearSeed)}" />`
      : item.type === 'theme'
        ? `<span class="cosmetic-swatch ${item.value}"></span>`
        : `<span class="cosmetic-swatch" style="background:${item.value}"></span>`
  const badge = item.equipped
    ? `<span class="language-added-pill">${icons.check} Equipped</span>`
    : '<span class="lang-radio"></span>'

  return `
    <button type="button" class="lang-tile shop-tile inventory-tile ${item.equipped ? 'selected' : ''}"
      data-cosmetic-id="${item.id}" data-type="${item.type}" data-equipped="${item.equipped}">
      ${badge}
      ${swatchHtml}
      <div class="lang-name">${item.name}</div>
      <div class="lang-meta">${item.equipped ? 'Equipped' : 'Owned — tap to equip'}</div>
    </button>
  `
}

function renderBadgeTile(badge) {
  return `
    <div class="lang-tile shop-tile badge-tile ${badge.earned ? '' : 'locked'}">
      ${
        badge.earned
          ? `<span class="language-added-pill">${icons.check} Earned</span>`
          : `<span class="shop-lock-pill">${icons.lock}</span>`
      }
      <span class="cosmetic-swatch badge-swatch">${icons[badge.icon] || icons.gem}</span>
      <div class="lang-name">${badge.name}</div>
      <div class="lang-meta">${badge.earned ? new Date(badge.earnedAt).toLocaleDateString() : badge.description}</div>
    </div>
  `
}

const profileBreadcrumb = `Account <span class="breadcrumb-sep">&rsaquo;</span> Profile`

function renderProfilePage() {
  currentCourseLanguage = null

  if (!profileDataReady()) {
    app.innerHTML = renderAppShell({ topLabel: profileBreadcrumb, mainHtml: '<p>Loading…</p>' })
    bindAppShell()
    if (!profilePageLoading) loadProfileData()
    return
  }

  const { cosmetics, badges, streakFreezeCount, currentStreak, points, topicsCompleted, account } = profilePageData
  const handle = `@${(account.email || '').split('@')[0]}`
  const equippedAvatarCosmetic = cosmetics.find((c) => c.type === 'avatar' && c.equipped)
  // Already sorted newest-first by the API — just take the most recent 5.
  const recentAvatars = cosmetics.filter((c) => c.type === 'avatar').slice(0, 5)
  const joinedLabel = user.createdAt
    ? `joined ${new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long' })}`
    : ''

  let inventoryHtml
  if (profileInventoryTab === 'cosmetics') {
    inventoryHtml = cosmetics.length
      ? cosmetics.map(renderInventoryCosmeticTile).join('')
      : '<p class="playground-output-placeholder">Nothing owned yet — visit Cosmetics to buy something, or randomize an avatar above.</p>'
  } else if (profileInventoryTab === 'powerups') {
    inventoryHtml = `
      <div class="lang-tile shop-tile powerup-tile" style="cursor:default; text-align:center;">
        <div class="powerup-icon-badge" style="margin-left:auto; margin-right:auto;">
          ${icons.snowflake}
          <span class="powerup-count-badge">${streakFreezeCount}</span>
        </div>
        <p class="lang-name" style="margin-bottom:0.15rem;">Streak freeze</p>
        <p class="lang-meta">Keeps a missed day</p>
        <button type="button" class="btn btn-primary btn-sm" id="profile-buy-freeze" style="margin-top:0.75rem;">${icons.gem} 100</button>
      </div>
    `
  } else {
    inventoryHtml = badges.map(renderBadgeTile).join('')
  }

  const mainHtml = `
    <div class="profile-top-row">
      <div class="profile-card profile-avatar-card">
        <p class="lang-name" style="margin-bottom:0.15rem;">Your avatar</p>
        <p class="lang-meta" style="margin-bottom:1rem;">Click the randomise button for a random new avatar. Every avatar you get is saved, so you can switch back to any past one below.</p>
        <div class="profile-avatar-row">
          ${renderAvatar(user, { size: 72 })}
          <div class="profile-avatar-name-block">
            <p class="lang-name" style="margin-bottom:0.15rem;">${
              equippedAvatarCosmetic ? escapeHtml(equippedAvatarCosmetic.name) : 'No avatar yet'
            }</p>
            ${equippedAvatarCosmetic ? '<p class="profile-equipped-label">Currently equipped</p>' : ''}
          </div>
          <button type="button" class="btn btn-primary btn-sm" id="profile-randomize-avatar">${
            icons.refresh
          } Randomise (250 pts)</button>
        </div>
        ${
          recentAvatars.length
            ? `
        <p class="lang-meta" style="margin-top:1.25rem; margin-bottom:0.6rem; font-weight:600;">Your collection</p>
        <div class="profile-avatar-collection">
          ${recentAvatars
            .map(
              (a) => `
            <button type="button" class="avatar-collection-tile ${
              a.equipped ? 'selected' : ''
            }" data-cosmetic-id="${a.id}" data-equipped="${a.equipped}" title="${escapeHtml(a.name)}">
              <img alt="" src="https://api.dicebear.com/9.x/${a.dicebearStyle}/svg?seed=${encodeURIComponent(
                a.dicebearSeed
              )}" />
              <span>${escapeHtml(a.name)}</span>
            </button>
          `
            )
            .join('')}
        </div>
        <p class="lang-meta" style="margin-top:0.6rem;">Re-equipping anything you already own is free.</p>
        `
            : ''
        }
      </div>
      <div class="profile-right-column">
        <div class="profile-card profile-info-card">
          <p class="lang-name" style="font-size:1.1rem; margin-bottom:0.15rem;">${escapeHtml(user.name)}</p>
          <p class="lang-meta" style="margin-bottom:1rem;">${escapeHtml(handle)}${
            joinedLabel ? ` &middot; ${joinedLabel}` : ''
          }</p>
          <div class="profile-stat-row">
            <div class="profile-stat-tile">
              <div class="profile-stat-top-row">
                <span class="stat-icon-gem">${icons.gem}</span>
                <span class="profile-stat-number">${points.toLocaleString()}</span>
              </div>
              <p class="lang-meta">points</p>
            </div>
            <div class="profile-stat-tile">
              <div class="profile-stat-top-row">
                <span class="stat-icon-flame">${icons.flame}</span>
                <span class="profile-stat-number">${currentStreak}</span>
              </div>
              <p class="lang-meta">day streak</p>
            </div>
            <div class="profile-stat-tile">
              <div class="profile-stat-top-row">
                <span class="stat-icon-topics">${icons.checkCircle}</span>
                <span class="profile-stat-number">${topicsCompleted}</span>
              </div>
              <p class="lang-meta">topics done</p>
            </div>
          </div>
        </div>

        <div class="profile-card shop-streak-freeze-row">
          <div>
            <p class="lang-name" style="margin-bottom:0.15rem;">Streak freeze</p>
            <p class="lang-meta" style="margin-bottom:0.5rem;">${streakFreezeCount} freeze${
              streakFreezeCount === 1 ? '' : 's'
            } in your inventory</p>
            <p class="lang-meta" style="margin-bottom:0.6rem;">A streak freeze keeps your streak even when you don't login for the day.</p>
            <button type="button" class="pill-link" id="profile-buy-powerups">${
              icons.shoppingBag
            } Buy power-ups</button>
          </div>
          <span class="streak-insurance-icon">${icons.snowflake}</span>
        </div>
      </div>
    </div>

    <div class="languages-section-header">
      <h2 class="goal-title" style="margin-bottom:0;">Inventory</h2>
    </div>
    <div class="filter-pill-row" style="margin-bottom:1rem;">
      <button type="button" class="filter-pill ${profileInventoryTab === 'cosmetics' ? 'active' : ''}" data-inventory-tab="cosmetics">Cosmetics</button>
      <button type="button" class="filter-pill ${profileInventoryTab === 'powerups' ? 'active' : ''}" data-inventory-tab="powerups">Power-ups</button>
      <button type="button" class="filter-pill ${profileInventoryTab === 'badges' ? 'active' : ''}" data-inventory-tab="badges">Badges</button>
    </div>
    <div class="inventory-scroll-row" style="margin-bottom: var(--sp-6);">${inventoryHtml}</div>

    <div class="languages-section-header">
      <h2 class="goal-title" style="margin-bottom:0;">Account</h2>
    </div>
    <p class="lang-meta" style="margin-bottom:1rem;">Nothing here is public except your name and avatar.</p>
    <div class="profile-card">
      <div class="profile-account-grid">
        <label class="field-label">Display name
          <input type="text" id="profile-name-input" class="input" value="${escapeHtml(account.name)}" />
        </label>
        <label class="field-label">University email
          <div class="input profile-account-email" style="display:flex; align-items:center; gap:0.5rem; opacity:0.75;">${icons.envelope} <span class="profile-account-email-text">${escapeHtml(
            account.email
          )}</span></div>
        </label>
      </div>
      <div class="profile-account-actions">
        <button type="button" class="btn btn-primary btn-sm" id="profile-save-account">${icons.check} Save changes</button>
        <button type="button" class="btn btn-sm dialog-leave-btn" id="profile-delete-account">${icons.x} Delete account</button>
      </div>
    </div>
  `

  app.innerHTML =
    renderAppShell({ topLabel: profileBreadcrumb, mainHtml }) +
    (deleteAccountDialogOpen
      ? `
    <div class="dialog-overlay" id="delete-account-dialog-overlay">
      <div class="dialog-card">
        <div class="dialog-header">
          <h2 class="dialog-title">Delete your account?</h2>
          <button type="button" class="dialog-close-x" id="delete-account-dialog-x">${icons.x}</button>
        </div>
        <p class="dialog-body">This permanently deletes your account, progress, and owned avatars. This can't be undone.</p>
        <div class="dialog-actions">
          <button type="button" class="btn btn-secondary btn-sm" id="delete-account-dialog-cancel">Keep my account</button>
          <button type="button" class="btn btn-sm dialog-leave-btn" id="delete-account-dialog-confirm">Delete account</button>
        </div>
      </div>
    </div>
  `
      : '')

  bindAppShell()

  document.querySelectorAll('.inventory-tile').forEach((tile) => {
    tile.addEventListener('click', () => {
      const { cosmeticId, type, equipped } = tile.dataset
      if (type === 'avatar') {
        if (equipped !== 'true') handleAvatarEquip(cosmeticId)
      } else {
        handleEquip(type, equipped === 'true' ? null : cosmeticId)
      }
    })
  })
  document.querySelectorAll('.avatar-collection-tile').forEach((tile) => {
    tile.addEventListener('click', () => {
      if (tile.dataset.equipped !== 'true') handleAvatarEquip(tile.dataset.cosmeticId)
    })
  })
  document.querySelectorAll('[data-inventory-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      profileInventoryTab = btn.dataset.inventoryTab
      render()
    })
  })
  document.querySelector('#profile-randomize-avatar').addEventListener('click', handleAvatarRandomize)
  document.querySelector('#profile-buy-powerups').addEventListener('click', () => {
    profileInventoryTab = 'powerups'
    render()
  })
  const buyFreezeBtn = document.querySelector('#profile-buy-freeze')
  if (buyFreezeBtn) buyFreezeBtn.addEventListener('click', handleProfileStreakFreezePurchase)
  document.querySelector('#profile-save-account').addEventListener('click', handleSaveProfileAccount)
  document.querySelector('#profile-delete-account').addEventListener('click', () => {
    deleteAccountDialogOpen = true
    render()
  })
  if (deleteAccountDialogOpen) {
    document.querySelector('#delete-account-dialog-x').addEventListener('click', closeDeleteAccountDialog)
    document.querySelector('#delete-account-dialog-cancel').addEventListener('click', closeDeleteAccountDialog)
    document.querySelector('#delete-account-dialog-confirm').addEventListener('click', handleDeleteAccount)
    document.querySelector('#delete-account-dialog-overlay').addEventListener('click', (e) => {
      if (e.target.id === 'delete-account-dialog-overlay') closeDeleteAccountDialog()
    })
  }
}

function closeDeleteAccountDialog() {
  deleteAccountDialogOpen = false
  render()
}

// Shared between the Cosmetics page (browse + equip everything) and the
// Profile page (avatar management) — both can trigger a pull/equip, so both
// caches get invalidated; the success toast is global, so it shows up
// regardless of which of the two pages triggered it.
async function handleAvatarRandomize() {
  try {
    const result = await randomizeAvatar()
    user.points = result.totalPoints
    user.avatarStyle = result.avatar.dicebearStyle
    user.avatarSeed = result.avatar.dicebearSeed
    profilePageData = null // refetch so the new pull shows up in inventory
    shopItems = null
    showToast(`You got ${result.avatar.name}!`, { icon: icons.refresh })
  } catch (err) {
    showErrorToast(err.message)
  }
  render()
}

async function handleAvatarEquip(cosmeticId) {
  try {
    const result = await equipAvatar(cosmeticId)
    user.avatarStyle = result.avatarStyle
    user.avatarSeed = result.avatarSeed
    profilePageData = null
    shopItems = null
    showToast('Avatar equipped.', { icon: icons.check })
  } catch (err) {
    showErrorToast(err.message)
  }
  render()
}

async function handleProfileStreakFreezePurchase() {
  try {
    const result = await purchaseStreakFreeze()
    user.points = result.totalPoints
    user.streakFreezeCount = result.streakFreezeCount
    profilePageData = null
    showToast('Streak freeze purchased.', { icon: icons.snowflake })
  } catch (err) {
    showErrorToast(err.message)
  }
  render()
}

async function handleSaveProfileAccount() {
  const fields = {
    name: document.querySelector('#profile-name-input').value,
  }
  try {
    const result = await updateProfileAccount(fields)
    user.name = result.user.name
    profilePageData = null // refetch so the account section reflects the save
    showToast('Profile saved.', { icon: icons.check })
  } catch (err) {
    showErrorToast(err.message)
  }
  render()
}

async function handleDeleteAccount() {
  try {
    await deleteAccount()
  } catch (err) {
    showErrorToast(err.message)
    deleteAccountDialogOpen = false
    render()
    return
  }
  await handleLogout()
}

// ---- Playground ----

// Colors reference CSS custom properties directly, so they stay live/correct
// through theme switches without needing to remount the editor.
const playgroundHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: 'var(--pg-tok-kw)' },
  { tag: tags.string, color: 'var(--pg-tok-str)' },
  { tag: [tags.number, tags.bool, tags.null], color: 'var(--pg-tok-num)' },
  { tag: [tags.function(tags.variableName), tags.function(tags.propertyName)], color: 'var(--pg-tok-fn)' },
  { tag: tags.comment, color: 'var(--pg-tok-com)', fontStyle: 'italic' },
  { tag: tags.operator, color: 'var(--pg-tok-op)' },
])

const PLAYGROUND_LANGUAGE_EXTENSIONS = {
  JavaScript: () => javascript(),
  Python: () => python(),
  SQL: () => sql(),
  'HTML & CSS': () => html(),
  Java: () => java(),
  'C++': () => cpp(),
  Go: () => StreamLanguage.define(go),
  Rust: () => StreamLanguage.define(rust),
}

const PLAYGROUND_FILE_EXTENSIONS = {
  JavaScript: 'js',
  Python: 'py',
  SQL: 'sql',
  'HTML & CSS': 'html',
  Java: 'java',
  'C++': 'cpp',
  Go: 'go',
  Rust: 'rs',
}

const PLAYGROUND_STARTER_CODE = {
  JavaScript: "console.log('Hello, world!')",
  Python: "print('Hello, world!')",
  SQL: 'SELECT 1;',
  'HTML & CSS': '<h1>Hello, world!</h1>',
  Java: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, world!");\n  }\n}',
  'C++':
    '#include <iostream>\n\nint main() {\n  std::cout << "Hello, world!" << std::endl;\n  return 0;\n}',
  Go: 'package main\n\nimport "fmt"\n\nfunc main() {\n  fmt.Println("Hello, world!")\n}',
  Rust: 'fn main() {\n  println!("Hello, world!");\n}',
}

const PLAYGROUND_RUN_COMMANDS = {
  JavaScript: (ext) => `node scratch.${ext}`,
  Python: (ext) => `python scratch.${ext}`,
  SQL: (ext) => `sqlite3 scratch.${ext}`,
  Java: (ext) => `java scratch.${ext}`,
  'C++': (ext) => `g++ scratch.${ext} && ./a.out`,
  Go: (ext) => `go run scratch.${ext}`,
  Rust: (ext) => `rustc scratch.${ext} && ./scratch`,
  'HTML & CSS': (ext) => `open scratch.${ext}`,
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// Resolves (and self-heals) playgroundLanguage even if /playground was never
// visited this session — the mini playground mirrors this value, so it needs
// a real answer regardless of which page is currently active.
function getPlaygroundLanguage() {
  if (!playgroundLanguage || !selectedLanguages.includes(playgroundLanguage)) {
    playgroundLanguage = selectedLanguages[0] || 'JavaScript'
  }
  return playgroundLanguage
}

function renderExecutionOutput({ running, error, result, placeholder }) {
  if (running) {
    return '<p class="playground-output-placeholder">Running…</p>'
  }
  if (error) {
    return `<p class="error-text">${escapeHtml(error)}</p>`
  }
  if (!result) {
    return `<p class="playground-output-placeholder">${placeholder}</p>`
  }

  const { stdout, stderr, compileOutput, status, time, memory } = result
  return `
    ${stdout ? `<pre class="playground-output-text">${escapeHtml(stdout)}</pre>` : ''}
    ${stderr ? `<pre class="playground-output-text playground-output-error">${escapeHtml(stderr)}</pre>` : ''}
    ${
      compileOutput
        ? `<pre class="playground-output-text playground-output-error">${escapeHtml(compileOutput)}</pre>`
        : ''
    }
    ${!stdout && !stderr && !compileOutput ? '<p class="playground-output-placeholder">No output.</p>' : ''}
    <p class="playground-output-meta">${status || ''}${time ? ` &middot; ${time}s` : ''}${
    memory ? ` &middot; ${Math.round(memory / 1024)} MB` : ''
  }</p>
  `
}

function renderPlaygroundPage() {
  currentCourseLanguage = null
  getPlaygroundLanguage()

  const ext = PLAYGROUND_FILE_EXTENSIONS[playgroundLanguage]
  const runCommand = (PLAYGROUND_RUN_COMMANDS[playgroundLanguage] || ((e) => `run scratch.${e}`))(ext)

  const langPills = selectedLanguages
    .map((lang) => {
      const langMeta = SUPPORTED_LANGUAGES.find((l) => l.name === lang)
      const active = lang === playgroundLanguage
      const activeStyle = active
        ? `background: var(--fill-accent); color: var(--text-on-accent); box-shadow: var(--shadow-glow-accent), var(--inner-top);`
        : `background: transparent; color: var(--text-muted);`
      return `<button type="button" class="playground-lang-pill" style="${activeStyle}" data-lang="${lang}"><span class="lang-glyph playground-lang-glyph" style="background:${langMeta.color}">${langMeta.glyph}</span>${lang}</button>`
    })
    .join('')

  const mainHtml = `
    <div class="playground-header">
      <div>
        <p class="eyebrow">PLAYGROUND</p>
        <h1 class="onboarding-heading" style="margin-bottom:0.5rem;">Write whatever you like.</h1>
        <p class="onboarding-subtext" style="max-width:56ch; margin-bottom:0;">Nothing here is graded or tied to a topic. Pick the language you want to code in. Good for writing code without having to leave the website.</p>
      </div>
    </div>

    <div class="playground-lang-row">
      <div class="playground-lang-selector">${langPills}</div>
      <span class="playground-lang-note">Your picked languages. <a href="#" id="playground-add-lang">Add another</a></span>
    </div>

    <div class="playground-panes">
      <div class="playground-pane editor-pane">
        <div class="playground-pane-header">
          ${icons.file}
          <span class="playground-filename">scratch.${ext}</span>
          <button type="button" class="playground-icon-btn sm playground-reset" title="Reset to starter code">${icons.refresh}</button>
          <button type="button" class="btn btn-primary playground-run-btn" id="playground-run" ${
            playgroundRunning ? 'disabled' : ''
          }>${icons.arrowRight} ${playgroundRunning ? 'Running…' : 'Run'}</button>
        </div>
        <div id="playground-editor-mount" class="playground-editor-mount"></div>
      </div>
      <div class="playground-pane console-pane">
        <div class="playground-pane-header">
          ${icons.terminal}
          <span class="playground-output-label">Output</span>
          <span class="playground-output-cmd">${runCommand}</span>
          <button type="button" class="playground-icon-btn sm" id="playground-clear" title="Clear output">${icons.x}</button>
        </div>
        <div class="playground-output" id="playground-output">${renderPlaygroundOutput()}</div>
      </div>
    </div>
  `

  app.innerHTML = renderAppShell({ topLabel: 'Playground', mainHtml })
  bindAppShell()
  mountPlaygroundEditor()

  document.querySelectorAll('.playground-lang-pill').forEach((btn) => {
    btn.addEventListener('click', () => switchPlaygroundLanguage(btn.dataset.lang))
  })
  document.querySelector('#playground-run').addEventListener('click', runPlaygroundCode)
  document.querySelector('.playground-reset').addEventListener('click', resetPlaygroundCode)
  document.querySelector('#playground-add-lang').addEventListener('click', (e) => {
    e.preventDefault()
    goToLanguagesPage()
  })
  document.querySelector('#playground-clear').addEventListener('click', () => {
    playgroundResult = null
    playgroundError = ''
    document.querySelector('#playground-output').innerHTML = renderPlaygroundOutput()
  })
}

// The mount element already carries structural classes (playground-editor-
// mount, etc.) — this only ever adds/swaps one of these theme classes on top
// of whatever's already there, never replaces className wholesale.
const EDITOR_THEME_CLASSES = ['editor-theme-sunset', 'editor-theme-ocean', 'editor-theme-forest', 'editor-theme-midnight']

// Applies the user's equipped editor-theme cosmetic (a CSS class name, e.g.
// "editor-theme-ocean" — see src/tokens/colors.css) directly to the mount
// element. playgroundHighlightStyle already sources every color from the
// --pg-* custom properties those classes redefine, so this is the entire
// theming mechanism — no CodeMirror extension/Compartment involved.
function applyEquippedEditorTheme(mountEl) {
  mountEl.classList.remove(...EDITOR_THEME_CLASSES)
  const themeClass = user.equippedCosmetics?.theme?.value
  if (themeClass) mountEl.classList.add(themeClass)
}

function mountPlaygroundEditor() {
  const mountEl = document.querySelector('#playground-editor-mount')
  if (!mountEl) return
  applyEquippedEditorTheme(mountEl)

  const startingCode =
    playgroundCode[playgroundLanguage] ?? PLAYGROUND_STARTER_CODE[playgroundLanguage] ?? ''
  const languageExtension = PLAYGROUND_LANGUAGE_EXTENSIONS[playgroundLanguage]()

  const updateListener = EditorView.updateListener.of((update) => {
    if (update.docChanged) {
      playgroundCode[playgroundLanguage] = update.state.doc.toString()
    }
  })

  const state = EditorState.create({
    doc: startingCode,
    extensions: [basicSetup, languageExtension, updateListener, syntaxHighlighting(playgroundHighlightStyle)],
  })

  playgroundEditor = new EditorView({ state, parent: mountEl })
}

function switchPlaygroundLanguage(lang) {
  if (playgroundEditor) {
    playgroundCode[playgroundLanguage] = playgroundEditor.state.doc.toString()
  }
  playgroundLanguage = lang
  playgroundResult = null
  playgroundError = ''
  render()
}

function resetPlaygroundCode() {
  playgroundCode[playgroundLanguage] = PLAYGROUND_STARTER_CODE[playgroundLanguage] ?? ''
  render()
}

async function runPlaygroundCode() {
  if (!playgroundEditor || playgroundRunning) return
  const code = playgroundEditor.state.doc.toString()

  playgroundRunning = true
  playgroundResult = null
  playgroundError = ''
  updatePlaygroundRunUi()

  try {
    playgroundResult = await executeCode(code, playgroundLanguage)
  } catch (err) {
    playgroundError = err.message
  }
  playgroundRunning = false
  updatePlaygroundRunUi()
}

function updatePlaygroundRunUi() {
  const output = document.querySelector('#playground-output')
  if (output) output.innerHTML = renderPlaygroundOutput()
  const runBtn = document.querySelector('#playground-run')
  if (runBtn) {
    runBtn.disabled = playgroundRunning
    runBtn.innerHTML = `${icons.arrowRight} ${playgroundRunning ? 'Running…' : 'Run'}`
  }
}

function renderPlaygroundOutput() {
  const ext = PLAYGROUND_FILE_EXTENSIONS[playgroundLanguage]
  return renderExecutionOutput({
    running: playgroundRunning,
    error: playgroundError,
    result: playgroundResult,
    placeholder: `Press Run to execute scratch.${ext}.`,
  })
}

// ---- Mini playground (floating "Try it yourself" scratchpad) ----

function renderMiniPlayground() {
  if (!miniPlaygroundOpen) return ''

  const lang = getPlaygroundLanguage()
  const ext = PLAYGROUND_FILE_EXTENSIONS[lang]
  const code = miniPlaygroundCode[lang] ?? PLAYGROUND_STARTER_CODE[lang] ?? ''
  const lineCount = code.split('\n').length

  return `
    <div class="mini-playground ${miniPlaygroundExpanded ? 'expanded' : ''}">
      <div class="playground-pane-header mini-playground-header">
        ${icons.file}
        <span class="mini-playground-title">Mini playground</span>
        <span class="playground-filename">scratch.${ext}</span>
        <button type="button" class="playground-icon-btn sm" id="mini-playground-reset" title="Reset to starter code">${icons.refresh}</button>
        <button type="button" class="playground-icon-btn sm" id="mini-playground-expand" title="${
          miniPlaygroundExpanded ? 'Collapse' : 'Expand'
        }">${icons.expand}</button>
        <button type="button" class="btn btn-primary playground-run-btn" id="mini-playground-run" ${
          miniPlaygroundRunning ? 'disabled' : ''
        }>${icons.arrowRight} ${miniPlaygroundRunning ? 'Running…' : 'Run'}</button>
        <button type="button" class="playground-icon-btn sm" id="mini-playground-close" title="Close">${icons.x}</button>
      </div>
      <div id="mini-playground-editor-mount" class="playground-editor-mount mini-playground-editor-mount"></div>
      <div class="mini-playground-console-row">
        <span>Console</span>
        <span id="mini-playground-line-count">${lineCount} LINE${lineCount === 1 ? '' : 'S'}</span>
      </div>
      <div class="playground-output mini-playground-output" id="mini-playground-output">${renderMiniPlaygroundOutput()}</div>
    </div>
  `
}

function mountMiniPlaygroundEditor() {
  const mountEl = document.querySelector('#mini-playground-editor-mount')
  if (!mountEl) return
  applyEquippedEditorTheme(mountEl)

  const lang = getPlaygroundLanguage()
  const startingCode = miniPlaygroundCode[lang] ?? PLAYGROUND_STARTER_CODE[lang] ?? ''
  const languageExtension = PLAYGROUND_LANGUAGE_EXTENSIONS[lang]()

  const updateListener = EditorView.updateListener.of((update) => {
    if (!update.docChanged) return
    const text = update.state.doc.toString()
    miniPlaygroundCode[lang] = text
    const lineCountEl = document.querySelector('#mini-playground-line-count')
    if (lineCountEl) {
      const n = text.split('\n').length
      lineCountEl.textContent = `${n} LINE${n === 1 ? '' : 'S'}`
    }
  })

  const state = EditorState.create({
    doc: startingCode,
    extensions: [basicSetup, languageExtension, updateListener, syntaxHighlighting(playgroundHighlightStyle)],
  })

  miniPlaygroundEditor = new EditorView({ state, parent: mountEl })
}

function bindMiniPlayground() {
  document.querySelector('#mini-playground-close').addEventListener('click', () => {
    miniPlaygroundOpen = false
    miniPlaygroundEditor = null
    render()
  })
  document.querySelector('#mini-playground-expand').addEventListener('click', () => {
    miniPlaygroundExpanded = !miniPlaygroundExpanded
    render()
  })
  document.querySelector('#mini-playground-reset').addEventListener('click', () => {
    const lang = getPlaygroundLanguage()
    miniPlaygroundCode[lang] = PLAYGROUND_STARTER_CODE[lang] ?? ''
    render()
  })
  document.querySelector('#mini-playground-run').addEventListener('click', runMiniPlaygroundCode)
}

function toggleMiniPlayground() {
  miniPlaygroundOpen = !miniPlaygroundOpen
  if (!miniPlaygroundOpen) {
    miniPlaygroundEditor = null
  }
  render()
}

async function runMiniPlaygroundCode() {
  if (!miniPlaygroundEditor || miniPlaygroundRunning) return
  const lang = getPlaygroundLanguage()
  const code = miniPlaygroundEditor.state.doc.toString()

  miniPlaygroundRunning = true
  miniPlaygroundResult = null
  miniPlaygroundError = ''
  updateMiniPlaygroundRunUi()

  try {
    miniPlaygroundResult = await executeCode(code, lang)
  } catch (err) {
    miniPlaygroundError = err.message
  }
  miniPlaygroundRunning = false
  updateMiniPlaygroundRunUi()
}

function updateMiniPlaygroundRunUi() {
  const output = document.querySelector('#mini-playground-output')
  if (output) output.innerHTML = renderMiniPlaygroundOutput()
  const runBtn = document.querySelector('#mini-playground-run')
  if (runBtn) {
    runBtn.disabled = miniPlaygroundRunning
    runBtn.innerHTML = `${icons.arrowRight} ${miniPlaygroundRunning ? 'Running…' : 'Run'}`
  }
}

function renderMiniPlaygroundOutput() {
  return renderExecutionOutput({
    running: miniPlaygroundRunning,
    error: miniPlaygroundError,
    result: miniPlaygroundResult,
    placeholder: 'Press Run to see output.',
  })
}

// ---- Init ----

async function init() {
  try {
    const { user: current } = await fetchMe()
    setUser(current)
  } catch {
    user = null
  }
  const route = parseRoute()
  if (user?.hasCompletedOnboarding && route.name === 'course') {
    goToCourse(route)
  } else {
    render()
  }
}

init()
