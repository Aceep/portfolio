import React from 'react';
import '../styles/components/Cursor.css';
import { useCursorTracker } from '../hooks';

/**
 * Custom mouse cursor component
 * Tracks cursor position and scales on hover over interactive elements
 */
export const Cursor: React.FC = () => {
  const cursorRef = useCursorTracker();

  return <div id="cursor" ref={cursorRef} />;
};
