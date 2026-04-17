import React from 'react';
import { SectionLabel } from './SectionLabel';
import { VideoCarousel } from './VideoCarousel';
import type { Video } from '../types';
import '../styles/components/Videos.css';

interface VideosProps {
  videos: Video[];
}

/**
 * Videos section - Adobe Premiere portfolio
 */
export const Videos: React.FC<VideosProps> = ({ videos }) => {
  return (
    <section id="videos">
      <div className="videos-container">
        <SectionLabel>06 — Videos</SectionLabel>

        <div className="videos-content">
          <div className="videos-header">
            <h2>Selected Video Work</h2>
            <p>
              A selection of edits focused on rhythm, framing, and emotion. Each piece explores
              pacing, narrative continuity, and visual tone.
            </p>
          </div>

          <VideoCarousel videos={videos} />
        </div>
      </div>
    </section>
  );
};
