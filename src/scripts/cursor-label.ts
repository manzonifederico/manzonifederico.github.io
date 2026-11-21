// What a context label says and how it looks, shared by the label that follows the mouse (view-cursor.ts) and the
// speech bubble that touch screens get instead (touch-notes.ts).
// An element with data-cursor="<label>" gets one; data-cursor-it is the Italian text when it differs,
// data-cursor-random a JSON list (one line picked at random each time), data-cursor-flag a small flag after it.

// small flags for labels with data-cursor-flag (e.g. the languages in the CV): Italy, United Kingdom, Spain, and
// Venice (on "Venice" in the About text: public/icons/venice-flag.webp, the traditional flag with the winged lion)
export const FLAGS: Record<string, string> = {
  ven: '<img class="vc-flag" src="/icons/venice-flag.webp" alt="" width="120" height="62">',
  // a bronze egg, for "easter egg" on the trophies page (Jak and Daxter's Precursor orbs)
  egg: '<svg class="vc-flag vc-egg" viewBox="0 0 20 26" aria-hidden="true"><defs><radialGradient id="vc-egg-g" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#f3c98b"/><stop offset="0.45" stop-color="#c47f3a"/><stop offset="1" stop-color="#6e3d17"/></radialGradient></defs><path fill="url(#vc-egg-g)" d="M10 1C5 1 1 9 1 15.5 1 21.5 5 25 10 25s9-3.5 9-9.5C19 9 15 1 10 1z"/><ellipse cx="7" cy="8" rx="2" ry="3.2" fill="#fff" opacity=".45"/></svg>',
  it: '<svg class="vc-flag" viewBox="0 0 3 2" aria-hidden="true"><path fill="#009246" d="M0 0h1v2H0z"/><path fill="#fff" d="M1 0h1v2H1z"/><path fill="#ce2b37" d="M2 0h1v2H2z"/></svg>',
  es: '<svg class="vc-flag" viewBox="0 0 3 2" aria-hidden="true"><path fill="#aa151b" d="M0 0h3v2H0z"/><path fill="#f1bf00" d="M0 .5h3v1H0z"/></svg>',
  gb: '<svg class="vc-flag" viewBox="0 0 60 30" aria-hidden="true"><clipPath id="vc-gb-a"><path d="M0 0v30h60V0z"/></clipPath><clipPath id="vc-gb-b"><path d="M30 15h30v15zv15H0zH0V0zV0h30z"/></clipPath><g clip-path="url(#vc-gb-a)"><path fill="#012169" d="M0 0v30h60V0z"/><path stroke="#fff" stroke-width="6" d="M0 0l60 30m0-30L0 30"/><path stroke="#c8102e" stroke-width="4" d="M0 0l60 30m0-30L0 30" clip-path="url(#vc-gb-b)"/><path stroke="#fff" stroke-width="10" d="M30 0v30M0 15h60"/><path stroke="#c8102e" stroke-width="6" d="M30 0v30M0 15h60"/></g></svg>',
};

// the same list as the pointer rules in global.css ("where a context label follows the pointer…")
export const CLICKABLE = "a[href], button, summary, label, select, [role='button'], [role='tab'], [role='switch'], .card";

/** a personal note (data-cursor-pii) while recruiter mode is on: no label */
export const hiddenNow = (target: HTMLElement) =>
  'cursorPii' in target.dataset && document.documentElement.dataset.unbiased === 'true';

/** writes the element's label (text, then its flag if any) into `label` */
export function fillLabel(label: HTMLElement, target: HTMLElement, text?: string) {
  const it = document.documentElement.lang === 'it' ? target.dataset.cursorIt : undefined;
  label.textContent = text ?? it ?? target.dataset.cursor ?? '';
  if (!text && target.dataset.cursorRandom) {
    try {
      const lines: string[] = JSON.parse(target.dataset.cursorRandom);
      if (lines.length) label.textContent = lines[Math.floor(Math.random() * lines.length)];
    } catch {
      /* keep data-cursor */
    }
  }
  const flag = FLAGS[target.dataset.cursorFlag ?? ''];
  if (!text && flag) label.insertAdjacentHTML('beforeend', flag);
}

/** the label's colours on `box` (--vc, --vc-ink): the article page's theme sits on <body>, so only the article sheet,
 *  a project card or the footer (which sets its own colours) give the label theirs; anything else gets the blue one */
export function paintLabel(box: HTMLElement, target: HTMLElement) {
  const themed = !!target.closest('#main > .case, .card, footer');
  const cs = getComputedStyle(target);
  box.style.setProperty('--vc', (themed && cs.getPropertyValue('--theme-tag-bg').trim()) || 'var(--color-fill)');
  box.style.setProperty('--vc-ink', (themed && cs.getPropertyValue('--theme-tag-ink').trim()) || 'var(--color-on-fill)');
}
