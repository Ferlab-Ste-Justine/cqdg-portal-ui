import { combineIndexLinked, joinList, toList } from './indexLinkedArrays';

describe('toList', () => {
  it('wraps a scalar so pre-6.0 documents render without special-casing', () => {
    expect(toList('Illumina')).toEqual(['Illumina']);
  });

  it('passes an array through unchanged, preserving order', () => {
    expect(toList(['Chromium', 'Illumina'])).toEqual(['Chromium', 'Illumina']);
  });

  it('returns an empty list for null or undefined', () => {
    expect(toList(null)).toEqual([]);
    expect(toList(undefined)).toEqual([]);
  });
});

describe('combineIndexLinked', () => {
  it('pairs element i of each array into "A (B)"', () => {
    expect(
      combineIndexLinked(['RNA-Seq', 'ATAC-Seq'], ['Single Nucleus', 'Single Nucleus']),
    ).toEqual(['RNA-Seq (Single Nucleus)', 'ATAC-Seq (Single Nucleus)']);
  });

  it('preserves order rather than sorting — index alignment is a contract', () => {
    expect(combineIndexLinked(['Chromium', 'Illumina'], ['Chromium X', 'NovaSeq X'])).toEqual([
      'Chromium (Chromium X)',
      'Illumina (NovaSeq X)',
    ]);
  });

  it('falls back to A alone when the paired value is missing at that index', () => {
    expect(combineIndexLinked(['WGS', 'RNA-Seq'], ['Bulk'])).toEqual(['WGS (Bulk)', 'RNA-Seq']);
    expect(combineIndexLinked(['WGS'], undefined)).toEqual(['WGS']);
    expect(combineIndexLinked(['WGS'], [null])).toEqual(['WGS']);
  });

  it('handles scalars on either side (pre-6.0 documents)', () => {
    expect(combineIndexLinked('WGS', 'Bulk')).toEqual(['WGS (Bulk)']);
  });

  it('drops empty primary values instead of emitting stray parentheses', () => {
    // Distinct secondary values on purpose: identical ones would hide an index shift.
    expect(combineIndexLinked([null, 'WGS'], ['Bulk', 'Single Nucleus'])).toEqual([
      'WGS (Single Nucleus)',
    ]);
    expect(combineIndexLinked([], ['Bulk'])).toEqual([]);
  });
});

describe('joinList', () => {
  it('renders an array as a comma-separated string', () => {
    expect(joinList(['Chromium', 'Illumina'])).toBe('Chromium, Illumina');
  });

  it('renders a scalar as itself and an absent value as an empty string', () => {
    expect(joinList('Illumina')).toBe('Illumina');
    expect(joinList(undefined)).toBe('');
  });

  it('skips empty entries', () => {
    expect(joinList(['Illumina', null, ''])).toBe('Illumina');
  });
});
