
export const repoPageCaseToFileFiltersMapping: Map = new Map([
  ['gender', 'cases.gender'],
  ['ethnicity', 'cases.ethnicity'],
  ['age_at_recruitment', 'cases.age_at_recruitment'],
  ['vital_status', 'cases.vital_status'],
  ['files.file_id', 'file_id'],
  ['submitter_donor_id', 'cases.submitter_donor_id']
]);

export const repoPageFileToCaseFiltersMapping: Map = new Map([
  ['data_category', 'files.data_category'],
  ['data_type', 'files.data_type'],
  ['file_format', 'files.file_format'],
  ['data_access', 'files.data_access'],
  ['platform', 'files.platform'],
  ['experimental_strategy', 'files.experimental_strategy'],
  ['is_harmonized', 'files.is_harmonized'],
  ['file_id','files.file_id'],
  ['cases.submitter_donor_id', 'submitter_donor_id']
]);
