// Single source of truth for the 3 cosmetic slots (Phase 8 shop). Mirrors
// languages.js's frontend+backend-shared pattern: plain data, no dependencies
// either side. Used for the Cosmetic model's `type` enum (models/Cosmetic.js)
// and User.equippedCosmetics' fixed slot keys (models/User.js) — keeping both
// pointed at this one array instead of hardcoding the three strings twice.
// 'avatar' cosmetics are never part of the shared/seeded catalog the other
// three types use — each one is created on-demand by a paid "randomize" pull
// (see shopController.randomizeAvatar), owned by whoever pulled it. See
// models/Cosmetic.js's `owner` field.
export const COSMETIC_TYPES = ['background', 'border', 'theme', 'avatar']
