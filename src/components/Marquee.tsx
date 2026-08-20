import React from 'react';
import '../styles/components/Marquee.css';

interface MarqueeProps {
  items: string[];
}

export const Marquee: React.FC<MarqueeProps> = ({ items }) => {
  const marqueeText = items.join(' · ');

  return (
    // Text duplicated for a seamless loop; same list is in Skills.
    <div className="marquee-bar" aria-hidden="true">
      <div className="marquee-inner">
        {marqueeText} · {marqueeText} ·
      </div>
    </div>
  );
};
