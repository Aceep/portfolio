import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skills } from './Skills';
import { getContent } from '../constants/content';
import { MockIntersectionObserver } from '../test/setup';
import type { Skill, SkillGroup } from '../types';

const { ui } = getContent('fr', 'frontend');

const GROUPS: SkillGroup[] = [
  { key: 'core', heading: 'Cœur' },
  { key: 'tooling', heading: 'Outils' },
];

const SKILLS: Skill[] = [
  { id: 'react', name: 'React', icon: '❖', level: 90, label: 'Expérimentée', group: 'core' },
  { id: 'ts', name: 'TypeScript', icon: '◈', level: 88, label: 'Expérimentée', group: 'core' },
  { id: 'git', name: 'Git', icon: '◆', level: 80, label: 'Outils', group: 'tooling' },
];

const observer = () =>
  MockIntersectionObserver.instances[MockIntersectionObserver.instances.length - 1];

describe('Skills', () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = [];
  });

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

  // Regression: the hook returns the ref that must be observed. It used to be
  // discarded in favour of a second, unrelated ref, so nothing was ever
  // observed and the bars never animated — silently, since the markup was fine.
  it('observes the section it rendered', () => {
    const { container } = render(<Skills skills={SKILLS} groups={GROUPS} ui={ui} />);

    expect(observer()?.observed).toEqual([container.querySelector('#skills')]);
  });

  it('replays the bars from zero once the section scrolls into view', () => {
    const { container } = render(<Skills skills={SKILLS} groups={GROUPS} ui={ui} />);
    const bars = () =>
      Array.from(container.querySelectorAll<HTMLElement>('.skill-level-fill')).map(
        (bar) => bar.style.width
      );

    expect(bars()).toEqual(['90%', '88%', '80%']);

    observer()?.trigger();

    expect(bars()).toEqual(['0%', '0%', '0%']);
  });

  it('stops observing after the first pass, so scrolling back does not replay it', () => {
    render(<Skills skills={SKILLS} groups={GROUPS} ui={ui} />);

    observer()?.trigger();

    expect(observer()?.unobserve).toHaveBeenCalledTimes(1);
  });
});
