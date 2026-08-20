import { beforeEach, describe, expect, it } from 'vitest';
import { applyDocumentMeta, SITE_URL } from './meta';

/** The tags index.html ships; applyDocumentMeta only rewrites what exists. */
const seedHead = () => {
  document.head.innerHTML = `
    <link rel="canonical" href="${SITE_URL}/" />
    <meta name="description" content="" />
    <meta property="og:title" content="" />
    <meta property="og:description" content="" />
    <meta property="og:url" content="" />
    <meta property="og:image" content="" />
    <meta property="og:locale" content="" />
    <meta name="twitter:title" content="" />
    <meta name="twitter:description" content="" />
    <meta name="twitter:image" content="" />
  `;
};

const content = (selector: string) =>
  document.head.querySelector<HTMLMetaElement>(selector)?.content;

describe('applyDocumentMeta', () => {
  beforeEach(seedHead);

  it('serves the front-end pitch and card at the root', () => {
    applyDocumentMeta('fr', 'frontend');

    expect(document.title).toContain('Front-End');
    expect(document.documentElement.lang).toBe('fr');
    expect(content('meta[property="og:url"]')).toBe(`${SITE_URL}/`);
    expect(content('meta[property="og:image"]')).toBe(`${SITE_URL}/og-card.png`);
  });

  it('swaps the whole head for the cyber positioning', () => {
    applyDocumentMeta('fr', 'cyber');

    expect(document.title).toContain('Cybersécurité');
    expect(content('meta[name="description"]')).toContain('cybersécurité');
    expect(content('meta[property="og:title"]')).toBe(document.title);
    expect(content('meta[name="twitter:title"]')).toBe(document.title);
  });

  // Regression: og:image and twitter:image were root-relative, which several
  // scrapers refuse to resolve — the preview rendered with no image at all.
  it('gives every social image an absolute URL, per positioning', () => {
    applyDocumentMeta('fr', 'cyber');

    expect(content('meta[property="og:image"]')).toBe(`${SITE_URL}/og-card-cyber.png`);
    expect(content('meta[name="twitter:image"]')).toBe(`${SITE_URL}/og-card-cyber.png`);
  });

  // Regression: vercel.json answers every unmatched path with a 200, so
  // without a per-route canonical the site is an unbounded duplicate surface.
  it('points the canonical at the route actually being served', () => {
    applyDocumentMeta('en', 'cyber');

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    expect(canonical?.href).toBe(`${SITE_URL}/cyber`);
    expect(content('meta[property="og:url"]')).toBe(`${SITE_URL}/cyber`);
  });

  it('follows the language into the locale tag', () => {
    applyDocumentMeta('en', 'frontend');

    expect(document.documentElement.lang).toBe('en');
    expect(content('meta[property="og:locale"]')).toBe('en_US');
  });
});
