import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders the cross-link when the positioning declares one', () => {
    render(
      <Footer
        copyright="© 2026 — Alycia Gautier"
        otherProfileLabel="Voir la version front-end"
        otherProfileHref="/"
      />
    );

    expect(screen.getByRole('link', { name: /Voir la version front-end/ })).toHaveAttribute(
      'href',
      '/'
    );
  });

  // The front-end pitch declares no cross-link. Rendering the anchor anyway
  // would leave an empty link in the footer and in the accessibility tree.
  it('renders no link at all when there is nothing to link to', () => {
    render(<Footer copyright="© 2026 — Alycia Gautier" />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText('© 2026 — Alycia Gautier')).toBeInTheDocument();
  });
});
