import React, { useState, useRef } from 'react';
import type { Video } from '../types';
import '../styles/components/VideoCarousel.css';

interface VideoCarouselProps {
  videos: Video[];
}

/**
 * Video carousel component
 * Displays videos with hover previews and carousel navigation
 */
export const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos }) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const selectedVideo = videos[selectedVideoIndex];

  const handlePrevious = () => {
    setSelectedVideoIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
    setIsPlaying(false);
  };

  const handleNext = () => {
    setSelectedVideoIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play();
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedVideoIndex(index);
    setIsPlaying(false);
  };

  return (
    <div className="video-carousel">
      {/* Main video player */}
      <div className="video-player">
        <video
          ref={videoRef}
          src={`/videos/${selectedVideo.filename}`}
          className="video-element"
          controlsList="nodownload"
          onEnded={() => setIsPlaying(false)}
        />

        {/* Overlay with play button if not playing */}
        {!isPlaying && (
          <div className="video-overlay" onClick={handlePlay}>
            <button className="play-button" aria-label="Play video">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        )}

        {/* Video info */}
        <div className="video-info-overlay">
          <h3 className="video-title">{selectedVideo.title}</h3>
          {selectedVideo.description && (
            <p className="video-description">{selectedVideo.description}</p>
          )}
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="carousel-controls">
        <button
          className="carousel-arrow prev"
          onClick={handlePrevious}
          aria-label="Previous video"
        >
          ←
        </button>
        <button
          className="carousel-arrow next"
          onClick={handleNext}
          aria-label="Next video"
        >
          →
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="video-thumbnails">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`thumbnail ${index === selectedVideoIndex ? 'active' : ''}`}
            onClick={() => handleThumbnailClick(index)}
          >
            <video
              src={`/videos/${video.filename}`}
              className="thumbnail-video"
              muted
              preload="metadata"
            />
            <div className="thumbnail-overlay">
              <svg className="thumbnail-play" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="thumbnail-label">{video.title}</div>
          </div>
        ))}
      </div>

      {/* Counter */}
      <div className="carousel-counter">
        {selectedVideoIndex + 1} / {videos.length}
      </div>
    </div>
  );
};
