// Content of the Sunfest25 mini-site (/sunfest25/): a working version of the fictional festival
// website designed by Federico Manzoni and Michele Cazzaro (Visual Design course, MSc HCI).
// Source: the "sunfest" page of the portfolio Figma file.
import type { ImageMetadata } from 'astro';

// ---------- navigation ----------
export const sfNav = [
  { slug: '', label: 'Home' },
  { slug: 'lineup', label: 'Lineup' },
  { slug: 'program', label: 'Program' },
  { slug: 'location', label: 'Location' },
  { slug: 'overnight', label: 'Overnight' },
  { slug: 'faqs', label: 'FAQs' },
];

export const sfFooterLinks = [
  { slug: 'lineup', label: 'Lineup' },
  { slug: 'program', label: 'Program' },
  { slug: 'location', label: 'Location' },
  { slug: 'overnight', label: 'Overnight' },
  { slug: 'faqs', label: 'FAQs' },
  { slug: 'volunteer', label: 'Voluntary' },
  { slug: 'about', label: 'About us' },
];

export const sfHref = (slug: string) => `/sunfest25/${slug ? slug + '/' : ''}`;

// Fictional contacts shown in the footer (not real mailboxes, so they are plain text, not links)
export const sfContacts = ['info@sunfest.it', 'press@sunfest.it', 'federico.boss@sunfest.it', 'michele.boss@sunfest.it'];

// ---------- artists ----------
const photos = import.meta.glob<{ default: ImageMetadata }>('../assets/sunfest25/artists/*.jpg', { eager: true });
const photo = (file: string) => photos[`../assets/sunfest25/artists/${file}.jpg`]?.default;

export type Stage = 'Sun Stage' | 'Forest Stage';
export interface Act {
  name: string;
  slug: string;
  day: 1 | 2;
  stage: Stage;
  time: string;
  /** large lineup photo (day 1 only in the design) */
  photo?: ImageMetadata;
  /** small program thumbnail */
  thumb?: ImageMetadata;
}

/** `img` lets two sets of the same artist share a photo (Franco126 plays twice on day 1) */
const act = (name: string, slug: string, day: 1 | 2, stage: Stage, time: string, img = slug): Act => ({
  name,
  slug,
  day,
  stage,
  time,
  photo: photo(img),
  thumb: photo(`thumb-${img}`) ?? photo(img),
});

// Program, day 1 (20th June) and day 2 (21st June), as in the Figma "ProgramList" component
export const acts: Act[] = [
  act('Pufuleti', 'pufuleti', 1, 'Sun Stage', '16:00–16:30'),
  act('Fuera', 'fuera', 1, 'Sun Stage', '17:00–17:30'),
  act('Pitura Freska', 'pitura-freska', 1, 'Sun Stage', '18:00–18:30'),
  act('Faccianuvola', 'faccianuvola', 1, 'Sun Stage', '19:00–19:30'),
  act('Post Nebbia', 'post-nebbia', 1, 'Sun Stage', '20:00–20:30'),
  act('Ketama126', 'ketama126', 1, 'Sun Stage', '21:00–22:00'),
  act('Fulminacci', 'fulminacci', 1, 'Sun Stage', '22:30–00:00'),
  act('Venerus', 'venerus', 1, 'Sun Stage', '00:30–01:00'),
  act('Florence + the Machine', 'florence-the-machine', 1, 'Sun Stage', '01:30–02:30'),
  act('Tripolare', 'tripolare', 1, 'Forest Stage', '16:30–17:00'),
  act('Catharral Noise', 'catharral-noise', 1, 'Forest Stage', '17:30–18:00'),
  act('Okgiorgio', 'okgiorgio', 1, 'Forest Stage', '18:30–19:00'),
  act('Marco Castello', 'marco-castello', 1, 'Forest Stage', '19:30–20:30'),
  act('Frah Quintale', 'frah-quintale', 1, 'Forest Stage', '21:00–22:00'),
  act('Franco126', 'franco126', 1, 'Forest Stage', '22:30–23:00'),
  act('Ele A', 'ele-a', 1, 'Forest Stage', '23:00–00:00'),
  act('Franco126 (DJ set)', 'franco126-dj-set', 1, 'Forest Stage', '00:30–01:30', 'franco126'),
  act('Kahbum', 'kahbum', 2, 'Sun Stage', '16:00–16:30'),
  act('Tamango', 'tamango', 2, 'Sun Stage', '17:00–17:30'),
  act('Clavdio', 'clavdio', 2, 'Sun Stage', '18:00–18:30'),
  act('Mèsa', 'mesa', 2, 'Sun Stage', '19:00–19:30'),
  act('See Maw', 'see-maw', 2, 'Sun Stage', '20:00–20:30'),
  act('Cosmo', 'cosmo', 2, 'Sun Stage', '21:00–21:30'),
  act('Carl Brave', 'carl-brave', 2, 'Sun Stage', '22:00–23:00'),
  act('Gazzelle', 'gazzelle', 2, 'Sun Stage', '23:30–00:30'),
  act('Calcutta', 'calcutta', 2, 'Sun Stage', '01:00–02:00'),
  act('Maruego', 'maruego', 2, 'Forest Stage', '16:30–17:00'),
  act('Wrongonyou', 'wrongonyou', 2, 'Forest Stage', '17:30–18:00'),
  act('Splendore', 'splendore', 2, 'Forest Stage', '18:30–19:00'),
  act('Touristi', 'touristi', 2, 'Forest Stage', '19:30–20:00'),
  act('Ghali', 'ghali', 2, 'Forest Stage', '20:30–21:30'),
  act('Ariete', 'ariete', 2, 'Forest Stage', '22:00–23:00'),
  act('Levante', 'levante', 2, 'Forest Stage', '23:00–00:30'),
  act('Irbis', 'irbis', 2, 'Forest Stage', '00:30–01:00'),
];

export const days = [
  { n: 1 as const, label: 'DAY1 - 20th', long: '20th June', open: 'We open at 14:30', close: 'We close at 3:00' },
  { n: 2 as const, label: 'DAY2 - 21st', long: '21st June', open: 'We open at 14:30', close: 'We close at 2:30' },
];

// Home page "poster" lineup, as typeset in the design
export const homeLineup = [
  {
    day: '20th June',
    headliner: 'Franco126',
    big: ['Ele A', 'Frah Quintale', 'Fulminacci', 'Marco Castello', 'Venerus', 'Ketama126'],
    small: ['Okgiorgio', 'Faccianuvola', 'Post Nebbia', 'Catharral Noise', 'Tripolare', 'Pitura Freska', 'Fuera', 'Pufuleti', 'Florence + the Machine'],
  },
  {
    day: '21st June',
    headliner: 'Calcutta',
    big: ['Gazzelle', 'See Maw', 'Irbis', 'Ghali', 'Cosmo', 'Carl Brave', 'Ariete'],
    small: ['Touristi', 'Splendore', 'Mèsa', 'Wrongonyou', 'Levante', 'Maruego', 'Kahbum', 'Tamango', 'Clavdio'],
  },
];

// ---------- FAQs (questions and answers from the Figma FAQ component) ----------
export const faqs = [
  {
    icon: 'add-location',
    q: 'Where can I get the tickets?',
    a: 'Free entry is what we are able to offer this year thanks to the contribution of Università di Trento and the Trentino region.',
  },
  {
    icon: 'festival',
    q: 'Is there on-site camping?',
    a: 'Yes! We offer camping options including basic camping, glamping, and camper van areas. You’ll need a separate camping pass.',
  },
  {
    icon: 'genres',
    q: 'What kind of music can I expect?',
    a: 'Our lineup includes a mix of genres across two stages, from live bands to electronic acts and acoustic sets.',
  },
  {
    icon: 'bomb',
    q: 'What items are prohibited at Sunfest?',
    a: 'To ensure everyone’s safety, items such as bottles, cans, rigid umbrellas, and any sharp objects are not allowed. We advise leaving these items at home as security checks are conducted at all entry points.',
  },
  {
    icon: 'add-location',
    q: 'Where is the festival located?',
    a: 'The festival is held in the historic <strong>Woods of Rovereto</strong>. Check our <a href="/sunfest25/location/">Location &amp; Access</a> page for maps, parking, and public transport info.',
  },
  {
    icon: 'pets',
    q: 'Are pets allowed?',
    a: 'For safety and comfort, pets are not allowed (with the exception of registered service animals).',
  },
  {
    icon: 'fastfood',
    q: 'Can I bring my own food and drinks?',
    a: 'Outside food and drinks are <strong>not allowed</strong> inside the main festival area. However, plenty of local food and beverage options will be available on-site.',
  },
  {
    icon: 'traffic-jam',
    q: 'Can I drive into the festival area?',
    a: 'Vehicle access is not permitted within the festival grounds (except for participants with specific accessibility requirements). Please use public transportation or the free shuttles to reach Sunfest.',
  },
  {
    icon: 'electrical-services',
    q: 'Will there be lockers or charging stations?',
    a: 'Yes, you’ll find lockers and phone charging points near the main entrance and chill-out zone.',
  },
  {
    icon: 'personal-bag',
    q: 'What should I bring with me?',
    a: 'Essentials include your ID, a reusable water bottle, sunscreen, and appropriate clothing for day/night temperatures.',
  },
];
