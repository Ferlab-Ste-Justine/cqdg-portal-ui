import { isObject, mergeDeep } from './object';

// mergeDeep is used to save user preferences: the stored user config is merged
// with the part of the config that changed (see store/user/thunks.ts).
describe('Save user preferences (mergeDeep)', () => {
  it('merges nested objects, keeping keys that are not updated', () => {
    const stored = { data_exploration: { tables: { participants: { columns: ['a'] } } } };
    const update = { data_exploration: { tables: { files: { columns: ['b'] } } } };

    expect(mergeDeep(stored, update)).toEqual({
      data_exploration: {
        tables: { participants: { columns: ['a'] }, files: { columns: ['b'] } },
      },
    });
  });

  it('lets later sources override earlier ones', () => {
    expect(mergeDeep({ a: 1 }, { b: 2 }, { a: 3 })).toEqual({ a: 3, b: 2 });
  });

  it('replaces arrays instead of merging them', () => {
    expect(mergeDeep({ columns: ['a', 'b', 'c'] }, { columns: ['c'] })).toEqual({
      columns: ['c'],
    });
  });

  it('replaces a nested object with null when the update sets it to null', () => {
    expect(mergeDeep({ widget: { visible: true } }, { widget: null })).toEqual({ widget: null });
  });

  it('updates the target object in place and returns it', () => {
    const target = { a: 1 };

    const result = mergeDeep(target, { b: 2 });

    expect(result).toBe(target);
    expect(target).toEqual({ a: 1, b: 2 });
  });

  it('does not share nested objects with the source', () => {
    const source = { nested: { x: 1 } };
    const target: any = {};

    mergeDeep(target, source);
    source.nested.x = 2;

    expect(target.nested.x).toBe(1);
  });

  describe('with unexpected values', () => {
    it('returns the target when there is nothing to merge', () => {
      const target = { a: 1 };

      expect(mergeDeep(target)).toBe(target);
    });

    it.each([
      ['a null target', null, { a: 1 }, null],
      ['a null source', { a: 1 }, null, { a: 1 }],
      ['an array target', [1], { a: 1 }, [1]],
    ])('leaves %s unchanged', (_label, target, source, expected) => {
      expect(mergeDeep(target, source)).toEqual(expected);
    });
  });
});

describe('isObject', () => {
  it('is true for plain objects', () => {
    expect(isObject({ a: 1 })).toBe(true);
  });

  it.each([
    ['an array', []],
    ['a string', 'text'],
    ['null', null],
    ['undefined', undefined],
  ])('is false for %s', (_label, value) => {
    expect(isObject(value)).toBeFalsy();
  });
});
