import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Testing Library only auto-registers this when Vitest globals are on, and
// they are off here so tests import what they use.
afterEach(cleanup);

/**
 * jsdom implements neither of the observers the site relies on, so the
 * components under test would throw before rendering. These stand-ins record
 * what was observed, which is exactly what the Skills test needs to assert.
 */
class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];

  static instances: MockIntersectionObserver[] = [];
  observed: Element[] = [];

  constructor(private readonly callback: IntersectionObserverCallback) {
    MockIntersectionObserver.instances.push(this);
  }

  observe = (target: Element) => {
    this.observed.push(target);
  };
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = () => [];

  /** Pretend everything currently observed just scrolled into view. */
  trigger() {
    this.callback(
      this.observed.map((target) => ({ target, isIntersecting: true }) as IntersectionObserverEntry),
      this
    );
  }
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

// The custom cursor asks about pointer capabilities on mount.
vi.stubGlobal(
  'matchMedia',
  vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
);

export { MockIntersectionObserver };
