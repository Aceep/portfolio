import React from 'react';
import { Button } from './Button';
import type { PortfolioContent, UIStrings } from '../types';
import '../styles/components/Hero.css';

interface HeroProps {
  portfolio: PortfolioContent;
  ui: UIStrings;
  /** CV matching the active positioning. */
  cvUrl: string;
}

export const Hero: React.FC<HeroProps> = ({ portfolio, ui, cvUrl }) => {
  const { name, tagline, heroJobTitle, heroValue, yearsExp, availabilityBanner, availabilityDetail } =
    portfolio;
  const [firstName, ...lastNameParts] = name.toUpperCase().split(' ');
  const lastName = lastNameParts.join(' ');

  return (
    <section id="hero" aria-labelledby="hero-heading">
      <div className="hero-left">
        <div className="hero-tag">{tagline}</div>

        <h1 className="hero-name" id="hero-heading">
          <span className="solid">{firstName}</span>
          <span className="outline">{lastName}</span>
          <span className="job-title solid">{heroJobTitle}</span>
        </h1>

        <p className="hero-value">{heroValue}</p>

        <div className="hero-alternance" role="note">
          <span className="hero-alternance-dot" aria-hidden="true" />
          <span className="hero-alternance-text">
            <strong>{availabilityBanner}</strong>
            <span className="hero-alternance-detail">{availabilityDetail}</span>
          </span>
        </div>

        <div className="hero-ctas">
          <Button variant="primary" href="#projects">
            {ui.heroCtaWork}
          </Button>
          <Button variant="secondary" href={cvUrl} download>
            {ui.heroCtaCv}
          </Button>
        </div>

        <div className="hero-meta">{yearsExp}</div>
      </div>

      <div className="hero-right">
        <div className="hero-grid" aria-hidden="true"></div>
        <div className="hero-glow"></div>

        {/* Kyle mascot, usually the LCP element */}
        <img
          src="/Kyle.png"
          alt=""
          className="hero-kyle"
          width={455}
          height={548}
          decoding="async"
          // React 18.2 warns on `fetchPriority`; drop the spread after upgrade.
          {...{ fetchpriority: 'high' }}
        />

        {/* Spinning badge */}
        <div className="hero-badge">
          <svg viewBox="0 0 100 100">
            <defs>
              <path
                id="circle-text"
                d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
              />
            </defs>
            <text
              className="hero-badge-text"
              fontFamily="Space Mono, monospace"
              fontSize="9.5"
              letterSpacing="3"
            >
              <textPath href="#circle-text">{ui.heroBadge}</textPath>
            </text>
          </svg>
        </div>

      </div>
    </section>
  );
};
