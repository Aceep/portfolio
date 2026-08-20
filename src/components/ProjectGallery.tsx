import React from 'react';
import '../styles/components/ProjectGallery.css';

interface ProjectGalleryProps {
  preview?: string;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ preview }) => {
  if (!preview) return null;

  return (
    <div className="project-gallery">
      {/* Decorative; the card heading already names the project. */}
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
