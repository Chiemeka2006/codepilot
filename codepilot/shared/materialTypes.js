// Single source of truth for the 4 lecturer-material types (Phase 11).
// Mirrors languages.js/cosmeticTypes.js's frontend+backend-shared pattern:
// plain data, no dependencies either side. `contentKind` says which of
// Material's two content fields a type actually uses ('markdown' -> content,
// 'url' -> externalUrl) so neither the schema's conditional-required
// validation nor the frontend's form-field switching hardcodes the
// note/code vs slides/video split separately.
export const MATERIAL_TYPES = [
  { value: 'note', label: 'Note', iconKey: 'note', contentKind: 'markdown' },
  { value: 'code', label: 'Code', iconKey: 'terminal', contentKind: 'markdown' },
  { value: 'slides', label: 'Slides', iconKey: 'presentation', contentKind: 'url' },
  { value: 'video', label: 'Video', iconKey: 'video', contentKind: 'url' },
]

export const MATERIAL_TYPE_VALUES = MATERIAL_TYPES.map((t) => t.value)
