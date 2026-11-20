import { render, screen } from '@testing-library/react';

import ExternalMailToLink from './index';

describe('ExternalMailToLink', () => {
  it('links to a mailto when the value is an email', () => {
    render(<ExternalMailToLink email="access@study.example.test" />);

    expect(screen.getByRole('link', { name: 'access@study.example.test' })).toHaveAttribute(
      'href',
      'mailto:access@study.example.test',
    );
  });

  it('keeps the value as the link when it is not an email', () => {
    // Some studies give a web form instead of an email for their Access Authority.
    render(<ExternalMailToLink email="https://access.example.test/form" />);

    expect(screen.getByRole('link', { name: 'https://access.example.test/form' })).toHaveAttribute(
      'href',
      'https://access.example.test/form',
    );
  });
});
