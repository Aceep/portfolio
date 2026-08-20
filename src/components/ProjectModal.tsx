import React, { useEffect, useRef } from 'react';
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

  const containerRef = useRef<HTMLDivElement>(null);

  /** Everything inside the dialog that can hold focus, in document order. */
  const focusables = () =>
    Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      ) ?? []
    );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    // Where focus came from, so it can be handed back on close. Without this,
    // dismissing the dialog drops the caret on <body> and a keyboard user
    // restarts from the top of the page.
    const opener = document.activeElement as HTMLElement | null;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      // Confine Tab to the dialog: without this the next stop is the page
      // behind it, which is still scrolled and still interactive.
      const elements = focusables();
      if (elements.length === 0) {
        event.preventDefault();
        return;
      }

      const first = elements[0]!;
      const last = elements[elements.length - 1]!;
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !containerRef.current?.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    // Move focus in, so the first Tab happens inside the dialog rather than
    // behind it.
    focusables()[0]?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      opener?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      {/*
        A real <button> rather than a click handler on the backdrop div: it is
        the same mouse affordance, but it satisfies the a11y tree instead of
        fighting it. Hidden from assistive tech and skipped by Tab, because the
        keyboard path out of the dialog is Escape and the labelled close button
        below — announcing a second, identical "close" control would be noise.
      */}
      <button
        className="modal-backdrop-dismiss"
        onClick={onClose}
        tabIndex={-1}
        aria-hidden="true"
      />
      <div
        className="modal-container"
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={study ? 'modal-title' : undefined}
      >
        <button className="modal-close" onClick={onClose} aria-label={c.ui.closeModalLabel}>
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

            {study.metrics && study.metrics.length > 0 && (
              <dl className="modal-metrics">
                {study.metrics.map((metric) => (
                  <div key={metric.label} className="modal-metric">
                    <dt className="modal-metric-value">{metric.value}</dt>
                    <dd className="modal-metric-label">{metric.label}</dd>
                  </div>
                ))}
              </dl>
            )}

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
