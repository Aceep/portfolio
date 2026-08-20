import React from 'react';
import '../styles/components/ProjectGallery.css';

interface ProjectGalleryProps {
  preview?: string;
}

/**
 * Project preview gallery component
 * Displays animated project preview images
 */
export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ preview }) => {
  if (!preview) return null;

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
