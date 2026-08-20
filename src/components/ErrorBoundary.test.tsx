import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

const Boom = (): never => {
  throw new Error('content pipeline exploded');
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
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

  it('renders a fallback when a child throws', () => {
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    );

    expect(screen.getByRole('heading', { name: 'Alycia Gautier' })).toBeInTheDocument();
  });

  it('keeps CV and contact links in the fallback', () => {
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

  it('renders without the content bundle', () => {
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    );

    expect(screen.getByText(/n’a pas pu s’afficher/)).toBeInTheDocument();
    expect(screen.getByText(/failed to load/)).toBeInTheDocument();
  });
});
