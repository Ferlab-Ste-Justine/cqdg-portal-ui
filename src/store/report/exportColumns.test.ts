import { expandBundleColumnKeys, getBundledFieldTitle, withExportJsonPath } from './exportColumns';

jest.mock('react-intl-universal', () => ({ get: (key: string) => key }));

describe('withExportJsonPath', () => {
  it('adds a jsonPath walking the array for array-of-objects fields', () => {
    const column = {
      field: 'sequencing_experiment.experimental_strategies_1.display',
      accessor: 'sequencing_experiment.experimental_strategies_1.display',
      jsonPath: null,
    };

    expect(withExportJsonPath(column)).toEqual({
      ...column,
      jsonPath: '$.sequencing_experiment.experimental_strategies_1[*].display',
    });
  });

  it('leaves other columns untouched', () => {
    const column = { field: 'file_format', accessor: 'file_format', jsonPath: null };

    expect(withExportJsonPath(column)).toBe(column);
  });
});

describe('expandBundleColumnKeys', () => {
  it('replaces the contacts column by its three fields, at the same position', () => {
    expect(expandBundleColumnKeys(['study_code', 'contacts', 'domain'])).toEqual([
      'study_code',
      'contact_names',
      'contact_institutions',
      'contact_emails',
      'domain',
    ]);
  });

  it('leaves other keys untouched', () => {
    expect(expandBundleColumnKeys(['study_code', 'domain'])).toEqual(['study_code', 'domain']);
  });
});

describe('getBundledFieldTitle', () => {
  it('returns the title of each bundled contact field', () => {
    expect(getBundledFieldTitle('contact_names')).toBe('entities.study.contact_names');
    expect(getBundledFieldTitle('contact_institutions')).toBe(
      'entities.study.contact_institutions',
    );
    expect(getBundledFieldTitle('contact_emails')).toBe('entities.study.contact_emails');
  });

  it('returns undefined for a field that is not bundled', () => {
    expect(getBundledFieldTitle('study_code')).toBeUndefined();
  });
});
