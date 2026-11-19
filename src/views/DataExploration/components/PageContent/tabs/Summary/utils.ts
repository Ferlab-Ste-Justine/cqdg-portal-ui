import { TSerializedResizableGridLayoutConfig } from '@ferlab/ui/core/layout/ResizableGridLayout';

// Increment when the default positions in getSummaryLayout change,
// to discard outdated layouts saved in user config
export const SUMMARY_LAYOUTS_VERSION = 1;

/**
 * Saved layouts contain the positions of every breakpoint, so they override the defaults.
 * When the default layout changes (new version), outdated positions are dropped
 * and only the visibility (hidden cards) chosen by the user is kept.
 */
export const getUserLayouts = (
  layouts?: TSerializedResizableGridLayoutConfig[],
  version?: number,
): TSerializedResizableGridLayoutConfig[] | undefined => {
  if (!layouts || version === SUMMARY_LAYOUTS_VERSION) return layouts;

  // Without breakpoint keys, ResizableGridLayout falls back on the default positions
  return layouts.map(({ id, title, base, hidden }) => ({ id, title, base, hidden }));
};
