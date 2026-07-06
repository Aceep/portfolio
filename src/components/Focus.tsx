import React from 'react';
import { SectionLabel } from './SectionLabel';
import type { FocusPillar } from '../types';
import '../styles/components/Focus.css';

interface FocusProps {
  pillars: FocusPillar[];
  label: string;
}

/**
 * Security focus strip — sits below the hero and reinforces the dev → cyber
 * positioning with three competency pillars (replaces the old featured reel).
 */
export const Focus: React.FC<FocusProps> = ({ pillars, label }) => {
  return (
    <section id="focus" className="focus-section">
      <SectionLabel>{label}</SectionLabel>

      <div className="focus-grid">
        {pillars.map((pillar, index) => (
          <article
            key={pillar.id}
            className="focus-card"
            style={{ ['--card-index' as string]: index } as React.CSSProperties}
          >
            <div className="focus-icon" aria-hidden="true">{pillar.icon}</div>
            <h3 className="focus-title">{pillar.title}</h3>
            <p className="focus-desc">{pillar.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
