// Single source of truth for which languages a user can select, imported by
// both the backend (validation in userController.js) and the frontend
// (language tiles in main.js). Plain data, no dependencies either side.
//
// chapters/topics are real counts, matching what's actually seeded in
// MongoDB via scripts/seedChapters.js (verified against the live database,
// not just the script's source). Go and Rust have no seeded content yet —
// update their 0s once real chapters exist for them, and re-verify the
// others any time seedChapters.js changes, since nothing keeps these two
// lists in sync automatically.
export const SUPPORTED_LANGUAGES = [
  { name: 'JavaScript', glyph: 'JS', color: '#C9A227', chapters: 13, topics: 66 },
  { name: 'Python', glyph: 'Py', color: '#4B8BBE', chapters: 9, topics: 19 },
  { name: 'HTML & CSS', glyph: '&lt;/&gt;', color: '#D06B3A', chapters: 12, topics: 50 },
  { name: 'SQL', glyph: 'SQ', color: '#5E8B7E', chapters: 7, topics: 14 },
  { name: 'Java', glyph: 'Jv', color: '#B05A3C', chapters: 10, topics: 23 },
  { name: 'C++', glyph: 'C+', color: '#6E7FA8', chapters: 9, topics: 16 },
  { name: 'Go', glyph: 'Go', color: '#4E9AA8', chapters: 0, topics: 0 },
  { name: 'Rust', glyph: 'Rs', color: '#A6603C', chapters: 0, topics: 0 },
]

export const LANGUAGE_NAMES = SUPPORTED_LANGUAGES.map((lang) => lang.name)
