import React, { useState, useRef } from 'react';
import type { Video } from '../types';
import '../styles/components/VideoCarousel.css';

interface VideoCarouselProps {
  videos: Video[];
}

/**
 * Short-film carousel.
 *
 * Only the selected clip is ever mounted as a <video>, and nothing is fetched
 * until the visitor presses play (`preload="none"`): the source files are the
 * heaviest assets on the page, so the thumbnail strip uses poster images
 * rather than a second set of media elements.
 */
export const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos }) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const selectedVideo = videos[selectedVideoIndex];

  const select = (index: number) => {
    setSelectedVideoIndex(index);
    setIsPlaying(false);
  };

  const handlePrevious = () => select(selectedVideoIndex === 0 ? videos.length - 1 : selectedVideoIndex - 1);
  const handleNext = () => select(selectedVideoIndex === videos.length - 1 ? 0 : selectedVideoIndex + 1);

  const handlePlay = () => {
    void videoRef.current?.play();
  };

  return (
    <div className="video-carousel">
      <div className="video-player">
        <video
          ref={videoRef}
          key={selectedVideo.id}
          src={`/videos/${selectedVideo.filename}`}
          poster={selectedVideo.poster}
          className="video-element"
          preload="none"
          controls={isPlaying}
          controlsList="nodownload"
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Poster overlay — also the only thing standing between the visitor
            and a multi-megabyte download, so it stays until they opt in. */}
        {!isPlaying && (
          <button className="video-overlay" onClick={handlePlay} aria-label={`Play ${selectedVideo.title}`}>
            <span className="play-button" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}

        <div className="video-info-overlay">
          <h3 className="video-title">{selectedVideo.title}</h3>
          {selectedVideo.description && (
            <p className="video-description">{selectedVideo.description}</p>
          )}
        </div>
      </div>

      <div className="carousel-controls">
        <button className="carousel-arrow prev" onClick={handlePrevious} aria-label="Previous video">
          ←
        </button>
        <button className="carousel-arrow next" onClick={handleNext} aria-label="Next video">
          →
        </button>
      </div>

      <div className="video-thumbnails">
        {videos.map((video, index) => (
          <button
            key={video.id}
            type="button"
            className={`thumbnail ${index === selectedVideoIndex ? 'active' : ''}`}
            onClick={() => select(index)}
            aria-current={index === selectedVideoIndex}
          >
            {video.poster ? (
              <img src={video.poster} alt="" className="thumbnail-media" loading="lazy" decoding="async" />
            ) : (
              <video src={`/videos/${video.filename}`} className="thumbnail-media" muted preload="metadata" />
            )}
            <span className="thumbnail-overlay">
              <svg className="thumbnail-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="thumbnail-label">{video.title}</span>
          </button>
        ))}
      </div>

      <div className="carousel-counter">
        {selectedVideoIndex + 1} / {videos.length}
      </div>
    </div>
  );
};
