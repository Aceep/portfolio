import React, { useRef } from 'react';
import { SectionLabel } from './SectionLabel';
import type { Skill } from '../types';
import { useIntersectionObserver } from '../hooks';
import { animateSkillBars } from '../utils';
import '../styles/components/Skills.css';

interface SkillsProps {
  skills: Skill[];
}

/**
 * Skills section with animated progress bars
 */
export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver((entry) => {
    if (entry.target) {
      animateSkillBars(entry.target);
    }
  });

  return (
    <section id="skills" ref={sectionRef}>
      <SectionLabel>02 — Skills</SectionLabel>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill.id} className="skill-card">
            <div className="skill-icon-txt">{skill.icon}</div>
            <div className="skill-name">{skill.name}</div>
            <div className="skill-level">
              <div
                className="skill-level-fill"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
            <div className="skill-label">{skill.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
