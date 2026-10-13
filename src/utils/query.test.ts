import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';

import { EMPTY_QUERY, resolveSyntheticSqonWithReferences } from './query';

// In the query builder, a query can combine other queries by referencing their
// position in the list, e.g. { op: 'and', content: [0, 1] } means "Q1 and Q2".
const q1: ISyntheticSqon = {
  op: 'and',
  content: [{ op: 'in', content: { field: 'sex', value: ['female'] } }],
};
const q2: ISyntheticSqon = {
  op: 'and',
  content: [{ op: 'in', content: { field: 'data_type', value: ['WGS'] } }],
};
const emptyQuery: ISyntheticSqon = { op: 'and', content: [] };

describe('resolveSyntheticSqonWithReferences', () => {
  it('returns a query without references as is', () => {
    expect(resolveSyntheticSqonWithReferences([q1], q1)).toEqual(q1);
  });

  it('replaces references with the queries they point to', () => {
    const combined: ISyntheticSqon = { op: 'or', content: [0, 1] };

    expect(resolveSyntheticSqonWithReferences([q1, q2], combined)).toEqual({
      op: 'or',
      content: [q1, q2],
    });
  });

  it('resolves a mix of references and filters', () => {
    const filter = { op: 'in', content: { field: 'age', value: ['10'] } };
    const combined: ISyntheticSqon = { op: 'and', content: [0, filter] };

    expect(resolveSyntheticSqonWithReferences([q1], combined)).toEqual({
      op: 'and',
      content: [q1, filter],
    });
  });

  // The query list is read from local storage asynchronously, so a combined
  // query can be evaluated before the queries it references are available.
  it('returns an empty query when a referenced query is missing', () => {
    const combined: ISyntheticSqon = { op: 'and', content: [0, 1] };

    expect(resolveSyntheticSqonWithReferences([q1], combined)).toEqual(EMPTY_QUERY);
  });

  it('returns an empty query when a referenced query has no filter', () => {
    const combined: ISyntheticSqon = { op: 'and', content: [0, 1] };

    expect(resolveSyntheticSqonWithReferences([q1, emptyQuery], combined)).toEqual(EMPTY_QUERY);
  });

  it('resolves chains of references', () => {
    // Q3 references Q2, which references Q1.
    const q2ReferencingQ1: ISyntheticSqon = { op: 'or', content: [0] };
    const q3: ISyntheticSqon = { op: 'and', content: [1] };

    expect(resolveSyntheticSqonWithReferences([q1, q2ReferencingQ1], q3)).toEqual({
      op: 'and',
      content: [{ op: 'or', content: [q1] }],
    });
  });

  it('returns an empty query when the query list is not loaded yet', () => {
    const combined: ISyntheticSqon = { op: 'and', content: [0] };

    expect(
      resolveSyntheticSqonWithReferences(undefined as unknown as ISyntheticSqon[], combined),
    ).toEqual(EMPTY_QUERY);
  });

  it.each([
    ['past the end of the list', 5],
    ['negative', -1],
  ])('returns an empty query for a reference %s', (_label, reference) => {
    const combined: ISyntheticSqon = { op: 'and', content: [reference] };

    expect(resolveSyntheticSqonWithReferences([q1], combined)).toEqual(EMPTY_QUERY);
  });

  it('returns an empty query for a reference to an empty slot of the list', () => {
    const combined: ISyntheticSqon = { op: 'and', content: [0, 1] };
    const listWithHole = [undefined, q1] as unknown as ISyntheticSqon[];

    expect(resolveSyntheticSqonWithReferences(listWithHole, combined)).toEqual(EMPTY_QUERY);
  });

  it('returns an empty query for a query without content', () => {
    const noContent = { op: 'and' } as ISyntheticSqon;

    expect(resolveSyntheticSqonWithReferences([q1], noContent)).toEqual(EMPTY_QUERY);
  });

  it('returns an empty query when there is no query', () => {
    expect(resolveSyntheticSqonWithReferences([], undefined as unknown as ISyntheticSqon)).toEqual(
      EMPTY_QUERY,
    );
  });
});
