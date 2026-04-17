import React from 'react';
import '../styles/components/Footer.css';

interface FooterProps {
  copyright: string;
  buildInfo?: string;
}

/**
 * Footer component
 */
export const Footer: React.FC<FooterProps> = ({
  copyright,
  buildInfo = 'Built with 🦕',
}) => {
  return (
    <footer>
      <div className="footer-copy">{copyright}</div>
      <div className="footer-copy">{buildInfo}</div>
    </footer>
  );
};
