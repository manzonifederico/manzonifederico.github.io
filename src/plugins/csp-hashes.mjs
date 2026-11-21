// Content-Security-Policy with script hashes, for the published build.
// GitHub Pages can't send HTTP headers, so each page carries its policy in a <meta http-equiv> tag (BaseLayout and
// SunfestLayout). Those tags allow 'unsafe-inline' scripts, because Astro writes the site's small scripts into the
// page. After the build, this step adds the SHA-256 hash of every inline script on each page to its policy:
// browsers that understand hashes then run only those exact scripts and ignore 'unsafe-inline', so a script
// injected into the page would be blocked. 'unsafe-inline' stays only as a fallback for very old browsers.
// It also adds script-src-attr 'none' (no onclick="…"-style attributes; the site uses none).
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const META = /(<meta http-equiv="Content-Security-Policy" content=")([^"]*)(")/;
const SCRIPT = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
// only these script types run; JSON-LD and other data blocks are never executed, so they need no hash
const RUNS = /^(module|text\/javascript|application\/javascript)$/i;

async function htmlFiles(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

export default function cspHashes() {
  return {
    name: 'csp-script-hashes',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        let pages = 0;
        for (const file of await htmlFiles(fileURLToPath(dir))) {
          const html = await readFile(file, 'utf8');
          if (!META.test(html)) continue;
          const hashes = new Set();
          for (const [, attrs, body] of html.matchAll(SCRIPT)) {
            if (/\bsrc=/i.test(attrs)) continue; // external files are covered by 'self'
            const type = /\btype="([^"]*)"/i.exec(attrs)?.[1];
            if (type && !RUNS.test(type)) continue;
            hashes.add(`'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`);
          }
          const out = html.replace(META, (_, start, policy, end) => {
            if (!/script-src /.test(policy)) throw new Error(`csp-hashes: no script-src in ${file}`);
            let p = policy.replace(/script-src ([^;]*)/, (_m, v) => `script-src ${v.trim()} ${[...hashes].join(' ')}`.trim());
            if (!/script-src-attr/.test(p)) p += "; script-src-attr 'none'";
            return start + p + end;
          });
          await writeFile(file, out);
          pages++;
        }
        logger.info(`script hashes added to the security policy of ${pages} pages`);
      },
    },
  };
}
