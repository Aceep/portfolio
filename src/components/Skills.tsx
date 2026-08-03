import React, { useRef } from 'react';
import { SectionLabel } from './SectionLabel';
import type { Skill, SkillGroup, UIStrings } from '../types';
import { useIntersectionObserver } from '../hooks';
import { animateSkillBars } from '../utils';
import '../styles/components/Skills.css';

interface SkillsProps {
  skills: Skill[];
  /** Bands to render, in order — declared per positioning. */
  groups: SkillGroup[];
  ui: UIStrings;
}

/**
 * Skills section with animated progress bars, split into the bands the active
 * positioning declares (front-end / tooling, or cyber / dev foundation).
 */
export const Skills: React.FC<SkillsProps> = ({ skills, groups, ui }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useIntersectionObserver((entry) => {
    if (entry.target) {
      animateSkillBars(entry.target);
    }
  });

  return (
    <section id="skills" ref={sectionRef}>
      <SectionLabel>{ui.skillsLabel}</SectionLabel>

      {groups.map((group) => {
        const groupSkills = skills.filter((skill) => skill.group === group.key);
        if (groupSkills.length === 0) return null;

        return (
          <div key={group.key} className="skills-group">
            <h3 className="skills-group-heading">{group.heading}</h3>
            <div className="skills-grid">
              {groupSkills.map((skill) => (
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
          </div>
        );
      })}
    </section>
  );
};
