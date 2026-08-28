// Single source of truth for which languages a user can select, imported by
// both the backend (validation in userController.js) and the frontend
// (language tiles in main.js). Plain data, no dependencies either side.
//
// chapters/topics are placeholder counts — Phase 4 (course content) hasn't
// been built yet, so these numbers don't correspond to real content. They
// exist purely so the language-selection UI has something to display; swap
// them for real counts once courses actually exist.
export const SUPPORTED_LANGUAGES = [
  { name: 'JavaScript', glyph: 'JS', color: '#C9A227', chapters: 6, topics: 84 },
  { name: 'Python', glyph: 'Py', color: '#4B8BBE', chapters: 5, topics: 96 },
  { name: 'HTML & CSS', glyph: '&lt;/&gt;', color: '#D06B3A', chapters: 4, topics: 61 },
  { name: 'SQL', glyph: 'SQ', color: '#5E8B7E', chapters: 4, topics: 48 },
  { name: 'Java', glyph: 'Jv', color: '#B05A3C', chapters: 3, topics: 88 },
  { name: 'C++', glyph: 'C+', color: '#6E7FA8', chapters: 3, topics: 74 },
  { name: 'Go', glyph: 'Go', color: '#4E9AA8', chapters: 2, topics: 44 },
  { name: 'Rust', glyph: 'Rs', color: '#A6603C', chapters: 2, topics: 31 },
]

export const LANGUAGE_NAMES = SUPPORTED_LANGUAGES.map((lang) => lang.name)
