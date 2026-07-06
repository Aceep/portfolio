export type Lang = 'fr' | 'en';

export interface Skill {
  id: string;
  name: string;
  icon: string;
  level: number;
  label: string;
  group: 'cyber' | 'dev';
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

export interface ContactLink {
  id: string;
  label: string;
  url: string;
  external?: boolean;
}

export interface Video {
  id: string;
  title: string;
  filename: string;
  description?: string;
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
  alternanceBanner: string;
  alternanceDetail: string;
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
  skillsCyberHeading: string;
  skillsDevHeading: string;
  projectsTitle: string;
  projectsKicker: string;
  projectsSummary: string;
  projectsShown: string;
  projectsIssueLabel: string;
  filterAll: string;
  filterProfessional: string;
  filterPersonal: string;
  filterTechnical: string;
  categoryStudio: string;
  categoryPersonal: string;
  categoryLab: string;
  categoryFeature: string;
  focusLabel: string;
  videosLabel: string;
  videosHeading: string;
  videosSubtitle: string;
  contactLabel: string;
  contactTitle: string;
  footerRole: string;
}

/**
 * Fully-resolved, single-language content bundle consumed by the app.
 */
export interface LocalizedContent {
  portfolio: PortfolioContent;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  videos: Video[];
  contactLinks: ContactLink[];
  focusPillars: FocusPillar[];
  marquee: string[];
  ui: UIStrings;
}
