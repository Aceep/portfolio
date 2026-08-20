import { beforeEach, describe, expect, it } from 'vitest';
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
    // The provider now honours the browser locale on a first visit, and jsdom
    // reports en-US. These assertions are written against the French bundle,
    // so state the choice explicitly rather than depending on the default.
    localStorage.setItem('portfolio-lang', 'fr');
  });

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

  // Regression: the dialog used to leave focus wherever it was, so Tab walked
  // straight out into the page behind it and closing dropped focus on <body>.
  it('moves focus into the case study, keeps it there, and hands it back', async () => {
    const user = userEvent.setup();
    renderProjects();

    const opener = screen.getByRole('button', { name: /PlayMakers/ });
    await user.click(opener);

    const dialog = screen.getByRole('dialog');
    const close = within(dialog).getByRole('button', { name: content.ui.closeModalLabel });
    expect(close).toHaveFocus();

    // The close button is the only focusable element in the dialog, so Tab in
    // either direction has to come back to it rather than escaping.
    await user.tab();
    expect(dialog).toContainElement(document.activeElement as HTMLElement);

    await user.tab({ shift: true });
    expect(dialog).toContainElement(document.activeElement as HTMLElement);

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });

  it('labels the close control in the active language', async () => {
    const user = userEvent.setup();
    renderProjects();

    await user.click(screen.getByRole('button', { name: /PlayMakers/ }));

    // French bundle: the label used to be hardcoded English.
    expect(content.ui.closeModalLabel).toBe('Fermer la fenêtre');
    expect(
      within(screen.getByRole('dialog')).getByRole('button', { name: 'Fermer la fenêtre' })
    ).toBeInTheDocument();
  });

  it('renders a project with no link as plain content, not a broken link', () => {
    renderProjects([{ ...SHIFUMI, link: undefined }]);

    expect(screen.queryByRole('link', { name: /Shifumi/ })).not.toBeInTheDocument();
    expect(within(grid()).getByText('Shifumi')).toBeInTheDocument();
  });

  it('falls back to a placeholder when a modal project has no case study', async () => {
    const user = userEvent.setup();
    renderProjects([{ ...PLAYMAKERS, id: 'not-written-yet' }]);

    await user.click(screen.getByRole('button', { name: /PlayMakers/ }));

    expect(within(screen.getByRole('dialog')).getByText(content.caseStudyHeadings.soon))
      .toBeInTheDocument();
  });
});
