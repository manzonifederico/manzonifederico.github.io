// robots.txt, built with the real site address (see `site` in astro.config.mjs).
// AI policy: search engines and AI assistants may read and quote the site; training AI models is not allowed.
// "Content-Signal" is the emerging way to say this in robots.txt (search / ai-input = answers that quote the
// site / ai-train = model training); the full policy, in words, is in /llms.txt.
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site).href;
  const body = `# AI use policy: read, index and quote with attribution; no model training.
# Full policy and a summary of this site for AI assistants: ${url('/llms.txt')}

User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

# crawlers that only collect training data
User-agent: GPTBot
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: CCBot
User-agent: ClaudeBot
User-agent: meta-externalagent
Disallow: /

Sitemap: ${url('sitemap-index.xml')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
