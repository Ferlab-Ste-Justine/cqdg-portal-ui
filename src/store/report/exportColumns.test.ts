import { withExportJsonPath } from './exportColumns';

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
