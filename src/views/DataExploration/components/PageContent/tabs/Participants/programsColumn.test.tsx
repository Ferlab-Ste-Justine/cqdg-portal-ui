import { ReactNode } from 'react';
import intl from 'react-intl-universal';
import { MemoryRouter } from 'react-router-dom';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { render, screen } from '@testing-library/react';
import locales from 'locales';

import { LANG, TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

import { getDefaultColumns } from './index';

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

// Arranger shape of the participant's study (study.programs.hits.edges[].node).
const buildStudy = (programIds: string[]) => ({
  programs: {
    hits: {
      total: programIds.length,
      edges: programIds.map((program_id) => ({ node: { program_id } })),
    },
  },
});

const renderCell = (study: unknown) => {
  const column = (getDefaultColumns() as ProColumnType[]).find(
    (c) => c.key === 'study.programs.program_id',
  );
  if (!column?.render) throw new Error('Program column not found');
  const cell = column.render(study, {} as any, 0) as ReactNode;
  return render(<MemoryRouter>{cell}</MemoryRouter>);
};

describe('Data Exploration participants table - Program column', () => {
  beforeAll(() => {
    intl.init({ currentLocale: LANG.EN, locales, warningHandler: () => '' });
  });

  it('renders one link per program, pointing to the program page', () => {
    renderCell(buildStudy(['PROG-A', 'PROG-B']));

    const links = screen.getAllByRole('link');
    expect(links.map((link) => link.textContent)).toEqual(['PROG-A', 'PROG-B']);
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/programs/PROG-A',
      '/programs/PROG-B',
    ]);
    expect(screen.queryByText(TABLE_EMPTY_PLACE_HOLDER)).not.toBeInTheDocument();
  });

  it('renders the placeholder when the study has an empty programs list', () => {
    const { container } = renderCell(buildStudy([]));

    expect(container.textContent).toBe(TABLE_EMPTY_PLACE_HOLDER);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it.each([
    ['study is undefined', undefined],
    ['study is null', null],
    ['programs is missing', {}],
    ['hits is missing', { programs: {} }],
    ['edges is missing', { programs: { hits: { total: 0 } } }],
  ])('renders the placeholder when %s', (__, study) => {
    const { container } = renderCell(study);

    expect(container.textContent).toBe(TABLE_EMPTY_PLACE_HOLDER);
  });
});
