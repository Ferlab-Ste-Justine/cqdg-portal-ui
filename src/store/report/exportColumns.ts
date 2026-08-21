/**
 * Arranger builds its column state from the ES mapping, which cannot tell an object apart
 * from an array of objects. Fields such as `experimental_strategies_1` hold an array, so the
 * dotted `accessor` Arranger generates resolves to nothing and the exported cell is empty.
 * Giving those columns a jsonPath makes the export walk the array instead.
 */
const TSV_COLUMN_JSON_PATHS: Record<string, string> = {
  'sequencing_experiment.experimental_strategies_1.display':
    '$.sequencing_experiment.experimental_strategies_1[*].display',
};

/** Adds the jsonPath needed to export array-of-objects fields, when the column needs one. */
export const withExportJsonPath = <T extends { field: string }>(column: T): T => {
  const jsonPath = TSV_COLUMN_JSON_PATHS[column.field];

  return jsonPath ? { ...column, jsonPath } : column;
};
