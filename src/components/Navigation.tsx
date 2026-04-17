import React, { useEffect, useState } from 'react';
import '../styles/components/Navigation.css';

interface NavigationProps {
  navLinks?: Array<{ label: string; href: string }>;
  isAvailable?: boolean;
}

/**
 * Navigation component - Fixed header with logo and navigation links
 */
export const Navigation: React.FC<NavigationProps> = ({
  navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Work', href: '#projects' },
    { label: 'Videos', href: '#videos' },
    { label: 'Contact', href: '#contact' },
  ],
  isAvailable = true,
}) => {
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
        <img src="/Kyle.png" alt="Logo" className="nav-logo-image" />
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

      {isAvailable && (
        <div className="nav-available">
          <div className="dot"></div>
          Available for hire
        </div>
      )}

      {isMenuOpen && <button className="nav-overlay" aria-label="Close navigation menu" onClick={closeMenu} />}
    </nav>
  );
};
