// Achievements: the site's easter eggs, collected (src/scripts/achievements.ts keeps track, in this browser only).
// Each one is unlocked by a `document.dispatchEvent(new CustomEvent('achieve', { detail: '<id>' }))` where it happens.
// "secret" ones show as ??? until unlocked, so the surprise isn't spoiled; the others show their hint.
// "bonus" ones count on the board but aren't needed for Platinum; "on" ones are possible on one kind of device only
// (computer or phone): Platinum and the counter use only the ones possible on the device in use.
import type { Lang } from '../i18n/ui';

export interface Achievement {
  id: string;
  icon: string;
  secret?: boolean;
  /** a bonus: not needed for Platinum (e.g. it needs hardware not everyone has) */
  bonus?: boolean;
  /** an image (SVG or <img>) shown instead of the emoji (e.g. a flag that has no emoji) */
  svg?: string;
  /** only possible on one kind of device: 'pc' needs a mouse or trackpad, 'phone' a touch screen. Platinum asks only
   *  for the ones possible on the device in use */
  on?: 'pc' | 'phone';
  /** hint: a very vague clue for secret ones, shown when the ??? card is pressed twice */
  en: { title: string; desc: string; hint?: string };
  it: { title: string; desc: string; hint?: string };
}

// the flag of the Republic of Venice (public/icons/venice-flag.webp, from the public-domain SVG on Wikimedia Commons;
// the same one as the "Bacaro tour?" label in src/scripts/view-cursor.ts)
const VENICE_FLAG = '<img src="/icons/venice-flag.webp" alt="" width="240" height="120">';

export const achievements: Achievement[] = [
  { id: 'first-squash', icon: '🦟', en: { title: 'First blood', desc: 'Squash one of the little arrows' }, it: { title: 'Primo sangue', desc: 'Schiaccia una delle frecce' } },
  { id: 'died', icon: '💀', en: { title: 'You died', desc: 'Lose to the big arrow' }, it: { title: 'Sei morto', desc: 'Perdi contro la freccia gigante' } },
  { id: 'praise', icon: '☀️', secret: true, en: { title: 'Praise the Sun', desc: 'See the soldiers praise the sun on the game-over screen', hint: '“If only I could be so grossly incandescent!”' }, it: { title: 'Praise the Sun', desc: 'Vedi i soldatini lodare il sole nella schermata di game over', hint: '“If only I could be so grossly incandescent!”' } },
  { id: 'died-10', icon: '🔥', en: { title: 'Prepare to die', desc: 'Die 10 times' }, it: { title: 'Preparati a morire', desc: 'Muori 10 volte' } },
  { id: 'phone-shake', on: 'phone', bonus: true, icon: '📳', en: { title: 'Earthquake', desc: 'Shake your phone while the arrows are around' }, it: { title: 'Terremoto', desc: 'Scuoti il telefono mentre ci sono le frecce' } },
  { id: 'star', on: 'pc', icon: '✴️', secret: true, en: { title: 'Patience', desc: 'Leave the mouse still until something happens', hint: 'Good things come to those who wait' }, it: { title: 'Pazienza', desc: 'Lascia fermo il mouse finché succede qualcosa', hint: 'Chi aspetta, qualcosa ottiene' } },
  { id: 'shake-square', on: 'pc', icon: '🟦', secret: true, en: { title: 'Where’s my pointer?', desc: 'Shake the mouse', hint: 'Sometimes all it takes is a little shake' }, it: { title: 'Dov’è il puntatore?', desc: 'Scuoti il mouse', hint: 'A volte basta una scossa' } },
  { id: 'bottom-note', icon: '🙈', secret: true, en: { title: 'Nothing to see here', desc: 'Pull past the end of the page', hint: 'There’s always something below the bottom' }, it: { title: 'Niente da vedere', desc: 'Tira oltre la fine della pagina', hint: 'C’è sempre qualcosa sotto il fondo' } },
  { id: 'rovigo', on: 'pc', icon: '😴', en: { title: 'Boring town', desc: 'Find out where I grew up' }, it: { title: 'Città noiosa', desc: 'Scopri dove sono cresciuto' } },
  { id: 'bacaro', on: 'pc', icon: '🍷', svg: VENICE_FLAG, secret: true, en: { title: 'Bacaro tour', desc: 'Hover over Venice', hint: 'Some cities deserve a closer look' }, it: { title: 'Bacaro tour', desc: 'Passa sopra Venezia', hint: 'Certe città meritano uno sguardo più da vicino' } },
  { id: 'credits', on: 'pc', icon: '🤖', secret: true, en: { title: 'Credits', desc: 'Find out who helped build this site', hint: 'Every story ends with its credits' }, it: { title: 'Titoli di coda', desc: 'Scopri chi ha aiutato a costruire il sito', hint: 'Ogni storia finisce con i titoli di coda' } },
  { id: 'nudge', on: 'pc', icon: '🤔', en: { title: 'Indecisive', desc: 'Keep the pointer on a project for 10 seconds' }, it: { title: 'Indeciso', desc: 'Tieni il puntatore su un progetto per 10 secondi' } },
  { id: 'full-story', icon: '📖', en: { title: 'Bookworm', desc: 'Open the full story of a project' }, it: { title: 'Topo di biblioteca', desc: 'Apri la versione completa di un progetto' } },
  { id: 'read-all', icon: '📚', en: { title: 'Well-read', desc: 'Read every project to the end' }, it: { title: 'Lettore accanito', desc: 'Leggi tutti i progetti fino in fondo' } },
  { id: 'dark', icon: '🌙', en: { title: 'Dark side', desc: 'Switch to the dark theme' }, it: { title: 'Lato oscuro', desc: 'Passa al tema scuro' } },
  { id: 'language', icon: '🌍', en: { title: 'Bilingual', desc: 'Read the site in the other language' }, it: { title: 'Bilingue', desc: 'Leggi il sito nell’altra lingua' } },
  { id: 'cv', icon: '📄', en: { title: 'Hire me!', desc: 'Download my CV' }, it: { title: 'Hire me!', desc: 'Scarica il mio CV' } },
  { id: 'contact', icon: '📬', en: { title: 'Let’s talk', desc: 'Get in touch through one of my contacts' }, it: { title: 'Parliamone', desc: 'Usa uno dei miei contatti' } },
  { id: 'recruiter', icon: '🕵️', en: { title: 'Unbiased', desc: 'Turn on recruiter mode' }, it: { title: 'Senza pregiudizi', desc: 'Attiva la modalità recruiter' } },
  { id: 'gamepad', icon: '🎮', bonus: true, en: { title: 'Player 2 has joined', desc: 'Connect a game controller' }, it: { title: 'Player 2 è entrato', desc: 'Collega un controller' } },
  { id: 'brainrot', icon: '🧠', secret: true, en: { title: 'Brainrotted', desc: 'Get killed by a brainrot', hint: 'Some words don’t like being poked' }, it: { title: 'Brainrottato', desc: 'Fatti uccidere da un brainrot', hint: 'Certe parole non amano essere punzecchiate' } },
  { id: 'tung', icon: '🪵', secret: true, en: { title: 'Tung tung tung', desc: 'Meet Tung Tung Tung Sahur', hint: '🏏🏏🏏' }, it: { title: 'Tung tung tung', desc: 'Incontra Tung Tung Tung Sahur', hint: '🏏🏏🏏' } },
  { id: 'lirili', icon: '🐘', secret: true, en: { title: 'Elephant in the desert', desc: 'Meet Lirilì Larilà', hint: 'Someone is taking a walk in the desert' }, it: { title: 'Elefante nel deserto', desc: 'Incontra Lirilì Larilà', hint: 'Qualcuno sta passeggiando nel deserto' } },
  { id: 'platinum', icon: '🏆', en: { title: 'Platinum', desc: 'Unlock every achievement possible on this device (the extras aside)' }, it: { title: 'Platino', desc: 'Sblocca tutti i trofei possibili su questo dispositivo (extra esclusi)' } },
];

export const achievementText = (lang: Lang) =>
  achievements.map((a) => ({ id: a.id, icon: a.icon, svg: a.svg, secret: !!a.secret, bonus: !!a.bonus, on: a.on, ...a[lang] }));
