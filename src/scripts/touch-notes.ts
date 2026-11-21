// Touch screens: the labels that follow the mouse on a computer (view-cursor.ts) become a speech bubble.
// - Notes on things you can't click (Rovigo, Venice, the signature, the photo, a project's title, …) get a small
//   marker, and a tap shows the bubble right above them for a few seconds (tap elsewhere or scroll and it goes).
//   A project's title answers only on its square (a 45px area around it).
// - Project cards: one that stays in the middle of the screen gives a little wiggle after 10 s, then 2.2 s later one
//   of its lines that invite to open it, at random (src/data/nudges.ts). The same card can do it again 30 s later,
//   3 times in a row at most, then not for 2 minutes.
// Things you can click keep working as before: a tap there opens the link, no bubble.
// The bubble is a live region, so screen readers read what it says; the notes can be reached with the keyboard too.
// Recruiter mode hides the personal ones (data-cursor-pii), as with the mouse. Reduced motion: no wiggle, no pop.
// The marker: a zigzag underline on words, chips and the signature, the pointer's blue square after a project's title
// (styles in global.css).
import { CLICKABLE, fillLabel, hiddenNow, paintLabel } from './cursor-label';

const html = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
html.classList.add('touch-notes');

// a note: has a label, isn't (inside) something you can click, isn't an image that zooms, isn't a game
// (the brainrot word on the Instagram page), a trophy's clue or the language you're reading in (header)
const isNote = (el: HTMLElement) =>
  !el.matches(CLICKABLE) &&
  !el.closest(CLICKABLE) &&
  !el.closest('dialog') &&
  !el.matches('img, [datacursor], [data-cursor-plain], [data-brainrot], [aria-current]');

// a title's square says "touch me": 10 s after the page opens it hops 3 times (1.2 s apart), waits 7 s, hops 3 times
// again, then rests 30 s; that 4 times in all. Touching it stops it for good. Reduced motion: no hops.
const stopHops = new WeakMap<HTMLElement, () => void>();
function hops(dot: HTMLElement) {
  if (reduce.matches) return;
  const FIRST = 10000;
  const HOPS = 3;
  const HOP_EVERY = 1200;
  const BURSTS = 2; // hop bursts per round
  const BURST_GAP = 7000; // between the two bursts
  const ROUND_GAP = 30000; // between rounds
  const ROUNDS = 4;
  const hop = () => {
    dot.classList.remove('is-hop');
    void dot.offsetWidth; // restart the animation
    dot.classList.add('is-hop');
  };
  const timers: number[] = [];
  let t = Math.max(0, FIRST - performance.now()); // 10 s from when the page opened (this script loads a bit later)
  for (let round = 0; round < ROUNDS; round++) {
    for (let burst = 0; burst < BURSTS; burst++) {
      for (let i = 0; i < HOPS; i++) timers.push(window.setTimeout(hop, t + i * HOP_EVERY));
      t += (HOPS - 1) * HOP_EVERY + (burst < BURSTS - 1 ? BURST_GAP : ROUND_GAP);
    }
  }
  stopHops.set(dot, () => {
    timers.forEach((id) => window.clearTimeout(id));
    dot.classList.remove('is-hop');
  });
}

// found first, marked after (a note made a button would hide the one inside it, Venice in "a town near Venice")
const notes = [...document.querySelectorAll<HTMLElement>('[data-cursor]')].filter(isNote);
notes.forEach((el) => {
  el.classList.add('tap-note');
  // a project's title: only its square answers (a 45px area with the square in the middle, so the big title doesn't
  // pop a bubble wherever it's touched); the square is the button, the heading stays a heading
  if (el.matches('h1, h2, h3')) {
    el.classList.add('tap-note--dot');
    const dot = document.createElement('span');
    dot.className = 'tap-dot';
    dot.setAttribute('role', 'button');
    dot.setAttribute('aria-label', html.lang === 'it' ? 'Curiosità sul titolo' : 'About the title');
    dot.tabIndex = 0;
    el.appendChild(dot);
    hops(dot);
    return;
  }
  el.tabIndex = 0; // reachable with a keyboard
  if (el.matches('span')) el.setAttribute('role', 'button'); // a word in a sentence (chips keep their role)
});

/** the note a tap (or a key) on this element is for: a title only through its square */
const noteAt = (t: EventTarget | null) => {
  const el = (t as Element | null)?.closest?.<HTMLElement>('.tap-note');
  if (!el) return null;
  return el.matches('.tap-note--dot') && !(t as Element).closest('.tap-dot') ? null : el;
};

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
  shownFor?.classList.remove('is-nudged');
  shownFor = null;
};

/** shows the bubble above `target`, pointing at x (a tap's position, else its middle). With no room above: below it,
 *  or for a card (often taller than the screen) inside it, at the top of the part you can see */
const show = (target: HTMLElement, opts: { x?: number; text?: string; card?: boolean } = {}) => {
  shownFor?.classList.remove('is-nudged');
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
  const dot = note.querySelector<HTMLElement>(':scope > .tap-dot');
  if (dot) stopHops.get(dot)?.(); // found: no need to hop any more
  if (hiddenNow(note)) return;
  show(note, { x });
  // the same achievements a mouse unlocks by passing over (data-achieve: Rovigo, Venice, the signature)
  if (note.dataset.achieve) document.dispatchEvent(new CustomEvent('achieve', { detail: note.dataset.achieve }));
};

document.addEventListener('click', (e) => {
  const note = noteAt(e.target);
  if (!note) return;
  // a title's bubble points at its square
  const dot = note.querySelector<HTMLElement>(':scope > .tap-dot');
  const x = dot ? dot.getBoundingClientRect().left + dot.offsetWidth / 2 : e.detail ? e.clientX : undefined;
  tap(note, x);
});
document.addEventListener('keydown', (e) => {
  const note = noteAt(e.target);
  if (!note || (e.key !== 'Enter' && e.key !== ' ')) return;
  e.preventDefault();
  tap(note);
});
// a touch anywhere else, or a real scroll, puts the bubble away
document.addEventListener(
  'pointerdown',
  (e) => {
    if (shownFor && !noteAt(e.target)) hide();
  },
  { passive: true },
);
addEventListener('scroll', () => shownFor && Math.abs(scrollY - shownAtY) > 60 && hide(), { passive: true });

// ---------- project cards: a wiggle, then a nudge, when one rests in the middle of the screen ----------
// 10 s in the middle: the card wiggles; 2.2 s more: a bubble with one of its lines (data-touch-nudges, src/data/nudges.ts:
// a pool per project, picked at random, the catchiest more often). 30 s later the same card can do it again, up to 3 times
// in a row; then it waits at least 2 minutes before starting over.
const cards = document.querySelectorAll<HTMLElement>('.card[data-touch-nudges]');
if (cards.length && 'IntersectionObserver' in window) {
  const WIGGLE_AFTER = 10000;
  const TALK_AFTER = 2200; // after the wiggle
  const RESET = 30000; // before the same card can do it again
  const IN_A_ROW = 3; // times in a row, then…
  const LONG_REST = 120000; // …a longer rest
  const count = new Map<HTMLElement, number>();
  const timers = new Map<HTMLElement, number>();
  const resting = new Set<HTMLElement>(); // cards resting after a nudge
  const inMiddle = new Set<HTMLElement>();
  let first = true;

  const wiggle = (card: HTMLElement) => {
    if (reduce.matches) return;
    card.classList.remove('is-wiggle');
    void card.offsetWidth;
    card.classList.add('is-wiggle');
    card.addEventListener('animationend', () => card.classList.remove('is-wiggle'), { once: true });
  };

  // a random line, the first ones (the catchiest) more often: weights 5, 4, 3…; never the one this card said last time
  const said = new Map<HTMLElement, string>();
  const pick = (card: HTMLElement, lines: string[]) => {
    const pool = lines.length > 1 ? lines.filter((l) => l !== said.get(card)) : lines;
    const weights = pool.map((l) => Math.max(1, 5 - lines.indexOf(l)));
    let r = Math.random() * weights.reduce((a, b) => a + b, 0);
    const line = pool.find((_, i) => (r -= weights[i]) < 0) ?? pool[0];
    said.set(card, line);
    return line;
  };

  const talk = (card: HTMLElement) => {
    let lines: string[] = [];
    try {
      lines = JSON.parse(card.dataset.touchNudges ?? '[]');
    } catch {
      /* no lines */
    }
    if (lines.length && !shownFor) {
      show(card, { text: pick(card, lines), card: true }); // above the card
      card.classList.add('is-nudged'); // outlined in its colour while the bubble is up (global.css)
      if (first) document.dispatchEvent(new CustomEvent('achieve', { detail: 'nudge' }));
      first = false;
    }
    // a rest, then it can start over (right away if it is still in the middle of the screen); after the third time
    // in a row a longer one, and the count starts again
    const n = (count.get(card) ?? 0) + 1;
    count.set(card, n % IN_A_ROW);
    resting.add(card);
    timers.set(
      card,
      window.setTimeout(
        () => {
          resting.delete(card);
          if (inMiddle.has(card)) start(card);
        },
        n >= IN_A_ROW ? LONG_REST : RESET,
      ),
    );
  };

  const start = (card: HTMLElement) => {
    window.clearTimeout(timers.get(card));
    timers.set(
      card,
      window.setTimeout(() => {
        wiggle(card);
        timers.set(card, window.setTimeout(() => talk(card), TALK_AFTER));
      }, WIGGLE_AFTER),
    );
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const { target, isIntersecting } of entries) {
        const card = target as HTMLElement;
        if (isIntersecting) inMiddle.add(card);
        else inMiddle.delete(card);
        if (resting.has(card)) continue; // its rest keeps running, wherever it is
        window.clearTimeout(timers.get(card));
        if (isIntersecting) start(card);
      }
    },
    { rootMargin: '-35% 0px -35% 0px' }, // the middle 30% of the screen
  );
  cards.forEach((c) => io.observe(c));
}
