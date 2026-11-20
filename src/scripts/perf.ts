// Keeping the site smooth.
// - The moving blue glows pause while they are off screen.
// - Lighter mode (html.lite): no moving backgrounds and no arrow game, for devices that struggle. It switches on
//   by itself when the device looks weak (a quick check before the page paints, in BaseLayout: few processor cores,
//   little memory or "data saver"; or, here, a page that keeps dropping frames in its first seconds). Then a small
//   note offers to turn the effects back on: an opt-in, never forced. The "Effects" switch in the footer changes it
//   at any time; the choice is kept in this browser (localStorage "effects": "on" / "off").

const html = document.documentElement;
const TEXT = {
  en: {
    title: 'Running light ⚡',
    text: 'Your device seems a little slow, so the moving backgrounds and the arrow game are off.',
    on: 'Turn them on',
    keep: 'Keep it light',
  },
  it: {
    title: 'Versione leggera ⚡',
    text: 'Il tuo dispositivo sembra un po’ lento, quindi gli sfondi in movimento e il gioco delle frecce sono spenti.',
    on: 'Accendili',
    keep: 'Va bene così',
  },
};

const get = (k: string) => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
const put = (k: string, v: string) => {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* storage blocked: this visit only */
  }
};

const syncSwitches = () =>
  document
    .querySelectorAll('[data-effects]')
    .forEach((b) => b.setAttribute('aria-checked', String(!html.classList.contains('lite'))));

function setEffects(on: boolean, remember = true) {
  html.classList.toggle('lite', !on);
  if (remember) put('effects', on ? 'on' : 'off');
  syncSwitches();
  document.dispatchEvent(new Event('effects-change')); // the arrow game and the footer follow
}

document.addEventListener('click', (e) => {
  if ((e.target as Element | null)?.closest?.('[data-effects]')) setEffects(html.classList.contains('lite'));
});
document.addEventListener('effects-set', (e) => setEffects((e as CustomEvent<boolean>).detail === true));
syncSwitches();

// ---------- the glows pause while off screen ----------
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => en.target.classList.toggle('is-paused', !en.isIntersecting)),
    { rootMargin: '120px' },
  );
  document.querySelectorAll('.blob').forEach((b) => io.observe(b));
}

// ---------- the opt-in note ----------
function offer() {
  if (get('effects') || get('lite-note') === '1' || !html.classList.contains('lite')) return;
  put('lite-note', '1');
  const l = TEXT[html.lang.startsWith('it') ? 'it' : 'en'];
  const box = document.createElement('section');
  box.className = 'lite-note';
  box.setAttribute('aria-labelledby', 'lite-note-title');
  box.innerHTML =
    '<p class="lite-note-title" id="lite-note-title"></p><p class="lite-note-text"></p>' +
    '<div class="lite-note-actions"><button type="button" data-keep></button><button type="button" data-on></button></div>';
  box.querySelector('.lite-note-title')!.textContent = l.title;
  box.querySelector('.lite-note-text')!.textContent = l.text;
  box.querySelector('[data-keep]')!.textContent = l.keep;
  box.querySelector('[data-on]')!.textContent = l.on;
  const close = () => box.remove();
  box.querySelector('[data-keep]')!.addEventListener('click', () => {
    put('effects', 'off');
    close();
  });
  box.querySelector('[data-on]')!.addEventListener('click', () => {
    setEffects(true);
    close();
  });
  box.addEventListener('keydown', (e) => e.key === 'Escape' && close());
  document.body.appendChild(box);
}

// ---------- frame check: does this device keep up? ----------
// Only when nobody has chosen yet and the quick check didn't already pick lighter mode. About 2 seconds of frames,
// counted only while the page is on screen; if more than a third take longer than ~34 ms (under 30 frames a
// second), lighter mode switches on and the note offers the effects back.
function measure() {
  const slow: boolean[] = [];
  let last = 0;
  const frame = (t: number) => {
    if (document.visibilityState === 'visible' && last && t - last < 250) slow.push(t - last > 34);
    last = t;
    if (slow.length < 120) return requestAnimationFrame(frame);
    if (slow.filter(Boolean).length / slow.length > 0.33 && !get('effects')) {
      put('perf-lite', '1'); // next visit starts light before the first paint
      setEffects(false, false);
      offer();
    }
  };
  requestAnimationFrame(frame);
}

const start = () => {
  if (html.classList.contains('lite')) window.setTimeout(offer, 1500);
  else if (!get('effects') && !matchMedia('(prefers-reduced-motion: reduce)').matches) window.setTimeout(measure, 800);
};
if (document.readyState === 'complete') start();
else addEventListener('load', start, { once: true });

export {}; // a module, so its names stay private
