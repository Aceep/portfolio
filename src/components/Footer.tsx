import React from 'react';
import '../styles/components/Footer.css';

interface FooterProps {
  copyright: string;
  /** Discreet link to the other positioning. Absent on the front-end pitch. */
  otherProfileLabel?: string;
  otherProfileHref?: string;
}

export const Footer: React.FC<FooterProps> = ({
  copyright,
  otherProfileLabel,
  otherProfileHref,
}) => {
  return (
    <footer>
      <div className="footer-copy">{copyright}</div>
      {otherProfileLabel && otherProfileHref && (
        <a className="footer-profile-link" href={otherProfileHref}>
          {otherProfileLabel}
          <span aria-hidden="true"> ↗</span>
        </a>
      )}
    </footer>
  );
};
