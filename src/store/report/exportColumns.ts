import intl from 'react-intl-universal';

const TSV_COLUMN_JSON_PATHS: Record<string, string> = {
  'sequencing_experiment.experimental_strategies_1.display':
    '$.sequencing_experiment.experimental_strategies_1[*].display',
};

/** Table columns that bundle several fields: each field is exported as its own column. */
const TSV_BUNDLE_COLUMNS: Record<string, { field: string; titleKey: string }[]> = {
  contacts: [
    { field: 'contact_names', titleKey: 'entities.study.contact_names' },
    { field: 'contact_institutions', titleKey: 'entities.study.contact_institutions' },
    { field: 'contact_emails', titleKey: 'entities.study.contact_emails' },
  ],
};

/** Adds the jsonPath needed to export array-of-objects fields, when the column needs one. */
export const withExportJsonPath = <T extends { field: string }>(column: T): T => {
  const jsonPath = TSV_COLUMN_JSON_PATHS[column.field];

  return jsonPath ? { ...column, jsonPath } : column;
};

/** Replaces each bundle column key by the fields it bundles, at the same position. */
export const expandBundleColumnKeys = (keys: string[]): string[] =>
  keys.flatMap((key) => TSV_BUNDLE_COLUMNS[key]?.map(({ field }) => field) ?? [key]);

/** Export header of a field exported in place of a bundle column, if it is one. */
export const getBundledFieldTitle = (field: string): string | undefined => {
  const bundledField = Object.values(TSV_BUNDLE_COLUMNS)
    .flat()
    .find((bundled) => bundled.field === field);

  return bundledField && intl.get(bundledField.titleKey);
};
