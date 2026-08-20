import { describe, expect, it } from 'vitest';
import { getProfileFromPath, PROFILE_PATHS } from './profile';

describe('getProfileFromPath', () => {
  it('returns frontend for /', () => {
    expect(getProfileFromPath('/')).toBe('frontend');
  });

  it('returns cyber for the cyber path', () => {
    expect(getProfileFromPath(PROFILE_PATHS.cyber)).toBe('cyber');
  });

  it.each(['/cyber/', '/cyber//', '/CYBER', '/Cyber/'])(
    'normalises %s to cyber',
    (path) => {
      expect(getProfileFromPath(path)).toBe('cyber');
    }
  );

  it('falls back to frontend for unknown paths', () => {
    expect(getProfileFromPath('/not-a-route')).toBe('frontend');
    expect(getProfileFromPath('/cyberpunk')).toBe('frontend');
  });
});
