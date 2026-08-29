# Interactive Programming Learning Platform — Work Breakdown Plan

**Stack:** Node.js/Express, MongoDB/Mongoose, Vanilla JS + HTML + Tailwind (served by Express), session-based auth (`express-session` + `connect-mongo`)

---

## Phase 1: Backend Foundation
- [✅] Create backend folder structure (`config/`, `models/`, `routes/`, `controllers/`, `middleware/`)
- [✅] Set up Vite project for frontend (`src/`, `index.html`, `vite.config.js`) with Tailwind plugin, alongside the backend folders
- [✅] Initialize `package.json`, install core dependencies (`express`, `mongoose`, `dotenv`, `express-session`, `connect-mongo`)
- [✅] Set up `.env` (Mongo URI, session secret, port) and `.gitignore`
- [✅] Run `npm run build` once to generate the initial `dist/` folder
- [✅] Basic Express server with `express.static('dist')`
- [✅] MongoDB connection via Mongoose (`config/db.js`)
- [✅] Session middleware wired up and tested
- [✅] Confirm `npm run dev` (Vite watch) + `node server.js` both run together and changes reflect in the browser
- [✅] Confirm server runs and connects to DB successfully before moving on

## Phase 2: Authentication
- [✅] `User` model: email, hashed password, name, createdAt
- [✅] Install and configure `bcrypt` for password hashing
- [✅] Registration endpoint (`POST /api/auth/register`) — validate input, hash password, create user
- [✅] Login endpoint (`POST /api/auth/login`) — verify credentials, create session
- [✅] Logout endpoint (`POST /api/auth/logout`) — destroy session
- [✅] Auth middleware (`requireAuth`) to protect routes
- [✅] Handle errors: duplicate email on register, wrong password, missing fields
- [✅] Basic register/login HTML pages + JS to call these endpoints
- [✅] Manually test full flow: register → login → access a protected route → logout

## Phase 3: User Profile & Preferences
- [✅] Expand `User` model: `languagesToLearn` (array), `points` (number, default 0)
- [✅] `GET /api/users/me` — return current logged-in user's profile
- [✅] `PUT /api/users/me` — update profile (e.g. add/remove languages)
- [✅] Profile page template (Tailwind-styled) that fetches and displays user data
- [✅] Form/UI to select languages user wants to learn
- [✅] Test: update preferences, refresh, confirm persistence

## Phase 4: Course Content System
*Needs its own dedicated planning session before starting — schema decisions here are hard to reverse later.*
- [✅] Decide: `language` as a string field vs. separate `Course`/`Language` collection referenced by ID
- [✅] Decide: chapter order via `chapterNumber` field vs. ordered array of IDs on parent course
- [✅] Decide: content format — Markdown string vs. array of typed content blocks
- [✅] Decide: do quiz questions live embedded in the chapter doc, or a separate `Question` collection (affects Phase 6)
- [✅] Design final `Chapter` schema based on above decisions
- [✅] Build dynamic route: `GET /api/courses/:language/:chapterId`
- [✅] Build one frontend lesson template (not per-chapter files)
- [✅] Frontend JS: read chapter ID from URL, fetch data, populate template
- [✅] If Markdown: install `marked`, add Tailwind `@tailwindcss/typography` plugin, apply `prose` class
- [✅] Sidebar navigation: list of chapters for the selected language, highlight current chapter
- [✅] "Next chapter" / "previous chapter" navigation
- [✅] Seed a few real chapters of content to test rendering end-to-end

## Phase 5: In-Browser Code Editor
*Needs its own dedicated planning session — flagged as the highest-risk phase. Budget extra time/buffer here.*
- [✅] Research and choose editor component (e.g. CodeMirror or Monaco)
- [✅] Embed editor into lesson template
- [✅] Research sandboxed execution options (e.g. Judge0 API) — check free tier limits, supported languages, rate limits
- [✅] Backend endpoint to relay code to execution service and return output
- [✅] Handle execution errors, timeouts (e.g. infinite loops), and unsupported input gracefully
- [✅] Display output/errors back to the user in the UI
- [✅] Decide whether code examples in Phase 4 chapters link into this editor ("try it yourself" blocks)
- [✅] Test with multiple languages if platform supports more than one

## Phase 6: Quiz System (Adaptive — Level 1)
*Needs its own dedicated planning session.*
- [✅] `Question` schema: language, topic, difficulty (easy/medium/hard), question text, correct answer or expected output, explanation field (for Phase 7)
- [✅] Decide: multiple choice vs. code-based questions (code-based reuses Phase 5's execution engine)
- [✅] User progress schema: per user per topic — `currentScore`, `questionsAnswered`, recent question history (avoid immediate repeats)
- [✅] `GET /api/quiz/next` — select next question based on score thresholds and difficulty bands
- [✅] `POST /api/quiz/answer` — check correctness, update score, return result
- [✅] Define and tune score thresholds for difficulty bands (start simple, adjust after testing)
- [✅] Write/collect a real question bank per language/topic/difficulty (budget real time for this — content, not just code)
- [✅] Quiz UI: display question, capture answer, show result

## Phase 7: Feedback/Explanation Engine
- [✅] Ensure every `Question` document has an `explanation` field (should already exist from Phase 6 schema)
- [✅] On wrong answer, return explanation text alongside the "incorrect" result
- [✅] Display explanation clearly in the quiz UI (not just a red X)
- [✅] Optional: track whether explanations are actually helping (e.g. does the user get the retry right after reading it)

## Phase 8: Points System
- [✅] Award points on quiz completion / chapter completion (decide exact point values)
- [✅] `Cosmetic` schema: id, name, type (background/border/theme), value, pointsCost
- [✅] User inventory: array of owned cosmetic IDs
- [✅] Endpoint to purchase/unlock a cosmetic (deduct points, add to inventory)
- [✅] Endpoint to equip a cosmetic (set as active)
- [✅] Integrate DiceBear for avatar generation/customization
- [✅] Streak tracking: `lastActivityDate` field, logic to detect a missed day
- [✅] Streak freeze: `streakFreezeCount` or `streakFreezeActive`, checked before resetting streak on a missed day
- [✅] Custom code editor themes: store selected theme per user, apply to Phase 5's editor component
- [✅] UI: shop/store page showing available perks, owned vs. lockable, point balance

## Phase 9: Leaderboard / Rankings — ✅ built 2026-08-29
*New feature, added to the plan 2026-08-29, built the same day. Sequenced before UI Polish so the new page is covered by that phase's final consistency pass rather than shipping unpolished.*

Final shape (no scope tabs — an earlier My course/Friends/Everyone split was dropped before build): a `/rankings` page reachable from the sidebar (trophy icon, between Quiz collection and Playground), everyone ranked together platform-wide, three top stat cards (my rank, points this period, quizzes finished this period), a **metric pill** (**Points** / **Streaks** / **Quizzes done**) that switches which column the table is ranked/sorted by, a period tab row (**This week** / **This month** / **All time**), and a ranked table (rank, learner name/handle/avatar, streak, quizzes finished, rank movement vs. previous period, points) with the current user's row highlighted.

- [✅] "Points"/"quizzes done" this period reuses `User.dailyActivityLog`, not a dedicated ledger — the cap was bumped from 14 to 31 entries (`utils/activity.js`'s `ACTIVITY_LOG_MAX_ENTRIES`) specifically so a rolling 30-day "this month" window has enough history to sum over; the home page still only ever displays the last 7. `dailyActivityLog` entries gained a `quizzesFinished` field (incremented alongside `pointsEarned` by `recordActivity(userId, { quizFinished: true })`, called from `quizController`'s round-banking); `User` also gained a `lifetimeQuizzesFinished` counter (mirrors `lifetimePointsEarned`) to back the "All time" view without summing the capped log.
- [✅] No real cron/scheduler was built — "This week"/"This month" are a rolling N-day window computed on read (last 7 or last 30 days including today), not a true calendar week/month reset. This matches the rolling-window simplification `homeController`'s `pointsThisWeek` already made, rather than introducing a second, inconsistent convention.
- [✅] Week/month boundary: rolling window (see above), not calendar-aligned — chosen for consistency with the existing precedent rather than introducing calendar-month day-count edge cases.
- [✅] "Quizzes finished" = banked quiz rounds (the adaptive quiz's 10-question cap being hit and points banking), counted via the same `recordActivity` call site as points banking — never raw questions answered.
- [✅] Streaks metric ranks by `User.currentStreak` directly — a live value, so it reads the same across all three period tabs by design (no separate streak history/reset logic needed).
- [✅] Rank movement is only computed for **period = This week** (↑N / ↓N vs. the immediately preceding 7-day window, diffed from the same `dailyActivityLog` data — no snapshot table needed). It's `null` (rendered as —) for **This month** (would need 60 days of log history against a 31-entry cap) and for the **Streaks** metric (a live value has no distinct "previous period" to diff against).
- [✅] Confirmed platform-wide scope, no My course/Friends split — no "primary track" ambiguity to resolve and no friends/social system needed.
- [✅] Backend: `GET /api/leaderboard?metric=points|streaks|quizzes&period=week|month|all` (`controllers/leaderboardController.js`, `routes/leaderboardRoutes.js`) returns `{ leaderboard, me, metric, period }` — mirrors the `/api/home`/`/api/profile` "aggregate everything in one call" pattern.
- [✅] Ranking is computed live via a `User.find()` + in-memory sort, no denormalized `LeaderboardEntry` collection — fine at current scale; revisit if the user count grows enough to make a full scan/sort per request expensive.
- [✅] Sidebar nav entry — "Rankings" with a new `icons.trophy` glyph, between "Quiz collection" and "Playground".
- [✅] Frontend: stat cards (reusing the Cosmetics page's `.cosmetics-stats-row`/`.profile-card` pattern), metric pill + period tab row (reusing `.filter-pill`), a new `.leaderboard-table`/`.leaderboard-row` component with a highlighted "You" row and up/down/flat movement badges, avatars via the existing `renderAvatar()` helper.
- [✅] `showOnLeaderboard` opt-out respected: `getLeaderboard` queries `{ $or: [{ showOnLeaderboard: { $ne: false } }, { _id: currentUserId }] }` — an opted-out user is excluded from everyone else's view but still sees their own row (and rank) in their own view.
- [ ] Mobile responsive pass — only a minimal breakpoint was added (hides the Streak/Quizzes columns under 700px so Rank/Learner/Move/Points still fit); a fuller pass is deferred to Phase 10 alongside the rest of the app.

## Phase 10: UI Polish
- [ ] Apply consistent Tailwind design system across all pages (colors, spacing, typography)
- [ ] Split-pane layout for lesson pages (content left, editor/output right)
- [ ] Progress indicators: per-chapter completion, per-course progress bar
- [ ] Points/streak counter visible in main navigation
- [✅] Responsive check (mobile/tablet) if time allows
- [ ] Final pass referencing Codecademy/freeCodeCamp for visual consistency

---

## Notes
- Phases 4–6 carry the most technical weight and grading value — don't under-invest time there relative to auth/profile.
- Phase 5 (code editor) is the single biggest risk to timeline — start research early even if implementation comes later.
- UI polish (Phase 10) will realistically happen gradually alongside each phase, not only at the end.
- Phase 9 (Leaderboard) is a late addition on top of the original 9-phase plan, inserted before UI Polish so the new page gets covered by that phase's final pass — weigh its scope (especially the Friends system) against remaining time budget before committing to all of it.
