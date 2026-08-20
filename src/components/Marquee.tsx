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
    // Decorative: the text is duplicated to make the loop seamless, and the
    // same technologies are listed accessibly in the Skills section.
    <div className="marquee-bar" aria-hidden="true">
      <div className="marquee-inner">
        {marqueeText} · {marqueeText} ·
      </div>
    </div>
  );
};
