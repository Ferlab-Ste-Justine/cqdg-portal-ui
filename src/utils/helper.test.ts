import {
  EMAIL_REGEX,
  formatQuerySortList,
  formatQuotientOrElse,
  formatQuotientToExponentialOrElse,
  getCurrentUrl,
  orderCardIfNeeded,
  scrollToTop,
  toExponentialNotation,
} from './helper';

// Used on the Variants pages to display frequencies, e.g. "3 / 120" participants
// or an allele frequency of "2.50e-2".
describe('Display variant frequencies (toExponentialNotation, formatQuotient*)', () => {
  it('formats a number in scientific notation with 2 decimals by default', () => {
    expect(toExponentialNotation(0.025)).toBe('2.50e-2');
    expect(toExponentialNotation(1.5e-8)).toBe('1.50e-8');
    expect(toExponentialNotation(-0.000123)).toBe('-1.23e-4');
  });

  it('accepts a custom number of decimals', () => {
    expect(toExponentialNotation(123456, 0)).toBe('1e+5');
  });

  it('formats a quotient as "numerator / denominator"', () => {
    expect(formatQuotientOrElse(3, 120)).toBe('3 / 120');
    expect(formatQuotientOrElse(0, 120)).toBe('0 / 120');
  });

  it('formats a quotient in scientific notation', () => {
    expect(formatQuotientToExponentialOrElse(1, 3)).toBe('3.33e-1');
  });

  describe('with missing or invalid values', () => {
    it('returns an empty string when there is no number', () => {
      expect(toExponentialNotation(undefined)).toBe('');
      expect(toExponentialNotation(NaN)).toBe('');
    });

    it.each([
      ['the denominator is 0', 3, 0],
      ['the numerator is missing', undefined, 120],
      ['the denominator is not a number', 3, NaN],
    ])('returns the default value when %s', (_label, num, denum) => {
      expect(formatQuotientOrElse(num as number, denum, '-')).toBe('-');
      expect(formatQuotientToExponentialOrElse(num as number, denum, '-')).toBe('-');
    });

    it('returns an empty string by default', () => {
      expect(formatQuotientOrElse(3, 0)).toBe('');
    });
  });
});

// antd tables report the sorted column(s); the API expects { field, order }.
describe('Sort data tables (formatQuerySortList)', () => {
  it('converts an ascending or descending antd sort', () => {
    expect(formatQuerySortList({ columnKey: 'age', order: 'ascend' })).toEqual([
      { field: 'age', order: 'asc' },
    ]);
    expect(formatQuerySortList({ columnKey: 'age', order: 'descend' })).toEqual([
      { field: 'age', order: 'desc' },
    ]);
  });

  it('keeps the order of a multi-column sort', () => {
    expect(
      formatQuerySortList([
        { columnKey: 'study', order: 'ascend' },
        { columnKey: 'age', order: 'descend' },
      ]),
    ).toEqual([
      { field: 'study', order: 'asc' },
      { field: 'age', order: 'desc' },
    ]);
  });

  it.each([
    ['an empty sort', {}],
    ['an empty list', []],
    ['no sort', undefined],
  ])('returns no sort for %s', (_label, sorter) => {
    expect(formatQuerySortList(sorter as any)).toEqual([]);
  });
});

// The Dashboard lets users reorder its cards; the order is saved in their config.
describe('Order dashboard cards (orderCardIfNeeded)', () => {
  const cards = () => [{ id: 'a' }, { id: 'b' }, { id: 'c' }] as any[];

  it('orders the cards as saved in the user config', () => {
    expect(orderCardIfNeeded(cards(), ['c', 'a', 'b']).map((c) => c.id)).toEqual(['c', 'a', 'b']);
  });

  it('keeps the default order when the user has no saved order', () => {
    expect(orderCardIfNeeded(cards(), undefined).map((c) => c.id)).toEqual(['a', 'b', 'c']);
  });
});

// Used to decide whether a data access contact is displayed as a mailto link.
describe('Recognize email addresses (EMAIL_REGEX)', () => {
  it.each(['john.doe@chusj.ca', 'first_last-1@mail.ssss.gouv.qc.ca'])('accepts %s', (email) => {
    expect(EMAIL_REGEX.test(email)).toBe(true);
  });

  it.each([
    ['without @', 'john.doe.ca'],
    ['with a space', 'john doe@chusj.ca'],
    ['with two @', 'john@doe@chusj.ca'],
    ['without domain extension', 'john@chusj'],
  ])('rejects an address %s', (_label, email) => {
    expect(EMAIL_REGEX.test(email)).toBe(false);
  });
});

describe('Page helpers (getCurrentUrl, scrollToTop)', () => {
  it('returns the current URL without query string', () => {
    window.history.pushState({}, '', '/data-exploration?tab=files');

    expect(getCurrentUrl()).toBe('http://localhost/data-exploration');
  });

  it('scrolls the scrollable content of an element back to the top', () => {
    document.body.innerHTML =
      '<div id="content"><div class="simplebar-content-wrapper"></div></div>';
    const wrapper = document.querySelector('.simplebar-content-wrapper') as HTMLElement;
    wrapper.scrollTo = jest.fn();

    scrollToTop('content');

    expect(wrapper.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('does nothing when the element does not exist', () => {
    document.body.innerHTML = '';

    expect(() => scrollToTop('missing')).not.toThrow();
  });
});
