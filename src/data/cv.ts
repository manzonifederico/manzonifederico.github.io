// CV content shown in the "My CV" section of the home page, in English and Italian.
// Source: Federico's most recent CV (GameUR version, 2026), plus older entries it leaves out for space.
// To edit: change the text below (both languages), save, and the site updates.
// `summary` and `bullets` may contain simple HTML (<strong>, <em>, <a>).
import type { Lang } from '../i18n/ui';

export interface TimelineItem {
  title: string;
  org?: string;
  /** Dates shown in the left column, top and bottom line, e.g. ['09/24', 'Present'] */
  dates?: [string] | [string, string];
  summary?: string;
  bullets?: string[];
  link?: { label: string; href: string };
}

export interface CvSection {
  id: string;
  title: string;
  items?: TimelineItem[];
  /** Skills-style section: columns of plain lists */
  lists?: { title: string; items: string[] }[];
}

const ECIU =
  'https://engage.eciu.eu/learning-opportunity/a9b78ad0-113c-4f3b-bb43-2035543a522a/foundations-of-inclusive-systems-design-ss2526';
const UXC = 'https://www.trentinoinnovation.eu/innovate/innovation-tools/ux-challenge/?lang=en';
// ACM Reference Format (details from the DOI record on Crossref); Federico's name in bold.
// Authors are wrapped in .pii-name so reviewer mode blurs them.
const ACM_REF =
  '<span class="pii pii-name">Lorenzo Zambotto</span>, <span class="pii pii-name">Simone Bassanelli</span>, <strong><span class="pii pii-name">Federico Manzoni</span></strong>, <span class="pii pii-name">Antonio Bucchiarone</span>, and <span class="pii pii-name">Annapaola Marconi</span>. 2026. How Game Elements Structure Educational Learning Paths: A Literature Review. In <em>Proceedings of the 10th Annual International GamiFIN Conference 2026 (GamiFIN 2026)</em>, Saariselkä, Finland. ACM, New York, NY, USA, 13 pages. <a href="https://doi.org/10.1145/3789624.3789648">https://doi.org/10.1145/3789624.3789648</a>';

/** Short profile shown under the name in "My CV" */
export const cvProfile: Record<Lang, string> = {
  en: 'I’m a UX Researcher with a CS background and an MSc in Human-Computer Interaction. Experienced in designing and conducting user research to discover needs and constraints, and in evaluating interactive systems through usability testing. Passionate about <strong>Game UX</strong>, particularly player motivation, the feeling of being stuck, progression, and engagement in narrative-driven single-player open worlds. I’m currently a visiting researcher at the HCI Games Group and the Games Institute (University of Waterloo), where my master’s thesis looks at re-onboarding in video games. I’m interested in continuing with a PhD in games user research.',
  it: 'Sono uno UX Researcher con un background in informatica e una laurea magistrale in Human-Computer Interaction. Ho esperienza nel progettare e condurre user research per scoprire bisogni e vincoli, e nel valutare sistemi interattivi tramite usability test. Mi appassiona la <strong>Game UX</strong>, in particolare la motivazione dei giocatori, la sensazione di essere bloccati, la progressione e l’engagement negli open world single-player guidati dalla narrazione. Al momento sono visiting researcher all’HCI Games Group e al Games Institute (University of Waterloo), dove la mia tesi magistrale studia il re-onboarding nei videogiochi. Mi piacerebbe proseguire con un dottorato in games user research.',
};

const CASE = (slug: string, lang: Lang) => ({
  label: lang === 'it' ? 'Leggi il caso studio' : 'Read the case study',
  href: lang === 'it' ? `/it/work/${slug}/` : `/work/${slug}/`,
});

export const cvByLang: Record<Lang, CvSection[]> = {
  en: [
    {
      id: 'education',
      title: 'Education',
      items: [
        {
          title: 'MSc in Human-Computer Interaction',
          org: 'University of Trento, Italy',
          dates: ['08/24', '03/27'],
          summary:
            '<strong>Focus:</strong> user-centered design, inclusive design, qualitative & quantitative user research, and UX evaluation metrics.',
          bullets: [
            `<a href="${ECIU}">Challenge on inclusive design</a> at Lodz University of Technology (02/26 – 05/26): ECIU challenge-based programme on inclusive, user-centred technologies (VR/AR, wearables, social robotics)`,
            `<a href="${UXC}">UX Challenge</a> at Innovation Hub Trentino (from 05/26)`,
            '<strong>Extra relevant modules:</strong> Game Design Fundamentals - S. Bassanelli (attending), Prototyping Interactive Systems, Decision making processes and digital nudging, Mind and Interaction in Extended Reality (XR).',
          ],
        },
        {
          title: 'Visiting Graduate Researcher, Human-Computer Interaction',
          org: 'University of Waterloo, Canada',
          dates: ['09/26', '01/27'],
          bullets: ['Thesis research on player re-onboarding in video games (see Work experience).'],
        },
        {
          title: 'BA in Interfaces and Communication Technologies',
          org: 'University of Trento, Italy',
          dates: ['09/20', '03/24'],
          summary: 'Grade: 103/110',
          bullets: [
            'Proficient in user-centered system design, user research, and prototyping, with experience in gamification and serious games.',
          ],
        },
        {
          title: 'Computer Science High School Diploma',
          org: 'IIS F. Viola - Marchesini, Rovigo, Italy',
          dates: ['09/15', '06/20'],
          summary: 'Grade: 80/100',
          bullets: ['Development of skills in IT systems, programming and networks.'],
        },
      ],
    },
    {
      id: 'work-experience',
      title: 'Work experience',
      items: [
        {
          title: 'Game User Researcher Intern',
          org: 'HCI Games Group & Games Institute, University of Waterloo - Waterloo, Ontario, Canada',
          dates: ['07/26', 'Present'],
          summary:
            'Supervised by Prof. Dr. Lennart Nacke and Dr. Hilda Hadan. Thesis research on <strong>player re-onboarding in video games</strong>, an under-studied phenomenon in games user research: what happens when lapsed players return to a game after months or years away, and what games actually do about it.',
          bullets: [
            'Combining a systematic literature review (PRISMA) with a qualitative, exploratory user study, aiming at a clear definition of the phenomenon, a framing of it, and concrete design implications for the industry.',
            'Running an ethics-approved study: remote play sessions at home, post-play questionnaires and follow-up interviews with returning players.',
            'Looking at how interface design, feedback and in-game guidance can help returning players recover competence, confidence and a sense of progression.',
            'Aiming to publish the work at <strong>CHI PLAY</strong>.',
          ],
          link: { label: 'Profile on hcigames.com', href: 'https://hcigames.com/federico-manzoni/' },
        },
        {
          title: 'UX/UI Designer & Researcher - Internship',
          org: 'University of Trento & Fondazione Bruno Kessler (FBK)',
          dates: ['11/22', '05/23'],
          summary: 'Designed and developed <em>Flash Quiz</em>, a gamified web app for university teaching:',
          bullets: [
            'Led mixed-methods user research (surveys n=234, interviews n=9); synthesized the findings into pain points, personas, journey maps and product requirements.',
            'Designed UX flows and gameful interactions; produced high-fidelity Figma mockups/specs; coordinated with developers through regular syncs to align iterations and implementation handoff.',
          ],
        },
        {
          title: 'IT Technician (student collaboration)',
          org: 'Department of Psychology and Cognitive Sciences (DIPSCO), University of Trento - Rovereto, Italy',
          dates: ['02/22', '04/26'],
          bullets: [
            'Configuration of IT systems and support for lessons and events, solving technical issues.',
            'Training and support for new colleagues.',
          ],
        },
      ],
    },
    {
      id: 'projects',
      title: 'Projects',
      items: [
        {
          title: 'Sunfest Festival Website - Prototype Design & Comparative UX Study',
          bullets: [
            'Co-designed and prototyped ~50%+ of a Figma website; ran a within-subjects study (n=12) comparing prototype vs live site using SUS, UEQ-S, and SEQ; delivered recommendations based on the prototype’s higher scores for usability and pragmatic quality (SUS 92.5 vs 85.0).',
          ],
          link: CASE('sunfest-usability', 'en'),
        },
        {
          title: 'AI Chatbot for University Social Events',
          bullets: [
            'Conducted observations, semi-structured interviews, focus groups, and participatory workshops; performed thematic analysis to synthesize user needs.',
          ],
        },
        {
          title: 'Cicerone - Multimodal Indoor Navigation System',
          bullets: [
            'Led literature review, defined inclusive user requirements, and designed UI/UX prototypes with a focus on accessibility (visual and mobility impairments).',
          ],
          link: CASE('cicerone', 'en'),
        },
        {
          title: 'UNOX S.p.A. - Design seminar',
          dates: ['11/25'],
          bullets: [
            'University-credit seminar run by UNOX designers on future kitchen experiences and smart cooking technologies; worked in a student team on UX and human-robot interaction design concepts.',
          ],
        },
        {
          title: 'School of Innovation - University of Trento',
          dates: ['09/25', '12/25'],
          bullets: [
            'Multidisciplinary extracurricular programme on innovation, entrepreneurship and innovative education.',
          ],
        },
      ],
    },
    {
      id: 'service',
      title: 'Service & volunteering',
      items: [
        {
          title: 'Peer reviewer',
          org: 'CHI PLAY Conference',
          dates: ['06/26'],
          bullets: ['Invited by a member of the review committee to review submissions to CHI PLAY.'],
        },
        {
          title: 'Co-founder, Fridays for Future',
          org: 'Rovigo group',
          dates: ['03/19', '09/20'],
        },
      ],
    },
    {
      id: 'publications',
      title: 'Publications',
      items: [
        {
          title: 'How Game Elements Structure Educational Learning Paths: A Literature Review',
          org: ACM_REF,
          dates: ['2026'],
        },
      ],
    },
    {
      id: 'certificates',
      title: 'Certificates',
      items: [
        { title: 'Cambridge English Level 1 Certificate in ESOL (B2)', org: 'Cambridge Assessment', dates: ['2020'] },
        { title: 'CCNA Routing and Switching: Introduction to Networks', org: 'Cisco Networking Academy', dates: ['2020'] },
        { title: 'ECDL Standard & Full Standard', org: 'AICA', dates: ['2018'] },
      ],
    },
    {
      id: 'skills',
      title: 'Skills & Languages',
      lists: [
        {
          title: 'UX research',
          items: [
            'Usability Testing',
            'Mixed Methods: Qualitative & Quantitative',
            'Thematic analysis, qualitative coding',
            'Survey Design',
            'Experimental Design',
            'SUS, UEQ, UEQ-S',
            'Qualtrics, Google Forms',
            'Data Analysis (R, Excel)',
            'Insight communication',
          ],
        },
        {
          title: 'Design',
          items: [
            'User Experience Design (UX)',
            'User Interface Design (UI)',
            'User-Centered Design (UCD)',
            'Prototyping',
            'Interaction Design',
            'Design for Social Inclusion',
            'Gamification',
            'Figma, Miro, Mural, Make',
            'Personas, user stories',
          ],
        },
        {
          title: 'Languages',
          // hovering a language greets you in it, with its flag (src/scripts/view-cursor.ts)
          items: [
            '<span data-cursor="Ciao!" data-cursor-flag="it">Italian (Native)</span>',
            '<span data-cursor="Hello!" data-cursor-flag="gb">English (Full professional proficiency, B2 certified)</span>',
            '<span data-cursor="¡Hola!" data-cursor-flag="es">Spanish (A1)</span>',
          ],
        },
        {
          title: 'Programming',
          items: [
            'JavaScript, <span class="tease" data-cursor="Yes, I know these aren’t programming languages">HTML and CSS</span>',
            'Java, C#, R and C++',
          ],
        },
      ],
    },
  ],

  it: [
    {
      id: 'education',
      title: 'Formazione',
      items: [
        {
          title: 'Laurea magistrale in Human-Computer Interaction',
          org: 'Università degli Studi di Trento',
          dates: ['08/24', '03/27'],
          summary:
            '<strong>Focus:</strong> progettazione user-centered, design inclusivo, user research qualitativa e quantitativa, metriche di valutazione della UX.',
          bullets: [
            `<a href="${ECIU}">Challenge sul design inclusivo</a> alla Lodz University of Technology (02/26 – 05/26): programma ECIU basato su challenge sulle tecnologie inclusive e user-centred (VR/AR, wearable, robotica sociale)`,
            `<a href="${UXC}">UX Challenge</a> presso Innovation Hub Trentino (da 05/26)`,
            '<strong>Altri corsi di rilievo:</strong> Game Design Fundamentals - S. Bassanelli (in corso), Prototyping Interactive Systems, Processi decisionali e digital nudging, Mind and Interaction in Extended Reality (XR).',
          ],
        },
        {
          title: 'Visiting Graduate Researcher, Human-Computer Interaction',
          org: 'University of Waterloo, Canada',
          dates: ['09/26', '01/27'],
          bullets: ['Ricerca di tesi sul re-onboarding dei giocatori nei videogiochi (vedi Esperienze lavorative).'],
        },
        {
          title: 'Laurea triennale in Interfacce e Tecnologie della Comunicazione',
          org: 'Università degli Studi di Trento',
          dates: ['09/20', '03/24'],
          summary: 'Voto: 103/110',
          bullets: [
            'Competente nella progettazione di sistemi user-centered, nella ricerca sugli utenti e nella prototipazione, con esperienza in gamification e serious games.',
          ],
        },
        {
          title: 'Diploma di Istituto Tecnico Informatico',
          org: 'IIS F. Viola - Marchesini, Rovigo',
          dates: ['09/15', '06/20'],
          summary: 'Voto: 80/100',
          bullets: ['Sviluppo di competenze in sistemi informatici, programmazione e reti.'],
        },
      ],
    },
    {
      id: 'work-experience',
      title: 'Esperienze lavorative',
      items: [
        {
          title: 'Game User Researcher - Tirocinio',
          org: 'HCI Games Group & Games Institute, University of Waterloo - Waterloo, Ontario, Canada',
          dates: ['07/26', 'Oggi'],
          summary:
            'Con la supervisione di Prof. Dr. Lennart Nacke e Dr. Hilda Hadan. Ricerca di tesi sul <strong>re-onboarding dei giocatori nei videogiochi</strong>, un fenomeno poco studiato nella games user research: cosa succede quando chi ha smesso di giocare torna a un gioco dopo mesi o anni, e cosa fanno davvero i giochi per accoglierlo.',
          bullets: [
            'Unisco una revisione sistematica della letteratura (PRISMA) a uno studio qualitativo ed esplorativo con gli utenti, con l’obiettivo di arrivare a una definizione chiara del fenomeno, a un suo inquadramento e a implicazioni di design concrete per l’industria.',
            'Conduco uno studio approvato dal comitato etico: sessioni di gioco da remoto a casa, questionari post-gioco e interviste di approfondimento con giocatori che tornano a un gioco.',
            'Studio come interfaccia, feedback e guida in-game possano aiutare chi torna a giocare a recuperare competenza, fiducia e senso di progressione.',
            'L’obiettivo è pubblicare il lavoro a <strong>CHI PLAY</strong>.',
          ],
          link: { label: 'Profilo su hcigames.com', href: 'https://hcigames.com/federico-manzoni/' },
        },
        {
          title: 'UX/UI Designer & Researcher - Tirocinio',
          org: 'Università degli Studi di Trento & Fondazione Bruno Kessler (FBK)',
          dates: ['11/22', '05/23'],
          summary:
            'Progettazione e sviluppo di <em>Flash Quiz</em>, una web app gamificata a supporto della didattica universitaria:',
          bullets: [
            'Guidato una user research mixed-methods (questionari n=234, interviste n=9), sintetizzando i risultati in pain point, personas, journey map e requisiti di prodotto.',
            'Progettato flussi UX e interazioni gameful; realizzato mockup e specifiche ad alta fedeltà in Figma; coordinamento con gli sviluppatori tramite incontri regolari per allineare iterazioni e implementazione.',
          ],
        },
        {
          title: 'Tecnico informatico (collaborazione studentesca “150 ore”)',
          org: 'Dipartimento di Psicologia e Scienze Cognitive (DIPSCO), Università degli Studi di Trento - Rovereto',
          dates: ['02/22', '04/26'],
          bullets: [
            'Configurazione di sistemi informatici e supporto a lezioni ed eventi, risoluzione di problemi tecnici.',
            'Formazione e supporto ai nuovi colleghi.',
          ],
        },
      ],
    },
    {
      id: 'projects',
      title: 'Progetti',
      items: [
        {
          title: 'Sito del Sunfest Festival - Design del prototipo e studio UX comparativo',
          bullets: [
            'Co-progettato e prototipato oltre il 50% circa di un sito in Figma; condotto uno studio within-subjects (n=12) confrontando il prototipo con il sito live tramite SUS, UEQ-S e SEQ; formulato raccomandazioni basate sui punteggi più alti del prototipo per usabilità e qualità pragmatica (SUS 92,5 vs 85,0).',
          ],
          link: CASE('sunfest-usability', 'it'),
        },
        {
          title: 'Chatbot AI per gli eventi sociali universitari',
          bullets: [
            'Condotto osservazioni, interviste semi-strutturate, focus group e workshop partecipativi; svolto un’analisi tematica per sintetizzare i bisogni degli utenti.',
          ],
        },
        {
          title: 'Cicerone - Sistema di navigazione indoor multimodale',
          bullets: [
            'Guidato la revisione della letteratura, definito requisiti utente inclusivi e progettato prototipi UI/UX con un focus sull’accessibilità (disabilità visive e motorie).',
          ],
          link: CASE('cicerone', 'it'),
        },
        {
          title: 'UNOX S.p.A. - Seminario di design',
          dates: ['11/25'],
          bullets: [
            'Seminario a crediti universitari tenuto dai designer di UNOX sulle esperienze in cucina del futuro e sulle tecnologie smart cooking; ho lavorato in un team di studenti su concept di UX e interazione uomo-robot.',
          ],
        },
        {
          title: 'School of Innovation - Università degli Studi di Trento',
          dates: ['09/25', '12/25'],
          bullets: [
            'Programma extracurricolare multidisciplinare su innovazione, imprenditorialità e didattica innovativa.',
          ],
        },
      ],
    },
    {
      id: 'service',
      title: 'Attività scientifica e volontariato',
      items: [
        {
          title: 'Peer reviewer',
          org: 'CHI PLAY Conference',
          dates: ['06/26'],
          bullets: ['Invitato da un membro del comitato di revisione a revisionare articoli sottomessi a CHI PLAY.'],
        },
        {
          title: 'Co-fondatore, Fridays for Future',
          org: 'Gruppo di Rovigo',
          dates: ['03/19', '09/20'],
        },
      ],
    },
    {
      id: 'publications',
      title: 'Pubblicazioni',
      items: [
        {
          title: 'How Game Elements Structure Educational Learning Paths: A Literature Review',
          org: ACM_REF,
          dates: ['2026'],
        },
      ],
    },
    {
      id: 'certificates',
      title: 'Certificati',
      items: [
        { title: 'Cambridge English Level 1 Certificate in ESOL (B2)', org: 'Cambridge Assessment', dates: ['2020'] },
        { title: 'CCNA Routing and Switching: Introduction to Networks', org: 'Cisco Networking Academy', dates: ['2020'] },
        { title: 'ECDL Standard & Full Standard', org: 'AICA', dates: ['2018'] },
      ],
    },
    {
      id: 'skills',
      title: 'Competenze e lingue',
      lists: [
        {
          title: 'UX research',
          items: [
            'Test di usabilità',
            'Metodi misti: qualitativi e quantitativi',
            'Analisi tematica, coding qualitativo',
            'Progettazione di questionari',
            'Disegno sperimentale',
            'SUS, UEQ, UEQ-S',
            'Qualtrics, Google Forms',
            'Analisi dei dati (R, Excel)',
            'Comunicazione degli insight',
          ],
        },
        {
          title: 'Design',
          items: [
            'Design di esperienza utente (UX)',
            'Design di interfacce utente (UI)',
            'User-Centered Design (UCD)',
            'Prototipazione',
            'Interaction design',
            'Design per l’inclusione sociale',
            'Gamification',
            'Figma, Miro, Mural, Make',
            'Personas, user stories',
          ],
        },
        {
          title: 'Lingue',
          items: [
            '<span data-cursor="Ciao!" data-cursor-flag="it">Italiano (madrelingua)</span>',
            '<span data-cursor="Hello!" data-cursor-flag="gb">Inglese (piena padronanza professionale, B2 certificato)</span>',
            '<span data-cursor="¡Hola!" data-cursor-flag="es">Spagnolo (A1)</span>',
          ],
        },
        {
          title: 'Programmazione',
          items: [
            'JavaScript, <span class="tease" data-cursor="Sì, lo so che non sono linguaggi di programmazione">HTML e CSS</span>',
            'Java, C#, R e C++',
          ],
        },
      ],
    },
  ],
};
