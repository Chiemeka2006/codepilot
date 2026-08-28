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

## Phase 9: UI Polish
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
- UI polish (Phase 9) will realistically happen gradually alongside each phase, not only at the end.
