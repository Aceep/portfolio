import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Projects } from './Projects';
import { LanguageProvider } from '../i18n/LanguageContext';
import { getContent } from '../constants/content';
import type { Project } from '../types';

const content = getContent('fr', 'frontend');
const { ui } = content;

// `playmakers-professional` is the id the real case-study table is keyed by,
// so the modal renders actual content rather than the fallback.
const PROJECTS: Project[] = [
  {
    id: 'playmakers-professional',
    number: '001',
    name: 'PlayMakers',
    description: 'Plateforme sportive en production.',
    tags: ['React', 'TypeScript'],
    category: 'professional',
    modal: true,
  },
  {
    id: 'shifumi',
    number: '002',
    name: 'Shifumi',
    description: 'Pierre-feuille-ciseaux.',
    tags: ['JavaScript'],
    category: 'personal',
    link: 'https://example.com/shifumi',
  },
];

const renderProjects = (projects: Project[] = PROJECTS) =>
  render(
    <LanguageProvider profile="frontend">
      <Projects projects={projects} ui={ui} />
    </LanguageProvider>
  );

const grid = () => screen.getByRole('tabpanel');
const tab = (name: RegExp) => screen.getByRole('tab', { name });

describe('Projects', () => {
  it('shows every project under the default filter', () => {
    renderProjects();

    expect(within(grid()).getByText('PlayMakers')).toBeInTheDocument();
    expect(within(grid()).getByText('Shifumi')).toBeInTheDocument();
  });

  it('counts each category on its filter', () => {
    renderProjects();

    expect(tab(new RegExp(ui.filterAll))).toHaveTextContent('2');
    expect(tab(new RegExp(ui.filterProfessional))).toHaveTextContent('1');
    expect(tab(new RegExp(ui.filterTechnical))).toHaveTextContent('0');
  });

  it('narrows the grid to the selected category', async () => {
    const user = userEvent.setup();
    renderProjects();

    await user.click(tab(new RegExp(ui.filterPersonal)));

    expect(within(grid()).getByText('Shifumi')).toBeInTheDocument();
    expect(within(grid()).queryByText('PlayMakers')).not.toBeInTheDocument();
  });

  // Regression: an empty filter used to return null for the whole section,
  // taking the filter bar with it and stranding the visitor.
  it('keeps the filters reachable when a category is empty', async () => {
    const user = userEvent.setup();
    renderProjects();

    await user.click(tab(new RegExp(ui.filterTechnical)));

    expect(screen.getByText(ui.projectsEmpty)).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(4);

    await user.click(tab(new RegExp(ui.filterAll)));
    expect(within(grid()).getByText('PlayMakers')).toBeInTheDocument();
  });

  it('moves between filters with the arrow keys', async () => {
    const user = userEvent.setup();
    renderProjects();

    const all = tab(new RegExp(ui.filterAll));
    all.focus();
    await user.keyboard('{ArrowRight}');

    expect(tab(new RegExp(ui.filterProfessional))).toHaveAttribute('aria-selected', 'true');
    expect(tab(new RegExp(ui.filterProfessional))).toHaveFocus();

    await user.keyboard('{End}');
    expect(tab(new RegExp(ui.filterTechnical))).toHaveAttribute('aria-selected', 'true');
  });

  it('links straight out for projects without a case study', () => {
    renderProjects();

    const link = screen.getByRole('link', { name: /Shifumi/ });
    expect(link).toHaveAttribute('href', 'https://example.com/shifumi');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('opens the case study for projects that have one, and closes on Escape', async () => {
    const user = userEvent.setup();
    renderProjects();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /PlayMakers/ }));

    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByRole('heading', { name: 'PlayMakers Platform' })).toBeInTheDocument();
    expect(within(dialog).getByText(content.caseStudyHeadings.context)).toBeInTheDocument();
    expect(document.body).toHaveStyle({ overflow: 'hidden' });

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body).not.toHaveStyle({ overflow: 'hidden' });
  });

  it('falls back to a placeholder when a modal project has no case study', async () => {
    const user = userEvent.setup();
    renderProjects([{ ...PROJECTS[0], id: 'not-written-yet' }]);

    await user.click(screen.getByRole('button', { name: /PlayMakers/ }));

    expect(within(screen.getByRole('dialog')).getByText(content.caseStudyHeadings.soon))
      .toBeInTheDocument();
  });
});
