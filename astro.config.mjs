// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeVersionIds from './src/plugins/rehype-version-ids.mjs';
import rehypePiiNames from './src/plugins/rehype-pii-names.mjs';
import cspHashes from './src/plugins/csp-hashes.mjs';

// `site` is the public URL of the deployed website (canonical links, sitemap, robots.txt, social previews).
// On GitHub Pages the deploy workflow (.github/workflows/deploy.yml) passes it in SITE_URL (that also covers a
// custom domain added later); otherwise it is the GitHub Pages address. The site uses root-relative links (/work/…, /audio/…), so it must be served from the root of a
// domain: name the repository <username>.github.io, or use a custom domain.
const site = process.env.SITE_URL || 'https://manzonifederico.github.io';
const base = process.env.BASE_PATH;
if (base && base !== '/') {
  throw new Error(
    `This site must be served from the root of a domain, not from "${base}". ` +
      'Name the GitHub repository <username>.github.io, or set a custom domain in Settings → Pages.',
  );
}

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      // tells search engines that /x/ and /it/x/ are the same page in two languages
      i18n: { defaultLocale: 'en', locales: { en: 'en', it: 'it' } },
      filter: (page) => !page.includes('/404') && !page.includes('/sunfest25') && !page.includes('/cv-print'),
      lastmod: new Date(),
    }),
    // security policy: the hash of each inline script, added after the build (src/plugins/csp-hashes.mjs)
    cspHashes(),
  ],
  // article images (markdown) get several sizes (srcset), so phones and normal screens don't download the
  // full-resolution file; the click-to-enlarge view still opens the largest one. No extra inline styles:
  // the site's CSS already sizes the images.
  image: {
    layout: 'constrained',
    responsiveStyles: false,
  },
  markdown: {
    rehypePlugins: [rehypeVersionIds, rehypePiiNames],
  },
});
