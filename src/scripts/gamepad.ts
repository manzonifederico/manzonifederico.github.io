// Game controller support (Xbox and other standard gamepads, through the browser's Gamepad API).
//   D-pad / left stick  → move between links and buttons (to the nearest one in that direction)
//   A                   → press the selected link or button
//   B                   → close an open pop-up or dialog; on a project page, go back
//   right stick         → scroll the page
//   LB / RB             → previous / next reading version on a project page (Key points, Full story, Summary)
// Nothing runs until a controller is connected (BaseLayout only loads this file then); a short note explains the
// buttons the first time in a visit.

const LABELS = {
  en: { title: 'Controller connected 🎮', text: 'D-pad to move, A to select, B to go back, right stick to scroll.' },
  it: { title: 'Controller collegato 🎮', text: 'Croce per spostarti, A per selezionare, B per tornare indietro, levetta destra per scorrere.' },
};
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, summary, [tabindex]:not([tabindex="-1"])';
const DEAD = 0.45; // stick dead zone
const html = document.documentElement;

let raf = 0;
let prev: boolean[] = [];
let held: { dir: string; next: number } | null = null;

const visible = (el: Element) => {
  if (el.closest('[inert], [hidden], dialog:not([open]), [aria-hidden="true"]')) return false;
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== 'hidden';
};

const candidates = () => {
  const dialog = document.querySelector('dialog[open]');
  const scope: ParentNode = dialog ?? document;
  return Array.from(scope.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(visible);
};

function moveFocus(dir: 'up' | 'down' | 'left' | 'right') {
  const list = candidates();
  if (!list.length) return;
  const cur = document.activeElement as HTMLElement | null;
  if (!cur || cur === document.body || !list.includes(cur)) {
    // nothing selected yet: the first one on screen
    const first = list.find((el) => {
      const r = el.getBoundingClientRect();
      return r.top >= 0 && r.bottom <= innerHeight;
    });
    return select(first ?? list[0]);
  }
  const a = cur.getBoundingClientRect();
  const ax = a.left + a.width / 2;
  const ay = a.top + a.height / 2;
  let best: HTMLElement | null = null;
  let bestScore = Infinity;
  for (const el of list) {
    if (el === cur) continue;
    const b = el.getBoundingClientRect();
    const bx = b.left + b.width / 2;
    const by = b.top + b.height / 2;
    const dx = bx - ax;
    const dy = by - ay;
    let main = 0;
    let side = 0;
    if (dir === 'down') [main, side] = [dy, Math.abs(dx)];
    if (dir === 'up') [main, side] = [-dy, Math.abs(dx)];
    if (dir === 'right') [main, side] = [dx, Math.abs(dy)];
    if (dir === 'left') [main, side] = [-dx, Math.abs(dy)];
    if (main <= 2) continue; // not in that direction
    const score = main + side * 2.5;
    if (score < bestScore) {
      bestScore = score;
      best = el;
    }
  }
  if (best) select(best);
}

function select(el: HTMLElement) {
  html.classList.add('gamepad-nav');
  el.focus({ preventScroll: true });
  el.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

function rumble(pad: Gamepad, ms = 40) {
  const act = (pad as Gamepad & { vibrationActuator?: { playEffect?: (t: string, o: object) => Promise<unknown> } }).vibrationActuator;
  act?.playEffect?.('dual-rumble', { duration: ms, strongMagnitude: 0.2, weakMagnitude: 0.4 })?.catch(() => {});
}

function back() {
  const dialog = document.querySelector<HTMLDialogElement>('dialog[open]');
  if (dialog) {
    // same as Esc, so each dialog runs its own closing code
    dialog.dispatchEvent(new Event('cancel', { cancelable: true }));
    dialog.close();
    return;
  }
  const esc = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
  document.activeElement?.dispatchEvent(esc);
  if (document.querySelector('#main > .case')) history.back();
}

function switchMode(step: number) {
  const tabs = Array.from(document.querySelectorAll<HTMLElement>('[role="tab"]')).filter(visible);
  if (!tabs.length) return;
  const i = Math.max(0, tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true'));
  const next = tabs[(i + step + tabs.length) % tabs.length];
  next.click();
  select(next);
}

function poll() {
  const pad = Array.from(navigator.getGamepads?.() ?? []).find((p) => p && p.connected);
  if (!pad) {
    raf = 0;
    return;
  }
  const btn = (i: number) => !!pad.buttons[i]?.pressed;
  const pressed = (i: number) => btn(i) && !prev[i];
  const now = performance.now();

  // direction from the D-pad (12–15) or the left stick
  const lx = pad.axes[0] ?? 0;
  const ly = pad.axes[1] ?? 0;
  const dir = btn(12) || ly < -DEAD ? 'up' : btn(13) || ly > DEAD ? 'down' : btn(14) || lx < -DEAD ? 'left' : btn(15) || lx > DEAD ? 'right' : '';
  if (dir) {
    if (!held || held.dir !== dir) {
      moveFocus(dir as 'up');
      held = { dir, next: now + 380 };
    } else if (now >= held.next) {
      moveFocus(dir as 'up');
      held.next = now + 160;
    }
  } else held = null;

  if (pressed(0)) {
    const el = document.activeElement as HTMLElement | null;
    if (el && el !== document.body) {
      rumble(pad);
      el.click();
    } else moveFocus('down');
  }
  if (pressed(1)) back();
  if (pressed(4)) switchMode(-1);
  if (pressed(5)) switchMode(1);

  // right stick: scroll
  const ry = pad.axes[3] ?? 0;
  if (Math.abs(ry) > 0.2) window.scrollBy({ top: ry * 18, behavior: 'instant' });

  prev = pad.buttons.map((b) => b.pressed);
  raf = requestAnimationFrame(poll);
}

function note() {
  document.dispatchEvent(new CustomEvent('achieve', { detail: 'gamepad' })); // src/scripts/achievements.ts
  try {
    if (sessionStorage.getItem('gamepad-note') === '1') return;
    sessionStorage.setItem('gamepad-note', '1');
  } catch {
    /* storage blocked */
  }
  const l = LABELS[html.lang.startsWith('it') ? 'it' : 'en'];
  const el = document.createElement('div');
  el.className = 'gamepad-note';
  el.setAttribute('role', 'status');
  el.innerHTML = `<strong></strong><span></span>`;
  el.querySelector('strong')!.textContent = l.title;
  el.querySelector('span')!.textContent = l.text;
  document.body.appendChild(el);
  window.setTimeout(() => el.classList.add('is-out'), 6000);
  window.setTimeout(() => el.remove(), 6600);
}

addEventListener('gamepadconnected', () => {
  note();
  if (!raf) raf = requestAnimationFrame(poll);
});
// back to the mouse or touch: the controller's highlight style goes away
addEventListener('pointerdown', () => html.classList.remove('gamepad-nav'), { passive: true });
// this file is loaded by BaseLayout when a controller connects, so that controller is already here: show the note
// and start reading it (some browsers only report a controller after a button press)
if (Array.from(navigator.getGamepads?.() ?? []).some((p) => p && p.connected) && !raf) {
  note();
  raf = requestAnimationFrame(poll);
}

export {}; // a module, so its names stay private
