import React, { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import '../styles/components/ProjectModal.css';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

/**
 * Case-study modal for projects flagged `modal: true`.
 * Content comes from the language bundle (see `CASE_STUDIES` in
 * `src/constants/content.ts`); this component only renders it.
 */
export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, projectId }) => {
  const { c } = useLanguage();
  const headings = c.caseStudyHeadings;
  const study = c.caseStudies[projectId];

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

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div
        className="modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby={study ? 'modal-title' : undefined}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {!study ? (
          <div className="modal-content">{headings.soon}</div>
        ) : (
          <div className="modal-content">
            <p className="modal-kicker">{study.kicker}</p>
            <h2 className="modal-title" id="modal-title">
              {study.title}
            </h2>

            <div className="modal-meta-row">
              <span className="modal-meta-pill">{study.role}</span>
              <span className="modal-meta-pill">{study.duration}</span>
            </div>

            <div className="modal-section">
              <h3>{headings.context}</h3>
              <p>{study.context}</p>
            </div>

            <div className="modal-section">
              <h3>{headings.challenge}</h3>
              <p>{study.challenge}</p>
            </div>

            <div className="modal-section">
              <h3>{headings.approach}</h3>
              <ul className="modal-list">
                {study.approach.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="modal-section">
              <h3>{headings.results}</h3>
              <ul className="modal-list">
                {study.results.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="modal-section">
              <h3>{headings.stack}</h3>
              <div className="modal-tech-stack">
                {study.stack.map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
