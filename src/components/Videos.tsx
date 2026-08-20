import React from 'react';
import { SectionLabel } from './SectionLabel';
import { VideoCarousel } from './VideoCarousel';
import type { Video, UIStrings } from '../types';
import '../styles/components/Videos.css';

interface VideosProps {
  videos: Video[];
  ui: UIStrings;
}

export const Videos: React.FC<VideosProps> = ({ videos, ui }) => {
  return (
    <section id="videos" aria-labelledby="videos-heading">
      <div className="videos-container">
        <SectionLabel>{ui.videosLabel}</SectionLabel>

        <div className="videos-content">
          <div className="videos-header">
            <h2 id="videos-heading">{ui.videosHeading}</h2>
            <p>{ui.videosSubtitle}</p>
          </div>

          <VideoCarousel videos={videos} ui={ui} />
        </div>
      </div>
    </section>
  );
};
