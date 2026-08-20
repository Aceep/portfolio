import React from 'react';
import { SectionLabel } from './SectionLabel';
import type { Skill, SkillGroup, UIStrings } from '../types';
import '../styles/components/Skills.css';

interface SkillsProps {
  skills: Skill[];
  /** Bands to render, in order — declared per positioning. */
  groups: SkillGroup[];
  ui: UIStrings;
}

/**
 * Skills section, split into the bands the active positioning declares
 * (front-end / tooling, or cyber / dev foundation).
 *
 * Each card states what backs the skill rather than a percentage: the bars
 * that used to live here were self-assigned, unfalsifiable, and had no
 * accessible value to expose.
 */
export const Skills: React.FC<SkillsProps> = ({ skills, groups, ui }) => {
  return (
    <section id="skills" aria-labelledby="skills-heading">
      <SectionLabel as="h2" id="skills-heading">{ui.skillsLabel}</SectionLabel>

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
