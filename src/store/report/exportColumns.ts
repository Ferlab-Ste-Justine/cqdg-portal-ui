const TSV_COLUMN_JSON_PATHS: Record<string, string> = {
  'sequencing_experiment.experimental_strategies_1.display':
    '$.sequencing_experiment.experimental_strategies_1[*].display',
};

/** Adds the jsonPath needed to export array-of-objects fields, when the column needs one. */
export const withExportJsonPath = <T extends { field: string }>(column: T): T => {
  const jsonPath = TSV_COLUMN_JSON_PATHS[column.field];

  return jsonPath ? { ...column, jsonPath } : column;
};
