import React from 'react';
import { Button } from './Button';
import '../styles/components/Hero.css';

interface HeroProps {
  tagline: string;
  name: string;
  yearsExp: string;
}

/**
 * Hero section - Large striking landing area with CTA buttons
 */
export const Hero: React.FC<HeroProps> = ({
  tagline,
  name,
  yearsExp,
}) => {
  const [firstName, ...lastNameParts] = name.toUpperCase().split(' ');
  const lastName = lastNameParts.join(' ');

  return (
    <section id="hero">
      <div className="hero-left">
        <div className="hero-tag">{tagline}</div>

        <h1 className="hero-name">
          <span className="solid">{firstName}</span>
          <span className="outline">{lastName}</span>
          <span className="job-title solid">FRONT-END</span>
        </h1>

        <p className="hero-value">Building cinematic, high-performance interfaces.</p>

        <div className="hero-ctas">
          <Button variant="primary" href="#projects">
            View Featured Work ↗
          </Button>
          <Button variant="secondary" href="/GAUTIER_Alycia_CV.pdf" download="GAUTIER_Alycia_CV.pdf">
            Download CV
          </Button>
        </div>

        <div className="hero-meta">{yearsExp}</div>
      </div>

      <div className="hero-right">
        <div className="hero-grid" aria-hidden="true"></div>
        <div className="hero-glow"></div>

        {/* Kyle mascot */}
        <img src="/Kyle.png" alt="Kyle - Website Mascot" className="hero-kyle" />

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
              fontFamily="Space Mono, monospace"
              fontSize="9.5"
              fill="#444"
              letterSpacing="3"
            >
              <textPath href="#circle-text">
                CREATIVE DEV · OPEN TO WORK ·{' '}
              </textPath>
            </text>
          </svg>
        </div>

      </div>
    </section>
  );
};
