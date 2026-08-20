#!/usr/bin/env node
/**
 * Emit dist/cyber.html — the static document served at /cyber.
 *
 * Link scrapers and crawlers do not run JS, so the runtime swap in
 * src/i18n/meta.ts never reaches them: every share of /cyber previewed with
 * the front-end card and the front-end description. This rewrites the head of
 * the built index.html for the cybersecurity positioning and writes it as a
 * second document, which vercel.json points /cyber at.
 *
 * Every substitution is asserted. A silent miss would ship the wrong pitch to
 * every recruiter who sees the link, so a miss fails the build instead.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const meta = JSON.parse(readFileSync(resolve(ROOT, 'src/i18n/document-meta.json'), 'utf8'));

const SITE_URL = 'https://portfolio-topaz-zeta-15.vercel.app';
const from = meta.frontend.fr;
const to = meta.cyber.fr;

/** HTML-escape the way the source document writes ampersands. */
const esc = (value) => value.replace(/&/g, '&amp;');

const substitutions = [
  ['front-end title', esc(from.title), esc(to.title)],
  ['front-end description', esc(from.description), esc(to.description)],
  ['canonical + og:url', `${SITE_URL}/"`, `${SITE_URL}/cyber"`],
  ['og/twitter image', `${SITE_URL}${from.ogImage}`, `${SITE_URL}${to.ogImage}`],
];

let html = readFileSync(resolve(ROOT, 'dist/index.html'), 'utf8');

for (const [what, search, replacement] of substitutions) {
  if (!html.includes(search)) {
    console.error(`build-routes: nothing to replace for ${what}.`);
    console.error(`  expected to find: ${search}`);
    console.error('  index.html and src/i18n/document-meta.json have drifted apart.');
    process.exit(1);
  }
  html = html.replaceAll(search, replacement);
}

// The two shorter social descriptions are authored separately in index.html,
// so they are not covered by the substitutions above. Point every remaining
// og/twitter description at the cyber pitch.
html = html.replace(
  /(<meta\s+(?:property="og:description"|name="twitter:description")[\s\S]{0,40}?content=")[^"]*(")/g,
  `$1${esc(to.description)}$2`
);

// The JSON-LD block describes the front-end positioning.
const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!ld) {
  console.error('build-routes: no JSON-LD block found in dist/index.html.');
  process.exit(1);
}

const profile = JSON.parse(ld[1]);
profile.url = `${SITE_URL}/cyber`;
profile.mainEntity.url = `${SITE_URL}/cyber`;
profile.mainEntity.jobTitle = 'Développeuse Front-End → Cybersécurité';
profile.mainEntity.knowsAbout = [
  'Cybersécurité',
  'Reverse engineering',
  'Linux',
  'Réseau',
  'Assembleur x86',
  'React',
  'TypeScript',
];
html = html.replace(
  /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
  `<script type="application/ld+json">\n${JSON.stringify(profile, null, 2)}\n    </script>`
);

// Guard against shipping the front-end pitch under the cyber route.
for (const leftover of [esc(from.title), `${SITE_URL}${from.ogImage}`]) {
  if (html.includes(leftover)) {
    console.error(`build-routes: front-end copy survived into cyber.html: ${leftover}`);
    process.exit(1);
  }
}

const out = resolve(ROOT, 'dist/cyber.html');
writeFileSync(out, html);
console.log(`build-routes: wrote dist/cyber.html (${(html.length / 1024).toFixed(1)} KB)`);
