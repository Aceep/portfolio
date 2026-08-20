import { beforeEach, describe, expect, it } from 'vitest';
import { applyDocumentMeta, SITE_URL } from './meta';

// Mirrors the tags in index.html; applyDocumentMeta only rewrites existing ones.
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

  it('sets front-end meta at the root', () => {
    applyDocumentMeta('fr', 'frontend');

    expect(document.title).toContain('Front-End');
    expect(document.documentElement.lang).toBe('fr');
    expect(content('meta[property="og:url"]')).toBe(`${SITE_URL}/`);
    expect(content('meta[property="og:image"]')).toBe(`${SITE_URL}/og-card.png`);
  });

  it('sets cyber meta for the cyber profile', () => {
    applyDocumentMeta('fr', 'cyber');

    expect(document.title).toContain('Cybersécurité');
    expect(content('meta[name="description"]')).toContain('cybersécurité');
    expect(content('meta[property="og:title"]')).toBe(document.title);
    expect(content('meta[name="twitter:title"]')).toBe(document.title);
  });

  it('uses absolute URLs for social images', () => {
    applyDocumentMeta('fr', 'cyber');

    expect(content('meta[property="og:image"]')).toBe(`${SITE_URL}/og-card-cyber.png`);
    expect(content('meta[name="twitter:image"]')).toBe(`${SITE_URL}/og-card-cyber.png`);
  });

  it('sets the canonical to the current route', () => {
    applyDocumentMeta('en', 'cyber');

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    expect(canonical?.href).toBe(`${SITE_URL}/cyber`);
    expect(content('meta[property="og:url"]')).toBe(`${SITE_URL}/cyber`);
  });

  it('sets lang and og:locale from the language', () => {
    applyDocumentMeta('en', 'frontend');

    expect(document.documentElement.lang).toBe('en');
    expect(content('meta[property="og:locale"]')).toBe('en_US');
  });
});
