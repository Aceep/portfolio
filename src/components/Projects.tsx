import React, { useRef, useState } from 'react';
import { SectionLabel } from './SectionLabel';
import { Tag } from './Tag';
import { ProjectGallery } from './ProjectGallery';
import { ProjectModal } from './ProjectModal';
import type { Project } from '../types';
import '../styles/components/Projects.css';

type FilterKey = 'all' | 'personal' | 'school' | 'professional';

interface ProjectsProps {
  projects: Project[];
  title?: string;
  sectionNumber?: string;
}

/**
 * Projects grid showcasing portfolio work
 * Can be filtered by category (personal, school, professional)
 */
export const Projects: React.FC<ProjectsProps> = ({
  projects,
  title,
  sectionNumber,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [selectedModalProject, setSelectedModalProject] = useState<string | null>(null);
  const filterButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const filterOptions: Array<{ key: FilterKey; label: string; count: number }> = [
    { key: 'all', label: 'All', count: projects.length },
    { key: 'professional', label: 'Professional', count: projects.filter((p) => p.category === 'professional').length },
    { key: 'personal', label: 'Personal', count: projects.filter((p) => p.category === 'personal').length },
    { key: 'school', label: 'Technical', count: projects.filter((p) => p.category === 'school').length },
  ];

  const getCategoryTitle = (): string => {
    if (title) return title;

    return 'Selected Work';
  };

  const getSectionNumber = (): string => {
    if (sectionNumber) return sectionNumber;

    return '03';
  };

  const getCategoryLabel = (category?: Project['category']) => {
    switch (category) {
      case 'professional':
        return 'Studio';
      case 'personal':
        return 'Personal';
      case 'school':
        return 'Lab';
      default:
        return 'Feature';
    }
  };

  const handleFilterKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    const { key } = event;

    if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(key)) {
      return;
    }

    event.preventDefault();

    let nextIndex = currentIndex;

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % filterOptions.length;
    }

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + filterOptions.length) % filterOptions.length;
    }

    if (key === 'Home') {
      nextIndex = 0;
    }

    if (key === 'End') {
      nextIndex = filterOptions.length - 1;
    }

    const nextFilter = filterOptions[nextIndex];
    setActiveFilter(nextFilter.key);
    filterButtonRefs.current[nextIndex]?.focus();
  };

  if (filteredProjects.length === 0) {
    return null;
  }

  return (
    <>
      <section id="projects" className="projects-section">
        <SectionLabel>
          {getSectionNumber()} — {getCategoryTitle()}
        </SectionLabel>

        <div className="projects-header">
          <p className="projects-kicker">Curated selection</p>
          <div className="projects-summary-row">
            <p className="projects-summary">
              A mix of product builds, visual experiments, and technical explorations.
            </p>
            <p className="projects-live-count" aria-live="polite">
              {filteredProjects.length} project{filteredProjects.length > 1 ? 's' : ''} shown
            </p>
          </div>
        </div>

        <div className="projects-filters" role="tablist" aria-label="Project category filters">
          {filterOptions.map((filter, index) => (
            <button
              key={filter.key}
              className={`project-filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.key)}
              onKeyDown={(event) => handleFilterKeyDown(event, index)}
              role="tab"
              id={`projects-filter-${filter.key}`}
              aria-controls="projects-grid-panel"
              aria-selected={activeFilter === filter.key}
              tabIndex={activeFilter === filter.key ? 0 : -1}
              ref={(element) => {
                filterButtonRefs.current[index] = element;
              }}
            >
              {filter.label}
              <span className="project-filter-count">{filter.count}</span>
            </button>
          ))}
        </div>

        <div key={activeFilter} className="projects-grid" id="projects-grid-panel" role="tabpanel" aria-live="polite">
          {filteredProjects.map((project, index) => {
            if (project.modal) {
              return (
                <button
                  key={project.id}
                  className="project-card-button"
                  onClick={() => setSelectedModalProject(project.id)}
                  style={{ ['--cover-index' as string]: index } as React.CSSProperties}
                >
                  <div className="project-card">
                    <ProjectGallery preview={project.preview} projectName={project.name} />
                    <div className="project-content">
                      <div className="project-cover-header">
                        <div className="project-num">Issue {project.number}</div>
                        <div className="project-category">{getCategoryLabel(project.category)}</div>
                      </div>
                      <div className="project-arrow">↗</div>
                      <h3 className="project-name">{project.name.split('\n').join('\n')}</h3>
                      <p className="project-desc">{project.description}</p>
                      <div className="project-tags">
                        {project.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                    </div>
                    <div className="project-accent"></div>
                  </div>
                </button>
              );
            }

            return (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-link"
                style={{ pointerEvents: project.link ? 'auto' : 'none' }}
              >
                <div className="project-card" style={{ ['--cover-index' as string]: index } as React.CSSProperties}>
                  <ProjectGallery preview={project.preview} projectName={project.name} />
                  <div className="project-content">
                    <div className="project-cover-header">
                      <div className="project-num">Issue {project.number}</div>
                      <div className="project-category">{getCategoryLabel(project.category)}</div>
                    </div>
                    <div className="project-arrow">↗</div>
                    <h3 className="project-name">{project.name.split('\n').join('\n')}</h3>
                    <p className="project-desc">{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </div>
                  <div className="project-accent"></div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <ProjectModal
        isOpen={selectedModalProject !== null}
        onClose={() => setSelectedModalProject(null)}
        projectId={selectedModalProject || ''}
      />
    </>
  );
};
