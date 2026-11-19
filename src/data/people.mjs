// Real people named on the site (Federico, teammates, supervisors, co-authors).
// In reviewer ("unbiased") mode every mention is blurred: articles (via src/plugins/rehype-pii-names.mjs),
// team lists, footer and the CV publication. Fictional personas and cited researchers are not listed here.
// Add a name here when a new real person appears in an article (first names only if they are used alone).

export const people = [
  // full names
  'Federico Manzoni',
  'Michele Cazzaro',
  'Samuele Mazzei',
  'Samuele Nigroni',
  'Lorenzo Zambotto',
  'Nataliya Zhigalina',
  'Ira Laihanen',
  'Christoph Reuter',
  'Filippo D’Agnano',
  "Filippo D'Agnano",
  'Federica Gini',
  'Antonio Bucchiarone',
  'Massimo Zancanaro',
  'Paolo Giorgini',
  'Simone Bassanelli',
  'Annapaola Marconi',
  // first names / nicknames used on their own in the articles
  'Federico',
  'Michele',
  'Mikey',
  'Samuele',
  'Lorenzo',
  'Federica',
  'Antonio',
];

/** Regex matching any of the names as whole words (longest first, so full names win) */
export const peopleRegex = () =>
  new RegExp(
    `(?<![\\p{L}\\p{N}])(${[...people]
      .sort((a, b) => b.length - a.length)
      .map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|')})(?![\\p{L}\\p{N}])`,
    'gu',
  );
