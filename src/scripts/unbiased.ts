// Unbiased mode + "Hide picture" behaviour.
// State lives on <html> as data attributes so CSS can react to it:
//   data-unbiased="true"   → name, photo and contact details are blurred
//   data-photo="hidden"    → only the photo is blurred
// The unbiased choice lasts for this browsing session only (sessionStorage): it carries over while you move
// between pages, but every new visit starts with the mode off.

const KEY = 'unbiased-mode';
const root = document.documentElement;

function save(value: boolean) {
  try {
    sessionStorage.setItem(KEY, value ? '1' : '0');
    localStorage.removeItem(KEY); // clear the old, permanent setting from earlier versions
  } catch {
    /* storage may be blocked; the toggle still works for this visit */
  }
}

// every blurred person's name gets a screen-reader-only "name hidden" next to it, so sentences stay complete
// ("Supervised by name hidden and name hidden"); the "Show names" button on articles hides it again
document.querySelectorAll<HTMLElement>('.pii-name').forEach((el) => {
  if (el.nextElementSibling?.classList.contains('pii-name-ph')) return;
  const ph = document.createElement('span');
  ph.className = 'pii-placeholder pii-name-ph';
  ph.textContent = el.closest('[lang]')?.getAttribute('lang') === 'it' ? 'nome nascosto' : 'name hidden';
  el.after(ph);
});

function applyAria() {
  const unbiased = root.dataset.unbiased === 'true';
  const photoHidden = unbiased ? root.dataset.photo !== 'shown' : root.dataset.photo === 'hidden';

  document.querySelectorAll<HTMLElement>('.pii').forEach((el) => {
    if (el.classList.contains('pii-photo')) return;
    // contact details follow the photo button; everything else follows reviewer mode
    // in recruiter mode the profile name shows again with the photo; elsewhere names follow the mode
    const hidden = el.classList.contains('pii-contact')
      ? photoHidden
      : el.classList.contains('pii-profile-name')
        ? unbiased && photoHidden
        : unbiased;
    if (hidden) el.setAttribute('aria-hidden', 'true');
    else el.removeAttribute('aria-hidden'); // valid ARIA: "true", never empty
    el.toggleAttribute('inert', hidden);
  });
  document.querySelectorAll<HTMLElement>('.pii-photo').forEach((el) => {
    if (photoHidden) el.setAttribute('aria-hidden', 'true');
    else el.removeAttribute('aria-hidden'); // valid ARIA: "true", never empty
  });
  document.querySelectorAll<HTMLElement>('[data-unbiased-toggle]').forEach((btn) => {
    btn.setAttribute('aria-checked', String(unbiased));
  });
  document.querySelectorAll<HTMLElement>('[data-photo-toggle]').forEach((btn) => {
    btn.dataset.state = photoHidden ? 'hidden' : 'shown';
    const label = btn.querySelector('[data-label]');
    if (label) label.textContent = (photoHidden ? btn.dataset.labelShow : btn.dataset.labelHide) ?? '';
  });
}

document.querySelectorAll<HTMLElement>('[data-unbiased-toggle]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const next = root.dataset.unbiased !== 'true';
    root.dataset.unbiased = String(next);
    if (next) document.dispatchEvent(new CustomEvent('achieve', { detail: 'recruiter' })); // src/scripts/achievements.ts
    delete root.dataset.photo; // reset the per-photo choice
    save(next);
    applyAria();
  });
});

document.querySelectorAll<HTMLElement>('[data-photo-toggle]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const unbiased = root.dataset.unbiased === 'true';
    const hidden = unbiased ? root.dataset.photo !== 'shown' : root.dataset.photo === 'hidden';
    root.dataset.photo = hidden ? 'shown' : 'hidden';
    applyAria();
  });
});

applyAria();
