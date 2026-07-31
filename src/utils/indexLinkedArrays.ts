/**
 * Pairs two index-linked arrays into `A (B)` strings, one per element.
 * Falls back to `A` alone when the paired value is missing at that index.
 */
export const combineIndexLinked = (
  primary?: (string | null)[] | string | null,
  secondary?: (string | null)[] | string | null,
): string[] => {
  const primaryList = toList(primary);
  const secondaryList = toList(secondary);

  return primaryList
    .filter((value) => !!value)
    .map((value, index) => {
      const paired = secondaryList[index];
      return paired ? `${value} (${paired})` : `${value}`;
    });
};

/**
 * Normalises a value that may arrive as an array or as a scalar,
 * so the UI renders both without special-casing.
 */
export const toList = <T>(value?: T[] | T | null): T[] => {
  if (value === null || value === undefined) return [];
  return Array.isArray(value) ? value : [value];
};

/** Renders an array-or-scalar field as a comma-separated string. */
export const joinList = (value?: (string | null)[] | string | null, separator = ', '): string =>
  toList(value)
    .filter((item) => !!item)
    .join(separator);
