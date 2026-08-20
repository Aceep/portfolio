import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navigation } from './Navigation';
import { LanguageProvider } from '../i18n/LanguageContext';
import { getContent } from '../constants/content';

const fr = getContent('fr', 'frontend');
const en = getContent('en', 'frontend');

const renderNav = () =>
  render(
    <LanguageProvider profile="frontend">
      <Navigation />
    </LanguageProvider>
  );

const menuButton = () => screen.getByRole('button', { name: fr.ui.menuToggleLabel });

const [firstNavLink] = fr.ui.navLinks;

describe('Navigation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('labels the menu control in the active language, not in English', () => {
    renderNav();

    // Regression: this label and the button text were hardcoded English, so
    // the French site announced "Toggle navigation menu".
    expect(menuButton()).toBeInTheDocument();
    expect(menuButton()).toHaveTextContent(fr.ui.menuOpen);
  });

  it('reports the menu state through aria-expanded and points at the list it controls', async () => {
    const user = userEvent.setup();
    renderNav();

    expect(menuButton()).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton()).toHaveAttribute('aria-controls', 'nav-links');

    await user.click(menuButton());

    expect(menuButton()).toHaveAttribute('aria-expanded', 'true');
    expect(menuButton()).toHaveTextContent(fr.ui.menuClose);
  });

  it('offers a labelled way back out once the menu is open', async () => {
    const user = userEvent.setup();
    renderNav();

    expect(screen.queryByRole('button', { name: fr.ui.menuCloseLabel })).not.toBeInTheDocument();

    await user.click(menuButton());
    const dismiss = screen.getByRole('button', { name: fr.ui.menuCloseLabel });

    await user.click(dismiss);
    expect(menuButton()).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the menu when a destination is chosen', async () => {
    const user = userEvent.setup();
    renderNav();

    await user.click(menuButton());
    await user.click(screen.getByRole('link', { name: firstNavLink!.label }));

    expect(menuButton()).toHaveAttribute('aria-expanded', 'false');
  });

  it('gives the logo a navigable target', () => {
    renderNav();

    // An empty `href="#"` is not a valid destination; the hero section is.
    const [logo] = screen.getAllByRole('link');
    expect(logo).toHaveAttribute('href', '#hero');
  });

  it('swaps the whole bundle when the language is toggled, and remembers it', async () => {
    const user = userEvent.setup();
    renderNav();

    const nav = screen.getByRole('navigation');
    expect(within(nav).getByText(fr.ui.navAvailability)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Switch to English/i }));

    expect(within(nav).getByText(en.ui.navAvailability)).toBeInTheDocument();
    expect(localStorage.getItem('portfolio-lang')).toBe('en');
  });
});
