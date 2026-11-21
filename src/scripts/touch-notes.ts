// Touch screens: the labels that follow the mouse on a computer (view-cursor.ts) become a speech bubble.
// - Notes on things you can't click (Rovigo, Venice, the signature, the photo, a project's title, …) get a small
//   marker, and a tap shows the bubble right above them for a few seconds (tap elsewhere or scroll and it goes).
//   A project's title answers only on its square (a 45px area around it).
// - Project cards: one that stays in the middle of the screen gives a little wiggle after 10 s, then 2.2 s later one
//   of its lines that invite to open it, at random (src/data/nudges.ts). The same card can do it again 30 s later,
//   3 times in a row at most, then not for 2 minutes. Only one card at a time: the one filling most of the middle.
// Things you can click keep working as before: a tap there opens the link, no bubble.
// The bubble is a live region, so screen readers read what it says; the notes can be reached with the keyboard too.
// Recruiter mode hides the personal ones (data-cursor-pii), as with the mouse. Reduced motion: no wiggle, no pop.
// The marker: a zigzag underline on words, chips and the signature, the pointer's blue square after a project's title
// (styles in global.css).
import { CLICKABLE, fillLabel, hiddenNow, paintLabel } from './cursor-label';
import { shrinkWrap } from './shrink-wrap';

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

// the square always sits right after the title's last letter: the last word and the square go in one piece that
// can't break across lines (otherwise a long title, e.g. "Instagram Redesign", could leave it alone on a new line)
function glueToLastWord(title: HTMLElement, dot: HTMLElement) {
  const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP),
  });
  let last: Text | null = null;
  while (walker.nextNode()) last = walker.currentNode as Text;
  const m = last?.textContent?.match(/\S+(?=\s*$)/);
  if (!last || !m || m.index === undefined) {
    title.appendChild(dot);
    return;
  }
  const word = last.splitText(m.index); // "…Instagram " | "Redesign"
  word.splitText(m[0].length); // anything after the word (spaces) stays outside
  const glue = document.createElement('span');
  glue.className = 'tap-dot-glue';
  word.before(glue);
  glue.append(word, dot);
}

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

// notes already opened (in this browser, localStorage "notes-seen", reset by ?replay): their marker turns paler and
// stops moving (no drift, no hops), and they still answer a tap. Kept by their label (data-cursor)
const SEEN = 'notes-seen';
const seen = new Set<string>();
try {
  (JSON.parse(localStorage.getItem(SEEN) ?? '[]') as string[]).forEach((k) => seen.add(k));
} catch {
  /* storage blocked: this page only */
}
const markSeen = (note: HTMLElement) => {
  note.classList.add('is-seen');
  const key = note.dataset.cursor ?? '';
  if (!key || seen.has(key)) return;
  seen.add(key);
  try {
    localStorage.setItem(SEEN, JSON.stringify([...seen]));
  } catch {
    /* storage blocked */
  }
};

// for screen readers and keyboards every note is a button (named by its own words, or the title's "About the title"),
// described as "Learn more"; what it says is read out by the bubble (a live region) once it opens
const hint = document.createElement('span');
hint.id = 'tap-note-hint';
hint.hidden = true; // still usable as a description
hint.textContent = html.lang === 'it' ? 'Per saperne di più' : 'Learn more';
document.body.appendChild(hint);
const buttons = new Map<HTMLElement, HTMLElement>(); // note → the element that is its button
const asButton = (note: HTMLElement, btn: HTMLElement) => {
  btn.setAttribute('role', 'button');
  btn.tabIndex = 0;
  btn.setAttribute('aria-describedby', hint.id);
  buttons.set(note, btn);
};

// found first, marked after (a note made a button would hide the one inside it)
const notes = [...document.querySelectorAll<HTMLElement>('[data-cursor]')].filter(isNote);
notes.forEach((el) => {
  el.classList.add('tap-note');
  const known = seen.has(el.dataset.cursor ?? '');
  if (known) el.classList.add('is-seen');
  // a project's title: only its square answers (a 45px area with the square in the middle, so the big title doesn't
  // pop a bubble wherever it's touched); the square is the button, the heading stays a heading
  if (el.matches('h1, h2, h3')) {
    el.classList.add('tap-note--dot');
    const dot = document.createElement('span');
    dot.className = 'tap-dot';
    dot.setAttribute('aria-label', html.lang === 'it' ? 'Curiosità sul titolo' : 'About the title');
    asButton(el, dot);
    glueToLastWord(el, dot);
    if (!known) hops(dot);
    return;
  }
  // a word in a sentence or the photo: the note itself is the button
  if (el.matches('span, div')) return asButton(el, el);
  // a chip (a list item) or the signature (a paragraph) keep what they are: their words go in a button inside them
  const btn = document.createElement('span');
  btn.className = 'tap-note-btn';
  btn.append(...el.childNodes);
  el.append(btn);
  asButton(el, btn);
});

// recruiter mode hides the personal notes: then they aren't buttons either (nothing to open), and come back after
const syncPersonal = () =>
  buttons.forEach((btn, note) => {
    if (!('cursorPii' in note.dataset)) return;
    if (hiddenNow(note)) {
      btn.removeAttribute('role');
      btn.removeAttribute('tabindex');
      btn.removeAttribute('aria-describedby');
    } else if (!btn.hasAttribute('role')) asButton(note, btn);
  });
syncPersonal();
new MutationObserver(syncPersonal).observe(html, { attributes: true, attributeFilter: ['data-unbiased'] });

// ---------- chips: their whole outline, round ends too, gently serrated like the underlines ----------
// A clip-path polygon that walks around the chip's pill shape and moves in and out of it as it goes, redrawn when the
// chip changes size: sharp teeth 6px apart and 2px deep (as in the underlines), or once the chip has been opened soft
// waves, wider (10px) and shallower (1.2px). 7 s after the page opens the teeth drift along the edge for 5 s, like the
// underlines; the opened ones stay still.
type Edge = { period: number; depth: number; smooth: boolean };
const TEETH: Edge = { period: 6, depth: 2, smooth: false };
const WAVES: Edge = { period: 10, depth: 1.2, smooth: true };
const pill = (w: number, h: number, edge: Edge, phase = 0) => {
  const r = h / 2;
  const straight = Math.max(0, w - h);
  const arc = Math.PI * r;
  const perimeter = 2 * straight + 2 * arc;
  const count = Math.max(1, Math.round(perimeter / edge.period)); // whole teeth all the way round
  const per = edge.smooth ? 8 : 2; // points per tooth: a soft curve, or tip and valley
  const n = count * per;
  const step = perimeter / n;
  const points: string[] = [];
  for (let i = 0; i < n; i++) {
    let s = (((i + phase * per) * step) % perimeter + perimeter) % perimeter;
    const inset = edge.smooth ? (edge.depth * (1 - Math.cos((2 * Math.PI * (i % per)) / per))) / 2 : i % 2 ? edge.depth : 0;
    const rr = r - inset;
    let x: number;
    let y: number;
    if (s < straight) {
      x = r + s; // top edge, left to right
      y = inset;
    } else if ((s -= straight) < arc) {
      const a = -Math.PI / 2 + s / r; // right end
      x = w - r + rr * Math.cos(a);
      y = r + rr * Math.sin(a);
    } else if ((s -= arc) < straight) {
      x = w - r - s; // bottom edge, right to left
      y = h - inset;
    } else {
      const a = Math.PI / 2 + (s - straight) / r; // left end
      x = r + rr * Math.cos(a);
      y = r + rr * Math.sin(a);
    }
    points.push(`${x.toFixed(1)}px ${y.toFixed(1)}px`);
  }
  return `polygon(${points.join(',')})`;
};
const drifts = new WeakMap<HTMLElement, Animation>();
function shapeChip(chip: HTMLElement) {
  const w = chip.offsetWidth;
  const h = chip.offsetHeight;
  if (!w || !h) return;
  const seenChip = chip.classList.contains('is-seen');
  const edge = seenChip ? WAVES : TEETH;
  chip.style.clipPath = pill(w, h, edge);
  drifts.get(chip)?.cancel();
  if (seenChip || reduce.matches || !chip.animate) return;
  // one tooth further along per second, 5 times, starting 7 s after the page opened
  const wait = 7000 - performance.now();
  if (wait < -5000) return; // that moment is over
  drifts.set(
    chip,
    chip.animate([{ clipPath: pill(w, h, edge, 0) }, { clipPath: pill(w, h, edge, 1) }], {
      duration: 1000,
      iterations: 5,
      delay: Math.max(0, wait),
      easing: 'linear',
    }),
  );
}
const chips = notes.filter((n) => n.matches('li'));
chips.forEach(shapeChip);
if ('ResizeObserver' in window) {
  const ro = new ResizeObserver((entries) => entries.forEach((e) => shapeChip(e.target as HTMLElement)));
  chips.forEach((c) => ro.observe(c));
}

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
  bubble.style.left = '0px'; // measured with the whole width available, wherever it was last time
  fillLabel(bubble, target, opts.text);
  shrinkWrap(bubble); // as wide as its longest line
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
  const dot = note.querySelector<HTMLElement>('.tap-dot');
  if (dot) stopHops.get(dot)?.(); // found: no need to hop any more
  if (hiddenNow(note)) return;
  markSeen(note);
  if (note.matches('li')) shapeChip(note); // soft waves now
  bubble.setAttribute('aria-live', 'polite'); // asked for: read it out
  show(note, { x });
  // the same achievements a mouse unlocks by passing over (data-achieve: Rovigo, Venice, the signature)
  if (note.dataset.achieve) document.dispatchEvent(new CustomEvent('achieve', { detail: note.dataset.achieve }));
};

document.addEventListener('click', (e) => {
  const note = noteAt(e.target);
  if (!note) return;
  // a title's bubble points at its square
  const dot = note.querySelector<HTMLElement>('.tap-dot');
  const x = dot ? dot.getBoundingClientRect().left + dot.offsetWidth / 2 : e.detail ? e.clientX : undefined;
  tap(note, x);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && shownFor) return hide(); // Esc closes the bubble
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
      bubble.setAttribute('aria-live', 'off'); // nobody asked: a nudge isn't read out over what someone is listening to
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
          if (active === card) active = null;
          choose(); // this card again if it is still the one in the middle, or another one
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

  // one card at a time: of the cards in the middle of the screen, the one that fills most of it. While it rests after
  // talking, the cards around it wait too (no chorus); once it leaves the middle, another one can take over
  let active: HTMLElement | null = null;
  const central = () => {
    const top = innerHeight * 0.35;
    const bottom = innerHeight * 0.65;
    let best: HTMLElement | null = null;
    let most = 0;
    inMiddle.forEach((card) => {
      if (resting.has(card)) return;
      const r = card.getBoundingClientRect();
      const overlap = Math.min(r.bottom, bottom) - Math.max(r.top, top);
      if (overlap > most) {
        most = overlap;
        best = card;
      }
    });
    return best as HTMLElement | null;
  };
  const choose = () => {
    if (active && resting.has(active)) {
      if (inMiddle.has(active)) return; // still resting right there: the others wait
      active = null; // gone from the middle: its rest goes on, the others are free
    }
    const next = central();
    if (next === active) return;
    if (active) window.clearTimeout(timers.get(active)); // not talking yet: its countdown stops
    active = next;
    if (active) start(active);
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const { target, isIntersecting } of entries) {
        if (isIntersecting) inMiddle.add(target as HTMLElement);
        else inMiddle.delete(target as HTMLElement);
      }
      choose();
    },
    { rootMargin: '-35% 0px -35% 0px' }, // the middle 30% of the screen
  );
  cards.forEach((c) => io.observe(c));
}
