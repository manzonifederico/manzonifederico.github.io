// Nudges on the project cards: after 10 s with the pointer on a card, its "View project" label starts changing
// every 5 s (src/scripts/view-cursor.ts), alternating a line about that project and a generic one.
// On touch screens (src/scripts/touch-notes.ts) a card gets its own pool (touch, below), picked at random.
// The project lines only use facts that are in the articles (numbers, grades, what the project does).
import type { Lang } from '../i18n/ui';

const generic: Record<Lang, string[]> = {
  en: ['Go on, click 👀', 'It’s a good one, promise', 'Still deciding? Take a look', 'One click, no commitment', 'Curiosity wins: open it'],
  it: ['Dai, clicca 👀', 'Merita, promesso', 'Ancora indeciso? Dai un’occhiata', 'Un clic, nessun impegno', 'Vince la curiosità: aprilo'],
};

const bySlug: Record<string, Record<Lang, string[]>> = {
  agora: {
    en: ['A bulletin board that never stands still', 'Kiosk, app and website: one system', 'How do you build a community at uni?'],
    it: ['Una bacheca che non sta mai ferma', 'Chiosco, app e sito: un solo sistema', 'Come si crea una comunità all’università?'],
  },
  mirrormood: {
    en: ['A mirror that reads your mood', 'Empathy, not surveillance', 'Light, music and words that respond to you'],
    it: ['Uno specchio che legge il tuo umore', 'Empatia, non sorveglianza', 'Luce, musica e parole che ti rispondono'],
  },
  cicerone: {
    en: ['Lost in a building? This one’s for you', 'A working map prototype, built in a day', 'Indoor navigation for everyone'],
    it: ['Perso in un edificio? Fa per te', 'Un prototipo di mappa funzionante, fatto in un giorno', 'Navigazione al chiuso per tutti'],
  },
  sunfest: {
    en: ['A festival in the woods', 'This one got a 30/30', 'Embrace nature, party hard'],
    it: ['Un festival nel bosco', 'Questo ha preso 30/30', 'Natura e festa'],
  },
  'sunfest-usability': {
    en: ['12 people, 2 festival sites: who wins?', 'SUS 92.5 vs 85.0', 'Lineup, program, FAQs: put to the test'],
    it: ['12 persone, 2 siti di festival: chi vince?', 'SUS 92,5 contro 85,0', 'Lineup, programma, FAQ: alla prova'],
  },
  'flash-quiz': {
    en: ['Studying without the pressure', '163 students had their say', 'My bachelor’s thesis, gamified'],
    it: ['Studiare senza pressione', '163 studenti hanno detto la loro', 'La mia tesi triennale, gamificata'],
  },
  'instagram-redesign': {
    en: ['Pull-to-refresh is a slot machine', 'Stop the brainrot: see how', 'Less scrolling, more control'],
    it: ['Il pull-to-refresh è una slot machine', 'Basta brainrot: scopri come', 'Meno scroll, più controllo'],
  },
  'bk-vs-mc': {
    en: ['Same features, different ratings. Why?', 'King or Clown? Find out', '112 people had their say'],
    it: ['Stesse funzioni, voti diversi. Perché?', 'Re o pagliaccio? Scoprilo', '112 persone hanno detto la loro'],
  },
};

/** The lines for one card: project and generic, alternating. */
export function nudgesFor(slug: string, lang: Lang): string[] {
  const own = bySlug[slug]?.[lang] ?? [];
  const gen = generic[lang];
  const out: string[] = [];
  for (let i = 0; i < Math.max(own.length, gen.length); i++) {
    if (own[i]) out.push(own[i]);
    if (gen[i]) out.push(gen[i]);
  }
  return out;
}

// Touch screens: a pool per project, the catchiest first (picked more often, src/scripts/touch-notes.ts). Every line
// invites to open the project and uses only facts from its article (src/content/articles/<slug>/key-points*.md).
const touch: Record<string, Record<Lang, string[]>> = {
  agora: {
    en: [
      'A bulletin board that won’t sit still until you show up',
      'Scan a paper flyer and AI writes the post',
      'Why does uni life feel “dead”?',
      'How do you build a community at uni?',
      'A 2-metre smart kiosk: see how it works',
    ],
    it: [
      'Una bacheca che non sta ferma finché non arrivi tu',
      'Scansiona un volantino e l’AI scrive il post',
      'Perché la vita universitaria sembra “morta”?',
      'Come si crea una comunità all’università?',
      'Un chiosco smart di 2 metri: guarda come funziona',
    ],
  },
  mirrormood: {
    en: [
      'Can a mirror be empathetic without spying on you?',
      'It reads your face, but never keeps it',
      'Bathroom, bedroom or living room: where does it work best?',
      'A mirror that reads your mood',
      'Light, music and words that respond to you',
    ],
    it: [
      'Uno specchio può essere empatico senza spiarti?',
      'Legge il tuo volto, ma non lo conserva mai',
      'Bagno, camera o salotto: dove funziona meglio?',
      'Uno specchio che legge il tuo umore',
      'Luce, musica e parole che ti rispondono',
    ],
  },
  cicerone: {
    en: [
      'Lost in a building? This one’s for you',
      'Graded 30 cum laude (31/30): see why',
      'AR that spots the obstacles for you',
      'It started with teammates lost in our own building',
      'A working map prototype, built in a day',
    ],
    it: [
      'Perso in un edificio? Fa per te',
      '30 e lode (31/30): scopri perché',
      'Realtà aumentata che riconosce gli ostacoli',
      'È nato da compagni che si perdevano nel nostro dipartimento',
      'Un prototipo di mappa funzionante, fatto in un giorno',
    ],
  },
  sunfest: {
    en: [
      'Embrace nature, party hard',
      'This one got a 30/30',
      'Now a real website too: try it',
      'A palette picked from a blooming meadow',
      'A festival in the woods',
    ],
    it: [
      'Embrace nature, party hard',
      'Questo ha preso 30/30',
      'Ora è anche un sito vero: provalo',
      'Una palette presa da un prato in fiore',
      'Un festival nel bosco',
    ],
  },
  'sunfest-usability': {
    en: [
      '12 people, 2 festival sites: who wins?',
      'Clarity or vibes: which one wins?',
      'Both in the top 10% of websites',
      'Why FAQs trip everyone up',
      'SUS 92.5 vs 85.0',
    ],
    it: [
      '12 persone, 2 siti di festival: chi vince?',
      'Chiarezza o emozione: chi la spunta?',
      'Entrambi nel top 10% dei siti web',
      'Perché le FAQ mettono tutti in difficoltà',
      'SUS 92,5 contro 85,0',
    ],
  },
  'flash-quiz': {
    en: [
      'Teams compete, not individuals: here’s why',
      'Last place gets a boost',
      'My bachelor’s thesis, gamified',
      '163 students had their say',
      'Studying without the pressure',
    ],
    it: [
      'Si sfidano le squadre, non i singoli: ecco perché',
      'Chi è ultimo riceve una spinta',
      'La mia tesi triennale, gamificata',
      '163 studenti hanno detto la loro',
      'Studiare senza pressione',
    ],
  },
  'instagram-redesign': {
    en: [
      'Stop the brainrot: see how',
      'Pull-to-refresh is a slot machine',
      '“The Mirror”: your own face while you scroll',
      'An “I’m quitting!” mode? Yes, really',
      'Every feature backed by a paper',
    ],
    it: [
      'Basta brainrot: scopri come',
      'Il pull-to-refresh è una slot machine',
      '“The Mirror”: il tuo volto mentre scorri',
      'Una modalità “Sto smettendo!”? Sì, davvero',
      'Ogni funzione supportata da uno studio',
    ],
  },
  'bk-vs-mc': {
    en: [
      'King or Clown? Find out',
      'Same features, different ratings. Why?',
      'Store ratings say one thing, users another',
      'More options, yet rated less customizable',
      '112 people had their say',
    ],
    it: [
      'Re o pagliaccio? Scoprilo',
      'Stesse funzioni, voti diversi. Perché?',
      'Le recensioni sugli store dicono una cosa, gli utenti un’altra',
      'Più opzioni, ma giudicata meno personalizzabile',
      '112 persone hanno detto la loro',
    ],
  },
};

/** The lines for one card on a touch screen, the catchiest first. */
export function touchNudgesFor(slug: string, lang: Lang): string[] {
  return touch[slug]?.[lang] ?? bySlug[slug]?.[lang] ?? [];
}
