// Rehype plugin: wrap the names of real people (src/data/people.mjs) in
// <span class="pii pii-name">…</span>, so reviewer ("unbiased") mode can blur them in the articles.
import { peopleRegex } from '../data/people.mjs';

const SKIP = new Set(['code', 'pre', 'script', 'style']);

export default function rehypePiiNames() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      if (node.type === 'element' && SKIP.has(node.tagName)) return;
      const out = [];
      for (const child of node.children) {
        if (child.type !== 'text') {
          walk(child);
          out.push(child);
          continue;
        }
        const re = peopleRegex();
        const text = child.value;
        let last = 0;
        let m;
        let changed = false;
        while ((m = re.exec(text))) {
          changed = true;
          if (m.index > last) out.push({ type: 'text', value: text.slice(last, m.index) });
          out.push({
            type: 'element',
            tagName: 'span',
            properties: { className: ['pii', 'pii-name'] },
            children: [{ type: 'text', value: m[0] }],
          });
          last = m.index + m[0].length;
        }
        if (!changed) {
          out.push(child);
          continue;
        }
        if (last < text.length) out.push({ type: 'text', value: text.slice(last) });
      }
      node.children = out;
    };
    walk(tree);
  };
}
