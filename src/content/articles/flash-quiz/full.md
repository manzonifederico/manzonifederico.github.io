## Context

Flash Quiz is the project behind my bachelor’s thesis in *Interfacce e Tecnologie della Comunicazione* (Department of Psychology and Cognitive Sciences, University of Trento, academic year 2023/2024). It started in late October 2022, when Federica Gini (PhD student at the University of Trento and Fondazione Bruno Kessler) and Antonio Bucchiarone (senior researcher in FBK’s MoDiS unit) asked me to join PolyGlot, a gamified app for learning programming, as its **UX/UI designer**.

- **My role:** the only UX/UI designer on the project. I planned and ran the user research, defined the problem, and designed the experience, the interfaces and the gamification. I checked progress with the rest of the team in several review meetings.
- **Format:** a 375-hour internship starting in November 2022; overall the project took almost a year, through to the thesis.
- **Method:** user-centered design, following the Double Diamond.
- **Tools:** Figma with Google’s Material Design 3, the Octalysis tool and GamiDoc for the gamification design.

After a first meeting, we agreed that my task would be to **redesign the app completely**. That redesign became Flash Quiz.

## From PolyGlot to Flash Quiz

PolyGlot started as a gamified, notebook-like environment for learning high-level programming languages such as C#. Other students had later turned it into a mobile app for computer science courses. Its gamification was fairly simple: multiple-choice quizzes earned experience and bonus points, bonus points bought in-quiz help, and scores fed a leaderboard, levels and badges.

The user research I ran in the first phase of the internship changed the scope: **students wanted a tool that went beyond learning programming languages**. So I started designing a gamified platform that could support teaching in any university course, with two sides:

**For students**, Flash Quiz should:

- motivate and engage them in individual study and in class;
- improve learning of what is covered in lectures;
- encourage cooperation and discourage competition between individuals;
- reduce course drop-out by increasing engagement;
- build self-confidence and protect students from unpleasant situations;
- help them understand their own level through self-assessment.

**For teachers**, it should be a way to monitor how the class is learning, so they can make informed choices about adapting their teaching.

Compared with PolyGlot, Flash Quiz also had to include more (and more complex) game elements, and to **balance intrinsic and extrinsic motivation** much more carefully.

## Research: domain and competitors

**Stakeholders.** I started the first diamond by mapping who is involved:

- **Students** (primary users): they gain targeted practice and insight into their own performance, but risk discomfort from competition and judgment by peers and teachers.
- **Teachers and teaching assistants** (primary users): they gain a view of how their students are learning, where they struggle and when to adjust their teaching, but face possible adoption and usability problems.
- **The university** (tertiary user): decisive for adoption; it gains more effective teaching but bears the cost of the system.

**Domain.** I modelled the university learning domain, focusing on study spaces and on the activities around lectures, studying and revision.

**Benchmark.** I analysed **22 similar solutions** (learning management systems and tools for creating lessons, quizzes and exams); 13 of them had some gamification. None matched the full idea: they overlapped only on parts such as quiz creation, analytics or class management. The four closest were:

| Product | Strengths | Gaps for our goals |
|---|---|---|
| Kahoot | Engaging, easy to share quizzes | Analytics limited to single quizzes and only for teachers; no concept of a class |
| Outgrow | Strong analytics on how users interact with content | Not designed for teaching; no feedback for users; expensive |
| Gimkit | Great variety of games, simple UI, some data for students | Aimed at children; gamification perhaps too extrinsic; little feedback |
| Centrical | Extensive gamification, personalised learning paths, AI analytics | Built for companies; limited feedback to users |

## Research: surveys and interviews

**Why surveys first.** To reach as many people as possible, I started with two online surveys, one for students and one for university teachers.

**Students: 163 responses** from Italian students at different universities, collected over one month through direct contact, word of mouth and university forums. The 28 questions (12 multiple-choice, 11 open-ended, 5 Likert-type items) covered study habits, tools, expectations for Flash Quiz and feelings about competition.

- **Flashcards** are widely used for revision and memorization, and **40% of respondents study in groups**.
- Apps like Quizlet, Duolingo and Anki are used only occasionally; reasons include losing “lives” and not wanting to create their own content.
- Students asked for **a pressure-free environment, explanations when they get something wrong, interaction with teachers (even anonymously) and varied question types**.
- **Creating content is divisive:** 40% would like to create and share content, 27% would rather not.
- Students want to **cooperate**, sharing content and working together. Most find some competition useful, but opinions on competing for a score were mixed.

**Teachers: 71 responses** from Italian university teachers, collected over about two months. The 20 questions (10 closed-ended, 8 open-ended, 2 Likert-type items) covered teaching methods, classroom tools and expectations for Flash Quiz.

- Most prefer teaching with audio and video materials, and many are open to interaction with students during lectures.
- They want **detailed data on students’ preparation and understanding**, by topic and over time, and **feedback from students**.
- **Competition between students and grading through Flash Quiz were not popular.**

**Interviews.** To go deeper, I followed up with semi-structured interviews and a thematic analysis.

- **Students (7 interviews, saturation reached).** Most had used gamified learning before, mainly for languages. Exercises quickly became boring and too easy, and social or competitive features were often ignored as not useful. They had reservations about competition: it can hurt self-esteem, so they tend to avoid it, prefer collaborating in groups and suggested that someone should supervise any competition.
- **Teachers (2 interviews, no saturation).** Time and availability limited me to two interviews. Both teachers feel very busy and short on time and value constructive feedback, though only one actively looks for it (for example with informal quizzes at the end of a topic). Gamification was not well known: both saw its value, but only one felt confident applying it to their subject, while the other feared it could make lessons less serious. Both were **in favour of AI helping to create content, as long as they could check its output**.

## Defining the problem

I turned the research into **pain points** and **personas** for each side, with three scenarios per persona (usual, negative and positive) to describe their actions and emotions.

**Students: three personas.**

- **Marco, the model student:** independent, always optimizing his time, wants to know exactly where he stands with his study.
- **Laura, the working student:** can’t attend every lecture, studies with a close group of friends, loves trivia nights and a bit of competition.
- **Camilla, the shy student:** uncomfortable with direct interaction and with being judged; values privacy and prefers collaboration over competition.

Examples of student pain points: *“I need explanations when I get something wrong”*, *“I’m afraid my classmates might judge me”*, *“Comparing myself to my classmates makes me feel bad”*, *“I can’t tell whether I know a topic or not”*.

**Teachers: two personas and ten pain points.**

- **Giorgio, the attentive teacher:** cares about engaging lessons, but often can’t tell whether silence means lack of interest or lack of understanding.
- **Martina, the busy teacher:** an astrophysicist absorbed by research, who has little time to prepare and share materials or to talk with students.

Examples of teacher pain points: *“I can’t understand which topics are hardest for my students”*, *“I have little time to prepare questions to ask my students in class”*, *“I struggle to understand when to adapt my teaching”*.

## A change of plan

When I presented the results of the define phase, some project constraints emerged and we had to **adapt the process**: we merged the develop and deliver phases, skipped the testing rounds and **went straight from requirements to high-fidelity mockups, without wireframes**. It was a real trade-off: faster progress, but no early validation of the concepts (more on this in the testing plan and reflections).

**Design system: Material Design 3.** Designing mockups straight away meant choosing a design system first. I picked Google’s Material Design 3 for both sides of the app because of:

- **Practicality:** I already knew it, and it has clear documentation, a Figma component library and resources for developers.
- **Accessibility:** it is designed to be usable by everyone, whatever their abilities or device.
- **Flexibility:** it adapts to different devices and can be customized, which mattered because I customized many components heavily.

**Functional requirements.** Before the mockups, I defined entities, attributes, functions and flows valid for both sides: students, teachers, courses, quizzes, teams and study groups.

## Designing for students

The student side works on both **PC and phone** and has six main sections: courses, quizzes, analytics, groups, search and profile.

**Navigation.** Navigation starts from **Courses**, because I expected it to be the most used section: it leads to the course quizzes and to the teacher’s materials. A navigation rail on PC and a navigation bar on mobile give access to the other sections.

**Courses.** Each enrolled or saved course is a card with a small analytics card next to it. Chips filter between an analytics overview, course notifications and suggested courses. Inside a course, students find the teacher, a description and materials, plus three tabs:

- **Quizzes:** *ongoing quizzes* count towards the course leaderboard and move to *expired quizzes* when they close; *free quizzes* never affect the competition.
- **Team and leaderboard:** your team’s data and ranking, or the option to join a team.
- **Analytics:** your own performance in the course, with the option to open any quiz and review your answers, the solutions and their **explanations**, which students had asked for.

**Quizzes and flashcards.** Students and teachers manage quizzes the same way, with three differences:

- When a teacher plays a quiz, it is only a **simulation** and doesn’t affect any data; when a student plays it, their analytics update.
- **Flashcards** (a term, question or image on one side and the answer on the other) are a quiz type for memorization, and the survey showed how much students already use them. They are **only for students**, because they rely on users honestly reporting whether they got the answer right, which doesn’t fit competitions.
- Students add quizzes to their study groups; teachers add them to their courses.

**Creating a quiz.** Users can **import** a quiz made elsewhere, then approve or delete it, or **create** one from scratch: basic info, rules such as duration, then as many questions as they like, with optional help from AI.

**Study groups.** Groups let students practise with friends in a space separate from the institutional one, doing as many quizzes and flashcards as they want. All members have the same rights, and a group leaderboard drives friendly competition and the boosters (see Gamification).

**Search and profile.** Students can search courses, people, quizzes and institutions, then add friends, save other people’s quizzes or join courses. The profile holds contacts, username, badges and trophies, and **visibility settings** for the profile and personal quizzes.

## Designing for teachers

For teachers I repeated the same steps: pain points, personas, then interfaces. The teacher side is designed for **large screens only** (tablet and PC). Navigation stays almost the same, but teachers have no study groups and get different functions inside each section.

**Analytics.** Detailed data on their students was the teachers’ main request in the survey. Teachers get one place with an overview of all their courses and quizzes, filterable by course and quiz: **participation, satisfaction, overall and per-topic understanding, speed on quizzes and questions**, and detailed answer data (total, correct and wrong answers, averages and average completion time). Students see the same kinds of data, minus participation and satisfaction, and **only about themselves, never about other students**.

**Course management.** Teachers can filter between courses they own and courses they co-manage. Unlike students, they can create and fully manage courses. The creation flow covers:

1. basic info (name, description, photo);
2. administrators and their permissions;
3. access rules and adding students (invite link, list import or e-mail);
4. quizzes, game rules, teaching materials and teams.

Search works as on the student side, with fewer filters and a single entry point; profiles also let teachers control the visibility of their courses.

## Gamification

The gamification builds on Self-Determination Theory and the Octalysis framework, and its main goal is to balance intrinsic and extrinsic motivation. It rests on **three core mechanics**:

- **Quizzes:** timed sets of questions. A question counts as correct only if all its correct answers are selected; if time runs out, it counts as wrong.
- **Points:** four difficulty levels (easy 5, normal 10, hard 16, extremely hard 25). Extremely hard questions are optional and cost 15 points if wrong. Getting half the questions wrong costs 50% of the quiz’s maximum score, getting all wrong costs 75%. Bonuses reward streaks (+5 every 5 correct answers in a row) and perfect quizzes with extremely hard questions (+25%).
- **Leaderboards:** in **courses, teams compete, not individuals**: a team’s position is the sum of its members’ points. Study groups and single quizzes have their own leaderboards.

**Boosters keep competition balanced.**

- **Positive boosters** go to whoever finishes last in a quiz, or randomly to others. They give more time, more points or an extra attempt on one answer in the next quiz.
- **Negative boosters** have a 15% chance to hit part of the top of the leaderboard: less time, extra wrong options or halved points.

**Game elements, by Octalysis core drive:**

- **Accomplishment:** badges, status points, progress bars (also during quizzes), quest lists and celebration messages.
- **Ownership:** a badge collection and avatars for users and teams.
- **Empowerment and feedback:** dynamic feedback on speed and correctness in quizzes that don’t count for the leaderboard, plus boosters.
- **Social influence:** friending, group quests, a trophy shelf and the option to send appreciation to other users.
- **Unpredictability:** random rewards (the boosters).
- **Scarcity:** teachers publish quizzes at a regular pace (appointment dynamic), boosters only appear in some contexts, countdown timers, and results of ranked quizzes are hidden until the end. That last one motivates students to finish and partly prevents cheating.
- **Avoidance:** fear of finishing last, bonuses you only get by answering a set number of questions, or specific ones, correctly, and streaks for completing the teacher’s quizzes on time.

With the Octalysis tool, Flash Quiz scored **169**, which I read as a good balance between intrinsic and extrinsic motivation and between white hat and black hat drives. I documented all the game dynamics in a **GamiDoc** game design document, also classifying the elements with Toda and colleagues’ taxonomy.

## Testing plan

There was no time to test the design within the project, so I wrote a **three-step testing plan** for the next phase:

1. **Heuristic evaluation with UX/UI designers.** It fits the available resources, gives a lot of information faster than user testing, and provides the expert feedback that was missing while I was the only designer.
2. **Observing real users.** After fixing the issues found, observations would help calibrate the gamification, for example tuning the points so the competition is really balanced. It costs more time, but it is the way to check the system serves its goals.
3. **SUS and/or UEQ questionnaires.** A quick final check on perceived usability (SUS) and on the pragmatic and hedonic quality of the experience (UEQ).

## Reflections

**Where it landed.** Flash Quiz became a design for two connected products, with most of the system and its dynamics defined. Students and teachers share five similar sections (search, profile, quizzes, courses and analytics), each adapted to what that user needs.

**What was hard.** Flash Quiz was a big project for a single UX/UI designer who was also studying. There were several meetings with the team, but having no other designers made every design choice harder, because I had no feedback from specialists. Working almost completely on my own was the real challenge.

**Limitations.**

- **No user testing yet**, so I can’t say for sure that the goals are met.
- **Teacher research is incomplete:** two interviews were useful but not enough to reach saturation.
- **Material Design 3 may not be the right long-term fit.** Its benefits still hold, but a game-oriented design system would suit the game elements better.

**Next steps.** Run the testing plan, finish the teacher research, explore a game-oriented design system, and add sound: a sound designer could shape the audio feedback in line with the rest of the experience.

**What I learned.** How valuable a team of designers is, and how much other designers’ feedback and points of view matter. Not to underestimate the size of a project. How hard it can be to find research participants. And that a project that looks too big at first can still be finished if you keep at it.

If you read Italian, you can find every detail in my [thesis](https://drive.google.com/file/d/1FEaaHt9ezt3WotnWDX57iLKIiOJUn3YF/view?usp=sharing). Curious about something else? Drop me a message on [LinkedIn](https://www.linkedin.com/in/federico-manzoni-936103217/) or [e-mail me](#contact) :)
