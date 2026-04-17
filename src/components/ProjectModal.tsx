import React, { useEffect } from 'react';
import '../styles/components/ProjectModal.css';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

/**
 * Project modal component - displays detailed project information
 */
export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, projectId }) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const caseStudies: Record<string, {
    title: string;
    kicker: string;
    role: string;
    duration: string;
    context: string;
    challenge: string;
    approach: string[];
    results: string[];
    stack: string[];
  }> = {
    'playmakers-professional': {
      title: 'PlayMakers Platform',
      kicker: 'Mini Case Study',
      role: 'Front-End Developer',
      duration: '09/2024 — 08/2025',
      context: 'Production sports platform used by active customers across mobile and desktop experiences.',
      challenge: 'Ship new UI features quickly while preserving visual consistency and preventing regressions in a growing component library.',
      approach: [
        'Built and maintained reusable React + TypeScript UI patterns for feature teams.',
        'Translated Figma specifications into responsive components with Tailwind utility architecture.',
        'Introduced and maintained Jest coverage for critical user flows and shared UI elements.',
      ],
      results: [
        'Improved delivery cadence for UI iterations through reusable component patterns.',
        'Reduced UI regressions with test coverage across key interaction paths.',
        'Maintained stable production quality during continuous feature rollout.',
      ],
      stack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Jest', 'Figma', 'Git'],
    },
    'davidson-consulting': {
      title: 'Davidson Consulting ERP',
      kicker: 'Mini Case Study',
      role: 'Front-End Developer',
      duration: '09/2025 — 09/2026',
      context: 'ERP interface modernization project focused on internal workflows and data-heavy screens.',
      challenge: 'Upgrade UX quality and consistency on complex dashboard views while working with legacy Vue2 constraints.',
      approach: [
        'Implemented modular Vue2 + TypeScript components for high-density business screens.',
        'Optimized rendering and style architecture for smoother interactions on large datasets.',
        'Aligned implementation details closely with Figma design specs for pixel precision.',
      ],
      results: [
        'Delivered cleaner, more maintainable UI modules for core ERP pages.',
        'Improved perceived performance and interaction clarity on key workflows.',
        'Reduced back-and-forth with design through tighter frontend specification matching.',
      ],
      stack: ['Vue2', 'TypeScript', 'CSS', 'Figma', 'Git'],
    },
  };

  const renderContent = () => {
    const study = caseStudies[projectId];

    if (!study) {
      return <div className="modal-content">Project details coming soon.</div>;
    }

    return (
      <div className="modal-content">
        <p className="modal-kicker">{study.kicker}</p>
        <h2 className="modal-title">{study.title}</h2>

        <div className="modal-meta-row">
          <span className="modal-meta-pill">{study.role}</span>
          <span className="modal-meta-pill">{study.duration}</span>
        </div>

        <div className="modal-section">
          <h3>Context</h3>
          <p>{study.context}</p>
        </div>

        <div className="modal-section">
          <h3>Challenge</h3>
          <p>{study.challenge}</p>
        </div>

        <div className="modal-section">
          <h3>Approach</h3>
          <ul className="modal-list">
            {study.approach.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="modal-section">
          <h3>Results</h3>
          <ul className="modal-list">
            {study.results.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="modal-section">
          <h3>Stack</h3>
          <div className="modal-tech-stack">
            {study.stack.map((tech) => (
              <span key={tech} className="tech-badge">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>
        {renderContent()}
      </div>
    </div>
  );
};
