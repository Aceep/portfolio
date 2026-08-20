import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

const Boom = (): never => {
  throw new Error('content pipeline exploded');
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // React logs the caught error itself; keep the test output readable.
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders its children when nothing throws', () => {
    render(
      <ErrorBoundary>
        <p>the real page</p>
      </ErrorBoundary>
    );

    expect(screen.getByText('the real page')).toBeInTheDocument();
  });

  // Regression: getContent and useLanguage both throw by design, which used to
  // mean a blank white page — the worst outcome for a portfolio.
  it('shows a usable fallback instead of a blank page', () => {
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    );

    expect(screen.getByRole('heading', { name: 'Alycia Gautier' })).toBeInTheDocument();
  });

  it('keeps the two things a visitor came for reachable', () => {
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    );

    expect(screen.getByRole('link', { name: /alycia\.gautier@laposte\.net/ })).toHaveAttribute(
      'href',
      'mailto:alycia.gautier@laposte.net'
    );
    expect(screen.getByRole('link', { name: /CV/ })).toHaveAttribute(
      'href',
      '/GAUTIER_Alycia_CV_Frontend.pdf'
    );
  });

  it('does not depend on the content pipeline it is catching for', () => {
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    );

    // Both languages, statically — the bundle may be what failed.
    expect(screen.getByText(/n’a pas pu s’afficher/)).toBeInTheDocument();
    expect(screen.getByText(/failed to load/)).toBeInTheDocument();
  });
});
