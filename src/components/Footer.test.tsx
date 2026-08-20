import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders the cross-link when given', () => {
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

  it('renders no link without a cross-link', () => {
    render(<Footer copyright="© 2026 — Alycia Gautier" />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText('© 2026 — Alycia Gautier')).toBeInTheDocument();
  });
});
