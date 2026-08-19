import React from 'react';
import '../styles/components/Tag.css';

interface TagProps {
  children: string;
}

/**
 * Reusable tag/badge component
 */
export const Tag: React.FC<TagProps> = ({ children }) => {
  return <span className="tag">{children}</span>;
};
