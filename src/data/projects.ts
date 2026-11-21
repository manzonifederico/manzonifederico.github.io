// Project (case study) settings: card text, tags, team, links, theme and images.
// The article text itself lives in src/content/articles/<slug>/*.md
import type { ImageMetadata } from 'astro';

import agoraRender from '../assets/projects/agora-kiosk-render.png';
import agoraScreen from '../assets/projects/agora-kiosk-screen.png';
import mmMirror from '../assets/projects/mirrormood-mirror.png';
import mmSystem from '../assets/projects/mirrormood-system.png';
import ciceroneAr from '../assets/projects/cicerone-ar-obstacle.png';
import ciceroneNav from '../assets/projects/cicerone-navigation.png';
import ciceroneStop from '../assets/projects/cicerone-add-stop.png';
import sunAbout from '../assets/projects/sunfest-aboutus.png';
import sunLineup from '../assets/projects/sunfest-lineup.png';
import sunFaqs from '../assets/projects/sunfest-faqs.png';
import sunHome from '../assets/projects/sunfest-home.png';
import sunProgram from '../assets/projects/sunfest-program.png';
import sunOvernight from '../assets/projects/sunfest-overnight.png';
import poplarHome from '../assets/projects/poplar-utopia-home.png';
import fqLogo from '../assets/projects/flashquiz-logo.png';
import fqPhone from '../assets/projects/flashquiz-phone.png';
import fqDesktop from '../assets/projects/flashquiz-desktop.png';
import igPrefs from '../assets/projects/instagram-content-preferences.png';
import igTime from '../assets/projects/instagram-time-management.png';
import igFunc from '../assets/projects/instagram-functionalities.png';
import igBlocked from '../assets/projects/instagram-blocked.png';
import bkLogo from '../assets/projects/bk-logo.png';
import mcLogo from '../assets/projects/mc-logo.png';

import type { Lang } from '../i18n/ui';

export type Slug = 're-onboarding' | 'agora' | 'mirrormood' | 'cicerone' | 'sunfest' | 'sunfest-usability' | 'flash-quiz' | 'instagram-redesign' | 'bk-vs-mc';

export interface CardImage {
  src: ImageMetadata;
  alt: string;
  /** Italian alt text (Italian pages) */
  altIt?: string;
  /** visual treatment on the card */
  kind: 'phone' | 'phone-framed' | 'screen' | 'logo' | 'desktop';
  /** optional video in public/ (e.g. '/video/x.mp4'): used instead of the image as soon as the file exists */
  video?: string;
}

export interface Project {
  slug: Slug;
  /** Title as shown on the card / article hero */
  title: string;
  subtitle: string;
  /** Short plain description used for SEO and social previews */
  description: string;
  tags: string[];
  team: string[];
  resources: { label: string; href: string }[];
  /** CSS theme class, see src/styles/themes.css */
  theme: string;
  cardImages: CardImage[];
  /** Italian card text */
  it: { subtitle: string; description: string };
  /** Project highlighted at the end of the case study ("Hey, I really think you should check this out!") */
  related?: Slug;
  /** Colour of the "View project" cursor label on this card (white text on it passes WCAG AA) */
  cursor: string;
  /** work in progress: the card says "Coming soon" and the article is only its outline (not counted for "Well-read") */
  comingSoon?: boolean;
}

/** Card subtitle/description in the requested language */
export const projectText = (p: Project, lang: Lang) =>
  lang === 'it' ? p.it : { subtitle: p.subtitle, description: p.description };

export const projects: Project[] = [
  {
    // work in progress (Federico's study at the University of Waterloo): only the outline for now, text "coming soon"
    slug: 're-onboarding',
    title: 'Re-onboarding',
    subtitle: 'Returning to a video game after a break',
    description: 'Re-onboarding: a study on how players navigate, remember and adapt when they return to a game after a break. Coming soon.',
    tags: ['Experimental Design', 'User Research', 'Games', 'Uni Project', 'Thesis Project'],
    team: ['Federico Manzoni (me)'],
    resources: [],
    it: {
      subtitle: 'Tornare a un videogioco dopo una pausa',
      description:
        'Re-onboarding: uno studio su come i giocatori si orientano, ricordano e si riadattano quando tornano a un gioco dopo una pausa. In arrivo.',
    },
    cursor: '#1b2540',
    theme: 'theme-reonboarding',
    cardImages: [],
    comingSoon: true,
  },
  {
    slug: 'agora',
    title: 'Agorà',
    subtitle: 'Smart Bulletin Boards',
    description:
      'Agorà: a system of smart bulletin boards (kiosk, app and website) designed to build community and spread events in university spaces.',
    tags: ['Uni Project', 'UX/UI Design', 'Prototype', 'Phone', 'PC'],
    team: ['Federico Manzoni (me)'],
    resources: [],
    it: {
      subtitle: 'Bacheche intelligenti',
      description:
        'Agorà: un sistema di bacheche intelligenti (chiosco, app e sito) pensato per creare comunità e diffondere gli eventi negli spazi universitari.',
    },
    cursor: '#1458c8',
    theme: 'theme-agora',
    cardImages: [
      { src: agoraRender, alt: 'Rendering of the Agorà kiosk with main and secondary screen', altIt: 'Rendering del chiosco Agorà con schermo principale e secondario', kind: 'desktop' },
      { src: agoraScreen, alt: 'The Agorà kiosk screen: general board, experiments board and more boards', altIt: 'Lo schermo del chiosco Agorà: bacheca generale, bacheca degli esperimenti e altre bacheche', kind: 'desktop' },
    ],
  },
  {
    slug: 'mirrormood',
    title: 'MirrorMood',
    subtitle: 'An affective mirror for emotional wellbeing',
    description:
      'MirrorMood: research proposal for an emotion-aware smart mirror and a mixed-methods study on when it feels empathetic rather than intrusive.',
    tags: ['Uni Project', 'User Research', 'Experimental Design'],
    team: ['Michele Cazzaro', 'Federico Manzoni (me)'],
    resources: [],
    it: {
      subtitle: 'Uno specchio affettivo per il benessere emotivo',
      description:
        'MirrorMood: proposta di ricerca per uno specchio intelligente che riconosce le emozioni e uno studio mixed-methods su quando risulta empatico invece che invasivo.',
    },
    cursor: '#a23b38',
    theme: 'theme-mirrormood',
    cardImages: [
      { src: mmMirror, alt: 'A person in front of a full-height smart mirror', altIt: 'Una persona davanti a uno specchio smart a figura intera', kind: 'phone' },
      { src: mmSystem, alt: 'MirrorMood system diagram: sensing, processing and feedback', altIt: 'Schema del sistema MirrorMood: rilevamento, elaborazione e feedback', kind: 'desktop' },
    ],
  },
  {
    slug: 'cicerone',
    title: 'Cicerone',
    subtitle: 'Helping you find the way!',
    description:
      'Cicerone: an inclusive, multimodal indoor navigation system for university campuses, designed for users with visual and mobility impairments.',
    tags: ['Uni Project', 'UX/UI Design', 'User Research', 'Wireframes', 'Phone'],
    team: ['Federico Manzoni (me)', 'Michele Cazzaro', 'Filippo D’Agnano', 'Ira Laihanen', 'Nataliya Zhigalina'],
    resources: [
      {
        label: 'Presentations and other documents',
        href: 'https://drive.google.com/drive/folders/1DMmC6t2IMuogPAX4qtxhYI449HC0QbUs?usp=sharing',
      },
    ],
    it: {
      subtitle: 'Ti aiuta a trovare la strada!',
      description:
        'Cicerone: un sistema di navigazione indoor inclusivo e multimodale per i campus universitari, pensato per persone con disabilità visive e motorie.',
    },
    cursor: '#7a00b0',
    theme: 'theme-cicerone',
    cardImages: [
      { src: ciceroneAr, alt: 'AR navigation view warning about a signalled obstacle', altIt: 'Vista di navigazione in realtà aumentata che avvisa di un ostacolo segnalato', kind: 'phone', video: '/video/cicerone-ar.mp4' },
      { src: ciceroneNav, alt: 'Indoor map with a highlighted route to the cafeteria', altIt: 'Mappa interna con il percorso evidenziato verso la mensa', kind: 'phone' },
      { src: ciceroneStop, alt: 'Add a stop screen listing the most viewed rooms', altIt: 'Schermata per aggiungere una tappa con le stanze più visitate', kind: 'phone' },
    ],
  },
  {
    slug: 'sunfest',
    title: 'Sunfest',
    subtitle: 'Embrace Nature, Party Hard!',
    description:
      'Sunfest25: visual design and fully functioning Figma prototype of a website for a new indie and pop music festival in Rovereto.',
    tags: ['Uni Project', 'UX/UI Design', 'Wireframes', 'Prototype', 'PC'],
    team: ['Federico Manzoni (me)', 'Michele Cazzaro'],
    resources: [
      { label: 'Visit the Sunfest25 website (built version)', href: '/sunfest25/' },
      {
        label: 'Try the prototype',
        href: 'https://www.figma.com/proto/sW5x8acKNC5OfuF2UhqMhs/Sunfest25?node-id=426-10150&starting-point-node-id=426%3A10150&scaling=scale-down-width&content-scaling=fixed',
      },
      { label: 'Full Figma project', href: 'https://www.figma.com/design/sW5x8acKNC5OfuF2UhqMhs/Sunfest25?node-id=0-1' },
    ],
    it: {
      subtitle: 'Immergiti nella natura, fai festa!',
      description:
        'Sunfest25: visual design e prototipo Figma completamente funzionante del sito di un nuovo festival di musica indie e pop a Rovereto.',
    },
    related: 'sunfest-usability',
    cursor: '#003f7d',
    theme: 'theme-sunfest',
    cardImages: [
      { src: sunAbout, alt: 'Sunfest About us page', altIt: 'Pagina Chi siamo di Sunfest', kind: 'screen' },
      { src: sunLineup, alt: 'Sunfest Lineup page', altIt: 'Pagina Lineup di Sunfest', kind: 'screen' },
      { src: sunFaqs, alt: 'Sunfest FAQs page', altIt: 'Pagina FAQ di Sunfest', kind: 'screen' },
      { src: sunHome, alt: 'Sunfest home page', altIt: 'Home page di Sunfest', kind: 'screen' },
      { src: sunProgram, alt: 'Sunfest Program page', altIt: 'Pagina Programma di Sunfest', kind: 'screen' },
      { src: sunOvernight, alt: 'Sunfest Overnight camping page', altIt: 'Pagina del campeggio notturno di Sunfest', kind: 'screen' },
    ],
  },
  {
    slug: 'sunfest-usability',
    title: 'Sunfest vs Poplar Utopia',
    subtitle: 'Time for testing!',
    description:
      'A within-subjects usability and UX study (SUS, UEQ-S, SEQ) comparing the Sunfest25 prototype with the live Poplar Utopia festival website.',
    tags: ['Uni Project', 'User Research', 'Usability Testing', 'Experimental Design', 'PC'],
    team: ['Federico Manzoni (me)', 'Michele Cazzaro'],
    resources: [],
    it: {
      subtitle: 'È ora di testare!',
      description:
        'Uno studio within-subjects di usabilità e UX (SUS, UEQ-S, SEQ) che confronta il prototipo di Sunfest25 con il sito live del festival Poplar Utopia.',
    },
    related: 'sunfest',
    cursor: '#003f7d',
    theme: 'theme-sunfest',
    cardImages: [
      { src: sunHome, alt: 'Sunfest25 home page', altIt: 'Home page di Sunfest25', kind: 'screen' },
      { src: poplarHome, alt: 'Poplar Utopia festival home page', altIt: 'Home page del festival Poplar Utopia', kind: 'screen' },
    ],
  },
  {
    slug: 'flash-quiz',
    title: 'Flash Quiz',
    subtitle: 'Learn in a flash!',
    description:
      'Flash Quiz: user research and UX/UI design of a gamified quiz web app supporting university teaching (BA thesis and internship, University of Trento & FBK).',
    tags: ['Thesis Project', 'UX/UI Design', 'User Research', 'Phone', 'PC'],
    team: [
      'Federico Manzoni (me)',
      'Massimo Zancanaro (supervisor)',
      'Federica Gini (co-supervisor)',
      'Antonio Bucchiarone (FBK tutor)',
      'Paolo Giorgini (university tutor)',
    ],
    resources: [
      {
        label: 'Thesis (Italian only)',
        href: 'https://drive.google.com/file/d/1FEaaHt9ezt3WotnWDX57iLKIiOJUn3YF/view?usp=sharing',
      },
    ],
    it: {
      subtitle: 'Impara in un lampo!',
      description:
        'Flash Quiz: user research e design UX/UI di una web app di quiz gamificata per la didattica universitaria (tesi triennale e tirocinio, UniTrento e FBK).',
    },
    cursor: '#00458f',
    theme: 'theme-flashquiz',
    cardImages: [
      { src: fqLogo, alt: 'Flash Quiz logo', altIt: 'Logo di Flash Quiz', kind: 'logo' },
      { src: fqPhone, alt: 'Flash Quiz mobile course list', altIt: 'Elenco dei corsi di Flash Quiz su smartphone', kind: 'phone-framed' },
      { src: fqDesktop, alt: 'Flash Quiz desktop analytics dashboard', altIt: 'Dashboard delle statistiche di Flash Quiz su desktop', kind: 'desktop' },
    ],
  },
  {
    slug: 'instagram-redesign',
    title: 'Instagram Redesign',
    subtitle: 'Stop the Brainrot',
    description:
      'Brainrot Police: redesigning Instagram settings and features to regulate use and reduce addictive design patterns.',
    tags: ['Uni Project', 'UX/UI Design', 'Wireframes', 'Phone'],
    team: ['Federico Manzoni (me)', 'Michele Cazzaro', 'Lorenzo Zambotto', 'Nataliya Zhigalina', 'Christoph Reuter'],
    resources: [
      {
        label: 'Project documents',
        href: 'https://drive.google.com/drive/folders/1SLz7ap5u9-mx3igJwr2EA2oHVDCbq93U?usp=sharing',
      },
    ],
    it: {
      subtitle: 'Basta brainrot',
      description:
        'Brainrot Police: riprogettare impostazioni e funzionalità di Instagram per regolarne l’uso e ridurre i pattern di design che creano dipendenza.',
    },
    cursor: '#0b5cb0',
    theme: 'theme-instagram',
    cardImages: [
      { src: igPrefs, alt: 'Content preferences settings with feed type options', altIt: 'Impostazioni delle preferenze dei contenuti con le opzioni del feed', kind: 'phone-framed' },
      { src: igTime, alt: 'Time management screen with daily usage chart', altIt: 'Schermata di gestione del tempo con il grafico dell’uso giornaliero', kind: 'phone-framed' },
      { src: igFunc, alt: 'Functionalities screen with toggles for reels features', altIt: 'Schermata delle funzionalità con gli interruttori per i reel', kind: 'phone-framed' },
      { src: igBlocked, alt: 'Instagram blocked screen with tasks to unlock', altIt: 'Schermata di Instagram bloccato con le attività per sbloccarlo', kind: 'phone-framed' },
    ],
  },
  {
    slug: 'bk-vs-mc',
    title: 'Team King or Clown?',
    subtitle: 'Burger King vs McDonald’s app',
    description:
      'A between-subjects quantitative user study comparing the Burger King and McDonald’s ordering apps in Italy.',
    tags: ['Uni Project', 'User Research', 'Usability Testing', 'Experimental Design', 'Phone'],
    team: ['Samuele Mazzei', 'Lorenzo Zambotto', 'Federico Manzoni (me)', 'Samuele Nigroni', 'Nataliya Zhigalina'],
    resources: [
      {
        label: 'Study materials',
        href: 'https://drive.google.com/drive/folders/1XGNa-X918pse1IqKOysAvmXzmBZni2ad?usp=sharing',
      },
    ],
    it: {
      subtitle: 'App di Burger King vs McDonald’s',
      description:
        'Uno studio quantitativo between-subjects che confronta le app di ordinazione di Burger King e McDonald’s in Italia.',
    },
    cursor: '#1a1a1a',
    theme: 'theme-bkmc',
    cardImages: [
      { src: bkLogo, alt: 'Burger King logo', altIt: 'Logo di Burger King', kind: 'logo' },
      { src: mcLogo, alt: 'McDonald’s logo', altIt: 'Logo di McDonald’s', kind: 'logo' },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
