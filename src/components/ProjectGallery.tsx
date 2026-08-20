import React from 'react';
import '../styles/components/ProjectGallery.css';

interface ProjectGalleryProps {
  preview?: string;
  /**
   * Client work that cannot be shown. Rather than leaving the card with a
   * blank where every neighbour has a screenshot — which reads as unfinished —
   * the confidentiality is stated deliberately.
   */
  confidential?: boolean;
  confidentialLabel?: string;
  confidentialNote?: string;
}

/**
 * Project preview gallery component
 * Displays animated project preview images
 */
export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  preview,
  confidential,
  confidentialLabel,
  confidentialNote,
}) => {
  if (!preview) {
    if (!confidential) return null;

    return (
      <div className="project-gallery project-gallery-confidential">
        <span className="project-confidential-glyph" aria-hidden="true">
          ⬡
        </span>
        <span className="project-confidential-label">{confidentialLabel}</span>
        <span className="project-confidential-note">{confidentialNote}</span>
      </div>
    );
  }

  return (
    <div className="project-gallery">
      {/*
        Decorative: it sits behind a full scrim as a hover backdrop, and the
        project name is already announced by the card's heading.
      */}
      <img
        src={preview}
        alt=""
        className="project-preview-image"
        loading="lazy"
        decoding="async"
        width={1280}
        height={720}
      />
    </div>
  );
};
