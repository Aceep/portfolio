import React from 'react';
import { SectionLabel } from './SectionLabel';
import type { Experience } from '../types';
import '../styles/components/About.css';

interface AboutProps {
  title: string;
  description: string;
  experience: Experience[];
  label: string;
  journeyLabel: string;
}

export const About: React.FC<AboutProps> = ({
  title,
  description,
  experience,
  label,
  journeyLabel,
}) => {
  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="about-left">
        <SectionLabel>{label}</SectionLabel>
        <h2 className="about-title" id="about-heading">{title}</h2>
        <p className="about-body">{description}</p>
      </div>

      <div className="about-right">
        <SectionLabel as="h3">{journeyLabel}</SectionLabel>
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
