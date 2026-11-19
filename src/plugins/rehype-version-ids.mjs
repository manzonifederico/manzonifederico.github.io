// Rehype plugin: give article headings unique ids per reading version.
// The same heading (e.g. "Intro") exists in full.md, key-points.md and summary.md, which are
// all rendered on one page; without a prefix their ids would collide.
//   full.md        → #intro
//   key-points.md  → #key-points-intro
//   summary.md     → #summary-intro
// Italian files (full-it.md, key-points-it.md, summary-it.md) get the same ids as their English version.

function textOf(node) {
  if (node.type === 'text') return node.value;
  return (node.children || []).map(textOf).join('');
}

function slugify(s) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function rehypeVersionIds() {
  return (tree, file) => {
    const path = (file.path || file.history?.[0] || '').replace(/\\/g, '/');
    const m = path.match(/content\/articles\/[^/]+\/([^/]+)\.md$/);
    if (!m) return;
    const base = m[1].replace(/-it$/, '');
    const prefix = base === 'full' ? '' : `${base}-`;
    const used = new Set();
    const walk = (node) => {
      if (node.type === 'element' && /^h[1-6]$/.test(node.tagName)) {
        let id = prefix + (slugify(textOf(node)) || 'section');
        let n = 1;
        while (used.has(id)) id = `${id}-${++n}`;
        used.add(id);
        node.properties = { ...node.properties, id };
      }
      (node.children || []).forEach(walk);
    };
    walk(tree);
  };
}
