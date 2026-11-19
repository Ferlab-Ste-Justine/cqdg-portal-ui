import { ReactNode } from 'react';
import intl from 'react-intl-universal';
import { MemoryRouter } from 'react-router-dom';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { render, screen } from '@testing-library/react';
import locales from 'locales';

import { LANG } from 'common/constants';

import getDefaultColumns from './getDefaultColumns';
import getPublicDefaultColumns from './getPublicDefaultColumns';

// The Program column only exists when PROGRAMS_ENABLED is 'true', and the flag
// is read when the module loads, so it is forced on before the imports run.
jest.mock('helpers/EnvVariables', () => {
  const Actual = jest.requireActual('helpers/EnvVariables').default;
  return {
    __esModule: true,
    default: class extends Actual {
      static configFor(key: string): string {
        return key === 'PROGRAMS_ENABLED' ? 'true' : Actual.configFor(key);
      }
    },
  };
});

// Arranger shape of a study's programs (programs.hits.edges[].node).
const buildPrograms = (programIds: string[]) => ({
  hits: {
    total: programIds.length,
    edges: programIds.map((program_id) => ({ node: { program_id } })),
  },
});

const getProgramsColumn = (columns: ProColumnType[]) => {
  const column = columns.find((c) => c.key === 'programs.program_id');
  if (!column?.render) throw new Error('Program column not found');
  return column;
};

const renderCell = (columns: ProColumnType[], programs: unknown) => {
  const cell = getProgramsColumn(columns).render!(programs, {} as any, 0) as ReactNode;
  return render(<MemoryRouter>{cell}</MemoryRouter>);
};

describe.each([
  ['getDefaultColumns', () => getDefaultColumns() as ProColumnType[]],
  ['getPublicDefaultColumns', () => getPublicDefaultColumns(jest.fn()) as ProColumnType[]],
])('%s - Program column', (_, getColumns) => {
  beforeAll(() => {
    intl.init({ currentLocale: LANG.EN, locales, warningHandler: () => '' });
  });

  it('renders one link per program, pointing to the program page', () => {
    renderCell(getColumns(), buildPrograms(['PROG-A', 'PROG-B']));

    const links = screen.getAllByRole('link');
    expect(links.map((link) => link.textContent)).toEqual(['PROG-A', 'PROG-B']);
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/programs/PROG-A',
      '/programs/PROG-B',
    ]);
    expect(screen.queryByText(TABLE_EMPTY_PLACE_HOLDER)).not.toBeInTheDocument();
  });

  it('renders the placeholder when the study has an empty programs list', () => {
    const { container } = renderCell(getColumns(), buildPrograms([]));

    expect(container.textContent).toBe(TABLE_EMPTY_PLACE_HOLDER);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it.each([
    ['programs is undefined', undefined],
    ['programs is null', null],
    ['hits is missing', {}],
    ['edges is missing', { hits: { total: 0 } }],
  ])('renders the placeholder when %s', (__, programs) => {
    const { container } = renderCell(getColumns(), programs);

    expect(container.textContent).toBe(TABLE_EMPTY_PLACE_HOLDER);
  });
});
