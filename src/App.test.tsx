import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { LanguageProvider } from './i18n/LanguageContext';
import { getContent } from './constants/content';
import type { Profile } from './types';

const renderApp = (profile: Profile = 'frontend') =>
  render(
    <LanguageProvider profile={profile}>
      <App />
    </LanguageProvider>
  );

describe('App', () => {
  beforeEach(() => {
    localStorage.setItem('portfolio-lang', 'fr');
  });

  it('mounts the whole page without throwing', () => {
    renderApp();

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('exposes a main landmark and a skip link ahead of the nav', () => {
    const { ui } = getContent('fr', 'frontend');
    renderApp();

    const skip = screen.getByRole('link', { name: ui.skipToContent });
    expect(skip).toHaveAttribute('href', '#main');
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main');

    // The skip link has to come first in the DOM to be the first tab stop.
    expect(skip.compareDocumentPosition(screen.getByRole('navigation'))).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });

  it('names every section it renders, so they are navigable as regions', () => {
    const { container } = renderApp();

    const sections = Array.from(container.querySelectorAll('section'));
    expect(sections.length).toBeGreaterThan(0);

    const unnamed = sections
      .filter((section) => !section.getAttribute('aria-labelledby'))
      .map((section) => section.id || '(no id)');
    expect(unnamed).toEqual([]);
  });

  // Regression: Focus, Skills and Projects rendered h3s with no h2 above them,
  // because the section label was a <div>.
  it('starts the heading ladder at h1 and puts an h2 before any h3', () => {
    const { container } = renderApp();

    const levels = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(
      (heading) => Number(heading.tagName[1])
    );

    expect(levels[0]).toBe(1);
    expect(levels.indexOf(2)).toBeLessThan(levels.indexOf(3));
  });

  it('serves the cyber positioning its own bundle', () => {
    const cyber = getContent('fr', 'cyber');
    renderApp('cyber');

    expect(screen.getByText(cyber.ui.navAvailability)).toBeInTheDocument();
  });
});
