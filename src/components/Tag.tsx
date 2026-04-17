import React from 'react';
import '../styles/components/Tag.css';

interface TagProps {
  children: string;
  variant?: 'default';
}

/**
 * Reusable tag/badge component
 */
export const Tag: React.FC<TagProps> = ({ children, variant = 'default' }) => {
  return <span className={`tag tag-${variant}`}>{children}</span>;
};
