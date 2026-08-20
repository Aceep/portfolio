import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';

// Vitest globals are off, so cleanup is not auto-registered.
afterEach(cleanup);

// jsdom has no IntersectionObserver; this stub records observed targets.
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

// matchMedia stub is reinstalled before each test because restoreMocks wipes it.
const stubMatchMedia = () =>
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

stubMatchMedia();
beforeEach(stubMatchMedia);

export { MockIntersectionObserver };
