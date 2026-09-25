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

## Phase 11: Lecturer Materials — ✅ built 2026-09-16
*New feature, added to the plan 2026-09-16. Sequenced before UI Polish so the new pages are covered by that phase's final consistency pass rather than shipping unpolished.*

Final shape: a second account type (`role: 'student' | 'lecturer'` on `User`) with an entirely separate "Studio" dashboard replacing the whole student experience for that role — a lecturer never sees the student sidebar/home/quiz/leaderboard/cosmetics flow. Lecturers post **materials** (4 types: note and code as Markdown, slides and video as pasted external links — no file upload) which start as drafts and can only be published once the lecturer's account is manually verified. Students (and lecturers) discover published materials on a separate "Browse library" page, not folded into the existing course/chapter tree.

- [✅] Verification is manual, not an in-app admin flow: registering as a lecturer fires an email (via `nodemailer`, `utils/mailer.js`) to the developer's own inbox with the lecturer's name, school email, university, and courses taught; `User.lecturerVerified` (default `false`) is flipped directly in MongoDB. No email is sent back to the lecturer, and no pending/approval UI exists — matches this project's no-admin-workflow scope at this stage.
- [✅] Unverified lecturers get full Studio access and can create/edit/save drafts; only the **Publish** action is gated (`materialController.publishMaterial` 403s if `!lecturerVerified` — the one real server-side enforcement point, not just a disabled button client-side).
- [✅] Materials are one model (`models/Material.js`), not four — `type` distinguishes note/code/slides/video, with `content` (Markdown) required only for note/code and `externalUrl` required only for slides/video, enforced via Mongoose conditional-required validators keyed off `shared/materialTypes.js`'s shared type list (mirrors `shared/cosmeticTypes.js`'s pattern).
- [✅] Slides/video are pasted external links (Google Slides/Drive, YouTube/Vimeo, etc.), not file uploads — Render's free-tier disk is ephemeral (wipes on every redeploy), so no upload storage was built. The material-detail view renders these as a styled link-out card rather than attempting per-provider iframe embeds.
- [✅] `Material.content` (lecturer-authored, rendered to other users via `marked.parse()`) is sanitized through **DOMPurify** before being written to `innerHTML` — unlike existing chapter/lesson content (developer-authored via seed scripts), this is genuine user-generated content and a real stored-XSS surface that didn't exist elsewhere in the app.
- [✅] Auth page additions only, everything else on the existing login/register forms unchanged: a Student/Lecturer segmented toggle sitting in the top-right topbar (to the left of the existing Register/Log in mode-switch pill, reuses `.segmented-control`), a static (non-personalized) tagline under "Welcome back" on login, and two extra register-only fields (University, Courses taught) shown when Lecturer is selected. The toggle is functionally enforced on login, not decorative — selecting the tab that doesn't match the account's actual `role` is a real 403 (`"This is a {role} account — switch to the {Tab} tab."`), matching this project's convention of never shipping a control that pretends to work. (A first pass also added two small read-only status pills below the toggle; removed the same day as redundant once the toggle itself was moved somewhere visible — see the 2026-09-16 adjustment note below.)
- [✅] Lecturer accounts skip the student onboarding gate entirely (`hasCompletedOnboarding: true` set at registration) — the avatar-pick/language-pick flow is a student-only concept with nothing for a lecturer to select.
- [✅] Backend: `routes/materialRoutes.js` + `controllers/materialController.js` under `/api/materials` — `GET /studio` (stats + own material list, same `Promise.all` aggregation pattern as `profileController.getProfile`/`homeController.getHome`), `POST /`, `GET /:id` (own, any status — backs the edit form), `PUT /:id`, `POST /:id/publish`, `POST /:id/unpublish`, `DELETE /:id` (all lecturer + ownership gated via `middleware/requireLecturer.js`), plus `GET /library` and `GET /library/:id` (published-only, open to any authenticated user).
- [✅] Frontend: `renderAppShell()` branches internally on `user.role` to swap the entire sidebar nav (Dashboard/New material/Browse library/Playground + a bottom Profile/Log out/university group) and topbar content (a verified/unverified pill instead of streak/points pills) — Profile and Playground are reused unchanged for both roles since the branch lives inside the shared shell, not at each call site. New pages: `renderStudioPage()`, `renderNewMaterialPage()` (shared create/edit), `renderBrowseLibraryPage()`, `renderMaterialDetailPage()` — reusing `.profile-stat-tile`/`.filter-pill-row`/`.profile-card` throughout rather than inventing new layout primitives.
- [✅] **2026-09-16 adjustment pass**, reviewed against a real mockup the same day as the initial build: removed the two auth-page status pills entirely (kept just the functional toggle, moved into the topbar); simplified the sidebar's bottom card to show only the university name, no Verified/Unverified badge (the topbar's own verified pill is the only place that status still shows for a lecturer); removed the entire "student views"/`viewCount` concept end-to-end — schema field, all API response fields, the Studio stat tile, and every "X views" label in the UI — not hidden, actually deleted from the model and controllers; relabeled the sidebar's nav item "Studio" → "Dashboard" (scoped to just that label — the topbar breadcrumb and the page's own eyebrow text still say "Studio," flagged to the user rather than silently left inconsistent). Also fixed a layout bug this pass introduced: moving the toggle into the topbar, combined with the taller lecturer Register form, made "Create your account" overlap the topbar at *desktop* widths, not just the mobile case already handled — fixed by making the existing top-align-plus-reserved-clearance trick unconditional instead of mobile-only.
- [✅] **"View as student" toggle, added 2026-09-25**: a `Student dashboard` sidebar item in the lecturer shell, and a `Lecturer dashboard` item at the top of the student shell (only when `user.role === 'lecturer'`), let a lecturer click through the real student experience using their own account's data — a purely client-side rendering switch (`viewingAsStudent` module-level boolean gates both `render()`'s dispatcher and `renderAppShell()`/`bindAppShell()`'s `isLecturer` check), not a real role change — no backend calls, the session/role stay untouched. Not persisted; resets on logout and on refresh, same as this app's other in-memory-only UI state.
- [ ] Mobile responsive pass — not yet done for the Dashboard/New material/Browse library pages; deferred to Phase 10 alongside the rest of the app.

## Phase 12: Student Verification — ✅ built 2026-09-22
*New phase, added and built the same day, addressing two real risks with a free-for-students app: non-students registering with fabricated student details, and graduated students continuing to use it indefinitely.*

Final shape: student registration now requires a `@bazeuniversity.edu.ng` email, a photo of the student's ID card, and its expiration date. Scoped to Baze University only for now (an explicit, temporary restriction, not a permanent architectural limit) and to the student role only — lecturer registration is untouched.

- [✅] Email domain check (`authController.register`): rejects any student registration whose email doesn't **end with** `@bazeuniversity.edu.ng` (deliberately `endsWith`, not a naive `includes`, which would let something like `fake@bazeuniversity.edu.ng.evil.com` through) with a 400 carrying a `code: 'invalid_domain'` field alongside the message — not just for lecturers, since the frontend needs to distinguish this one error case from every other registration failure without string-matching message text.
- [✅] ID card photo is stored as a base64 data URI directly on `User.idCardImage` (`models/User.js`), not uploaded to a file host — Render's free-tier disk is ephemeral (the same reasoning that made Phase 11's Material slides/video external links instead of uploads), but a personal ID photo has no natural public URL to link to the way a slide deck does, so it goes straight into MongoDB instead. Capped at 5MB raw (checked both client-side before reading the file, and server-side via the base64 string's length) to keep the User document reasonable; `express.json()`'s body-size limit had to be raised from Express's 100KB default to `8mb` (`server.js`) to even accept a request this size.
- [✅] Verification is manual, mirroring the lecturer flow exactly: registration succeeds and grants full access immediately, no in-app "pending" gate. `User.studentVerified` (default `false`) exists purely as a bookkeeping flag for the developer — it does not gate any in-app action today (unlike `lecturerVerified`, which gates Publish) — flipped manually in MongoDB after reviewing the emailed ID card. `utils/mailer.js#sendStudentVerificationEmail` attaches the actual ID card image to the email (decoded from the data URI) so the developer can review it straight from their inbox, since no admin UI exists to view it any other way.
- [✅] Expiration date **is** automatically enforced, unlike the manual-only `studentVerified` flag: rejected outright at registration if already in the past, and checked again at every login (`authController.login`) — an account whose card has expired gets a 403 with a message to contact the team, even though the password was correct. This is only checked at login, not on every subsequent request, so an already-active session can still ride out up to 7 days (this project's cookie `maxAge`, `middleware/session.js`) past expiry before the student is forced to re-authenticate and gets blocked — a known, deliberate gap, not an oversight.
- [✅] Expiration is captured as **month/year only** (`<input type="month">`, sends `"YYYY-MM"`), not a full date — real ID cards don't print a specific day. The card is valid through the *end* of that month, so `authController.register` resolves it to the last instant of the given month in UTC (`Date.UTC(year, month, 0, 23, 59, 59, 999)` — day `0` rolls back to the last day of the *previous* month relative to the 0-indexed `month` argument, which lands exactly on the picked month's last day), not `new Date("YYYY-MM")` directly, which would parse to the 1st and make a card look expired a full month early.
- [✅] Frontend: the register form's student path (`renderRegisterForm()`) adds a file input (`accept="image/*"`, no `name` attribute — deliberately excluded from `FormData` since a `File` object isn't JSON-serializable) and a month input for the expiration. The file's `change` handler reads it via `FileReader.readAsDataURL()` into a module-level `registerIdCardImageDataUri` variable and updates a status line by mutating the DOM directly rather than calling `render()` — same reasoning as the existing password-visibility toggle: a full re-render would wipe every other field the user has already typed. `handleAuthSubmit` attaches that variable to the payload manually.
- [✅] The domain-mismatch error is the one registration failure shown as a toast (`showErrorToast()`) instead of the usual inline `error-text`, per an explicit ask to make it "like the avatar-equipped notification." Uses the existing **error**-styled toast (red border/alert icon), not literally the green success-toast style the avatar-equip example uses — chosen to preserve this project's own standing convention (documented above) that toasts are success-only and errors get inline text; this is the one deliberate exception, done via the sibling error variant rather than breaking the convention outright. Detected via the `invalid_domain` error `code` (see above), not by matching the message string.
- [✅] **Gotcha found and fixed while building this**: `renderToasts()`/the toast-close binding were only ever wired into `renderAppShell()` (the authenticated shell) — `renderAuthPage()` builds its own HTML independently and never included the toast stack at all, so `showErrorToast()` correctly updated the `toasts` array but nothing ever rendered it on the logged-out auth page. This went unnoticed until this feature needed a toast to fire from an unauthenticated screen for the first time. Fixed by adding `${renderToasts()}` and the `[data-toast-close]` binding to `renderAuthPage()` itself, mirroring `renderAppShell()`'s copies. Any future toast triggered from a logged-out page now works; before this fix it silently no-op'd.
- [ ] No self-service ID renewal flow exists — an expired student is told to "contact the CodePilot team," not given an in-app way to re-upload a new ID. Deliberately not built; a real answer if this becomes a recurring need.
- [ ] Scoped to Baze University only, hardcoded as a single domain string (`authController.js`'s `STUDENT_EMAIL_DOMAIN`) — extending to other universities would need this to become a list/lookup rather than one constant.

## Phase 13: Phone/OTP Verification — ✅ built 2026-09-25
*New phase, built the same day. A second, independent proof of "this is a real person" alongside Phase 12's ID card — inserted as a new onboarding step, students only, right before the existing avatar pick.*

Final shape: registered students must verify a Nigerian phone number via a 4-digit SMS OTP (Termii) before reaching the avatar/language onboarding steps that follow it — onboarding is now 3 steps, not 2.

- [✅] The dispatcher (`renderOnboardingPage()`) gates on the real, persisted `user.phoneVerified` flag, not a step counter — `!user.phoneVerified` shows the phone step regardless of `onboardingStep`'s value, so a student who verified in a past session but didn't finish avatar/language selection skips straight past it on their next visit rather than being sent (and charged for) another OTP. The avatar/language steps underneath still restart from scratch on refresh exactly as before Phase 13 — only the phone step got this real-persistence treatment, since it's the only one with a genuine per-attempt cost.
- [✅] SMS delivery via **Termii** (`utils/sms.js`, new file, no new npm dependency — built on Node's native `fetch`), chosen over Twilio for Nigerian delivery reliability/pricing, matching the existing Baze-Nigeria scope. `TERMII_API_KEY`/`TERMII_SENDER_ID` in `.env` (`TERMII_SENDER_ID` falls back to Termii's shared `'N-Alert'` sender, usable without a separate approval step). Unlike `utils/mailer.js`'s fire-and-forget verification emails, this is **awaited** and throws on failure — a student can't proceed without the code actually arriving, so a silent failure here isn't acceptable the way a failed review-email is. Verified against the real Termii API during testing (no key configured yet): the request reached Termii and got back `"A valid API key is required"`, confirming the request shape itself (endpoint, JSON body fields) is correct.
- [✅] Phone numbers are normalized to E.164 (`+234...`) server-side (`phoneVerificationController.js`'s `normalizeNigerianPhone`) from any of the common Nigerian input formats (`080...`, `234...`, `+234...`) before being stored or sent to Termii — never the raw user-typed string.
- [✅] Anti-abuse, since each OTP send costs real money: a 60-second resend cooldown (`User.phoneOtpSentAt`, 429 if violated), a 10-minute expiry (`User.phoneOtpExpiresAt`), and a 5-attempt cap per code (`User.phoneOtpAttempts`) after which a fresh code must be requested. The OTP itself is stored in plain text on `User.phoneOtpCode`, not hashed — a 4-digit code with a 10-minute lifespan and the above caps was judged low-enough stakes that hashing buys little over those protections already in place.
- [✅] New `User` fields: `phoneNumber`, `phoneVerified`, plus the pending-OTP state (`phoneOtpCode`/`phoneOtpExpiresAt`/`phoneOtpAttempts`/`phoneOtpSentAt`) — the latter four cleared back to null/0 the instant verification succeeds. Only `phoneNumber`/`phoneVerified` are exposed via `toPublicJSON()`; the OTP fields never need to reach the client.
- [✅] New endpoints on the existing `routes/userRoutes.js` (not a separate route file — phone number is a User-resource concern like `/api/users/me`): `POST /api/users/phone/send-otp` and `POST /api/users/phone/verify-otp`, both behind the router's existing `requireAuth`.
- [✅] Frontend: `renderOnboardingPhoneStep()` in `src/main.js` (structured like the existing `renderOnboardingAvatarStep()` — same topbar/eyebrow/progress-bar shell), a single 4-digit text input (not four separate auto-advancing boxes — kept simple), phone-number and OTP fields update their module-level state on plain `input` events without calling `render()` (same reasoning as the ID-card file input in Phase 12: re-rendering mid-typing would fight the user). The existing two onboarding steps were relabeled "Step 1/2 of 2" → "Step 2/3 of 3" respectively; the new step is "Step 1 of 3."
- [✅] Verified end-to-end against a real MongoDB instance and the real Termii API (invalid phone format rejected; valid format reaches Termii and fails cleanly on the missing API key, not a crash; wrong OTP code rejected and increments `phoneOtpAttempts`; correct code sets `phoneVerified: true`; expired code rejected; resend within the cooldown window 429s) and visually in a real headless-Chromium pass (the phone step's initial state, its error state after a failed send, and an already-verified account skipping straight to "Step 2 of 3").
- [ ] Scoped to Nigerian phone numbers only (`normalizeNigerianPhone`), matching the existing Baze-Nigeria assumption — not asked about explicitly, a reasonable-call extension of Phase 12's own scoping.
- [ ] No live client-side countdown on the resend cooldown — clicking "Resend" before the 60s window elapses just surfaces the server's 429 message; no ticking timer UI was built.

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
