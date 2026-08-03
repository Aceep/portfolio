import type { Profile } from '../types';

/**
 * Path → positioning. The front-end pitch is the default landing experience;
 * the cybersecurity pitch lives on its own path.
 *
 * Vercel rewrites every path to index.html (see vercel.json), so this runs for
 * direct hits and refreshes on /cyber, not just client-side navigation.
 */
export const PROFILE_PATHS: Record<Profile, string> = {
  frontend: '/',
  cyber: '/cyber',
};

/**
 * Resolve the positioning to serve for a given pathname.
 * Anything unrecognised falls back to the front-end version.
 */
export const getProfileFromPath = (pathname: string): Profile => {
  const normalized = pathname.replace(/\/+$/, '').toLowerCase();
  return normalized === PROFILE_PATHS.cyber ? 'cyber' : 'frontend';
};

/** Positioning for the current browser location. */
export const getCurrentProfile = (): Profile => {
  if (typeof window === 'undefined') return 'frontend';
  return getProfileFromPath(window.location.pathname);
};
