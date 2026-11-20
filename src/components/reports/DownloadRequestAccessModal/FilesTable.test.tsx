import intl from 'react-intl-universal';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { render, screen, within } from '@testing-library/react';
import locales from 'locales';

import { LANG, TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import useApi from 'hooks/useApi';

import FilesTable from './FilesTable';

// Mocked so the test can read the request config without sending it.
jest.mock('hooks/useApi', () => ({ __esModule: true, default: jest.fn() }));

const sqon: ISyntheticSqon = {
  op: 'and',
  content: [{ op: 'in', content: { field: 'study_code', value: ['STUDY-A'] } }],
};

const rowCells = (key: string) =>
  within(document.querySelector(`[data-row-key="${key}"]`) as HTMLElement)
    .getAllByRole('cell')
    .map((td) => td.textContent);

describe('FilesTable', () => {
  beforeAll(() => {
    intl.init({ currentLocale: LANG.EN, locales, warningHandler: () => '' });
  });

  it('asks the stats endpoint for the files of the selection', () => {
    (useApi as jest.Mock).mockReturnValue({ loading: false, result: [] });

    render(<FilesTable sqon={sqon} />);

    const { config } = (useApi as jest.Mock).mock.calls[0][0];
    expect(config.url).toMatch(/\/reports\/file-request-access\/stats$/);
    expect(config.method).toBe('POST');
    expect(config.data.sqon).toEqual(sqon);
    expect(config.data).toHaveProperty('projectId');
  });

  it('shows one row per study', () => {
    (useApi as jest.Mock).mockReturnValue({
      loading: false,
      result: [
        { key: 'STUDY-A', study_name: 'Study Alpha', nb_files: 12 },
        { key: 'STUDY-B', study_name: 'Study Beta', nb_files: 3 },
      ],
    });

    render(<FilesTable sqon={sqon} />);

    expect(rowCells('STUDY-A')).toEqual(['Study Alpha', 'STUDY-A', '12']);
    expect(rowCells('STUDY-B')).toEqual(['Study Beta', 'STUDY-B', '3']);
  });

  it('shows a placeholder for missing values', () => {
    (useApi as jest.Mock).mockReturnValue({
      loading: false,
      result: [{ key: 'STUDY-C', study_name: '', nb_files: 0 }],
    });

    render(<FilesTable sqon={sqon} />);

    expect(rowCells('STUDY-C')).toEqual([
      TABLE_EMPTY_PLACE_HOLDER,
      'STUDY-C',
      TABLE_EMPTY_PLACE_HOLDER,
    ]);
  });

  it('shows the empty state when the API returns nothing', () => {
    (useApi as jest.Mock).mockReturnValue({ loading: false, result: undefined });

    render(<FilesTable sqon={sqon} />);

    expect(screen.queryAllByRole('row')).toHaveLength(2); // header + empty row
    expect(document.querySelector('.ant-table-placeholder')).toBeInTheDocument();
  });
});
