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

    const updateStateOnScroll = () => {
      setIsCompact(window.scrollY > 24);

      const scrollPosition = window.scrollY + 180;
      let currentSection = '#';

      sectionIds.forEach((id) => {
        const section = document.querySelector(id);
        if (section && section instanceof HTMLElement && section.offsetTop <= scrollPosition) {
          currentSection = id;
        }
      });

      setActiveHash(currentSection);
    };

    const syncHash = () => {
      setActiveHash(window.location.hash || '#');
    };

    syncHash();
    updateStateOnScroll();

    window.addEventListener('scroll', updateStateOnScroll, { passive: true });
    window.addEventListener('hashchange', syncHash);

    return () => {
      window.removeEventListener('scroll', updateStateOnScroll);
      window.removeEventListener('hashchange', syncHash);
    };
  }, [navLinks]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`site-nav ${isCompact ? 'compact' : ''}`}>
      <a className="nav-logo" href="#">
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
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? 'Close' : 'Menu'}
      </button>

      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
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

      {isMenuOpen && <button className="nav-overlay" aria-label="Close navigation menu" onClick={closeMenu} />}
    </nav>
  );
};
