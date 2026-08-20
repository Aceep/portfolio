import React, { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import '../styles/components/Navigation.css';

/**
 * Navigation component - Fixed header with logo, navigation links and language toggle
 */
export const Navigation: React.FC = () => {
  const { c, lang, toggleLang } = useLanguage();
  const navLinks = c.ui.navLinks;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [activeHash, setActiveHash] = useState<string>('#');

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href).filter((href) => href.startsWith('#'));

    /*
     * Section offsets are measured once and on resize, not on every scroll
     * tick. Reading `offsetTop` inside the scroll handler forced a synchronous
     * layout on each event — five queries plus five reads, per tick.
     */
    let offsets: Array<{ href: string; top: number }> = [];

    const measure = () => {
      offsets = sectionIds
        .map((href) => {
          const section = document.querySelector(href);
          return section instanceof HTMLElement ? { href, top: section.offsetTop } : null;
        })
        .filter((entry): entry is { href: string; top: number } => entry !== null);
    };

    // Reads are batched into a frame so a burst of scroll events costs one
    // update rather than one per event.
    let frame = 0;

    const update = () => {
      frame = 0;
      setIsCompact(window.scrollY > 24);

      const scrollPosition = window.scrollY + 180;
      let currentSection = '#';

      offsets.forEach(({ href, top }) => {
        if (top <= scrollPosition) {
          currentSection = href;
        }
      });

      setActiveHash(currentSection);
    };

    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    const syncHash = () => {
      setActiveHash(window.location.hash || '#');
    };

    syncHash();
    measure();
    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('hashchange', syncHash);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('hashchange', syncHash);
    };
  }, [navLinks]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`site-nav ${isCompact ? 'compact' : ''}`}>
      <a className="nav-logo" href="#hero">
        <img
          src="/Kyle.png"
          alt=""
          className="nav-logo-image"
          width={455}
          height={548}
        />
        <span className="nav-brand">Aceep&Kyle</span>
      </a>

      <button
        className="nav-menu-btn"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label={c.ui.menuToggleLabel}
        aria-expanded={isMenuOpen}
        aria-controls="nav-links"
      >
        {isMenuOpen ? c.ui.menuClose : c.ui.menuOpen}
      </button>

      <ul id="nav-links" className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={activeHash === link.href ? 'active' : ''}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-actions">
        <button
          className="nav-lang-toggle"
          onClick={toggleLang}
          aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
        >
          {c.ui.langToggleLabel}
        </button>

        <div className="nav-available">
          <div className="dot"></div>
          {c.ui.navAvailability}
        </div>
      </div>

      {isMenuOpen && (
        <button className="nav-overlay" aria-label={c.ui.menuCloseLabel} onClick={closeMenu} />
      )}
    </nav>
  );
};
