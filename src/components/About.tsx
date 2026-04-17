import React from 'react';
import { SectionLabel } from './SectionLabel';
import type { Experience } from '../types';
import '../styles/components/About.css';

interface AboutProps {
  title: string;
  description: string;
  experience: Experience[];
}

/**
 * About section displaying bio and work experience
 */
export const About: React.FC<AboutProps> = ({
  title,
  description,
  experience,
}) => {
  return (
    <section id="about">
      <div className="about-left">
        <SectionLabel>01 — About</SectionLabel>
        <h2 className="about-title" dangerouslySetInnerHTML={{ __html: title }} />
        <p className="about-body">{description}</p>
      </div>

      <div className="about-right">
        <SectionLabel>Experience</SectionLabel>
        {experience.map((exp) => (
          <div key={exp.id} className="exp-item">
            <div className="exp-year">{exp.year}</div>
            <div>
              <div className="exp-name">{exp.company}</div>
              <div className="exp-role">{exp.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
