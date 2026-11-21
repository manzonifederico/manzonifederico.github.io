// Achievements (list in src/data/achievements.ts, board in src/components/Achievements.astro).
// Anything on the site unlocks one with: document.dispatchEvent(new CustomEvent('achieve', { detail: '<id>' })).
// Saved in this browser only (localStorage "achievements": { id: time }), nothing is sent anywhere.
// A new one shows a short notice ("Achievement unlocked") with a soft chime (silent if the arrow game's sound switch
// is off); no notices in recruiter mode. The 🏆 button in the footer shows the count and opens the board.
import { shrinkWrap } from './shrink-wrap';

interface Item {
  id: string;
  icon: string;
  secret: boolean;
  bonus: boolean;
  svg?: string;
  hint?: string;
  on?: 'pc' | 'phone';
  title: string;
  desc: string;
}

const KEY = 'achievements';
const html = document.documentElement;
const dataEl = document.querySelector<HTMLScriptElement>('[data-ach-data]');
const data = dataEl
  ? (JSON.parse(dataEl.textContent ?? '{}') as { unlocked: string; locked: string; tease: string; list: Item[] })
  : null;

const read = (): Record<string, number> => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}');
  } catch {
    return {};
  }
};
const write = (s: Record<string, number>) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* storage blocked: this page only */
  }
};

// this device: a computer (mouse or trackpad) or a phone / tablet (touch only)
const device = (): 'pc' | 'phone' => (matchMedia('(any-hover: hover) and (any-pointer: fine)').matches ? 'pc' : 'phone');
const counts = (a: Item) => !a.on || a.on === device(); // possible here

// boards and counters: unlocked ones in colour, secret ones get their real name once unlocked
function render() {
  if (!data) return;
  const got = read();
  document.querySelectorAll<HTMLElement>('[data-ach]').forEach((li) => {
    const item = data.list.find((a) => a.id === li.dataset.ach);
    if (!item) return;
    const on = !!got[item.id];
    li.classList.toggle('is-unlocked', on);
    const state = li.querySelector('[data-ach-state]');
    if (state) state.textContent = on ? '' : data.locked;
    const trigger = li.querySelector<HTMLButtonElement>('[data-hint-trigger]');
    if (trigger) trigger.hidden = on; // revealed: no more clue needed
    if (item.secret && on) {
      const icon = li.querySelector('.ach-icon')!;
      if (item.svg) icon.innerHTML = item.svg; // our own flag drawing (src/data/achievements.ts)
      else icon.textContent = item.icon;
      li.querySelector('.ach-title')!.textContent = item.title;
      li.querySelector('.ach-desc')!.textContent = item.desc;
    }
  });
  // the counter: the main achievements possible on this device, plus any already won elsewhere in this browser
  const mine = data.list.filter((a) => !a.bonus && (counts(a) || got[a.id])); // the extras don't count
  document.querySelectorAll('[data-ach-count]').forEach((el) => (el.textContent = String(mine.filter((a) => got[a.id]).length)));
  document.querySelectorAll('[data-ach-total]').forEach((el) => (el.textContent = String(mine.length)));
}

// ---------- the notice ----------
// it shows on the half of the screen away from the pointer, so it never covers what you're pointing at (e.g. the
// signature's label at the bottom of the page)
let pointerY = -1;
addEventListener('pointermove', (e) => (pointerY = e.clientY), { passive: true });
addEventListener('pointerdown', (e) => (pointerY = e.clientY), { passive: true });
const queue: Item[] = [];
let showing = false;
function chime() {
  try {
    if (localStorage.getItem('game-sound') === '0') return;
  } catch {
    /* storage blocked: play */
  }
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    // two low, soft notes (G4 then C5), pure sine, quiet, with a gentle swell and a long fade
    [392, 523.25].forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = f;
      const t = ctx.currentTime + i * 0.16;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.045, t + 0.06);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
      o.connect(g).connect(ctx.destination);
      o.start(t);
      o.stop(t + 1);
    });
    window.setTimeout(() => ctx.close(), 1400);
  } catch {
    /* no audio: the notice is enough */
  }
}
function next() {
  const item = queue.shift();
  if (!item || !data) {
    showing = false;
    return;
  }
  showing = true;
  const el = document.createElement('div');
  el.className = pointerY > window.innerHeight / 2 ? 'ach-toast at-top' : 'ach-toast';
  el.setAttribute('role', 'status');
  el.innerHTML = '<span class="ach-toast-icon" aria-hidden="true"></span><span class="ach-toast-text"><strong></strong><span></span></span>';
  const icon = el.querySelector('.ach-toast-icon')!;
  if (item.svg) icon.innerHTML = item.svg; // our own flag drawing (src/data/achievements.ts)
  else icon.textContent = item.icon;
  el.querySelector('strong')!.textContent = `🏆 ${data.unlocked}`;
  el.querySelector('.ach-toast-text span')!.textContent = item.title;
  // inside a window that is open (the death screens, the board): those sit above the whole page, so a notice
  // added to the page itself would be hidden under them
  (document.querySelector('dialog[open]') ?? document.body).appendChild(el);
  chime();
  window.setTimeout(() => el.classList.add('is-out'), 3800);
  window.setTimeout(() => {
    el.remove();
    next();
  }, 4300);
}

function unlock(id: string) {
  if (!data) return;
  const item = data.list.find((a) => a.id === id);
  if (!item) return;
  const got = read();
  if (got[id]) return;
  got[id] = Date.now();
  write(got);
  render();
  if (html.dataset.unbiased !== 'true') {
    queue.push(item);
    if (!showing) {
      showing = true;
      // a couple of seconds later: first you see what you did (a label, the "You died" screen…), then the trophy
      window.setTimeout(next, 2000);
    }
  }
  // every other one possible on this device unlocked (bonus ones aside): platinum
  if (id !== 'platinum' && data.list.every((a) => a.id === 'platinum' || a.bonus || !counts(a) || got[a.id]))
    window.setTimeout(() => unlock('platinum'), 600);
}

document.addEventListener('achieve', (e) => unlock(String((e as CustomEvent<string>).detail)));

// ---------- clues on the secret cards ----------
// Pressed twice (double click, double tap, or Enter / Space twice) a ??? card shows a bubble with a clue. The very
// first time ever it only teases ("Not telling you"); after that, a very vague hint. The bubble is a live region, so
// screen readers read it; it goes away when you leave the card (pointer out, focus elsewhere, Esc, or after 5 s on
// a touch screen).
const TEASED = 'ach-hint-teased';
const lastPress = new WeakMap<HTMLElement, number>();
// screen readers: the clue said through a hidden live region inside the card
function announce(li: HTMLElement, text: string) {
  let live = li.querySelector<HTMLElement>('.ach-live');
  if (!live) {
    live = document.createElement('span');
    live.className = 'ach-live visually-hidden';
    live.setAttribute('role', 'status');
    li.appendChild(live);
  }
  live.textContent = '';
  window.setTimeout(() => (live!.textContent = text), 30);
}
function showHint(li: HTMLElement, text: string, at?: { x: number; y: number }) {
  li.querySelector('.ach-hint')?.remove();
  const bubble = document.createElement('p');
  bubble.className = 'ach-hint';
  bubble.setAttribute('role', 'status');
  li.appendChild(bubble);
  // filled a moment after it's in the page, so screen readers notice the change; then placed where the card was
  // pressed (the centre with a keyboard), kept inside the card
  window.setTimeout(() => {
    bubble.textContent = text;
    shrinkWrap(bubble); // as wide as its longest line
    const r = li.getBoundingClientRect();
    const w = bubble.offsetWidth;
    const h = bubble.offsetHeight;
    const x = at ? at.x - r.left + 12 : (r.width - w) / 2;
    const y = at ? at.y - r.top - h / 2 : (r.height - h) / 2;
    bubble.style.left = `${Math.round(Math.max(8, Math.min(x, r.width - w - 8)))}px`;
    bubble.style.top = `${Math.round(Math.max(4, Math.min(y, r.height - h - 4)))}px`;
  }, 30);
  // it goes away when you leave the card: the mouse moving out, the keyboard focus moving on, Esc; with a finger
  // (which never "leaves") after 5 s or a tap somewhere else
  const timer = window.setTimeout(() => close(), 5000);
  const onLeave = (e: PointerEvent) => e.pointerType !== 'touch' && close();
  const onOutside = (e: PointerEvent) => !li.contains(e.target as Node) && close();
  const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
  const onFocusOut = (e: FocusEvent) => !li.contains(e.relatedTarget as Node | null) && close();
  function close() {
    window.clearTimeout(timer);
    bubble.remove();
    li.removeEventListener('pointerleave', onLeave);
    li.removeEventListener('keydown', onKey);
    li.removeEventListener('focusout', onFocusOut);
    document.removeEventListener('pointerdown', onOutside);
  }
  // a mouse resting on the card keeps it; the 5 s only apply when no pointer is over the card
  li.addEventListener('pointerenter', (e) => e.pointerType !== 'touch' && window.clearTimeout(timer), { once: true });
  if (li.matches(':hover')) window.clearTimeout(timer);
  li.addEventListener('pointerleave', onLeave);
  li.addEventListener('keydown', onKey);
  li.addEventListener('focusout', onFocusOut);
  document.addEventListener('pointerdown', onOutside);
}
document.addEventListener('click', (e) => {
  const btn = (e.target as Element | null)?.closest?.<HTMLElement>('[data-hint-trigger]');
  const li = btn?.closest<HTMLElement>('[data-ach]');
  if (!btn || !li || !data) return;
  const now = performance.now();
  const before = lastPress.get(li) ?? 0;
  lastPress.set(li, now);
  if (now - before > 500) return; // the first press of a pair
  lastPress.set(li, 0);
  let teased = false;
  try {
    teased = localStorage.getItem(TEASED) === '1';
    localStorage.setItem(TEASED, '1');
  } catch {
    teased = true; // storage blocked: straight to the clue
  }
  const item = data.list.find((a) => a.id === li.dataset.ach);
  const text = teased ? item?.hint ?? data.tease : data.tease;
  // with a mouse: the clue is the label that follows the pointer (src/scripts/view-cursor.ts), gone as soon as the
  // pointer leaves the card; screen readers still get it through a hidden live region
  const pe = e as PointerEvent;
  if (pe.pointerType === 'mouse' && document.getElementById('view-cursor')) {
    btn.dataset.cursor = text;
    btn.dataset.cursorPlain = '';
    document.dispatchEvent(new CustomEvent('cursor-show', { detail: btn }));
    btn.addEventListener(
      'pointerleave',
      () => {
        delete btn.dataset.cursor;
        delete btn.dataset.cursorPlain;
      },
      { once: true },
    );
    announce(li, text);
    return;
  }
  // finger or keyboard: a bubble in the card, at the press point (the centre with a keyboard)
  const at = pe.clientX || pe.clientY ? { x: pe.clientX, y: pe.clientY } : undefined;
  showHint(li, text, at);
});

// "Let's talk": any contact used (an e-mail, copying an address, LinkedIn, GitHub, ORCID, ResearchGate)
document.addEventListener('click', (e) => {
  const el = e.target as Element | null;
  if (el?.closest?.('a[href^="mailto:"], [data-copy], a[rel~="me"]')) unlock('contact');
  // "Hire me!": the CV downloaded (the PDF links in the CV section)
  if (el?.closest?.('a[download], a[href$=".pdf"]')) unlock('cv');
});

// the board window
const dialog = document.querySelector<HTMLDialogElement>('[data-ach-dialog]');
document.querySelectorAll('[data-ach-open]').forEach((btn) =>
  btn.addEventListener('click', () => {
    render();
    dialog?.showModal();
  }),
);

// "Bilingual": a page in the other language than the previous one in this visit
try {
  const last = sessionStorage.getItem('ach-lang');
  if (last && last !== html.lang) unlock('language');
  sessionStorage.setItem('ach-lang', html.lang);
} catch {
  /* storage blocked */
}

render();

export {}; // a module, so its names stay private
