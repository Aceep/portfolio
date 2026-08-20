import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LanguageProvider, useLanguage } from './LanguageContext';

const Probe = () => {
  const { lang, profile } = useLanguage();
  return <p>{`${lang}/${profile}`}</p>;
};

const withLanguages = (languages: string[]) =>
  vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue(languages);

const renderProbe = () =>
  render(
    <LanguageProvider profile="frontend">
      <Probe />
    </LanguageProvider>
  );

describe('LanguageProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('keeps French for a French browser', () => {
    withLanguages(['fr-FR', 'fr']);
    renderProbe();

    expect(screen.getByText('fr/frontend')).toBeInTheDocument();
  });

  it('greets a non-French browser in English rather than making it hunt for the toggle', () => {
    withLanguages(['en-GB', 'en']);
    renderProbe();

    expect(screen.getByText('en/frontend')).toBeInTheDocument();
  });

  it('lets a stored choice win over the browser locale', () => {
    localStorage.setItem('portfolio-lang', 'fr');
    withLanguages(['en-US']);
    renderProbe();

    expect(screen.getByText('fr/frontend')).toBeInTheDocument();
  });

  it('falls back to French when the browser states no preference', () => {
    withLanguages([]);
    vi.spyOn(window.navigator, 'language', 'get').mockReturnValue('');
    renderProbe();

    expect(screen.getByText('fr/frontend')).toBeInTheDocument();
  });

  it('persists the resolved language', () => {
    withLanguages(['de-DE']);
    renderProbe();

    expect(localStorage.getItem('portfolio-lang')).toBe('en');
  });
});
