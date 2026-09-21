import { ReactNode } from 'react';

/**
 * antd's default maxTagPlaceholder returns a string, which rc-select then sets as the
 * `title` attribute of the overflow chip, producing a grey native browser tooltip.
 * Returning a node instead keeps the exact same text without the tooltip.
 */
export const maxTagPlaceholder = (omittedValues: { label?: ReactNode }[]): ReactNode => (
  <>{`+ ${omittedValues.length} ...`}</>
);
