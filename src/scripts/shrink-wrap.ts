// Bubbles as wide as their words. A box with a max-width whose text wraps stays as wide as that max-width, even when
// its longest line is much shorter, leaving empty space on one side. This measures the lines actually drawn and sets
// the box to the longest one (plus its padding). One-line boxes are left alone: they already fit their words.
// Used by the pointer label (view-cursor.ts), the touch bubble (touch-notes.ts) and the trophy clues (achievements.ts).
export function shrinkWrap(box: HTMLElement) {
  box.style.width = '';
  const range = document.createRange();
  range.selectNodeContents(box);
  const lines = [...range.getClientRects()].filter((r) => r.width > 0);
  if (!lines.length) return;
  // a single line: every piece is centred on the same height, give or take half a line (a flag sits a little lower than
  // the words; the next line is a whole line further down)
  const mid = (r: DOMRect) => r.top + r.height / 2;
  const half = Math.min(...lines.map((r) => r.height)) / 2;
  if (lines.every((r) => Math.abs(mid(r) - mid(lines[0])) < half)) return;
  // measured on screen, so a box that is being scaled (a bubble popping in starts at 96%) reads smaller than it is:
  // undo the scale with the box's own layout width
  const scale = box.getBoundingClientRect().width / box.offsetWidth || 1;
  const width = (Math.max(...lines.map((r) => r.right)) - Math.min(...lines.map((r) => r.left))) / scale;
  const cs = getComputedStyle(box);
  const extra =
    cs.boxSizing === 'border-box'
      ? parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight) + parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth)
      : 0;
  box.style.width = `${Math.ceil(width + extra) + 1}px`; // +1: no rounding that would push a word to a new line
}
