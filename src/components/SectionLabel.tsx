import React from 'react';
import '../styles/components/SectionLabel.css';

interface SectionLabelProps {
  children: React.ReactNode;
}

/**
 * Reusable section label with decorative line
 */
export const SectionLabel: React.FC<SectionLabelProps> = ({ children }) => {
  return <div className="section-label">{children}</div>;
};
