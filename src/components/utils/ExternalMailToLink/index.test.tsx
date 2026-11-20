import { render, screen } from '@testing-library/react';

import ExternalMailToLink from './index';

describe('ExternalMailToLink', () => {
  it('crée un lien mailto quand la valeur est un courriel', () => {
    render(<ExternalMailToLink email="access@study.example.test" />);

    expect(screen.getByRole('link', { name: 'access@study.example.test' })).toHaveAttribute(
      'href',
      'mailto:access@study.example.test',
    );
  });

  it("garde la valeur comme lien quand ce n'est pas un courriel", () => {
    // Some studies give a web form instead of an email for their Access Authority.
    render(<ExternalMailToLink email="https://access.example.test/form" />);

    expect(screen.getByRole('link', { name: 'https://access.example.test/form' })).toHaveAttribute(
      'href',
      'https://access.example.test/form',
    );
  });
});
