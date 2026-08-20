import React from 'react';
import '../styles/components/ErrorBoundary.css';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Last line of defence around the whole page.
 *
 * `getContent` throws on a project id with no metadata and `useLanguage`
 * throws outside its provider — both deliberate, both loud in development.
 * In production they rendered a blank white page, which is the worst possible
 * outcome for a portfolio: a recruiter sees nothing and leaves.
 *
 * The fallback is bilingual and static on purpose. Whatever failed may well be
 * the content pipeline itself, so it cannot depend on it — and it keeps the
 * two things a visitor actually came for: the email address and the CV.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Unrecoverable render error:', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="error-boundary">
        <p className="error-boundary-kicker">Erreur — Something went wrong</p>
        <h1 className="error-boundary-title">Alycia Gautier</h1>
        <p className="error-boundary-body">
          Cette page n’a pas pu s’afficher. En attendant, voici l’essentiel.
          <br />
          This page failed to load. Here is the essential part in the meantime.
        </p>
        <div className="error-boundary-actions">
          <a className="error-boundary-link" href="mailto:alycia.gautier@laposte.net">
            alycia.gautier@laposte.net
          </a>
          <a className="error-boundary-link" href="/GAUTIER_Alycia_CV_Frontend.pdf">
            CV — Développeuse Front-End
          </a>
          <a
            className="error-boundary-link"
            href="https://www.linkedin.com/in/alycia-gautier/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </main>
    );
  }
}
