import React from 'react';
import '../styles/components/SectionLabel.css';

interface SectionLabelProps {
  children: React.ReactNode;
  /**
   * Element to render. Sections whose only visible title is this label —
   * Focus, Skills, Projects — pass `h2`, which both repairs the heading ladder
   * (the page otherwise jumped h1 → h3) and gives the surrounding `<section>`
   * something to be named by. Sections that already own a display heading keep
   * the default `div`, so they do not end up with two competing h2s.
   */
  as?: 'div' | 'h2' | 'h3';
  id?: string;
}

/**
 * Reusable section label with decorative line
 */
export const SectionLabel: React.FC<SectionLabelProps> = ({ children, as: Tag = 'div', id }) => {
  return (
    <Tag className="section-label" id={id}>
      {children}
    </Tag>
  );
};
