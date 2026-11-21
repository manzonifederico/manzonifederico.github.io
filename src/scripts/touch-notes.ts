// Touch screens: the labels that follow the mouse on a computer (view-cursor.ts) become a speech bubble.
// - Notes on things you can't click (Rovigo, Venice, the signature, the photo, a project's title, …) get a small
//   marker, and a tap shows the bubble right above them for a few seconds (tap elsewhere or scroll and it goes).
// - Project cards: one that stays in the middle of the screen for a few seconds gives a little wiggle and one of its
//   nudge lines (the same ones a mouse gets after 10 s on a card). At most one card every 12 s, each card once.
// Things you can click keep working as before: a tap there opens the link, no bubble.
// The bubble is a live region, so screen readers read what it says; the notes can be reached with the keyboard too.
// Recruiter mode hides the personal ones (data-cursor-pii), as with the mouse. Reduced motion: no wiggle, no pop.
// Two looks for the marker are being compared: a zigzag underline (default) or the blue square of the clickable
// pointer (?mark=square in the address).
import { CLICKABLE, fillLabel, hiddenNow, paintLabel } from './cursor-label';

const html = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
html.classList.add('touch-notes');
html.dataset.tapMark = new URLSearchParams(location.search).get('mark') === 'square' ? 'square' : 'zigzag';

// a note: has a label, isn't (inside) something you can click, isn't an image that zooms, isn't a game
// (the brainrot word on the Instagram page), a trophy's clue or the language you're reading in (header)
const isNote = (el: HTMLElement) =>
  !el.matches(CLICKABLE) &&
  !el.closest(CLICKABLE) &&
  !el.closest('dialog') &&
  !el.matches('img, [datacursor], [data-cursor-plain], [data-brainrot], [aria-current]');

// found first, marked after (a note made a button would hide the one inside it, Venice in "a town near Venice")
const notes = [...document.querySelectorAll<HTMLElement>('[data-cursor]')].filter(isNote);
notes.forEach((el) => {
  el.classList.add('tap-note');
  el.tabIndex = 0; // reachable with a keyboard
  if (el.matches('span')) el.setAttribute('role', 'button'); // a word in a sentence (headings and chips keep theirs)
});

const bubble = document.createElement('div');
bubble.className = 'tap-bubble';
bubble.setAttribute('role', 'status'); // read out when it changes
document.body.appendChild(bubble);

let hideTimer = 0;
let shownFor: HTMLElement | null = null;
let shownAtY = 0; // the page's scroll position when the bubble appeared
const hide = () => {
  window.clearTimeout(hideTimer);
  bubble.classList.remove('is-on');
  shownFor = null;
};

/** shows the bubble above `target`, pointing at x (a tap's position, else its middle). With no room above: below it,
 *  or for a card (often taller than the screen) inside it, at the top of the part you can see */
const show = (target: HTMLElement, opts: { x?: number; text?: string; card?: boolean } = {}) => {
  fillLabel(bubble, target, opts.text);
  paintLabel(bubble, target);
  bubble.classList.remove('is-on', 'is-below', 'is-inside');
  const r = target.getBoundingClientRect();
  const x = Math.min(r.right - 8, Math.max(r.left + 8, opts.x ?? r.left + r.width / 2));
  const w = bubble.offsetWidth;
  const h = bubble.offsetHeight;
  const left = Math.min(innerWidth - w - 12, Math.max(12, x - w / 2));
  let top = r.top - h - 10;
  if (top < 8 && opts.card) {
    top = Math.max(r.top, 0) + 12;
    bubble.classList.add('is-inside');
  } else if (top < 8) {
    top = r.bottom + 10;
    bubble.classList.add('is-below');
  }
  bubble.style.left = `${left + scrollX}px`;
  bubble.style.top = `${top + scrollY}px`;
  bubble.style.setProperty('--tail', `${Math.round(x - left)}px`);
  void bubble.offsetWidth; // restart the pop
  bubble.classList.add('is-on');
  shownFor = target;
  shownAtY = scrollY;
  window.clearTimeout(hideTimer);
  // long enough to read: 2.5 s plus a little for each letter, up to 6 s
  hideTimer = window.setTimeout(hide, Math.min(6000, 2500 + (bubble.textContent?.length ?? 0) * 45));
};

const tap = (note: HTMLElement, x?: number) => {
  if (hiddenNow(note)) return;
  show(note, { x });
  // the same achievements a mouse unlocks by passing over (data-achieve: Rovigo, Venice, the signature)
  if (note.dataset.achieve) document.dispatchEvent(new CustomEvent('achieve', { detail: note.dataset.achieve }));
};

document.addEventListener('click', (e) => {
  const note = (e.target as Element | null)?.closest?.<HTMLElement>('.tap-note');
  if (note) tap(note, e.detail ? e.clientX : undefined);
});
document.addEventListener('keydown', (e) => {
  const note = (e.target as Element | null)?.closest?.<HTMLElement>('.tap-note');
  if (!note || (e.key !== 'Enter' && e.key !== ' ')) return;
  e.preventDefault();
  tap(note);
});
// a touch anywhere else, or a real scroll, puts the bubble away
document.addEventListener(
  'pointerdown',
  (e) => {
    if (shownFor && !(e.target as Element | null)?.closest?.('.tap-note')) hide();
  },
  { passive: true },
);
addEventListener('scroll', () => shownFor && Math.abs(scrollY - shownAtY) > 60 && hide(), { passive: true });

// ---------- project cards: a wiggle and a nudge when one rests in the middle of the screen ----------
const cards = document.querySelectorAll<HTMLElement>('.card[data-cursor-nudges]');
if (cards.length && 'IntersectionObserver' in window) {
  const WAIT = 3500; // ms in the middle of the screen
  const GAP = 12000; // ms between two nudges
  const timers = new Map<HTMLElement, number>();
  const done = new Set<HTMLElement>();
  let last = -GAP;
  let first = true;

  const nudge = (card: HTMLElement) => {
    timers.delete(card);
    if (done.has(card) || shownFor || performance.now() - last < GAP) return;
    let lines: string[] = [];
    try {
      lines = JSON.parse(card.dataset.cursorNudges ?? '[]');
    } catch {
      return;
    }
    if (!lines.length) return;
    done.add(card);
    last = performance.now();
    if (!reduce.matches) {
      card.classList.remove('is-wiggle');
      void card.offsetWidth;
      card.classList.add('is-wiggle');
      card.addEventListener('animationend', () => card.classList.remove('is-wiggle'), { once: true });
    }
    show(card, { text: lines[Math.floor(Math.random() * lines.length)], card: true }); // just above the card, pointing at it
    if (first) document.dispatchEvent(new CustomEvent('achieve', { detail: 'nudge' }));
    first = false;
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const { target, isIntersecting } of entries) {
        const card = target as HTMLElement;
        window.clearTimeout(timers.get(card));
        timers.delete(card);
        if (isIntersecting && !done.has(card)) timers.set(card, window.setTimeout(() => nudge(card), WAIT));
      }
    },
    { rootMargin: '-35% 0px -35% 0px' }, // the middle 30% of the screen
  );
  cards.forEach((c) => io.observe(c));
}
