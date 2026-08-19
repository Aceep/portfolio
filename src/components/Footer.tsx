import React from 'react';
import '../styles/components/Footer.css';

interface FooterProps {
  copyright: string;
  /** Discreet link to the other positioning of the site. */
  otherProfileLabel: string;
  otherProfileHref: string;
}

/**
 * Footer component
 */
export const Footer: React.FC<FooterProps> = ({
  copyright,
  otherProfileLabel,
  otherProfileHref,
}) => {
  return (
    <footer>
      <div className="footer-copy">{copyright}</div>
      <a className="footer-profile-link" href={otherProfileHref}>
        {otherProfileLabel}
        <span aria-hidden="true"> ↗</span>
      </a>
    </footer>
  );
};
