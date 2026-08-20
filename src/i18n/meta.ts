import type { Lang, Profile } from '../types';
import { PROFILE_PATHS } from './profile';
import documentMeta from './document-meta.json';

/**
 * Canonical origin. Kept here rather than read from `window.location` so a
 * preview deployment never advertises itself as the canonical copy.
 */
export const SITE_URL = 'https://portfolio-topaz-zeta-15.vercel.app';

interface DocumentMeta {
  title: string;
  description: string;
  /** Card served to link scrapers for this positioning. */
  ogImage: string;
}

/**
 * Per-positioning document metadata.
 *
 * Held as JSON rather than inline so `scripts/build-routes.mjs` can read the
 * same table at build time: scrapers do not run JS, so /cyber needs its tags
 * written into a static file, and the two must not drift.
 *
 * This module still swaps them at runtime so the tab and the in-page tags
 * follow the active positioning and language once React is up.
 */
const DOCUMENT_META = documentMeta as Record<Profile, Record<Lang, DocumentMeta>>;

const setLinkHref = (rel: string, value: string) => {
  const tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (tag) {
    tag.href = value;
  }
};

const setMetaContent = (attribute: 'name' | 'property', key: string, value: string) => {
  const tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (tag) {
    tag.content = value;
  }
};

/** Point the document's title and description at the active positioning. */
export const applyDocumentMeta = (lang: Lang, profile: Profile) => {
  const { title, description, ogImage } = DOCUMENT_META[profile][lang];

  document.documentElement.lang = lang;
  document.title = title;

  setMetaContent('name', 'description', description);
  setMetaContent('property', 'og:title', title);
  setMetaContent('property', 'og:description', description);
  setMetaContent('property', 'og:locale', lang === 'fr' ? 'fr_FR' : 'en_US');
  setMetaContent('name', 'twitter:title', title);
  setMetaContent('name', 'twitter:description', description);

  // The catch-all rewrite in vercel.json answers every unmatched path with a
  // 200, so point both of these at the route that is actually being served.
  const canonical = `${SITE_URL}${PROFILE_PATHS[profile]}`;
  setLinkHref('canonical', canonical);
  setMetaContent('property', 'og:url', canonical);

  // Absolute: scrapers do not resolve a root-relative og:image, and several
  // drop the preview entirely rather than guessing.
  setMetaContent('property', 'og:image', `${SITE_URL}${ogImage}`);
  setMetaContent('name', 'twitter:image', `${SITE_URL}${ogImage}`);
};
