import React from 'react';
import { SectionLabel } from './SectionLabel';
import type { ContactLink } from '../types';
import '../styles/components/Contact.css';

interface ContactProps {
  title: string;
  description: string;
  contactLinks: ContactLink[];
  label: string;
}

/**
 * Contact section with call-to-action and contact links
 */
export const Contact: React.FC<ContactProps> = ({
  title,
  description,
  contactLinks,
  label,
}) => {
  return (
    <section id="contact">
      <div className="contact-left">
        <SectionLabel>{label}</SectionLabel>
        <h2 className="contact-title" dangerouslySetInnerHTML={{ __html: title }} />
        <p className="contact-body">{description}</p>
      </div>

      <div className="contact-right">
        {contactLinks.map((link) => (
          <a
            key={link.id}
            className="contact-link"
            href={link.url}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            download={link.id === 'cv' ? true : undefined}
          >
            <span className="cl-text">
              <span className="cl-label">{link.label}</span>
              {link.id === 'email' && (
                <span className="cl-value">{link.url.replace('mailto:', '')}</span>
              )}
            </span>
            <span className="cl-cta">
              <span className="cl-cta-label">{link.cta}</span>
              <span className="cl-arrow" aria-hidden="true">↗</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};
