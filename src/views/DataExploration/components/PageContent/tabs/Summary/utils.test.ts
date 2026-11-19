import { TSerializedResizableGridLayoutConfig } from '@ferlab/ui/core/layout/ResizableGridLayout';

import { getUserLayouts, SUMMARY_LAYOUTS_VERSION } from './utils';

const savedLayouts: TSerializedResizableGridLayoutConfig[] = [
  {
    id: 'mondo',
    title: 'Mondo',
    base: { h: 4, w: 6, x: 6, y: 0, minH: 4, minW: 5, isResizable: true },
    md: { h: 4, w: 6, x: 6, y: 0 },
    sm: { h: 4, w: 6, x: 0, y: 4 },
    xs: { h: 4, w: 6, x: 0, y: 4 },
    hidden: true,
  },
  {
    id: 'sex-graph-card',
    title: 'Sex',
    base: { h: 2, w: 2, x: 0, y: 4, minH: 2, minW: 2, isResizable: true },
    md: { h: 2, w: 2, x: 0, y: 4 },
  },
];

describe('getUserLayouts', () => {
  it('returns undefined when no layout is saved', () => {
    expect(getUserLayouts(undefined, undefined)).toBeUndefined();
  });

  it('returns the saved layouts unchanged when the version is up to date', () => {
    expect(getUserLayouts(savedLayouts, SUMMARY_LAYOUTS_VERSION)).toBe(savedLayouts);
  });

  it.each([undefined, SUMMARY_LAYOUTS_VERSION - 1])(
    'drops the breakpoint positions when the version is outdated (%s)',
    (version) => {
      const layouts = getUserLayouts(savedLayouts, version);

      layouts?.forEach((layout) => {
        expect(layout).not.toHaveProperty('lg');
        expect(layout).not.toHaveProperty('md');
        expect(layout).not.toHaveProperty('sm');
        expect(layout).not.toHaveProperty('xs');
        expect(layout).not.toHaveProperty('xxs');
      });
      expect(layouts?.map(({ id }) => id)).toEqual(['mondo', 'sex-graph-card']);
    },
  );

  it('keeps the cards hidden by the user when the version is outdated', () => {
    const layouts = getUserLayouts(savedLayouts, undefined);

    expect(layouts?.find(({ id }) => id === 'mondo')?.hidden).toBe(true);
    expect(layouts?.find(({ id }) => id === 'sex-graph-card')?.hidden).toBeUndefined();
  });
});
