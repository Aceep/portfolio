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

  it('renders the page', () => {
    renderApp();

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders a skip link before the nav', () => {
    const { ui } = getContent('fr', 'frontend');
    renderApp();

    const skip = screen.getByRole('link', { name: ui.skipToContent });
    expect(skip).toHaveAttribute('href', '#main');
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main');

    expect(skip.compareDocumentPosition(screen.getByRole('navigation'))).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });

  it('labels every section with aria-labelledby', () => {
    const { container } = renderApp();

    const sections = Array.from(container.querySelectorAll('section'));
    expect(sections.length).toBeGreaterThan(0);

    const unnamed = sections
      .filter((section) => !section.getAttribute('aria-labelledby'))
      .map((section) => section.id || '(no id)');
    expect(unnamed).toEqual([]);
  });

  it('has an h1 first and an h2 before any h3', () => {
    const { container } = renderApp();

    const levels = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(
      (heading) => Number(heading.tagName[1])
    );

    expect(levels[0]).toBe(1);
    expect(levels.indexOf(2)).toBeLessThan(levels.indexOf(3));
  });

  it('renders the cyber content bundle', () => {
    const cyber = getContent('fr', 'cyber');
    renderApp('cyber');

    expect(screen.getByText(cyber.ui.navAvailability)).toBeInTheDocument();
  });
});
