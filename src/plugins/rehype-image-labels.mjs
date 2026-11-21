// Rehype plugin: a short hover label on the interface screenshots in the project articles.
// The labels (one or two words, English and Italian) are in src/data/image-labels.json, keyed by
// "<project>/<file name>"; each matching <img> gets data-cursor="…", which src/scripts/view-cursor.ts shows next to
// the pointer (the zoom magnifier stays, since the image isn't a link). Italian articles (*-it.md) get the Italian label.
import { readFileSync } from 'node:fs';

const LABELS_URL = new URL('../data/image-labels.json', import.meta.url);

function loadLabels() {
  try {
    return JSON.parse(readFileSync(LABELS_URL, 'utf8'));
  } catch {
    return {};
  }
}

export default function rehypeImageLabels() {
  return (tree, file) => {
    const labels = loadLabels();
    const it = /-it\.mdx?$/.test(String(file?.path ?? ''));
    const walk = (node) => {
      if (node.type === 'element' && node.tagName === 'img') {
        const src = String(node.properties?.src ?? '');
        // "<project>/<file>" for article images, "projects/<file>" for the card images reused in articles
        const key = src.split('/assets/articles/')[1] ?? (src.includes('/assets/projects/') ? `projects/${src.split('/assets/projects/')[1]}` : undefined);
        const label = key && labels[key]?.[it ? 'it' : 'en'];
        if (label) node.properties.dataCursor = label; // comes out as datacursor="…"; view-cursor.ts turns it into data-cursor
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}
