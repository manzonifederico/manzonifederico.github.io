// Project articles: lighter images and no jumping while they load (published build only).
// Astro gives the Markdown images a generic sizes="(min-width: 1600px) 1600px, 100vw", but the article column
// shows them at most 680 px wide (760 in a wide gallery) (CasePage.astro, .prose img), so the browser downloaded much bigger files than
// needed. After the build this step:
// - sets sizes to the real width: the full width on phones, at most 760 px (or the image's own width) elsewhere;
// - adds the image's proportions as --r (width / height), so the CSS can reserve its space before it loads
//   (otherwise each image is 0 px tall until it arrives and the text jumps).
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const IMG = /<img\b[^>]*\bdata-astro-image="constrained"[^>]*>/g;
const COLUMN = 760; // widest an article image is shown, px (680 in the text column, 760 in a wide gallery: CasePage.astro)

async function htmlFiles(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

export default function articleImages() {
  return {
    name: 'article-images',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        let count = 0;
        for (const file of await htmlFiles(root)) {
          const rel = file.slice(root.length).split(sep).join('/');
          if (!/^\/?(it\/)?work\//.test(rel)) continue; // project pages only
          const html = await readFile(file, 'utf8');
          const out = html.replace(IMG, (tag) => {
            const w = Number(/\bwidth="(\d+)"/.exec(tag)?.[1]);
            const h = Number(/\bheight="(\d+)"/.exec(tag)?.[1]);
            if (!w || !h || /\bstyle=/.test(tag)) return tag;
            count++;
            return tag
              .replace(/\bsizes="[^"]*"/, `sizes="(max-width: 720px) 100vw, ${Math.min(w, COLUMN)}px"`)
              .replace(/^<img\b/, `<img style="--r: ${w} / ${h}"`);
          });
          if (out !== html) await writeFile(file, out);
        }
        logger.info(`${count} article images: real sizes and reserved space`);
      },
    },
  };
}
