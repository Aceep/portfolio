import React from 'react';
import { SectionLabel } from './SectionLabel';
import type { Project } from '../types';
import '../styles/components/FeaturedReel.css';

interface FeaturedReelProps {
  projects: Project[];
}

/**
 * Featured reel section presenting selected projects in a cinematic strip
 */
export const FeaturedReel: React.FC<FeaturedReelProps> = ({ projects }) => {
  const featuredProjects = projects.slice(0, 3);

  return (
    <section id="featured-reel" className="featured-reel-section">
      <SectionLabel>Now Showing</SectionLabel>

      <div className="featured-reel-grid">
        {featuredProjects.map((project, index) => {
          const categoryLabel = project.category ? project.category.toUpperCase() : 'FEATURED';

          return (
            <article
              key={project.id}
              className="featured-card"
              style={{ ['--card-index' as string]: index } as React.CSSProperties}
            >
              {project.preview ? (
                <img
                  src={project.preview}
                  alt={`${project.name.replace('\n', ' ')} preview`}
                  className="featured-image"
                  loading="lazy"
                />
              ) : (
                <div className="featured-image featured-image-fallback" aria-hidden="true" />
              )}

              <div className="featured-overlay" />

              <div className="featured-content">
                <p className="featured-meta">Issue {project.number} · {categoryLabel}</p>
                <h3>{project.name.replace('\n', ' ')}</h3>
                <p>{project.description}</p>
                <a href="#projects" className="featured-link">Explore project ↗</a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
