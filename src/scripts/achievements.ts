// Achievements (list in src/data/achievements.ts, board in src/components/Achievements.astro).
// Anything on the site unlocks one with: document.dispatchEvent(new CustomEvent('achieve', { detail: '<id>' })).
// Saved in this browser only (localStorage "achievements": { id: time }), nothing is sent anywhere.
// A new one shows a short notice ("Achievement unlocked") with a soft chime (silent if the arrow game's sound switch
// is off); no notices in recruiter mode. The 🏆 button in the footer shows the count and opens the board.

interface Item {
  id: string;
  icon: string;
  secret: boolean;
  title: string;
  desc: string;
}

const KEY = 'achievements';
const html = document.documentElement;
const dataEl = document.querySelector<HTMLScriptElement>('[data-ach-data]');
const data = dataEl ? (JSON.parse(dataEl.textContent ?? '{}') as { unlocked: string; locked: string; list: Item[] }) : null;

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
    if (item.secret && on) {
      li.querySelector('.ach-icon')!.textContent = item.icon;
      li.querySelector('.ach-title')!.textContent = item.title;
      li.querySelector('.ach-desc')!.textContent = item.desc;
    }
  });
  const count = data.list.filter((a) => got[a.id]).length;
  document.querySelectorAll('[data-ach-count]').forEach((el) => (el.textContent = String(count)));
}

// ---------- the notice ----------
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
  el.className = 'ach-toast';
  el.setAttribute('role', 'status');
  el.innerHTML = '<span class="ach-toast-icon" aria-hidden="true"></span><span class="ach-toast-text"><strong></strong><span></span></span>';
  el.querySelector('.ach-toast-icon')!.textContent = item.icon;
  el.querySelector('strong')!.textContent = `🏆 ${data.unlocked}`;
  el.querySelector('.ach-toast-text span')!.textContent = item.title;
  document.body.appendChild(el);
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
    if (!showing) next();
  }
  // every other one unlocked: platinum
  if (id !== 'platinum' && data.list.every((a) => a.id === 'platinum' || got[a.id])) window.setTimeout(() => unlock('platinum'), 600);
}

document.addEventListener('achieve', (e) => unlock(String((e as CustomEvent<string>).detail)));

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
