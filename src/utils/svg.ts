// SVGs exported from Figma carry ids such as "Vector" or "mask0_0_256". When the same icon is
// inlined several times on a page those ids repeat, which is invalid HTML and can break masks.
// `inlineSvg` drops ids nobody references and makes the referenced ones unique per instance.
let counter = 0;

export function inlineSvg(raw: string): string {
  const n = ++counter;
  const referenced = new Set([...raw.matchAll(/url\(#([^)]+)\)|href="#([^"]+)"/g)].map((m) => m[1] ?? m[2]));
  return raw
    .replace(/\s(?:style="display: block;"|preserveAspectRatio="none"|overflow="visible")/g, '')
    .replace(/\sid="([^"]*)"/g, (_, id: string) => (referenced.has(id) ? ` id="${id}-${n}"` : ''))
    .replace(/url\(#([^)]+)\)/g, (_, id: string) => `url(#${id}-${n})`)
    .replace(/href="#([^"]+)"/g, (_, id: string) => `href="#${id}-${n}"`);
}
