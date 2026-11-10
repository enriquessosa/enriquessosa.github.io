// Check the deployed output without adding a test framework.
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const routes = ['/', '/about/', '/projects/', '/projects/pulse/', '/projects/atlas/', '/projects/drift/'];
const repositories = ['pulse-systemd', 'atlas', 'drift'].map((repo) => `https://github.com/enriquessosa/${repo}`);
const titles = new Set();
for (const route of routes) {
  const html = await readFile(join('dist', route, 'index.html'), 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert(title && !titles.has(title), `${route}: missing or duplicate title`);
  titles.add(title);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: expected one h1`);
  assert.match(html, /<html lang="en"/);
  assert.match(html, /<meta name="description" content="[^"]+"/);
  assert(html.includes(`rel="canonical" href="https://enriquessosa.github.io${route}"`));
  assert.match(html, /<nav aria-label="Main navigation"/);
  assert.match(html, /href="#main"/);
  assert.match(html, /<main id="main"/);
  assert(!/<script\b/.test(html), `${route}: unexpected browser JavaScript`);
  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (href.startsWith('#')) {
      assert(html.includes(`id="${href.slice(1)}"`), `${route}: broken fragment ${href}`);
    } else if (href.startsWith('/')) {
      await access(join('dist', href, href.endsWith('/') ? 'index.html' : ''));
    } else {
      assert(href === `https://enriquessosa.github.io${route}` || href === 'https://github.com/enriquessosa' || repositories.includes(href), `${route}: unexpected external link ${href}`);
    }
  }
  if (route === '/' || route === '/projects/') {
    const positions = ['pulse', 'atlas', 'drift'].map((slug) => html.indexOf(`href="/projects/${slug}/"`));
    assert(positions.every((position, index) => position >= 0 && (index === 0 || position > positions[index - 1])), 'Project order');
    for (const repo of repositories) assert(html.includes(`href="${repo}"`));
  }
  console.log(`PASS ${route}`);
}
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
for (const route of routes) assert(sitemap.includes(`<loc>https://enriquessosa.github.io${route}</loc>`));
console.log('PASS internal links, external link allowlist, metadata, landmarks, project order, sitemap, and zero client scripts');
