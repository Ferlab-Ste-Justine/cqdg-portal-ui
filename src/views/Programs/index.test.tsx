import intl from 'react-intl-universal';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, within } from '@testing-library/react';
import { GET_PROGRAMS } from 'graphql/programs/queries';
import locales from 'locales';

import { LANG } from 'common/constants';
import { useLang } from 'store/global';

import ProgramsPage from './index';

// The page only needs the current language from the Redux store, so the hook
// is mocked instead of building a full store.
jest.mock('store/global', () => ({ useLang: jest.fn() }));

// Fictitious programs: only the fields the page and ProgramCard read are filled.
const buildProgram = (
  programId: string,
  nameEn: string,
  studyCodes: string[],
  participantsCount: number,
) => ({
  __typename: 'Program',
  id: programId,
  program_id: programId,
  name_en: nameEn,
  name_fr: `${nameEn} (FR)`,
  description_en: `${nameEn} description`,
  description_fr: `${nameEn} description (FR)`,
  website: '',
  citation_statement: '',
  logo_url: '',
  contacts: [],
  managers: [],
  partners: [],
  study_codes: studyCodes,
  studies: [],
  participants_count: participantsCount,
});

// Returned by the API in an order that differs from the expected display order.
const programs = [
  buildProgram('PROG-B', 'Beta', ['S1'], 100),
  buildProgram('PROG-C', 'Gamma', ['S1', 'S2'], 10),
  buildProgram('PROG-A', 'Alpha', ['S1'], 100),
  buildProgram('PROG-D', 'Delta', ['S1'], 500),
];

// Response to GET_PROGRAMS, in the Arranger shape (Program.hits.edges[].node).
const programsMock: MockedResponse = {
  request: { query: GET_PROGRAMS },
  result: {
    data: {
      Program: {
        __typename: 'Program',
        hits: {
          __typename: 'ProgramConnection',
          total: programs.length,
          edges: programs.map((node) => ({ __typename: 'ProgramEdge', node })),
        },
      },
    },
  },
};

const renderPage = () =>
  render(
    <MockedProvider mocks={[programsMock]} addTypename={false}>
      <MemoryRouter>
        <ProgramsPage />
      </MemoryRouter>
    </MockedProvider>,
  );

describe('ProgramsPage', () => {
  beforeAll(() => {
    intl.init({ currentLocale: LANG.EN, locales, warningHandler: () => '' });
  });

  beforeEach(() => {
    (useLang as jest.Mock).mockReturnValue(LANG.EN);
  });

  it('renders one card per program returned by the API', async () => {
    renderPage();

    expect(await screen.findByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByText('Gamma')).toBeInTheDocument();
    expect(screen.getByText('Delta')).toBeInTheDocument();
  });

  it('sorts by number of studies, then participants, then English name', async () => {
    renderPage();
    await screen.findByText('Alpha');

    const titles = screen.getAllByRole('heading', { level: 5 }).map((h) => h.textContent);
    // Gamma: 2 studies. Delta: 1 study, 500 participants.
    // Alpha and Beta: 1 study, 100 participants, so alphabetical order.
    expect(titles).toEqual(['Gamma', 'Delta', 'Alpha', 'Beta']);
  });

  it('shows the study count and links to the program page', async () => {
    renderPage();
    const title = await screen.findByText('Gamma');

    const card = title.closest('.ant-card') as HTMLElement;
    expect(within(card).getByText('2 studies')).toBeInTheDocument();
    expect(within(card).getByRole('link')).toHaveAttribute('href', '/programs/PROG-C');
  });

  it('displays French names when the language is French', async () => {
    (useLang as jest.Mock).mockReturnValue(LANG.FR);
    renderPage();

    expect(await screen.findByText('Alpha (FR)')).toBeInTheDocument();
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
  });
});
