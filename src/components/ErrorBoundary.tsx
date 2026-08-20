import React from 'react';
import '../styles/components/ErrorBoundary.css';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Fallback is static: the content pipeline may be what threw.
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
