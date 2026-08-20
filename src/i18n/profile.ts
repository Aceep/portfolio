import type { Profile } from '../types';

// vercel.json rewrites every path to index.html, so this also runs on refresh.
export const PROFILE_PATHS: Record<Profile, string> = {
  frontend: '/',
  cyber: '/cyber',
};

// Unrecognised paths fall back to frontend.
export const getProfileFromPath = (pathname: string): Profile => {
  const normalized = pathname.replace(/\/+$/, '').toLowerCase();
  return normalized === PROFILE_PATHS.cyber ? 'cyber' : 'frontend';
};

/** Positioning for the current browser location. */
export const getCurrentProfile = (): Profile => {
  if (typeof window === 'undefined') return 'frontend';
  return getProfileFromPath(window.location.pathname);
};
