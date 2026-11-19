// Content collections: the case-study article text.
// Each project has a folder in src/content/articles/<slug>/ with:
//   full.md        → "Full story" version
//   key-points.md  → "Key points" version
//   summary.md     → "Summary" version
//   bibliography.md (optional) → references shown under the article
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
});

export const collections = { articles };
