import React, { useRef, useState } from 'react';
import { SectionLabel } from './SectionLabel';
import { Tag } from './Tag';
import { ProjectGallery } from './ProjectGallery';
import { ProjectModal } from './ProjectModal';
import type { Project, UIStrings } from '../types';
import '../styles/components/Projects.css';

type FilterKey = 'all' | 'personal' | 'school' | 'professional';

interface ProjectsProps {
  projects: Project[];
  ui: UIStrings;
}

/**
 * Projects grid showcasing portfolio work
 * Can be filtered by category (personal, school, professional)
 */
export const Projects: React.FC<ProjectsProps> = ({ projects, ui }) => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [selectedModalProject, setSelectedModalProject] = useState<string | null>(null);
  const filterButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const filterOptions: Array<{ key: FilterKey; label: string; count: number }> = [
    { key: 'all', label: ui.filterAll, count: projects.length },
    { key: 'professional', label: ui.filterProfessional, count: projects.filter((p) => p.category === 'professional').length },
    { key: 'personal', label: ui.filterPersonal, count: projects.filter((p) => p.category === 'personal').length },
    { key: 'school', label: ui.filterTechnical, count: projects.filter((p) => p.category === 'school').length },
  ];

  const getCategoryLabel = (category?: Project['category']) => {
    switch (category) {
      case 'professional':
        return ui.categoryStudio;
      case 'personal':
        return ui.categoryPersonal;
      case 'school':
        return ui.categoryLab;
      default:
        return ui.categoryFeature;
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

  /**
   * Inner card body, shared by the modal (button) and external-link (anchor)
   * variants so the call to action only has to be described once.
   */
  const renderCardBody = (project: Project, ctaLabel: string | null) => (
    <>
      <ProjectGallery preview={project.preview} projectName={project.name} />
      <div className="project-content">
        <div className="project-cover-header">
          <div className="project-num">{ui.projectsIssueLabel} {project.number}</div>
          <div className="project-category">{getCategoryLabel(project.category)}</div>
        </div>
        <h3 className="project-name">{project.name}</h3>
        <p className="project-desc">{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        {ctaLabel && (
          <div className="project-cta">
            <span className="project-cta-label">{ctaLabel}</span>
            <span className="project-cta-arrow" aria-hidden="true">↗</span>
          </div>
        )}
      </div>
      <div className="project-accent"></div>
    </>
  );

  return (
    <>
      <section id="projects" className="projects-section">
        <SectionLabel>{ui.projectsLabel}</SectionLabel>

        <div className="projects-header">
          <p className="projects-kicker">{ui.projectsKicker}</p>
          <div className="projects-summary-row">
            <p className="projects-summary">{ui.projectsSummary}</p>
            <p className="projects-live-count" aria-live="polite">
              {filteredProjects.length} {ui.projectsShown}
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
          {filteredProjects.length === 0 && (
            <p className="projects-empty">{ui.projectsEmpty}</p>
          )}

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
                    {renderCardBody(project, ui.projectCtaDetails)}
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
                  {renderCardBody(project, project.link ? ui.projectCta : null)}
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
