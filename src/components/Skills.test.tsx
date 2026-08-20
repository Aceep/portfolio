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
  it('groups skills under their group headings', () => {
    render(<Skills skills={SKILLS} groups={GROUPS} ui={ui} />);

    expect(screen.getByRole('heading', { name: 'Cœur' })).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Git')).toBeInTheDocument();
  });

  it('skips empty groups', () => {
    render(<Skills skills={SKILLS.filter((s) => s.group === 'core')} groups={GROUPS} ui={ui} />);

    expect(screen.getByRole('heading', { name: 'Cœur' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Outils' })).not.toBeInTheDocument();
  });

  it('labels the section with its h2', () => {
    const { container } = render(<Skills skills={SKILLS} groups={GROUPS} ui={ui} />);

    const region = container.querySelector('#skills');
    const heading = screen.getByRole('heading', { level: 2, name: ui.skillsLabel });

    expect(heading).toHaveAttribute('id', 'skills-heading');
    expect(region).toHaveAttribute('aria-labelledby', 'skills-heading');
  });

  it('shows evidence text per skill', () => {
    const { container } = render(<Skills skills={SKILLS} groups={GROUPS} ui={ui} />);

    expect(screen.getByText('2 ans en production')).toBeInTheDocument();
    expect(screen.getByText('Versioning · Revue')).toBeInTheDocument();

    expect(container.querySelector('.skill-level')).toBeNull();
    expect(container.querySelector('.skill-level-fill')).toBeNull();
  });

  it('renders name and label in each card', () => {
    const { container } = render(<Skills skills={SKILLS} groups={GROUPS} ui={ui} />);

    const cards = Array.from(container.querySelectorAll<HTMLElement>('.skill-card'));
    expect(cards).toHaveLength(SKILLS.length);

    SKILLS.forEach((skill, index) => {
      const card = cards[index];
      expect(card).toBeDefined();
      expect(within(card as HTMLElement).getByText(skill.name)).toBeInTheDocument();
      expect(within(card as HTMLElement).getByText(skill.label)).toBeInTheDocument();
    });
  });
});
