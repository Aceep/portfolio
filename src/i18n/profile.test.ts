import { describe, expect, it } from 'vitest';
import { getProfileFromPath, PROFILE_PATHS } from './profile';

describe('getProfileFromPath', () => {
  it('serves the front-end positioning at the root', () => {
    expect(getProfileFromPath('/')).toBe('frontend');
  });

  it('serves the cyber positioning at its own path', () => {
    expect(getProfileFromPath(PROFILE_PATHS.cyber)).toBe('cyber');
  });

  it.each(['/cyber/', '/cyber//', '/CYBER', '/Cyber/'])(
    'tolerates %s, since a shared link can carry any casing or trailing slash',
    (path) => {
      expect(getProfileFromPath(path)).toBe('cyber');
    }
  );

  it('falls back to front-end for anything unrecognised', () => {
    expect(getProfileFromPath('/not-a-route')).toBe('frontend');
    expect(getProfileFromPath('/cyberpunk')).toBe('frontend');
  });
});
