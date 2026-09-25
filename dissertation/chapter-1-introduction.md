# CHAPTER 1: INTRODUCTION

**Project topic**: Design and Implementation of an Interactive E-Learning Platform for Programming Languages

## 1.1 Overview

This project designs and builds an interactive e-learning platform for programming languages. The finished system is called Codepilot.

The idea is simple. Teach the way a good tutor would: one topic at a time, feedback right away instead of a wall of theory first. A learner picks a language, works through a short lesson, tries the code themselves in a browser-based editor, then gets quizzed on it. The quiz doesn't sit at one fixed difficulty. It watches how the learner is doing on that specific topic and moves the questions up or down to match. Points, a daily streak, and a leaderboard sit on top of that, mostly so coming back tomorrow actually feels worth it.

Six languages are live right now: JavaScript, HTML & CSS, Java, Python, C++, SQL. That's 60 chapters and 188 topics of real content, not placeholder text. Go and Rust are planned but not built yet. What follows in this chapter is why the project exists, the actual problem it answers, what it set out to do, and where its edges are.

## 1.2 Background and Motivation

Nigeria has no shortage of platforms telling people to "learn to code." Video tutorials, PDF guides, YouTube channels, bootcamp ads — the material is everywhere. What's harder to find is somewhere a beginner can read a short lesson, immediately try the code themselves, and get told *why* they got a question wrong instead of just seeing a red X.

Existing options tend to force a trade-off. A site like Codecademy has interactive lessons but locks most of them behind a subscription. freeCodeCamp is free and thorough but reads more like a long-form course than something built around quick feedback loops. YouTube is free and full of good teachers, but it's one-directional — nobody's checking whether you actually understood the closure example five minutes ago. None of the widely-used tools quite combine free access, real practice code execution, and a quiz system that adapts to how the learner is actually doing, in one place.

That gap is where Codepilot started. The idea was to build something closer to a self-paced classroom: pick a language, read a chapter, try the code yourself right there in the browser, get quizzed, and have the quiz get harder or easier based on how you're actually performing — not just three fixed difficulty buttons you pick once and forget.

## 1.3 Statement of the Problem

Beginner programmers learning outside a formal classroom run into a handful of recurring problems:

- Lesson content and practice are usually separate. A learner reads about loops on one site, then has to go copy the example into a completely different tool (or their own machine) just to run it.
- Most quiz or "test yourself" tools use one fixed difficulty. A learner who's already comfortable with the basics gets bored re-answering easy questions; a learner who's struggling gets thrown into questions they're not ready for. Neither gets pushed at the right pace.
- Feedback on a wrong answer is often just "incorrect" — no explanation of why, which means the same mistake gets repeated.
- Free platforms rarely track progress in a way that motivates someone to keep showing up day after day. There's no real cost to skipping a week.

Codepilot was built to address these four points directly: lessons and an in-browser code editor live on the same page, the quiz engine adjusts difficulty per topic based on a learner's streak of right/wrong answers, every question carries a real explanation rather than just a correct/incorrect flag, and points plus a daily streak give a concrete reason to come back.

## 1.4 Aim and Objectives

**Aim**: To design and implement an interactive e-learning platform for programming languages that puts structured lessons, live in-browser code execution, and an adaptive quiz engine in one place, so beginners get more out of it than a static tutorial ever could.

**Objectives**:

1. Build a secure login and profile system, covering language preferences and first-time onboarding.
2. Structure course content across multiple programming languages into chapters and topics a learner can actually navigate.
3. Put a sandboxed code editor inside the lesson page itself, so learners can run real code without opening a separate tool.
4. Build a quiz engine that reads a learner's performance on a topic and adjusts question difficulty accordingly, instead of locking them into one tier.
5. Return a real explanation with every quiz answer, right or wrong, not just a checkmark or an X.
6. Add points, streaks, and unlockable cosmetics to give people a reason to keep showing up.
7. Build a leaderboard so learners can see where they stand against everyone else.
8. Deploy the finished system somewhere live and reachable, so it can actually be tested and demonstrated rather than just run on a laptop.

## 1.5 Significance of the Project

For the student building it, this project is a chance to work through a full-stack system end to end — schema design, session-based auth, a REST API, a build pipeline, and a deployed production instance — rather than a short classroom exercise.

For a learner using the finished platform, Codepilot offers a free, self-contained way to learn a programming language without needing to juggle three different tools: a tutorial site, a separate code sandbox, and a separate quiz app. The adaptive difficulty means the quiz stays useful whether someone's a complete beginner or already has some experience with the language — it doesn't waste their time or overwhelm them.

More broadly, the project is a working example of how gamification (points, streaks, a leaderboard) and adaptive assessment can be combined in a single, relatively small system — something that could inform future coursework, personal projects, or even a production version of the same idea.

## 1.6 Project Risk Assessment

Table 1.1 lists the risks identified before and during development, along with how each was actually handled.

**Table 1.1: Project risks and mitigations**

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Sandboxed code execution (Judge0) proves too complex or unreliable to integrate in the available time | Medium | High | Flagged early as the highest-risk phase in the project plan; research and a working prototype were prioritized before deeper feature work, with extra time budgeted specifically for this phase. |
| Free-tier limits on third-party services (Judge0's ~50 executions/day, MongoDB Atlas, Render's free web service) restrict testing or demo availability | High | Medium | Accepted as a known constraint for a student-scale project; documented rather than worked around, since a paid tier wasn't justified for demonstration purposes. |
| Single developer, fixed submission deadline, and a nine-phase (later ten) scope create schedule risk | High | High | Phases sequenced by grading weight — course content, code execution, and the adaptive quiz were prioritized over polish; UI refinement was deliberately left until after the core system worked end-to-end. |
| Render's free-tier instance spins down after roughly 15 minutes of inactivity, adding a 30–50 second delay on the first request after idling | High | Low | Documented as a known limitation of the free hosting tier; acceptable for a feedback/demo build, flagged as something to revisit if the platform ever needed real always-on availability. |
| Course content (chapters, topics, quiz questions) takes longer to author than the code that renders it | High | Medium | Content is seeded incrementally, language by language, rather than attempting all languages before any one is complete — JavaScript's full question bank was finished first as proof of the pipeline before extending to others. |
| MongoDB connection issues specific to the development machine (DNS resolution failures on `mongodb+srv://`) | Medium | Medium | Diagnosed and resolved by switching to the host-list `mongodb://` connection format instead of the SRV-based URI. |

## 1.7 Scope and Project Organization

**In scope**: user authentication and profiles; a course content system for six programming languages; an in-browser code editor with real sandboxed execution; an adaptive, per-topic quiz engine with explanations; a points, streak, and cosmetics system; a leaderboard; and deployment to a live environment.

**Out of scope**: mobile native apps (the platform is a responsive web app only); real-time collaborative features such as pair programming or live chat; instructor-facing tools like assignment or grading dashboards; and support for Go and Rust content, which remain on the roadmap but are not populated as of this submission.

The rest of this document is organized as follows. Chapter 2 reviews existing learning platforms and related literature. Chapter 3 covers the requirements-gathering process, system design, and architecture decisions. Chapter 4 describes the implementation itself and how it was tested. Chapter 5 closes with a discussion of the results, the project's limitations, and recommendations for future work.
