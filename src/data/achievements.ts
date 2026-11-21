// Achievements: the site's easter eggs, collected (src/scripts/achievements.ts keeps track, in this browser only).
// Each one is unlocked by a `document.dispatchEvent(new CustomEvent('achieve', { detail: '<id>' }))` where it happens.
// "secret" ones show as ??? until unlocked, so the surprise isn't spoiled; the others show their hint.
import type { Lang } from '../i18n/ui';

export interface Achievement {
  id: string;
  icon: string;
  secret?: boolean;
  en: { title: string; desc: string };
  it: { title: string; desc: string };
}

export const achievements: Achievement[] = [
  { id: 'first-squash', icon: '🦟', en: { title: 'First blood', desc: 'Squash one of the little arrows' }, it: { title: 'Primo sangue', desc: 'Schiaccia una delle frecce' } },
  { id: 'boss', icon: '🏹', en: { title: 'Here comes the boss', desc: 'Squash every arrow on the page' }, it: { title: 'Arriva il boss', desc: 'Schiaccia tutte le frecce della pagina' } },
  { id: 'died', icon: '💀', en: { title: 'You died', desc: 'Lose to the big arrow' }, it: { title: 'Sei morto', desc: 'Perdi contro la freccia gigante' } },
  { id: 'died-10', icon: '🔥', en: { title: 'Prepare to die', desc: 'Die 10 times' }, it: { title: 'Preparati a morire', desc: 'Muori 10 volte' } },
  { id: 'phone-shake', icon: '📳', en: { title: 'Earthquake', desc: 'Shake your phone while the arrows are around' }, it: { title: 'Terremoto', desc: 'Scuoti il telefono mentre ci sono le frecce' } },
  { id: 'star', icon: '✴️', secret: true, en: { title: 'Patience', desc: 'Leave the mouse still until something happens' }, it: { title: 'Pazienza', desc: 'Lascia fermo il mouse finché succede qualcosa' } },
  { id: 'shake-square', icon: '🟦', secret: true, en: { title: 'Where’s my pointer?', desc: 'Shake the mouse' }, it: { title: 'Dov’è il puntatore?', desc: 'Scuoti il mouse' } },
  { id: 'bottom-note', icon: '🙈', secret: true, en: { title: 'Nothing to see here', desc: 'Pull past the end of the page' }, it: { title: 'Niente da vedere', desc: 'Tira oltre la fine della pagina' } },
  { id: 'rovigo', icon: '😴', en: { title: 'Boring town', desc: 'Find out where I grew up' }, it: { title: 'Città noiosa', desc: 'Scopri dove sono cresciuto' } },
  { id: 'bacaro', icon: '🍷', secret: true, en: { title: 'Bacaro tour', desc: 'Hover over Venice' }, it: { title: 'Bacaro tour', desc: 'Passa sopra Venezia' } },
  { id: 'credits', icon: '🤖', secret: true, en: { title: 'Credits', desc: 'Find out who helped build this site' }, it: { title: 'Titoli di coda', desc: 'Scopri chi ha aiutato a costruire il sito' } },
  { id: 'nudge', icon: '🤔', en: { title: 'Indecisive', desc: 'Keep the pointer on a project for 10 seconds' }, it: { title: 'Indeciso', desc: 'Tieni il puntatore su un progetto per 10 secondi' } },
  { id: 'full-story', icon: '📖', en: { title: 'Bookworm', desc: 'Open the full story of a project' }, it: { title: 'Topo di biblioteca', desc: 'Apri la versione completa di un progetto' } },
  { id: 'dark', icon: '🌙', en: { title: 'Dark side', desc: 'Switch to the dark theme' }, it: { title: 'Lato oscuro', desc: 'Passa al tema scuro' } },
  { id: 'language', icon: '🌍', en: { title: 'Bilingual', desc: 'Read the site in the other language' }, it: { title: 'Bilingue', desc: 'Leggi il sito nell’altra lingua' } },
  { id: 'recruiter', icon: '🕵️', en: { title: 'Unbiased', desc: 'Turn on recruiter mode' }, it: { title: 'Senza pregiudizi', desc: 'Attiva la modalità recruiter' } },
  { id: 'gamepad', icon: '🎮', en: { title: 'Player 2 has joined', desc: 'Connect a game controller' }, it: { title: 'Player 2 è entrato', desc: 'Collega un controller' } },
  { id: 'brainrot', icon: '🧠', secret: true, en: { title: 'Brainrotted', desc: 'Get killed by a brainrot' }, it: { title: 'Brainrottato', desc: 'Fatti uccidere da un brainrot' } },
  { id: 'tung', icon: '🪵', secret: true, en: { title: 'Tung tung tung', desc: 'Meet Tung Tung Tung Sahur' }, it: { title: 'Tung tung tung', desc: 'Incontra Tung Tung Tung Sahur' } },
  { id: 'lirili', icon: '🐘', secret: true, en: { title: 'Elephant in the desert', desc: 'Meet Lirilì Larilà' }, it: { title: 'Elefante nel deserto', desc: 'Incontra Lirilì Larilà' } },
  { id: 'platinum', icon: '🏆', en: { title: 'Platinum', desc: 'Unlock every other achievement' }, it: { title: 'Platino', desc: 'Sblocca tutti gli altri achievement' } },
];

export const achievementText = (lang: Lang) =>
  achievements.map((a) => ({ id: a.id, icon: a.icon, secret: !!a.secret, ...a[lang] }));
