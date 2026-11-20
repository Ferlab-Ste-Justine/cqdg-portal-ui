import { TSerializedResizableGridLayoutConfig } from '@ferlab/ui/core/layout/ResizableGridLayout';

import {
  BREAKPOINT_COLS,
  getUserLayouts,
  hasVisibilityChanged,
  packLayouts,
  SUMMARY_LAYOUTS_VERSION,
} from './utils';

// Same shape as getSummaryLayout: 2 large cards on top, then 3 small cards and a wide card
const defaultLayouts: TSerializedResizableGridLayoutConfig[] = [
  {
    id: 'phenotype',
    title: 'Phenotype',
    base: { h: 4, w: 8, x: 0, y: 0, minH: 4, minW: 5, isResizable: true },
    lg: { h: 4, w: 8, x: 0, y: 0 },
    md: { h: 4, w: 6, x: 0, y: 0 },
    sm: { h: 4, w: 5, x: 0, y: 0 },
    xs: { h: 4, w: 6, x: 0, y: 0 },
    xxs: { h: 4, w: 4, x: 0, y: 0 },
  },
  {
    id: 'mondo',
    title: 'Mondo',
    base: { h: 4, w: 8, x: 8, y: 0, minH: 4, minW: 5, isResizable: true },
    lg: { h: 4, w: 8, x: 8, y: 0 },
    md: { h: 4, w: 6, x: 6, y: 0 },
    sm: { h: 4, w: 5, x: 5, y: 0 },
    xs: { h: 4, w: 6, x: 0, y: 4 },
    xxs: { h: 4, w: 4, x: 0, y: 4 },
  },
  {
    id: 'sex',
    title: 'Sex',
    base: { h: 2, w: 4, x: 0, y: 4, minH: 2, minW: 2, isResizable: true },
    lg: { h: 2, w: 4, x: 0, y: 4 },
    md: { h: 2, w: 4, x: 0, y: 4 },
    sm: { h: 2, w: 2, x: 0, y: 4 },
    xs: { h: 2, w: 3, x: 0, y: 8 },
    xxs: { h: 2, w: 4, x: 0, y: 8 },
  },
  {
    id: 'domain',
    title: 'Domain',
    base: { h: 2, w: 4, x: 4, y: 4, minH: 2, minW: 2, isResizable: true },
    lg: { h: 2, w: 4, x: 4, y: 4 },
    md: { h: 2, w: 4, x: 4, y: 4 },
    sm: { h: 2, w: 4, x: 2, y: 4 },
    xs: { h: 2, w: 3, x: 3, y: 8 },
    xxs: { h: 2, w: 4, x: 0, y: 10 },
  },
  {
    id: 'population',
    title: 'Population',
    base: { h: 2, w: 8, x: 8, y: 4, minH: 2, minW: 2, isResizable: true },
    lg: { h: 2, w: 8, x: 8, y: 4 },
    md: { h: 2, w: 4, x: 8, y: 4 },
    sm: { h: 2, w: 4, x: 6, y: 4 },
    xs: { h: 2, w: 6, x: 0, y: 10 },
    xxs: { h: 2, w: 4, x: 0, y: 12 },
  },
];

const savedLayouts: TSerializedResizableGridLayoutConfig[] = [
  {
    id: 'mondo',
    title: 'Mondo',
    base: { h: 4, w: 6, x: 6, y: 0, minH: 4, minW: 5, isResizable: true },
    md: { h: 4, w: 6, x: 6, y: 0 },
    sm: { h: 4, w: 6, x: 0, y: 4 },
    hidden: true,
  },
  {
    id: 'sex',
    title: 'Sex',
    base: { h: 2, w: 2, x: 0, y: 4, minH: 2, minW: 2, isResizable: true },
    lg: { h: 2, w: 2, x: 6, y: 9 },
    md: { h: 2, w: 2, x: 0, y: 4 },
  },
];

const hide = (ids: string[]) =>
  defaultLayouts.map((layout) => ({ ...layout, hidden: ids.includes(layout.id) || undefined }));

// Every cell between the top and the bottom of the grid is covered by exactly one visible card
const expectGridFilled = (layouts: TSerializedResizableGridLayoutConfig[]) => {
  (Object.keys(BREAKPOINT_COLS) as (keyof typeof BREAKPOINT_COLS)[]).forEach((breakpoint) => {
    const positions = layouts.filter(({ hidden }) => !hidden).map((layout) => layout[breakpoint]!);
    const bottom = Math.max(...positions.map(({ y, h }) => y + h));
    for (let y = 0; y < bottom; y++) {
      for (let x = 0; x < BREAKPOINT_COLS[breakpoint]; x++) {
        const covering = positions.filter(
          (p) => x >= p.x && x < p.x + p.w && y >= p.y && y < p.y + p.h,
        );
        expect(covering).toHaveLength(1);
      }
    }
  });
};

describe('packLayouts', () => {
  it('keeps the default positions when every card is visible', () => {
    expect(packLayouts(defaultLayouts, defaultLayouts)).toEqual(defaultLayouts);
  });

  it('moves the next cards next to a large card when the other one is hidden', () => {
    const layouts = packLayouts(hide(['mondo']), defaultLayouts);

    expect(layouts.find(({ id }) => id === 'sex')?.lg).toEqual({ x: 8, y: 0, w: 4, h: 2 });
    expect(layouts.find(({ id }) => id === 'domain')?.lg).toEqual({ x: 12, y: 0, w: 4, h: 2 });
    expectGridFilled(layouts);
  });

  it.each([[['mondo']], [['phenotype', 'sex']], [['sex', 'domain']], [['phenotype', 'mondo']]])(
    'leaves no empty space when %s are hidden',
    (hiddenIds) => {
      expectGridFilled(packLayouts(hide(hiddenIds), defaultLayouts));
    },
  );

  it('keeps the positions of the hidden cards untouched', () => {
    const layouts = packLayouts(hide(['mondo']), defaultLayouts);

    expect(layouts.find(({ id }) => id === 'mondo')).toEqual({
      ...defaultLayouts[1],
      hidden: true,
    });
  });
});

describe('hasVisibilityChanged', () => {
  it('is false when only the positions changed', () => {
    const moved = defaultLayouts.map((layout) => ({ ...layout, lg: { x: 0, y: 20, w: 2, h: 2 } }));
    expect(hasVisibilityChanged(moved, defaultLayouts)).toBe(false);
  });

  it('is true when a card is hidden or shown again', () => {
    expect(hasVisibilityChanged(hide(['sex']), defaultLayouts)).toBe(true);
    expect(hasVisibilityChanged(defaultLayouts, hide(['sex']))).toBe(true);
  });

  it('considers every card visible when nothing is saved', () => {
    expect(hasVisibilityChanged(defaultLayouts)).toBe(false);
    expect(hasVisibilityChanged(hide(['sex']))).toBe(true);
  });
});

describe('getUserLayouts', () => {
  it('returns undefined when no layout is saved', () => {
    expect(getUserLayouts(defaultLayouts, undefined, undefined)).toBeUndefined();
  });

  it('returns the saved layouts unchanged when the version is up to date', () => {
    expect(getUserLayouts(defaultLayouts, savedLayouts, SUMMARY_LAYOUTS_VERSION)).toBe(
      savedLayouts,
    );
  });

  it.each([undefined, SUMMARY_LAYOUTS_VERSION - 1])(
    'replaces the outdated positions with the packed default ones (%s)',
    (version) => {
      const layouts = getUserLayouts(defaultLayouts, savedLayouts, version);
      const sex = layouts?.find(({ id }) => id === 'sex');

      expect(layouts?.map(({ id }) => id)).toEqual(['mondo', 'sex']);
      // Mondo is hidden, so Sex moves next to Phenotype instead of its saved position
      expect(sex?.lg).toEqual({ x: 8, y: 0, w: 4, h: 2 });
      expect(sex?.md).not.toEqual(savedLayouts[1].md);
    },
  );

  it('keeps the cards hidden by the user when the version is outdated', () => {
    const layouts = getUserLayouts(defaultLayouts, savedLayouts, undefined);

    expect(layouts?.find(({ id }) => id === 'mondo')?.hidden).toBe(true);
    expect(layouts?.find(({ id }) => id === 'sex')?.hidden).toBeUndefined();
  });
});
