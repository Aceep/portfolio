import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { Skills } from './Skills';
import { getContent } from '../constants/content';
import type { Skill, SkillGroup } from '../types';

const { ui } = getContent('fr', 'frontend');

const GROUPS: SkillGroup[] = [
  { key: 'core', heading: 'Cœur' },
  { key: 'tooling', heading: 'Outils' },
];

const SKILLS: Skill[] = [
  { id: 'react', name: 'React', icon: '❖', label: '2 ans en production', group: 'core' },
  { id: 'ts', name: 'TypeScript', icon: '◈', label: 'Mode strict', group: 'core' },
  { id: 'git', name: 'Git', icon: '◆', label: 'Versioning · Revue', group: 'tooling' },
];

describe('Skills', () => {
  it('groups skills under the headings the profile declares', () => {
    render(<Skills skills={SKILLS} groups={GROUPS} ui={ui} />);

    expect(screen.getByRole('heading', { name: 'Cœur' })).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Git')).toBeInTheDocument();
  });

  it('drops a heading whose group has no skills', () => {
    render(<Skills skills={SKILLS.filter((s) => s.group === 'core')} groups={GROUPS} ui={ui} />);

    expect(screen.getByRole('heading', { name: 'Cœur' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Outils' })).not.toBeInTheDocument();
  });

  // The section used to have no h2 at all: the label was a <div>, so the page
  // jumped h1 -> h3 here and the <section> had no accessible name.
  it('titles the section with a heading the region is named by', () => {
    const { container } = render(<Skills skills={SKILLS} groups={GROUPS} ui={ui} />);

    const region = container.querySelector('#skills');
    const heading = screen.getByRole('heading', { level: 2, name: ui.skillsLabel });

    expect(heading).toHaveAttribute('id', 'skills-heading');
    expect(region).toHaveAttribute('aria-labelledby', 'skills-heading');
  });

  it('states the evidence behind each skill instead of a score', () => {
    const { container } = render(<Skills skills={SKILLS} groups={GROUPS} ui={ui} />);

    expect(screen.getByText('2 ans en production')).toBeInTheDocument();
    expect(screen.getByText('Versioning · Revue')).toBeInTheDocument();

    // Regression: self-declared percentage bars carried no accessible value
    // and no verifiable claim. Nothing should reintroduce them.
    expect(container.querySelector('.skill-level')).toBeNull();
    expect(container.querySelector('.skill-level-fill')).toBeNull();
  });

  it('keeps every skill card readable as name plus evidence', () => {
    const { container } = render(<Skills skills={SKILLS} groups={GROUPS} ui={ui} />);

    const cards = Array.from(container.querySelectorAll<HTMLElement>('.skill-card'));
    expect(cards).toHaveLength(SKILLS.length);

    cards.forEach((card, index) => {
      expect(within(card).getByText(SKILLS[index].name)).toBeInTheDocument();
      expect(within(card).getByText(SKILLS[index].label)).toBeInTheDocument();
    });
  });
});
