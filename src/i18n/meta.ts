import type { Lang, Profile } from '../types';
import { PROFILE_PATHS } from './profile';

/**
 * Canonical origin. Kept here rather than read from `window.location` so a
 * preview deployment never advertises itself as the canonical copy.
 */
export const SITE_URL = 'https://portfolio-topaz-zeta-15.vercel.app';

interface DocumentMeta {
  title: string;
  description: string;
}

/**
 * Per-positioning document metadata.
 *
 * `index.html` ships the **front-end** pitch statically, because that is what
 * `/` serves and what link scrapers read. This table swaps the title and the
 * description at runtime so the tab and the in-page tags follow the active
 * positioning and language.
 *
 * Caveat worth knowing: social crawlers do not run JS, so a link to `/cyber`
 * still previews with the front-end copy. Fixing that properly means
 * prerendering the two routes at build time.
 */
const DOCUMENT_META: Record<Profile, Record<Lang, DocumentMeta>> = {
  frontend: {
    fr: {
      title: 'Alycia Gautier — Développeuse Front-End React & TypeScript',
      description:
        'Développeuse front-end, deux ans d’interfaces React, TypeScript, Vue et Tailwind livrées en production. En recherche d’un CDI à partir de septembre 2026, Paris ou télétravail.',
    },
    en: {
      title: 'Alycia Gautier — Front-End Developer, React & TypeScript',
      description:
        'Front-end developer with two years shipping production React, TypeScript, Vue and Tailwind interfaces. Looking for a full-time role from September 2026, Paris or remote.',
    },
  },
  cyber: {
    fr: {
      title: 'Alycia Gautier — Développeuse → Cybersécurité · Alternance 2026',
      description:
        'Développeuse front-end en spécialisation cybersécurité (Master Sécurité & Administration Réseau). En recherche d’alternance pour septembre 2026 : réseau, Linux, reverse engineering.',
    },
    en: {
      title: 'Alycia Gautier — Developer → Cybersecurity · Apprenticeship 2026',
      description:
        'Front-end developer specialising in cybersecurity (Master’s in Security & Network Administration). Looking for a September 2026 apprenticeship: networking, Linux, reverse engineering.',
    },
  },
};

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
  const { title, description } = DOCUMENT_META[profile][lang];

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
};
