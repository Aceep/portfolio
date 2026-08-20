import React from 'react';
import '../styles/components/SectionLabel.css';

interface SectionLabelProps {
  children: React.ReactNode;
  /** `h2` when this label is the section's only heading. */
  as?: 'div' | 'h2' | 'h3';
  id?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ children, as: Tag = 'div', id }) => {
  return (
    <Tag className="section-label" id={id}>
      {children}
    </Tag>
  );
};
