// Nudges on the project cards: after 10 s with the pointer on a card, its "View project" label starts changing
// every 5 s (src/scripts/view-cursor.ts), alternating a line about that project and a generic one.
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
