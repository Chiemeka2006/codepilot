const STORAGE_KEY = 'codepilot-theme'
const LIGHT_CLASS = 'theme-parchment'

function systemPrefersLight() {
  return window.matchMedia('(prefers-color-scheme: light)').matches
}

export function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY)
  const theme = saved || (systemPrefersLight() ? 'light' : 'dark')
  applyTheme(theme)
}

function applyTheme(theme) {
  document.documentElement.classList.toggle(LIGHT_CLASS, theme === 'light')
  localStorage.setItem(STORAGE_KEY, theme)
}

export function toggleTheme() {
  applyTheme(currentTheme() === 'light' ? 'dark' : 'light')
}

export function currentTheme() {
  return document.documentElement.classList.contains(LIGHT_CLASS) ? 'light' : 'dark'
}
