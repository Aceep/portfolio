import React from 'react';
import '../styles/components/ProjectGallery.css';

interface ProjectGalleryProps {
  preview?: string;
  projectName: string;
}

/**
 * Project preview gallery component
 * Displays animated project preview images
 */
export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  preview,
  projectName,
}) => {
  if (!preview) return null;

  return (
    <div className="project-gallery">
      <img
        src={preview}
        alt={`${projectName} preview`}
        className="project-preview-image"
        loading="lazy"
      />
    </div>
  );
};
