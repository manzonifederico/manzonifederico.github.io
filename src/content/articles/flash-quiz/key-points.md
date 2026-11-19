## Context

- Bachelor’s thesis project (University of Trento, academic year 2023/2024) and a 375-hour internship, with Federica Gini and Antonio Bucchiarone (FBK).
- **My role:** the only UX/UI designer. I planned and ran the user research and designed the experience, the interfaces and the gamification, with review meetings with the team.
- **Task:** completely redesign PolyGlot, a gamified app for learning programming. The redesign became Flash Quiz.
- **Method and tools:** user-centered design and the Double Diamond; Figma with Material Design 3; Octalysis and GamiDoc.

## From PolyGlot to Flash Quiz

- Research showed students wanted a tool **beyond programming**, so Flash Quiz became a gamified platform for any university course.
- **Student goals:** motivation and engagement, better learning, **cooperation over individual competition**, fewer drop-outs, self-confidence, a safe environment, self-assessment.
- **Teacher goal:** monitor how the class is learning, to adapt teaching with informed choices.
- Compared with PolyGlot: richer game elements and a careful **balance of intrinsic and extrinsic motivation**.

## Research: domain and competitors

- **Stakeholders:** students and teachers (primary users), the university (tertiary, decides adoption).
- **Domain model:** university study spaces and activities around lectures, study and revision.
- **Benchmark:** 22 solutions, 13 gamified; none covered the whole idea. Closest: Kahoot, Outgrow, Gimkit, Centrical.
- **Gaps found:** analytics limited or teacher-only, no concept of a class, little feedback for learners, products aimed at children or companies.

## Research: surveys and interviews

- **Student survey, 163 responses:**
  - flashcards widely used; 40% study in groups;
  - they want no pressure, explanations of mistakes, contact with teachers (even anonymous), varied question types;
  - content creation divisive (40% yes, 27% no); cooperation welcome, mixed feelings on competing for a score.
- **Teacher survey, 71 responses:** they want detailed data on understanding (by topic, over time) and student feedback; competition and grading through the app are unpopular.
- **Student interviews, 7 (saturation reached):** gamified apps get boring and too easy; competition can hurt self-esteem; they prefer collaboration and supervised competition.
- **Teacher interviews, 2 (no saturation):** little time; gamification not well known; open to AI-generated content if they can check it.

## Defining the problem

- **Student personas:** Marco (model student), Laura (working student), Camilla (shy student), each with usual, negative and positive scenarios.
- **Teacher personas:** Giorgio (attentive teacher), Martina (busy researcher); ten teacher pain points.
- **Key pain points:** fear of judgment, needing explanations, not knowing where you stand; for teachers, not knowing which topics are hard and having little time.

## A change of plan

- Project constraints → merged develop and deliver, **skipped testing and wireframes**, went straight to high-fidelity mockups. Faster, but no early validation.
- **Material Design 3**, chosen for practicality (known, documented, Figma library, dev resources), accessibility and flexibility (many components heavily customized).
- Functional requirements first: students, teachers, courses, quizzes, teams, groups.

## Designing for students

- **PC and phone**; six sections: courses, quizzes, analytics, groups, search, profile.
- **Courses first** in the navigation, as the expected most-used section; navigation rail on PC, bar on mobile.
- **Course page:** ongoing quizzes (count for the leaderboard), expired quizzes, free quizzes (never count), team and leaderboard, personal analytics with **answers, solutions and explanations**.
- **Flashcards** for memorization, **students only**: self-reported answers don’t fit competition.
- **Quiz creation:** import (then approve or delete) or create from scratch, with optional AI help.
- **Study groups:** practice with friends, separate from the institutional space, equal rights for everyone.
- **Profile:** badges, trophies and visibility settings for profile and quizzes.

## Designing for teachers

- **Large screens only** (tablet and PC); no study groups.
- **Analytics:** participation, satisfaction, understanding overall and by topic, speed and detailed answer data, filterable by course and quiz.
- **Students only ever see their own data**, never other students’.
- **Course creation flow:** info → administrators and permissions → access and students → quizzes, game rules, materials and teams.

## Gamification

- **Core mechanics:** timed quizzes; points by difficulty (5/10/16/25) with penalties and streak bonuses; leaderboards.
- **In courses, teams compete, not individuals.**
- **Boosters balance competition:** positive ones for whoever is last (or random), negative ones with a 15% chance for the top.
- **Elements across all 8 Octalysis core drives:** badges, progress bars, avatars, dynamic feedback, friending, group quests, trophy shelf, countdowns, streaks and more.
- Ranked quiz results stay hidden until the end: it keeps students going and partly prevents cheating.
- **Octalysis score: 169**, a good balance of white hat and black hat drives. All dynamics documented in GamiDoc.

## Testing plan

- No testing within the project, due to time.
- **Planned:** (1) heuristic evaluation with UX/UI designers (fast, and brings the expert feedback I lacked); (2) observations with real users to calibrate the scoring; (3) SUS and/or UEQ.

## Reflections

- Most of the system and its dynamics are designed; students and teachers share five adapted sections.
- **Hardest part:** being the only designer, with little specialist feedback; I worked almost completely on my own.
- **Limitations:** no user testing yet, teacher research incomplete, Material Design 3 not ideal for a game-like product.
- **Next:** run the tests, more teacher interviews, a game-oriented design system, sound design.
- **Lessons:** the value of a design team and peer feedback, not underestimating project size, how hard recruiting participants can be.
