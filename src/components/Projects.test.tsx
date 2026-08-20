import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Projects } from './Projects';
import { LanguageProvider } from '../i18n/LanguageContext';
import { getContent } from '../constants/content';
import type { Project } from '../types';

const content = getContent('fr', 'frontend');
const { ui } = content;

// id matches a real case study so the modal renders content.
const PLAYMAKERS: Project = {
  id: 'playmakers-professional',
  number: '001',
  name: 'PlayMakers',
  description: 'Plateforme sportive en production.',
  tags: ['React', 'TypeScript'],
  category: 'professional',
  modal: true,
};

const SHIFUMI: Project = {
  id: 'shifumi',
  number: '002',
  name: 'Shifumi',
  description: 'Pierre-feuille-ciseaux.',
  tags: ['JavaScript'],
  category: 'personal',
  link: 'https://example.com/shifumi',
};

const PROJECTS: Project[] = [PLAYMAKERS, SHIFUMI];

const renderProjects = (projects: Project[] = PROJECTS) =>
  render(
    <LanguageProvider profile="frontend">
      <Projects projects={projects} ui={ui} />
    </LanguageProvider>
  );

const grid = () => screen.getByRole('tabpanel');
const tab = (name: RegExp) => screen.getByRole('tab', { name });

describe('Projects', () => {
  beforeEach(() => {
    // jsdom reports en-US; assertions use the French bundle.
    localStorage.setItem('portfolio-lang', 'fr');
  });

  it('shows all projects by default', () => {
    renderProjects();

    expect(within(grid()).getByText('PlayMakers')).toBeInTheDocument();
    expect(within(grid()).getByText('Shifumi')).toBeInTheDocument();
  });

  it('shows a count on each filter', () => {
    renderProjects();

    expect(tab(new RegExp(ui.filterAll))).toHaveTextContent('2');
    expect(tab(new RegExp(ui.filterProfessional))).toHaveTextContent('1');
    expect(tab(new RegExp(ui.filterTechnical))).toHaveTextContent('0');
  });

  it('filters by category', async () => {
    const user = userEvent.setup();
    renderProjects();

    await user.click(tab(new RegExp(ui.filterPersonal)));

    expect(within(grid()).getByText('Shifumi')).toBeInTheDocument();
    expect(within(grid()).queryByText('PlayMakers')).not.toBeInTheDocument();
  });

  it('keeps the filter bar when a category is empty', async () => {
    const user = userEvent.setup();
    renderProjects();

    await user.click(tab(new RegExp(ui.filterTechnical)));

    expect(screen.getByText(ui.projectsEmpty)).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(4);

    await user.click(tab(new RegExp(ui.filterAll)));
    expect(within(grid()).getByText('PlayMakers')).toBeInTheDocument();
  });

  it('supports arrow key navigation between filters', async () => {
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

  it('links externally for projects with a link', () => {
    renderProjects();

    const link = screen.getByRole('link', { name: /Shifumi/ });
    expect(link).toHaveAttribute('href', 'https://example.com/shifumi');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('opens the case study modal and closes on Escape', async () => {
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

  it('traps focus in the modal and restores it on close', async () => {
    const user = userEvent.setup();
    renderProjects();

    const opener = screen.getByRole('button', { name: /PlayMakers/ });
    await user.click(opener);

    const dialog = screen.getByRole('dialog');
    const close = within(dialog).getByRole('button', { name: content.ui.closeModalLabel });
    expect(close).toHaveFocus();

    await user.tab();
    expect(dialog).toContainElement(document.activeElement as HTMLElement);

    await user.tab({ shift: true });
    expect(dialog).toContainElement(document.activeElement as HTMLElement);

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });

  it('labels the close button in the active language', async () => {
    const user = userEvent.setup();
    renderProjects();

    await user.click(screen.getByRole('button', { name: /PlayMakers/ }));

    expect(content.ui.closeModalLabel).toBe('Fermer la fenêtre');
    expect(
      within(screen.getByRole('dialog')).getByRole('button', { name: 'Fermer la fenêtre' })
    ).toBeInTheDocument();
  });

  it('renders unlinked projects without an anchor', () => {
    renderProjects([{ ...SHIFUMI, link: undefined }]);

    expect(screen.queryByRole('link', { name: /Shifumi/ })).not.toBeInTheDocument();
    expect(within(grid()).getByText('Shifumi')).toBeInTheDocument();
  });

  it('shows a placeholder when no case study exists', async () => {
    const user = userEvent.setup();
    renderProjects([{ ...PLAYMAKERS, id: 'not-written-yet' }]);

    await user.click(screen.getByRole('button', { name: /PlayMakers/ }));

    expect(within(screen.getByRole('dialog')).getByText(content.caseStudyHeadings.soon))
      .toBeInTheDocument();
  });
});
