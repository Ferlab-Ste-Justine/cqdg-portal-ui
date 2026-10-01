import { render } from '@testing-library/react';

import { combineContacts } from './combineContacts';

const renderContacts = (...args: Parameters<typeof combineContacts>) => {
  const { container } = render(<div>{combineContacts(...args)}</div>);
  return Array.from(container.firstElementChild!.children);
};

describe('combineContacts', () => {
  it('pairs element i of each array into one contact', () => {
    const contacts = renderContacts(
      ['Jane Doe', 'John Smith'],
      ['jane@example.com', 'john@example.com'],
      ['CHU Sainte-Justine', 'McGill'],
    );

    expect(contacts.map((c) => c.textContent)).toEqual([
      'Jane Doe, jane@example.com, CHU Sainte-Justine',
      'John Smith, john@example.com, McGill',
    ]);
  });

  it('renders each email as a mailto link', () => {
    const [contact] = renderContacts(['Jane Doe'], ['jane@example.com'], ['CHU Sainte-Justine']);

    expect(contact.querySelector('a')?.getAttribute('href')).toBe('mailto:jane@example.com');
  });

  it('keeps trailing entries when arrays have unequal lengths', () => {
    const contacts = renderContacts(
      ['Jane Doe', 'John Smith', 'Alex Tremblay'],
      ['jane@example.com', 'john@example.com'],
      ['CHU Sainte-Justine'],
    );

    expect(contacts.map((c) => c.textContent)).toEqual([
      'Jane Doe, jane@example.com, CHU Sainte-Justine',
      'John Smith, john@example.com',
      'Alex Tremblay',
    ]);
  });

  it('keeps trailing entries when the longest array is not the names', () => {
    const contacts = renderContacts(['Jane Doe'], undefined, ['CHU Sainte-Justine', 'McGill']);

    expect(contacts.map((c) => c.textContent)).toEqual(['Jane Doe, CHU Sainte-Justine', 'McGill']);
  });

  it('renders only the values present at an index, without stray separators', () => {
    const contacts = renderContacts([null, 'John Smith'], ['jane@example.com', null], [null, '']);

    expect(contacts.map((c) => c.textContent)).toEqual(['jane@example.com', 'John Smith']);
  });

  it('drops an index where name, email and institution are all absent', () => {
    const contacts = renderContacts(['Jane Doe', null], [null, null], [null, '']);

    expect(contacts.map((c) => c.textContent)).toEqual(['Jane Doe']);
  });

  it('handles scalars (pre-6.0 documents)', () => {
    const contacts = renderContacts('Jane Doe', 'jane@example.com', 'CHU Sainte-Justine');

    expect(contacts.map((c) => c.textContent)).toEqual([
      'Jane Doe, jane@example.com, CHU Sainte-Justine',
    ]);
  });

  it('returns no node when there is no contact', () => {
    expect(combineContacts(undefined, undefined, undefined)).toEqual([]);
    expect(combineContacts([], [], [])).toEqual([]);
  });
});
