import React from 'react';
import '../styles/components/Tag.css';

interface TagProps {
  children: string;
}

export const Tag: React.FC<TagProps> = ({ children }) => {
  return <span className="tag">{children}</span>;
};
