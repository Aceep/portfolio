export type Lang = 'fr' | 'en';

/**
 * Which positioning the site is presenting.
 * - `frontend` — served at `/`, targets a full-time front-end CDI.
 * - `cyber`    — served at `/cyber`, targets the Sept 2026 security apprenticeship.
 */
export type Profile = 'frontend' | 'cyber';

export interface Skill {
  id: string;
  name: string;
  icon: string;
  level: number;
  label: string;
  /** Key of the owning group; the set of groups is declared per profile. */
  group: string;
}

/** A titled band in the skills section. Order = display order. */
export interface SkillGroup {
  key: string;
  heading: string;
}

export interface Experience {
  id: string;
  year: string;
  company: string;
  role: string;
}

export interface Project {
  id: string;
  number: string;
  name: string;
  description: string;
  tags: string[];
  link?: string;
  category?: 'personal' | 'school' | 'professional';
  preview?: string;
  modal?: boolean;
}

/**
 * Long-form detail for a project rendered in the modal.
 * Only projects flagged `modal: true` have one.
 */
export interface CaseStudy {
  title: string;
  kicker: string;
  role: string;
  duration: string;
  context: string;
  challenge: string;
  approach: string[];
  results: string[];
  stack: string[];
}

/** Section headings and fallback copy for the case-study modal. */
export interface CaseStudyHeadings {
  context: string;
  challenge: string;
  approach: string;
  results: string;
  stack: string;
  soon: string;
}

export interface ContactLink {
  id: string;
  label: string;
  url: string;
  external?: boolean;
  /** Action verb shown as the row's call to action (e.g. "Écrire", "Ouvrir"). */
  cta: string;
}

export interface Video {
  id: string;
  title: string;
  filename: string;
  description?: string;
  /**
   * Poster frame under `public/`. When set, the thumbnail strip renders an
   * image instead of a second <video> element and the player shows it before
   * playback — see `scripts/optimize-media.sh`.
   */
  poster?: string;
}

export interface FocusPillar {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface PortfolioContent {
  name: string;
  tagline: string;
  heroJobTitle: string;
  heroValue: string;
  /** What she is looking for — an apprenticeship on /cyber, a CDI on /. */
  availabilityBanner: string;
  availabilityDetail: string;
  yearsExp: string;
  aboutTitle: string;
  aboutDescription: string;
  contactEmail: string;
  contactLocation: string;
  contactAvailability: string;
}

/**
 * Micro-copy strings for the UI chrome (nav, section labels, buttons, headers).
 */
export interface UIStrings {
  navLinks: Array<{ label: string; href: string }>;
  navAvailability: string;
  langToggleLabel: string;
  heroBadge: string;
  heroCtaWork: string;
  heroCtaCv: string;
  aboutLabel: string;
  aboutJourneyLabel: string;
  skillsLabel: string;
  projectsLabel: string;
  projectsKicker: string;
  projectsSummary: string;
  projectsShown: string;
  /** Shown when the active filter matches no project. */
  projectsEmpty: string;
  projectsIssueLabel: string;
  filterAll: string;
  filterProfessional: string;
  filterPersonal: string;
  filterTechnical: string;
  categoryStudio: string;
  categoryPersonal: string;
  categoryLab: string;
  categoryFeature: string;
  /** Call to action on project cards that open an external link. */
  projectCta: string;
  /** Call to action on project cards that open the detail modal. */
  projectCtaDetails: string;
  focusLabel: string;
  videosLabel: string;
  videosHeading: string;
  videosSubtitle: string;
  contactLabel: string;
  contactTitle: string;
  footerRole: string;
  /** Discreet cross-link to the other positioning of the site. */
  otherProfileLabel: string;
  otherProfileHref: string;
}

/**
 * Fully-resolved, single-language content bundle consumed by the app.
 */
export interface LocalizedContent {
  profile: Profile;
  portfolio: PortfolioContent;
  skills: Skill[];
  skillGroups: SkillGroup[];
  experience: Experience[];
  projects: Project[];
  /** Keyed by project id; only `modal: true` projects have an entry. */
  caseStudies: Record<string, CaseStudy>;
  caseStudyHeadings: CaseStudyHeadings;
  videos: Video[];
  contactLinks: ContactLink[];
  /** CV to download for this positioning. */
  cvUrl: string;
  focusPillars: FocusPillar[];
  marquee: string[];
  ui: UIStrings;
}
