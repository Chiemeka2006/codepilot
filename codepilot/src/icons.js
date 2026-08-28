// Small hand-rolled inline SVGs (currentColor stroke, 16px) so the redesign
// doesn't need an icon library dependency for a handful of glyphs.
const wrap = (paths) =>
  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`

export const icons = {
  person: wrap(
    '<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/>'
  ),
  envelope: wrap(
    '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>'
  ),
  eye: wrap(
    '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>'
  ),
  eyeOff: wrap(
    '<path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c6.5 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 11s3.5 7 10 7a9.29 9.29 0 0 0 5.39-1.61"/><path d="M2 2l20 20"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>'
  ),
  sun: wrap(
    '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>'
  ),
  moon: wrap('<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>'),
  github: wrap(
    '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>'
  ),
  arrowRight: wrap('<path d="M5 12h14M12 5l7 7-7 7"/>'),
  x: wrap('<path d="M18 6 6 18M6 6l12 12"/>'),
  check: wrap('<path d="M20 6 9 17l-5-5"/>'),
  graduationCap: wrap(
    '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/>'
  ),
  file: wrap(
    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/>'
  ),
  flame: wrap(
    '<path d="M12 2c1 3-3 4-3 7a3 3 0 0 0 6 0c0-1-.5-2-1-3 1 0 3 2 3 5a5 5 0 0 1-10 0c0-4 3-6 5-9Z"/>'
  ),
  gem: wrap(
    '<path d="M6 3h12l4 6-10 12L2 9Z"/><path d="M2 9h20M9 3l3 6-3 12M15 3l-3 6 3 12"/>'
  ),
  bell: wrap(
    '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>'
  ),
  home: wrap(
    '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/>'
  ),
  chevronDown: wrap('<path d="m6 9 6 6 6-6"/>'),
  logout: wrap(
    '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>'
  ),
  compass: wrap(
    '<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-1.8 5.4a2 2 0 0 1-1.2 1.2L7.8 16.2l1.8-5.4a2 2 0 0 1 1.2-1.2Z"/>'
  ),
  clipboardList: wrap(
    '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H9"/><path d="M9 12h6M9 16h6M9 8h2"/>'
  ),
  terminal: wrap('<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>'),
  circle: wrap('<circle cx="12" cy="12" r="9"/>'),
  bookOpen: wrap(
    '<path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2Z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7Z"/>'
  ),
  clock: wrap('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>'),
  download: wrap(
    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>'
  ),
  share: wrap(
    '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 3.9M15.4 6.6l-6.8 3.9"/>'
  ),
  refresh: wrap(
    '<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>'
  ),
  plus: wrap('<path d="M12 5v14M5 12h14"/>'),
  search: wrap('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/>'),
  expand: wrap(
    '<path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/>'
  ),
  dot: wrap('<circle cx="12" cy="12" r="5" fill="currentColor" stroke="none"/>'),
  lightbulb: wrap(
    '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V16a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1.3A7 7 0 0 0 12 2Z"/>'
  ),
  lock: wrap(
    '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'
  ),
  snowflake: wrap(
    '<path d="M12 2v20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07"/><path d="m12 6-2 2m2-2 2 2M12 18l-2-2m2 2 2-2M6 12l2-2m-2 2 2 2M18 12l-2-2m2 2-2 2"/>'
  ),
  checkCircle: wrap('<circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/>'),
  alertCircle: wrap('<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>'),
  palette: wrap(
    '<path d="M12 2a10 10 0 1 0 0 20 2 2 0 0 0 0-4 2 2 0 0 1 0-4h2a4 4 0 0 0 4-4 8 8 0 0 0-6-8Z"/><circle cx="7.5" cy="10.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="7" r="1.2" fill="currentColor" stroke="none"/><circle cx="16.5" cy="10.5" r="1.2" fill="currentColor" stroke="none"/>'
  ),
  shoppingBag: wrap(
    '<path d="M6 8h12l1 12H5Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'
  ),
  menu: wrap(
    '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>'
  ),
}
