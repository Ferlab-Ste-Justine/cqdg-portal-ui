import { TSerializedResizableGridLayoutConfig } from '@ferlab/ui/core/layout/ResizableGridLayout';

// Increment when the default positions in getSummaryLayout change,
// to discard outdated layouts saved in user config
export const SUMMARY_LAYOUTS_VERSION = 1;

// Same columns as ResizableGridLayout (@ferlab/ui), which doesn't export them
export const BREAKPOINT_COLS = { lg: 16, md: 12, sm: 10, xs: 6, xxs: 4 };
type TBreakpoint = keyof typeof BREAKPOINT_COLS;
const BREAKPOINTS = Object.keys(BREAKPOINT_COLS) as TBreakpoint[];

type TPosition = { x: number; y: number; w: number; h: number };
type TPlacedItem = TPosition & { id: string };

const getDefaultPosition = (
  layout: TSerializedResizableGridLayoutConfig,
  breakpoint: TBreakpoint,
): TPosition => {
  const position = layout[breakpoint] ?? layout.base;
  return { x: position.x, y: position.y, w: position.w, h: position.h };
};

/**
 * Place each item in the first free spot (top to bottom, left to right),
 * then grow the items into the empty space left around them
 */
const packBreakpoint = (
  items: { id: string; w: number; h: number }[],
  cols: number,
): Record<string, TPosition> => {
  const placed: TPlacedItem[] = [];
  const isFree = (x: number, y: number, w: number, h: number) =>
    x >= 0 &&
    x + w <= cols &&
    placed.every(
      (item) => x >= item.x + item.w || item.x >= x + w || y >= item.y + item.h || item.y >= y + h,
    );

  items.forEach(({ id, w, h }) => {
    const width = Math.min(w, cols);
    let position: TPosition | undefined;
    for (let y = 0; !position; y++) {
      for (let x = 0; !position && x + width <= cols; x++) {
        if (isFree(x, y, width, h)) position = { x, y, w: width, h };
      }
    }
    placed.push({ id, ...position });
  });

  placed.forEach((item) => {
    while (isFree(item.x + item.w, item.y, 1, item.h)) item.w++;
  });
  const bottom = Math.max(0, ...placed.map(({ y, h }) => y + h));
  placed.forEach((item) => {
    while (item.y + item.h < bottom && isFree(item.x, item.y + item.h, item.w, 1)) item.h++;
  });

  return placed.reduce<Record<string, TPosition>>(
    (positions, { id, ...position }) => ({ ...positions, [id]: position }),
    {},
  );
};

/**
 * Recompute the positions of the visible cards for every breakpoint, from their default
 * order and size, so hiding or showing a card doesn't leave empty spaces in the grid
 */
export const packLayouts = (
  layouts: TSerializedResizableGridLayoutConfig[],
  defaultLayouts: TSerializedResizableGridLayoutConfig[],
): TSerializedResizableGridLayoutConfig[] => {
  const hiddenIds = layouts.filter(({ hidden }) => hidden).map(({ id }) => id);
  const visibleDefaults = defaultLayouts.filter(({ id }) => !hiddenIds.includes(id));

  const positionsByBreakpoint = BREAKPOINTS.reduce<Record<string, Record<string, TPosition>>>(
    (acc, breakpoint) => {
      const items = visibleDefaults
        .map((layout) => ({ id: layout.id, ...getDefaultPosition(layout, breakpoint) }))
        .sort((a, b) => a.y - b.y || a.x - b.x);
      return { ...acc, [breakpoint]: packBreakpoint(items, BREAKPOINT_COLS[breakpoint]) };
    },
    {},
  );

  return layouts.map((layout) =>
    BREAKPOINTS.reduce((acc, breakpoint) => {
      const position = positionsByBreakpoint[breakpoint][layout.id];
      return position ? { ...acc, [breakpoint]: position } : acc;
    }, layout),
  );
};

export const hasVisibilityChanged = (
  layouts: TSerializedResizableGridLayoutConfig[],
  previousLayouts: TSerializedResizableGridLayoutConfig[] = [],
): boolean =>
  layouts.some(
    ({ id, hidden }) => !!hidden !== !!previousLayouts.find((layout) => layout.id === id)?.hidden,
  );

/**
 * Saved layouts contain the positions of every breakpoint, so they override the defaults.
 * When the default layout changes (new version), outdated positions are dropped:
 * only the visibility (hidden cards) chosen by the user is kept and the cards are repacked.
 */
export const getUserLayouts = (
  defaultLayouts: TSerializedResizableGridLayoutConfig[],
  layouts?: TSerializedResizableGridLayoutConfig[],
  version?: number,
): TSerializedResizableGridLayoutConfig[] | undefined => {
  if (!layouts || version === SUMMARY_LAYOUTS_VERSION) return layouts;

  return packLayouts(
    layouts.map(({ id, title, base, hidden }) => ({ id, title, base, hidden })),
    defaultLayouts,
  );
};
