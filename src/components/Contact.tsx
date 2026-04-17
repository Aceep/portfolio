import React from 'react';
import { SectionLabel } from './SectionLabel';
import type { ContactLink } from '../types';
import '../styles/components/Contact.css';

interface ContactProps {
  title: string;
  description: string;
  contactLinks: ContactLink[];
}

/**
 * Contact section with call-to-action and contact links
 */
export const Contact: React.FC<ContactProps> = ({
  title,
  description,
  contactLinks,
}) => {
  return (
    <section id="contact">
      <div className="contact-left">
        <SectionLabel>04 — Contact</SectionLabel>
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
            download={link.id === 'cv' ? 'GAUTIER_Alycia_CV.pdf' : undefined}
          >
            <span className="cl-label">{link.label}</span>
            <span className="cl-arrow">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
};
