import { describe, expect, it } from 'vitest';
import { CV_URL, getContent } from './content';
import type { Lang, Profile } from '../types';

const PROFILES: Profile[] = ['frontend', 'cyber'];
const LANGS: Lang[] = ['fr', 'en'];
const COMBINATIONS = PROFILES.flatMap((profile) => LANGS.map((lang) => ({ profile, lang })));

describe.each(COMBINATIONS)('getContent($lang, $profile)', ({ lang, profile }) => {
  const content = getContent(lang, profile);

  it('numbers projects contiguously from 001', () => {
    expect(content.projects.map((p) => p.number)).toEqual(
      content.projects.map((_, i) => String(i + 1).padStart(3, '0'))
    );
  });

  it('resolves a description for every project', () => {
    const missing = content.projects.filter((p) => !p.description).map((p) => p.id);
    expect(missing).toEqual([]);
  });

  it('resolves name and label for every skill', () => {
    const missing = content.skills.filter((s) => !s.name || !s.label).map((s) => s.id);
    expect(missing).toEqual([]);
  });

  it('assigns every skill to a declared group', () => {
    const declared = new Set(content.skillGroups.map((g) => g.key));
    const orphans = content.skills.filter((s) => !declared.has(s.group)).map((s) => s.id);
    expect(orphans).toEqual([]);
  });

  it('has no empty skill group', () => {
    const used = new Set(content.skills.map((s) => s.group));
    expect(content.skillGroups.filter((g) => !used.has(g.key))).toEqual([]);
  });

  it('leaves no UI string blank', () => {
    const blanks = Object.entries(content.ui)
      .filter(([, value]) => (Array.isArray(value) ? value.length === 0 : !value))
      .map(([key]) => key);
    expect(blanks).toEqual([]);
  });

  it('backs every modal project with a case study', () => {
    const modalProjects = content.projects.filter((p) => p.modal);
    expect(modalProjects.length).toBeGreaterThan(0);
    const unbacked = modalProjects.filter((p) => !content.caseStudies[p.id]).map((p) => p.id);
    expect(unbacked).toEqual([]);
  });

  it('uses the CV URL for the profile', () => {
    expect(content.cvUrl).toBe(CV_URL[profile]);
  });

  it('points the CV contact row at the same file', () => {
    const cvLink = content.contactLinks.find((link) => link.id === 'cv');
    expect(cvLink?.url).toBe(CV_URL[profile]);
  });

  it('numbers section labels in page order', () => {
    // Page order from App.tsx; Focus is unnumbered.
    const labels = [
      content.ui.aboutLabel,
      content.ui.skillsLabel,
      content.ui.projectsLabel,
      content.ui.videosLabel,
      content.ui.contactLabel,
    ];
    expect(labels.map((label) => label.slice(0, 2))).toEqual(['01', '02', '03', '04', '05']);
  });

  it('has non-empty case-study metrics', () => {
    const malformed = Object.entries(content.caseStudies)
      .flatMap(([id, study]) => (study.metrics ?? []).map((metric) => ({ id, metric })))
      .filter(({ metric }) => !metric.value?.trim() || !metric.label?.trim())
      .map(({ id }) => id);
    expect(malformed).toEqual([]);
  });

  it('only cyber declares a cross-link, to /', () => {
    if (profile === 'frontend') {
      expect(content.ui.otherProfileLabel).toBeUndefined();
      expect(content.ui.otherProfileHref).toBeUndefined();
    } else {
      expect(content.ui.otherProfileLabel).toBeTruthy();
      expect(content.ui.otherProfileHref).toBe('/');
    }
  });

  it('matches the degree level on the CV', () => {
    // CV says Bac +4.
    const master = content.experience.find((entry) => entry.id === 'master');
    expect(master).toBeDefined();
    expect(master?.role).not.toMatch(/Bac \+5|MSc/);
  });

  it('gives every video a poster and a title', () => {
    const incomplete = content.videos.filter((v) => !v.poster || !v.title).map((v) => v.id);
    expect(incomplete).toEqual([]);
  });
});

describe('getContent', () => {
  it('front-end and cyber content differ', () => {
    const frontend = getContent('fr', 'frontend');
    const cyber = getContent('fr', 'cyber');

    expect(frontend.portfolio.heroJobTitle).not.toBe(cyber.portfolio.heroJobTitle);
    expect(frontend.cvUrl).not.toBe(cyber.cvUrl);
  });

  it('translates without changing the structure', () => {
    const fr = getContent('fr', 'frontend');
    const en = getContent('en', 'frontend');

    expect(en.projects.map((p) => p.id)).toEqual(fr.projects.map((p) => p.id));
    expect(en.skills.map((s) => s.id)).toEqual(fr.skills.map((s) => s.id));
    expect(en.portfolio.aboutDescription).not.toBe(fr.portfolio.aboutDescription);
  });
});
