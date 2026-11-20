// Pointer extras (mouse/trackpad only):
// - after ~12 s without moving, the triangle pointer turns into the Agorà star (the site logo), whose rays
//   move; moving the mouse turns it back into the triangle;
// - shaking the mouse turns the triangle into a big square for a moment (like macOS's shake to find);
// - context labels that follow the pointer, e.g. "View project" on the project cards,
// "Change view" on the list/card switch, "Write me" / "Copy" in the footer.
// Any element with data-cursor="<label>" gets one. Colours come from the element's --theme-tag-bg /
// --theme-tag-ink (the project chips on cards and articles; set on the footer too).
// Works by event delegation, so elements that get data-cursor later work as well.
// Touch screens and keyboard users keep the normal behaviour.
// The "Classic pointer" switch in the footer (html.classic-pointer, saved in localStorage) turns all of this off.

const fine = matchMedia('(hover: hover) and (pointer: fine)');
// small flags for labels with data-cursor-flag (e.g. the languages in the CV): Italy, United Kingdom, Spain
const FLAGS: Record<string, string> = {
  it: '<svg class="vc-flag" viewBox="0 0 3 2" aria-hidden="true"><path fill="#009246" d="M0 0h1v2H0z"/><path fill="#fff" d="M1 0h1v2H1z"/><path fill="#ce2b37" d="M2 0h1v2H2z"/></svg>',
  es: '<svg class="vc-flag" viewBox="0 0 3 2" aria-hidden="true"><path fill="#aa151b" d="M0 0h3v2H0z"/><path fill="#f1bf00" d="M0 .5h3v1H0z"/></svg>',
  gb: '<svg class="vc-flag" viewBox="0 0 60 30" aria-hidden="true"><clipPath id="vc-gb-a"><path d="M0 0v30h60V0z"/></clipPath><clipPath id="vc-gb-b"><path d="M30 15h30v15zv15H0zH0V0zV0h30z"/></clipPath><g clip-path="url(#vc-gb-a)"><path fill="#012169" d="M0 0v30h60V0z"/><path stroke="#fff" stroke-width="6" d="M0 0l60 30m0-30L0 30"/><path stroke="#c8102e" stroke-width="4" d="M0 0l60 30m0-30L0 30" clip-path="url(#vc-gb-b)"/><path stroke="#fff" stroke-width="10" d="M30 0v30M0 15h60"/><path stroke="#c8102e" stroke-width="6" d="M30 0v30M0 15h60"/></g></svg>',
};
const isClassic = () => document.documentElement.classList.contains('classic-pointer');
const reduce = matchMedia('(prefers-reduced-motion: reduce)');

function setup() {
  if (!fine.matches || document.getElementById('view-cursor')) return;
  document.documentElement.classList.add('has-view-cursor');

  const el = document.createElement('div');
  el.id = 'view-cursor';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '<span class="vc-dot"></span><span class="vc-label"></span>';
  document.body.appendChild(el);
  const label = el.querySelector<HTMLElement>('.vc-label')!;

  let x = 0;
  let y = 0;
  let cx = 0;
  let cy = 0;
  let raf = 0;
  let current: HTMLElement | null = null;
  let width = 0; // label width, measured when it appears

  // near the right edge the label goes on the other side of the pointer, so it is never cut off
  const place = () => {
    const flip = cx + width + 12 > innerWidth;
    el.classList.toggle('is-flipped', flip);
    el.style.transform = `translate3d(${flip ? cx - width : cx}px, ${cy}px, 0)`;
  };

  const follow = () => {
    // small easing so the label trails the pointer smoothly (instant with reduced motion)
    const k = reduce.matches ? 1 : 0.35;
    cx += (x - cx) * k;
    cy += (y - cy) * k;
    place();
    if (Math.abs(x - cx) > 0.3 || Math.abs(y - cy) > 0.3) raf = requestAnimationFrame(follow);
    else raf = 0;
  };

  const enter = (target: HTMLElement) => {
    if (isClassic()) return;
    if ('cursorPii' in target.dataset && document.documentElement.dataset.unbiased === 'true') return;
    current = target;
    const it = document.documentElement.lang === 'it' ? target.dataset.cursorIt : undefined;
    label.textContent = it ?? target.dataset.cursor ?? '';
    const flag = FLAGS[target.dataset.cursorFlag ?? ''];
    if (flag) label.insertAdjacentHTML('beforeend', flag);
    // the article page's theme sits on <body>: only the article sheet, a project card or the footer
    // (which sets its own colours) give the label their colours; anything else gets the blue label
    const themed = !!target.closest('#main > .case, .card, footer');
    const cs = getComputedStyle(target);
    el.style.setProperty('--vc', (themed && cs.getPropertyValue('--theme-tag-bg').trim()) || 'var(--color-brand)');
    el.style.setProperty('--vc-ink', (themed && cs.getPropertyValue('--theme-tag-ink').trim()) || 'var(--color-text-inverse)');
    cx = x;
    cy = y;
    el.classList.remove('is-flipped');
    width = el.offsetWidth;
    place();
    el.classList.add('is-visible');
  };
  const leave = () => {
    current = null;
    el.classList.remove('is-visible', 'is-pressed');
  };

  document.addEventListener(
    'pointermove',
    (e) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as Element | null)?.closest?.<HTMLElement>('[data-cursor]') ?? null;
      if (target !== current) {
        if (target) enter(target);
        else leave();
      }
      if (current && !raf) raf = requestAnimationFrame(follow);
    },
    { passive: true },
  );
  document.addEventListener('pointerleave', leave);
  // a control that changes its own label (e.g. the theme button) refreshes the label under the pointer
  document.addEventListener('theme-change', () => current && enter(current));
  document.addEventListener('pointerdown', () => current && el.classList.add('is-pressed'));
  document.addEventListener('pointerup', () => el.classList.remove('is-pressed'));

  // ---------- idle easter egg: the triangle becomes the star ----------
  const IDLE_MS = 12000;
  const star = document.createElement('div');
  star.id = 'star-cursor';
  star.setAttribute('aria-hidden', 'true');
  // The star is alive: all ten rays (the logo's six arms and four small rays in the gaps) move the same way,
  // one after another around the star: each grows out and pulls back once per cycle, with the same easing.
  // The arms go from 65% to 120% of their length (the logo stays recognisable), the small rays from 0 to full.
  // Shapes and positions were generated from the logo outline (21 samples of one cycle, last = first).
  const CYCLE = '4.2s';
  const arms = [
    'M91.3 340.6C89.9 335.5 102.7 305.8 119.6 274.9C137.1 244.1 149.0 214.1 147.0 208.3C141.5 191.8 117.7 184.4 74.2 183.5C51.1 182.4 49.5 181.2 52.2 173.5C54.0 165.7 57.0 163.9 77.6 160.7C108.1 158.1 117.0 155.2 122.3 144.7C127.8 135.7 126.6 129.0 116.9 116.5C111.0 108.1 106.9 100.0 107.0 96.7C107.1 81.6 119.0 81.8 144.9 103.7C162.7 120.4 181.0 135.2 184.5 135.2C196.2 135.4 205.7 123.2 236.0 70.0C253.5 39.1 264.9 25.0 271.5 26.0C286.2 27.0 285.5 36.4 262.3 81.5C224.7 150.8 227.6 155.0 325.1 156.8C397.2 158.2 410.4 160.5 414.3 172.5C417.6 184.7 410.0 186.3 357.6 185.9C327.1 185.6 295.8 189.2 287.2 192.8C268.2 202.9 270.4 228.8 292.2 252.6C308.9 269.1 310.2 274.3 301.9 284.7C292.2 295.2 286.2 291.3 246.8 250.9C198.4 201.4 196.3 202.8 148.2 287.0C114.4 346.3 98.9 360.9 91.3 340.6Z',
    'M84.9 351.4C83.6 345.7 98.7 312.0 117.5 278.0C136.2 245.3 148.8 214.3 146.8 208.5C141.3 191.8 116.9 184.5 70.2 183.7C42.0 182.9 39.5 181.7 42.3 173.3C44.5 165.1 48.7 163.2 73.9 160.2C106.9 157.8 116.3 155.0 121.9 144.5C127.5 135.5 126.3 128.7 116.4 116.1C110.3 107.5 106.1 99.3 106.3 95.9C106.4 80.7 118.6 81.3 144.8 103.6C162.6 120.4 181.0 135.3 184.5 135.3C196.2 135.5 205.6 123.5 234.4 73.5C249.6 47.2 258.8 37.0 264.6 38.5C277.6 40.1 278.3 46.8 260.0 84.5C224.6 150.9 227.5 155.1 321.8 157.3C388.0 159.0 399.9 161.2 403.2 172.7C406.3 184.3 399.6 185.8 351.9 185.5C323.6 185.4 293.9 188.9 285.7 192.5C267.6 202.7 269.9 228.5 291.5 252.1C307.9 268.3 309.2 273.5 301.1 283.9C291.5 294.4 285.6 290.5 246.6 250.7C198.4 201.4 196.3 202.8 147.1 289.9C110.1 356.2 92.5 374.1 84.9 351.4Z',
    'M79.8 360.1C78.7 353.8 95.5 316.8 115.8 280.4C135.5 246.2 148.6 214.5 146.7 208.6C141.1 191.9 115.8 184.6 65.0 184.1C30.3 183.6 26.7 182.3 29.6 173.2C32.2 164.2 37.9 162.3 68.9 159.6C105.2 157.5 115.2 154.7 121.0 144.1C126.8 135.0 125.6 128.2 115.2 115.1C108.6 106.1 104.0 97.4 104.2 94.0C104.4 78.4 117.5 79.8 144.6 103.2C162.6 120.3 181.0 135.3 184.5 135.3C196.2 135.6 205.5 123.9 233.2 76.3C246.5 53.7 254.0 46.5 259.1 48.4C270.8 50.4 272.6 55.0 258.1 86.9C224.5 151.0 227.4 155.1 317.6 157.8C376.5 159.9 386.6 162.0 389.2 172.8C391.9 183.6 386.2 185.1 344.6 185.0C319.0 185.0 291.5 188.6 283.9 192.2C266.7 202.3 269.0 227.9 289.8 250.8C305.5 266.5 306.7 271.4 298.8 281.7C289.6 292.1 283.8 288.5 246.1 250.0C198.4 201.3 196.3 202.8 146.3 292.2C106.6 364.1 87.4 384.6 79.8 360.1Z',
    'M76.5 365.6C75.4 359.0 93.4 319.9 114.7 282.0C135.1 246.8 148.4 214.7 146.6 208.7C140.8 192.0 114.7 184.8 59.3 184.5C17.2 184.3 12.3 182.9 15.2 173.0C18.2 163.3 25.6 161.2 63.1 158.8C103.3 157.1 113.9 154.3 120.0 143.6C125.9 134.4 124.4 127.4 113.3 113.6C106.1 103.9 100.9 94.6 101.0 90.9C101.2 74.8 115.9 77.6 144.2 102.6C162.5 120.1 181.0 135.3 184.5 135.3C196.2 135.7 205.4 124.1 232.4 78.2C244.6 57.9 250.9 52.7 255.6 54.8C266.4 57.1 268.9 60.4 256.9 88.4C224.4 151.0 227.3 155.2 313.0 158.5C363.7 160.9 371.8 163.0 373.5 173.0C375.7 183.0 371.2 184.3 336.4 184.5C313.9 184.6 288.8 188.2 281.7 191.8C265.6 202.0 267.7 227.0 287.3 248.9C301.9 263.6 303.0 268.3 295.3 278.3C286.6 288.6 281.2 285.3 245.3 249.0C198.4 201.3 196.3 202.7 145.8 293.7C104.4 369.2 84.1 391.3 76.5 365.6Z',
    'M75.4 367.5C74.3 360.8 92.7 321.0 114.3 282.5C134.9 247.0 148.4 214.7 146.5 208.7C140.6 192.1 113.5 185.0 53.6 185.0C4.1 185.0 -2.1 183.5 0.7 172.8C3.9 162.3 13.0 160.2 57.2 158.1C101.2 156.7 112.4 153.9 118.7 143.0C124.7 133.6 123.1 126.4 111.1 111.7C103.0 101.3 97.0 91.0 97.1 87.2C97.3 70.3 113.8 74.8 143.7 101.9C162.4 119.9 181.0 135.2 184.5 135.3C196.2 135.7 205.4 124.1 232.1 78.8C243.9 59.3 249.8 54.8 254.3 57.0C264.9 59.5 267.5 62.2 256.5 89.0C224.4 151.0 227.2 155.2 308.4 159.1C350.8 162.0 356.9 164.0 357.8 173.2C359.4 182.3 356.0 183.6 328.2 184.0C308.7 184.2 286.1 187.9 279.6 191.4C264.4 201.5 266.1 226.0 284.3 246.6C297.5 260.2 298.3 264.5 291.0 274.1C282.8 284.2 277.9 281.4 244.3 247.7C198.3 201.3 196.3 202.7 145.6 294.2C103.7 371.0 83.0 393.6 75.4 367.5Z',
    'M76.5 365.7C75.4 359.0 93.4 320.0 114.7 282.0C135.1 246.8 148.4 214.7 146.5 208.7C140.4 192.1 112.4 185.1 48.3 185.3C-7.9 185.6 -15.3 184.1 -12.6 172.7C-9.3 161.4 1.4 159.2 51.6 157.4C99.3 156.3 111.0 153.5 117.4 142.4C123.4 132.8 121.6 125.3 108.5 109.7C99.6 98.3 92.7 87.1 92.8 83.0C93.0 65.4 111.4 71.7 143.2 101.0C162.3 119.7 181.0 135.2 184.5 135.3C196.2 135.7 205.4 124.1 232.4 78.2C244.6 57.9 250.9 52.7 255.5 54.8C266.4 57.2 268.8 60.5 256.9 88.5C224.4 151.0 227.2 155.2 304.3 159.6C339.2 162.9 343.5 164.9 343.5 173.3C344.5 181.7 342.2 182.9 320.6 183.5C303.9 183.9 283.5 187.5 277.5 191.0C263.2 201.1 264.4 224.9 280.9 244.2C292.7 256.4 293.2 260.4 286.2 269.4C278.6 279.4 274.2 277.0 243.2 246.2C198.3 201.3 196.3 202.7 145.8 293.7C104.4 369.2 84.1 391.3 76.5 365.7Z',
    'M79.7 360.2C78.6 353.9 95.4 316.9 115.7 280.5C135.5 246.3 148.5 214.6 146.6 208.7C140.2 192.2 111.6 185.2 44.1 185.6C-17.5 186.1 -25.9 184.6 -23.3 172.6C-20.1 160.6 -8.1 158.4 47.0 156.8C97.6 155.9 109.8 153.2 116.2 141.9C122.2 132.0 120.1 124.2 106.1 107.7C96.2 95.4 88.5 83.2 88.5 78.9C88.6 60.4 109.1 68.6 142.7 100.2C162.2 119.5 181.0 135.2 184.5 135.2C196.2 135.6 205.5 123.9 233.2 76.4C246.5 53.8 254.0 46.6 259.0 48.5C270.7 50.7 272.4 55.3 258.0 87.0C224.4 151.0 227.1 155.3 301.0 160.1C330.0 163.7 332.8 165.6 332.0 173.5C332.6 181.1 331.1 182.3 314.5 183.1C300.1 183.6 281.4 187.3 275.8 190.7C262.2 200.8 262.7 223.8 277.7 241.7C287.9 252.7 288.2 256.3 281.5 264.8C274.4 274.5 270.5 272.6 242.1 244.8C198.3 201.2 196.3 202.7 146.3 292.2C106.6 364.1 87.4 384.6 79.7 360.2Z',
    'M84.8 351.6C83.5 345.8 98.6 312.1 117.4 278.0C136.2 245.3 148.7 214.4 146.7 208.6C140.2 192.2 111.0 185.3 41.4 185.8C-23.8 186.5 -32.8 184.9 -30.5 172.5C-27.4 160.1 -14.7 157.8 43.8 156.3C96.4 155.7 108.9 152.9 115.2 141.4C121.1 131.3 118.8 123.2 103.9 105.9C93.2 92.8 84.7 79.7 84.7 75.3C84.7 56.0 107.0 65.8 142.2 99.4C162.1 119.3 181.0 135.2 184.5 135.2C196.2 135.5 205.6 123.5 234.4 73.5C249.6 47.3 258.8 37.1 264.5 38.6C277.4 40.4 278.1 47.1 259.8 84.7C224.4 151.0 227.1 155.3 298.9 160.4C324.0 164.2 325.8 166.1 324.6 173.5C324.7 180.8 323.7 181.9 310.5 182.9C297.5 183.4 280.0 187.1 274.7 190.5C261.4 200.5 261.3 222.8 274.8 239.5C283.7 249.4 283.7 252.6 277.2 260.7C270.7 270.2 267.3 268.7 241.1 243.5C198.3 201.2 196.2 202.7 147.1 289.9C110.1 356.2 92.4 374.1 84.8 351.6Z',
    'M91.2 340.8C89.8 335.7 102.6 306.0 119.5 275.0C137.1 244.2 149.0 214.2 146.8 208.5C140.1 192.2 110.8 185.3 40.4 185.9C-26.2 186.6 -35.5 185.0 -33.4 172.4C-30.6 159.9 -17.5 157.6 42.3 156.2C95.8 155.5 108.3 152.8 114.4 141.1C120.3 130.8 117.8 122.5 102.2 104.5C90.8 90.8 81.7 77.0 81.6 72.4C81.7 52.5 105.4 63.6 141.9 98.8C162.0 119.1 181.0 135.1 184.5 135.2C196.2 135.4 205.7 123.2 236.0 70.0C253.5 39.1 264.9 25.1 271.4 26.1C286.0 27.4 285.3 36.8 262.2 81.7C224.5 151.0 227.2 155.3 298.1 160.5C321.9 164.3 323.4 166.2 321.8 173.6C321.7 180.7 320.9 181.8 308.9 182.8C296.5 183.3 279.4 187.0 274.1 190.4C260.9 200.3 260.2 222.1 272.6 237.9C280.4 246.8 280.3 249.8 273.9 257.5C267.7 266.7 264.7 265.5 240.3 242.5C198.3 201.2 196.2 202.7 148.2 287.0C114.4 346.3 98.8 360.9 91.2 340.8Z',
    'M98.3 328.8C96.7 324.5 107.1 299.3 121.9 271.6C138.1 242.9 149.2 213.9 147.0 208.3C140.2 192.2 111.0 185.3 41.2 185.9C-24.5 186.5 -33.6 184.9 -31.7 172.5C-29.3 160.0 -16.5 157.7 42.7 156.2C95.8 155.5 108.2 152.7 114.1 140.9C119.8 130.5 117.2 122.0 101.1 103.6C89.4 89.5 79.8 75.3 79.7 70.5C79.7 50.3 104.3 62.2 141.6 98.5C162.0 119.0 181.0 135.1 184.5 135.2C196.2 135.3 205.9 122.7 237.8 66.1C257.8 30.1 271.6 11.8 279.1 12.3C295.4 12.9 293.3 25.3 264.7 78.4C224.6 150.9 227.2 155.2 298.9 160.4C323.9 164.2 325.6 166.1 324.1 173.6C323.8 180.8 322.8 181.9 309.9 182.8C297.1 183.4 279.7 187.0 274.3 190.5C260.8 200.3 259.6 221.7 271.2 236.9C278.5 245.3 278.1 248.0 271.8 255.4C265.8 264.5 263.0 263.6 239.9 241.8C198.3 201.2 196.2 202.6 149.4 283.8C119.2 335.2 105.9 346.3 98.3 328.8Z',
    'M105.4 316.7C103.7 313.2 111.5 292.5 124.2 268.2C139.0 241.5 149.5 213.6 147.2 208.2C140.3 192.2 111.5 185.2 43.7 185.7C-18.7 186.2 -27.3 184.6 -25.6 172.5C-23.6 160.4 -11.6 158.1 44.9 156.5C96.4 155.7 108.6 152.8 114.2 140.9C119.7 130.4 117.1 121.9 100.8 103.4C88.9 89.2 79.3 74.8 79.2 70.0C79.1 49.5 104.0 61.7 141.6 98.3C162.0 119.0 181.0 135.1 184.4 135.1C196.3 135.1 206.0 122.3 239.5 62.1C262.1 21.0 278.3 -1.5 286.7 -1.5C304.9 -1.5 301.3 13.8 267.3 75.1C224.6 150.9 227.3 155.2 301.0 160.1C329.7 163.7 332.3 165.6 331.1 173.5C330.8 181.1 329.3 182.2 313.5 183.1C299.3 183.5 280.8 187.2 275.1 190.6C261.0 200.4 259.4 221.6 270.9 236.6C277.9 244.8 277.5 247.5 271.1 254.8C265.2 263.8 262.4 262.9 239.7 241.6C198.3 201.2 196.2 202.6 150.5 280.6C124.0 324.2 113.0 331.7 105.4 316.7Z',
    'M111.8 305.9C110.0 303.0 115.5 286.4 126.4 265.2C139.9 240.4 149.8 213.4 147.4 208.0C140.5 192.1 112.4 185.1 47.8 185.4C-9.5 185.7 -17.3 184.2 -15.8 172.7C-14.1 161.0 -3.3 158.8 48.6 157.0C97.6 155.9 109.3 153.0 114.6 141.2C120.0 130.6 117.4 122.2 101.3 103.8C89.6 89.7 80.0 75.5 79.9 70.7C79.8 50.4 104.3 62.2 141.6 98.5C162.0 119.0 181.0 135.1 184.4 135.1C196.3 135.0 206.1 121.9 241.1 58.6C265.9 12.8 284.4 -13.5 293.7 -14.0C313.5 -14.5 308.5 3.4 269.7 72.2C224.7 150.8 227.4 155.1 304.3 159.6C338.8 163.0 342.8 164.9 342.1 173.3C342.1 181.5 339.8 182.7 319.2 183.4C302.9 183.8 282.7 187.4 276.5 190.9C261.7 200.6 259.9 221.9 271.6 237.2C278.9 245.6 278.5 248.4 271.9 255.6C265.9 264.6 263.1 263.6 239.9 241.8C198.3 201.2 196.2 202.6 151.6 277.7C128.4 314.2 119.4 318.5 111.8 305.9Z',
    'M116.8 297.3C115.0 295.0 118.7 281.5 128.1 262.7C140.6 239.4 150.0 213.2 147.6 207.9C140.7 192.0 113.4 185.0 52.9 185.0C2.1 185.1 -4.4 183.6 -3.0 172.8C-1.8 161.9 7.5 159.7 53.6 157.6C99.2 156.2 110.4 153.3 115.5 141.5C120.7 131.0 118.2 122.7 102.5 104.8C91.2 91.2 82.1 77.4 82.0 72.7C81.9 52.7 105.4 63.7 141.9 98.8C162.0 119.1 181.0 135.1 184.4 135.1C196.3 134.9 206.2 121.6 242.4 55.8C269.0 6.4 289.2 -23.0 299.2 -24.0C320.3 -24.9 314.2 -4.8 271.5 69.8C224.8 150.8 227.5 155.1 308.5 159.1C350.3 162.0 356.2 164.0 356.2 173.2C356.6 182.2 353.2 183.4 326.4 183.9C307.5 184.1 285.1 187.7 278.4 191.2C262.6 200.9 260.8 222.5 273.3 238.4C281.3 247.5 281.0 250.4 274.2 257.8C267.9 266.9 264.8 265.7 240.4 242.5C198.3 201.2 196.2 202.6 152.4 275.4C131.8 306.3 124.5 308.0 116.8 297.3Z',
    'M120.1 291.7C118.2 289.8 120.8 278.4 129.2 261.1C141.1 238.8 150.1 213.1 147.7 207.8C141.0 191.9 114.6 184.8 58.6 184.6C15.2 184.4 9.9 183.0 11.3 173.0C12.2 162.9 19.8 160.7 59.4 158.4C101.2 156.7 111.8 153.7 116.5 142.0C121.7 131.7 119.3 123.5 104.4 106.3C93.8 93.3 85.2 80.2 85.1 75.7C85.0 56.3 107.1 65.9 142.2 99.4C162.1 119.3 181.0 135.1 184.4 135.1C196.3 134.9 206.3 121.4 243.2 54.0C271.0 2.2 292.3 -29.2 302.7 -30.3C324.7 -31.6 317.9 -10.1 272.8 68.2C224.9 150.7 227.5 155.1 313.1 158.5C363.2 161.0 371.0 163.1 371.8 173.0C372.8 182.8 368.2 184.2 334.6 184.4C312.6 184.5 287.8 188.1 280.5 191.6C263.7 201.3 262.1 223.3 275.8 240.3C284.9 250.3 284.8 253.5 277.7 261.2C270.9 270.4 267.4 268.8 241.2 243.5C198.3 201.2 196.2 202.7 153.0 273.9C134.0 301.2 127.8 301.2 120.1 291.7Z',
    'M121.2 289.8C119.3 288.0 121.5 277.3 129.5 260.6C141.2 238.6 150.1 213.0 147.7 207.8C141.2 191.9 115.8 184.6 64.4 184.2C28.4 183.7 24.4 182.4 25.8 173.1C26.5 163.8 32.4 161.8 65.3 159.1C103.2 157.1 113.2 154.1 117.8 142.6C122.8 132.4 120.6 124.6 106.7 108.1C96.9 96.0 89.1 83.8 89.1 79.5C88.9 60.8 109.2 68.7 142.7 100.2C162.2 119.5 181.0 135.1 184.4 135.1C196.3 134.8 206.3 121.3 243.5 53.4C271.7 0.7 293.4 -31.3 303.9 -32.6C326.2 -33.9 319.3 -12.0 273.2 67.7C224.9 150.7 227.6 155.0 317.7 157.8C376.0 159.9 385.8 162.1 387.6 172.8C389.1 183.5 383.4 184.9 342.9 184.9C317.8 184.9 290.5 188.5 282.7 192.0C264.9 201.7 263.7 224.4 278.8 242.6C289.3 253.8 289.4 257.3 282.0 265.4C274.7 274.8 270.7 272.8 242.2 244.8C198.3 201.2 196.2 202.7 153.2 273.4C134.8 299.5 128.9 298.9 121.2 289.8Z',
    'M120.1 291.7C118.2 289.7 120.8 278.4 129.2 261.1C141.1 238.8 150.1 213.0 147.7 207.8C141.4 191.8 116.9 184.5 69.6 183.8C40.4 183.0 37.5 181.8 39.1 173.3C39.7 164.8 44.0 162.8 70.9 159.8C105.2 157.5 114.6 154.5 119.1 143.2C124.1 133.3 122.1 125.7 109.2 110.2C100.3 98.9 93.4 87.7 93.4 83.6C93.3 65.7 111.5 71.8 143.2 101.0C162.3 119.7 181.0 135.1 184.4 135.1C196.3 134.9 206.3 121.4 243.2 54.0C271.0 2.2 292.3 -29.2 302.7 -30.4C324.8 -31.7 318.0 -10.3 272.8 68.2C224.9 150.7 227.7 155.0 321.8 157.3C387.6 159.0 399.3 161.2 401.9 172.7C403.9 184.2 397.2 185.7 350.4 185.4C322.5 185.3 293.1 188.8 284.8 192.3C266.1 202.1 265.4 225.5 282.1 245.1C294.1 257.6 294.5 261.4 286.8 270.0C278.8 279.6 274.4 277.2 243.2 246.3C198.3 201.3 196.3 202.7 153.0 273.9C134.0 301.2 127.8 301.2 120.1 291.7Z',
    'M116.9 297.2C115.0 294.8 118.8 281.4 128.1 262.7C140.7 239.4 150.0 213.1 147.7 207.8C141.6 191.7 117.7 184.4 73.8 183.5C50.0 182.5 48.1 181.3 49.9 173.4C50.5 165.5 53.5 163.6 75.4 160.4C106.8 157.8 115.8 154.8 120.3 143.8C125.3 134.1 123.6 126.7 111.7 112.2C103.7 101.8 97.7 91.6 97.7 87.7C97.6 70.7 113.8 74.9 143.7 101.9C162.4 119.9 181.0 135.2 184.4 135.1C196.3 134.9 206.2 121.6 242.4 55.8C269.0 6.3 289.2 -23.1 299.2 -24.0C320.4 -25.1 314.4 -5.1 271.6 69.6C224.9 150.7 227.7 155.0 325.1 156.8C396.9 158.3 410.0 160.5 413.3 172.5C415.9 184.7 408.3 186.2 356.5 185.8C326.4 185.6 295.1 189.1 286.5 192.7C267.1 202.5 267.1 226.6 285.4 247.5C298.9 261.3 299.5 265.6 291.6 274.6C283.0 284.5 278.1 281.6 244.3 247.7C198.3 201.3 196.3 202.7 152.4 275.4C131.8 306.3 124.5 307.9 116.9 297.2Z',
    'M111.8 305.8C110.1 302.9 115.6 286.3 126.4 265.1C140.0 240.3 149.8 213.3 147.6 207.9C141.6 191.7 118.3 184.3 76.5 183.3C56.3 182.2 55.1 181.0 57.0 173.5C57.8 166.0 60.1 164.2 78.7 160.8C108.0 158.1 116.7 155.1 121.4 144.2C126.4 134.8 124.9 127.7 113.9 114.0C106.7 104.4 101.5 95.1 101.5 91.4C101.5 75.1 115.9 77.7 144.2 102.6C162.5 120.1 181.0 135.2 184.5 135.1C196.3 135.0 206.1 121.9 241.1 58.6C266.0 12.8 284.4 -13.6 293.7 -14.1C313.7 -14.8 308.7 3.1 269.8 72.0C224.9 150.7 227.7 155.0 327.2 156.6C402.8 157.8 416.9 160.0 420.7 172.5C423.8 185.0 415.7 186.6 360.5 186.1C328.9 185.8 296.5 189.3 287.6 192.9C267.9 202.8 268.5 227.6 288.3 249.7C303.1 264.6 304.0 269.2 295.8 278.8C286.8 288.9 281.4 285.5 245.3 249.0C198.4 201.3 196.3 202.7 151.6 277.7C128.4 314.2 119.5 318.4 111.8 305.8Z',
    'M105.4 316.6C103.8 313.0 111.6 292.3 124.3 268.1C139.1 241.5 149.6 213.6 147.4 208.0C141.7 191.7 118.4 184.3 77.5 183.2C58.7 182.0 57.7 180.9 59.9 173.6C61.0 166.2 62.9 164.4 80.2 161.0C108.7 158.2 117.3 155.2 122.1 144.5C127.3 135.3 125.9 128.4 115.6 115.4C109.1 106.5 104.4 97.8 104.6 94.3C104.5 78.6 117.6 79.9 144.6 103.2C162.6 120.3 181.0 135.2 184.5 135.2C196.3 135.1 206.0 122.3 239.5 62.1C262.1 21.0 278.4 -1.6 286.8 -1.7C305.1 -1.8 301.5 13.4 267.5 74.9C224.8 150.7 227.7 155.0 328.0 156.5C404.9 157.6 419.4 159.9 423.5 172.4C426.8 185.1 418.5 186.7 362.1 186.2C329.9 185.9 297.1 189.3 288.1 193.0C268.4 202.9 269.6 228.3 290.5 251.3C306.4 267.1 307.5 272.0 299.2 282.0C289.7 292.3 284.0 288.6 246.1 250.0C198.4 201.3 196.3 202.7 150.5 280.6C124.0 324.2 113.1 331.6 105.4 316.6Z',
    'M98.4 328.6C96.9 324.3 107.2 299.1 122.0 271.5C138.1 242.8 149.3 213.8 147.2 208.2C141.6 191.7 118.3 184.3 76.7 183.3C56.9 182.1 55.8 181.0 58.3 173.5C59.7 166.1 61.9 164.3 79.8 161.0C108.7 158.2 117.4 155.3 122.4 144.7C127.7 135.6 126.5 128.9 116.6 116.2C110.5 107.7 106.3 99.5 106.5 96.1C106.5 80.9 118.6 81.3 144.8 103.6C162.6 120.4 181.0 135.2 184.5 135.2C196.2 135.3 205.9 122.7 237.8 66.1C257.8 30.0 271.6 11.7 279.2 12.2C295.7 12.6 293.5 24.9 264.9 78.2C224.8 150.8 227.7 155.0 327.2 156.6C403.0 157.8 417.1 160.0 421.3 172.5C424.7 185.0 416.6 186.6 361.1 186.1C329.3 185.8 296.9 189.3 288.0 192.9C268.5 203.0 270.2 228.7 291.8 252.3C308.4 268.7 309.6 273.8 301.3 284.1C291.6 294.5 285.6 290.6 246.6 250.7C198.4 201.4 196.3 202.8 149.4 283.8C119.2 335.2 106.0 346.2 98.4 328.6Z',
    'M91.3 340.6C89.9 335.5 102.7 305.8 119.6 274.9C137.1 244.1 149.0 214.1 147.0 208.3C141.5 191.8 117.7 184.4 74.2 183.5C51.1 182.4 49.5 181.2 52.2 173.5C54.0 165.7 57.0 163.9 77.6 160.7C108.1 158.1 117.0 155.2 122.3 144.7C127.8 135.7 126.6 129.0 116.9 116.5C111.0 108.1 106.9 100.0 107.0 96.7C107.1 81.6 119.0 81.8 144.9 103.7C162.7 120.4 181.0 135.2 184.5 135.2C196.2 135.4 205.7 123.2 236.0 70.0C253.5 39.1 264.9 25.0 271.5 26.0C286.2 27.0 285.5 36.4 262.3 81.5C224.7 150.8 227.6 155.0 325.1 156.8C397.2 158.2 410.4 160.5 414.3 172.5C417.6 184.7 410.0 186.3 357.6 185.9C327.1 185.6 295.8 189.2 287.2 192.8C268.2 202.9 270.4 228.8 292.2 252.6C308.9 269.1 310.2 274.3 301.9 284.7C292.2 295.2 286.2 291.3 246.8 250.9C198.4 201.4 196.3 202.8 148.2 287.0C114.4 346.3 98.9 360.9 91.3 340.6Z',
  ];
  const CENTRE = [189.0, 175.1];
  const sprouts: { xs: number[]; ys: number[] }[] = [{"xs": [185.8, 188.1, 189.0, 188.1, 185.8, 182.1, 177.4, 172.3, 167.1, 162.5, 158.8, 156.4, 155.6, 156.4, 158.8, 162.5, 167.1, 172.3, 177.4, 182.1, 185.8], "ys": [158.7, 170.9, 175.1, 170.9, 158.7, 139.7, 115.7, 89.2, 62.7, 38.7, 19.7, 7.5, 3.3, 7.5, 19.7, 38.7, 62.7, 89.2, 115.7, 139.7, 158.7]}, {"xs": [288.2, 264.7, 241.3, 220.2, 203.4, 192.7, 189.0, 192.7, 203.4, 220.2, 241.3, 264.7, 288.2, 309.3, 326.0, 336.8, 340.5, 336.8, 326.0, 309.3, 288.2], "ys": [117.8, 131.3, 144.9, 157.1, 166.7, 172.9, 175.1, 172.9, 166.7, 157.1, 144.9, 131.3, 117.8, 105.6, 95.9, 89.7, 87.6, 89.7, 95.9, 105.6, 117.8]}, {"xs": [211.0, 212.7, 213.3, 212.7, 211.0, 208.3, 204.9, 201.1, 197.4, 194.0, 191.3, 189.6, 189.0, 189.6, 191.3, 194.0, 197.4, 201.1, 204.9, 208.3, 211.0], "ys": [331.8, 344.1, 348.4, 344.1, 331.8, 312.7, 288.5, 261.7, 235.0, 210.8, 191.6, 179.3, 175.1, 179.3, 191.6, 210.8, 235.0, 261.7, 288.5, 312.7, 331.8]}, {"xs": [136.6, 113.2, 89.8, 68.6, 51.9, 41.1, 37.4, 41.1, 51.9, 68.6, 89.8, 113.2, 136.6, 157.7, 174.5, 185.3, 189.0, 185.3, 174.5, 157.7, 136.6], "ys": [205.3, 218.8, 232.4, 244.6, 254.2, 260.4, 262.6, 260.4, 254.2, 244.6, 232.4, 218.8, 205.3, 193.1, 183.4, 177.2, 175.1, 177.2, 183.4, 193.1, 205.3]}];
  const anim = (attr: string, values: (string | number)[]) =>
    reduce.matches ? '' : `<animate attributeName="${attr}" dur="${CYCLE}" repeatCount="indefinite" values="${values.join(';')}"/>`;
  const line = (sp: { xs: number[]; ys: number[] }, stroke: string, width: number) =>
    `<line class="${stroke}" x1="${CENTRE[0]}" y1="${CENTRE[1]}" x2="${sp.xs[0]}" y2="${sp.ys[0]}" stroke-width="${width}" stroke-linecap="round">${anim('x2', sp.xs)}${anim('y2', sp.ys)}</line>`;
  // white edges under the star (they only show outside it), blue cores on top (they grow out of the centre)
  const edges = sprouts.map((sp) => line(sp, 'edge', 66)).join('');
  const cores = sprouts.map((sp) => line(sp, 'core', 32)).join('');
  star.innerHTML = `<svg class="tri" viewBox="0 0 24 24" width="24" height="24"><path d="M3 2 L3 18 L14.5 12.5 Z" fill="#145ee1" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg><span class="sq"></span><svg class="spark" viewBox="-60 -80 507 507">${edges}<path class="f" stroke-width="34" stroke-linejoin="round" paint-order="stroke" d="${arms[0]}">${anim('d', arms)}</path>${cores}</svg>`;
  document.body.appendChild(star);
  const html = document.documentElement;
  let idleTimer: number | undefined;
  let outTimer: number | undefined;
  let px = 0;
  let py = 0;
  let inside = false;
  let ax = 0; // where the pointer came to rest (for the idle timer)
  let ay = 0;

  let shaking = false;
  // colour of the drawn pointer: the article's colour on the article's coloured sheet, a project card's
  // colour on that card, else blue
  const paint = () => {
    const at = document.elementFromPoint(px, py);
    const scope = at?.closest<HTMLElement>('#main > .case, .card');
    const cs = scope ? getComputedStyle(scope) : null;
    const fill = cs?.getPropertyValue('--cur-fill').trim() ?? '';
    const edge = cs?.getPropertyValue('--cur-edge').trim() ?? '';
    if (fill) star.style.setProperty('--cf', fill);
    else star.style.removeProperty('--cf');
    if (edge) star.style.setProperty('--ce', edge);
    else star.style.removeProperty('--ce');
  };
  const wake = () => {
    if (!star.classList.contains('is-on') || shaking) return;
    star.classList.remove('is-star'); // star folds back into the triangle…
    window.clearTimeout(outTimer);
    outTimer = window.setTimeout(() => {
      star.classList.remove('is-on'); // …then the real pointer comes back
      html.classList.remove('cursor-idle');
    }, reduce.matches ? 0 : 260);
  };
  const sleep = () => {
    if (isClassic() || !inside) return;
    window.clearTimeout(outTimer);
    sleepY = window.scrollY;
    star.style.transform = `translate3d(${px}px, ${py}px, 0)`;
    paint();
    html.classList.add('cursor-idle'); // hide the real pointer: the drawn triangle takes its place
    star.classList.add('is-on');
    window.setTimeout(() => star.classList.add('is-star'), 30);
  };
  const restart = () => {
    window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(sleep, IDLE_MS);
  };

  // ---------- shake (like macOS's shake to find the pointer) ----------
  // A shake = a few quick left/right reversals within ~0.45 s. The triangle turns into a big square,
  // bigger the faster the shake.
  const moves: { x: number; y: number; t: number }[] = [];
  let shakeEnd: number | undefined;
  const shakeLevel = () => {
    const now = performance.now();
    while (moves.length && now - moves[0].t > 450) moves.shift();
    if (moves.length < 4) return 0;
    let reversals = 0;
    let dist = 0;
    let lastDir = 0;
    for (let i = 1; i < moves.length; i++) {
      const dx = moves[i].x - moves[i - 1].x;
      dist += Math.hypot(dx, moves[i].y - moves[i - 1].y);
      const dir = Math.abs(dx) > 3 ? Math.sign(dx) : 0;
      if (dir && lastDir && dir !== lastDir) reversals++;
      if (dir) lastDir = dir;
    }
    const speed = dist / Math.max(1, moves[moves.length - 1].t - moves[0].t); // px per ms
    return reversals >= 2 && speed > 0.7 ? speed : 0;
  };
  const shake = (speed: number) => {
    if (isClassic()) return;
    shaking = true;
    window.clearTimeout(outTimer);
    star.classList.remove('is-star');
    paint();
    star.classList.add('is-on', 'is-shake');
    html.classList.add('cursor-idle');
    star.style.setProperty('--shake', String(Math.min(4.2, 2.4 + speed * 0.6))); // square side: 24–42px
    window.clearTimeout(shakeEnd);
    shakeEnd = window.setTimeout(() => {
      star.classList.remove('is-shake'); // the square shrinks away and the triangle comes back…
      window.setTimeout(() => {
        shaking = false;
        star.classList.remove('is-on'); // …then the real pointer returns
        html.classList.remove('cursor-idle');
      }, reduce.matches ? 0 : 140);
    }, 250);
  };

  document.addEventListener(
    'pointermove',
    (e) => {
      px = e.clientX;
      py = e.clientY;
      moves.push({ x: px, y: py, t: performance.now() });
      const level = shakeLevel();
      if (level) shake(level);
      if (shaking) {
        star.style.transform = `translate3d(${px}px, ${py}px, 0)`;
        restart();
        return;
      }
      // only a real move counts: more than a few pixels from where the pointer came to rest. Browsers also send
      // "moves" when the page changes under a still pointer, and a hand resting on a mouse or trackpad jitters
      // by a pixel or two: those must not reset the idle timer
      if (inside && Math.hypot(px - ax, py - ay) < 6) return;
      ax = px;
      ay = py;
      inside = true;
      wake();
      restart();
    },
    { passive: true },
  );
  document.addEventListener('pointerdown', () => {
    wake();
    restart();
  });
  document.addEventListener('keydown', wake);
  // a real scroll wakes it, not the few pixels a resting hand on a trackpad can send
  let sleepY = 0;
  document.addEventListener(
    'scroll',
    () => {
      if (Math.abs(window.scrollY - sleepY) > 40) wake();
    },
    { passive: true },
  );
  document.documentElement.addEventListener('pointerleave', () => {
    inside = false;
    window.clearTimeout(idleTimer);
  });

  const syncMode = () => {
    const classic = isClassic();
    document.documentElement.classList.toggle('has-view-cursor', !classic);
    if (classic) {
      wake();
      leave();
    }
  };
  syncMode();
  document.addEventListener('pointer-mode', syncMode);
}

setup();
fine.addEventListener?.('change', setup);
