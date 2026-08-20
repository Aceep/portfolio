import type { Lang, Profile } from '../types';
import { PROFILE_PATHS } from './profile';
import documentMeta from './document-meta.json';

// Hardcoded so preview deployments never claim to be canonical.
export const SITE_URL = 'https://portfolio-topaz-zeta-15.vercel.app';

interface DocumentMeta {
  title: string;
  description: string;
  /** Card served to link scrapers for this positioning. */
  ogImage: string;
}

// JSON so scripts/build-routes.mjs can read the same table at build time.
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

  // vercel.json rewrites every path to 200; point these at the served route.
  const canonical = `${SITE_URL}${PROFILE_PATHS[profile]}`;
  setLinkHref('canonical', canonical);
  setMetaContent('property', 'og:url', canonical);

  // Absolute URL: scrapers do not resolve a root-relative og:image.
  setMetaContent('property', 'og:image', `${SITE_URL}${ogImage}`);
  setMetaContent('name', 'twitter:image', `${SITE_URL}${ogImage}`);
};
