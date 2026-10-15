import { EFileInputType, formatFileSize } from './formatFileSize';

// Used wherever a file size is displayed: the Data Files tab of Data Explorer,
// the file page and the file manifest download modal. Sizes come from the API
// in bytes and are shown in decimal units (1 KB = 1000 B), in upper case.
describe('Display file sizes (formatFileSize)', () => {
  it.each([
    [500, '500 B'],
    [1500, '1.5 KB'],
    [2500000, '2.5 MB'],
    [1e12, '1 TB'],
    [441690000000000, '441.69 TB'],
  ])('formats %d bytes as %s, in base 10 and upper case', (bytes, expected) => {
    expect(formatFileSize(bytes)).toBe(expected);
  });

  // The third argument tells the unit of the input, for sizes that are not
  // stored in bytes.
  it('converts sizes given in kilobytes or megabytes', () => {
    expect(formatFileSize(1500, {}, EFileInputType.KB)).toBe('1.5 MB');
    expect(formatFileSize(2.5, {}, EFileInputType.MB)).toBe('2.5 MB');
  });

  // Options are passed to the `filesize` library and override the defaults,
  // e.g. the Data Files table uses { round: 1 }.
  it('passes options to the formatting library', () => {
    expect(formatFileSize(1234567, { round: 1 })).toBe('1.2 MB');
    expect(formatFileSize(1024, { base: 2 })).toBe('1 KIB');
  });

  // Only strings are put in upper case; other outputs are returned unchanged.
  it('returns the raw result when the output is not a string', () => {
    expect(formatFileSize(1500, { output: 'object' })).toEqual({
      value: 1.5,
      symbol: 'kB',
      exponent: 1,
      unit: 'kB',
    });
  });

  // A file without size in the API must not break the page: the size falls
  // back to 0 instead of throwing or showing "NaN".
  describe('with unexpected sizes', () => {
    it.each([
      ['zero', 0],
      ['missing', undefined],
      ['not a number', NaN],
    ])('shows 0 B for a %s size', (_label, size) => {
      expect(formatFileSize(size)).toBe('0 B');
    });

    it('keeps the sign of a negative size', () => {
      expect(formatFileSize(-1500)).toBe('-1.5 KB');
    });
  });
});
