import React from 'react';
import '../styles/components/Cursor.css';
import { useCursorTracker } from '../hooks';

export const Cursor: React.FC = () => {
  const cursorRef = useCursorTracker();

  return <div id="cursor" ref={cursorRef} />;
};
