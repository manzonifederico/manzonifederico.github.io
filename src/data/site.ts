// Site-wide settings: your name, contact links and default SEO text.
// Edit these values to update them everywhere on the site.
import type { Lang } from '../i18n/ui';

export const site = {
  name: 'Federico Manzoni',
  // Social preview image (1200×630) in /public
  ogImage: '/og-image.png',
};

/** Page title, role and SEO description per language */
export const siteText: Record<Lang, { role: string; title: string; description: string }> = {
  en: {
    role: 'UX Researcher · Games & UX',
    title: 'Federico Manzoni | UX Researcher, Games & UX',
    description:
      'Federico Manzoni, UX Researcher focused on games (MSc in HCI). Portfolio and CV: user research, usability testing and game UX case studies.',
  },
  it: {
    role: 'UX Researcher · Games & UX',
    title: 'Federico Manzoni | UX Researcher, Games & UX',
    description:
      'Federico Manzoni, UX Researcher con focus sui videogiochi (magistrale in HCI). Portfolio e CV: user research, usability test e casi studio di game UX.',
  },
};

export const contact = {
  emails: [
    'fmanzoni@uwaterloo.ca',
    'federico.manzoni13@gmail.com',
    'Federico.Manzoni@studenti.unitn.it',
  ],
  linkedin: 'https://www.linkedin.com/in/federico-manzoni-936103217/',
  orcid: 'https://orcid.org/0009-0002-2725-8370',
  researchgate: 'https://www.researchgate.net/profile/Federico-Manzoni-2',
  github: '', // add your GitHub profile URL later; empty = hidden
  locations: {
    en: ['Waterloo, Ontario, Canada (until 01/27)', '(EEA) European Economic Area', 'Rovereto, Trentino-Alto Adige, Italy', 'Rovigo, Veneto, Italy'],
    it: ['Waterloo, Ontario, Canada (fino a 01/27)', '(SEE) Spazio Economico Europeo', 'Rovereto, Trentino-Alto Adige, Italia', 'Rovigo, Veneto, Italia'],
  } as Record<Lang, string[]>,
};

// Downloadable CVs, served from /public/cv/
// The Italian CV is hidden until an up-to-date version exists (set `show: true`).
export const cvFiles = [
  { label: { en: 'CV English PDF', it: 'CV in inglese (PDF)' }, href: '/cv/Federico-Manzoni-CV-EN.pdf', lang: 'en', show: true },
  { label: { en: 'CV Italian PDF', it: 'CV in italiano (PDF)' }, href: '/cv/Federico-Manzoni-CV-IT.pdf', lang: 'it', show: false },
];
