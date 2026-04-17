import React from 'react';
import '../styles/components/Marquee.css';

interface MarqueeProps {
  items: string[];
}

/**
 * Animated marquee scrolling text component
 */
export const Marquee: React.FC<MarqueeProps> = ({ items }) => {
  const marqueeText = items.join(' · ');

  return (
    <div className="marquee-bar">
      <div className="marquee-inner">
        {marqueeText} · {marqueeText} ·
      </div>
    </div>
  );
};
