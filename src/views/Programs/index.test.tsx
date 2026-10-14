import intl from 'react-intl-universal';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, screen, within } from '@testing-library/react';
import { GET_PROGRAMS } from 'graphql/programs/queries';
import EnvVariables from 'helpers/EnvVariables';
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
  logoUrl = '',
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
  logo_url: logoUrl,
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
  buildProgram('PROG-Z', 'Zulu', ['S1'], 100),
  buildProgram('PROG-F', 'Foxtrot', ['S1'], 20),
];

// Response to GET_PROGRAMS, in the Arranger shape (Program.hits.edges[].node).
const buildProgramsMock = (nodes: ReturnType<typeof buildProgram>[]): MockedResponse => ({
  request: { query: GET_PROGRAMS },
  result: {
    data: {
      Program: {
        __typename: 'Program',
        hits: {
          __typename: 'ProgramConnection',
          total: nodes.length,
          edges: nodes.map((node) => ({ __typename: 'ProgramEdge', node })),
        },
      },
    },
  },
});

const renderPage = (nodes = programs) =>
  render(
    <MockedProvider mocks={[buildProgramsMock(nodes)]} addTypename={false}>
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
    // Alpha, Beta and Zulu: 1 study, 100 participants, so alphabetical order.
    // Foxtrot: 1 study, 20 participants, so last despite its name.
    expect(titles).toEqual(['Gamma', 'Delta', 'Alpha', 'Beta', 'Zulu', 'Foxtrot']);
  });

  it('keeps the API order for programs that are equal on every sort criterion', async () => {
    // Same study count, participants and English name: the comparator returns 0,
    // and Array.prototype.sort is stable, so the API order is preserved.
    renderPage([
      buildProgram('PROG-E2', 'Echo', ['S1'], 50),
      buildProgram('PROG-E1', 'Echo', ['S1'], 50),
    ]);
    await screen.findAllByText('Echo');

    const links = screen.getAllByRole('link').map((link) => link.getAttribute('href'));
    expect(links).toEqual(['/programs/PROG-E2', '/programs/PROG-E1']);
  });

  it('shows the study count and links to the program page', async () => {
    renderPage();
    const title = await screen.findByText('Gamma');

    const card = title.closest('.ant-card') as HTMLElement;
    expect(within(card).getByText('2 studies')).toBeInTheDocument();
    expect(within(card).getByRole('link')).toHaveAttribute('href', '/programs/PROG-C');
  });

  it('shows the program logo from the S3 assets URL when one is set', async () => {
    // Stub the env var so the expected URL does not depend on the local .env file.
    const configFor = jest
      .spyOn(EnvVariables, 'configFor')
      .mockImplementation((key) => (key === 'S3_ASSETS_URL' ? 'https://assets.example.test/' : ''));
    renderPage([buildProgram('PROG-L', 'Lima', ['S1'], 1, 'programs/lima.png')]);

    const logo = await screen.findByRole('img', { name: 'PROG-L' });
    expect(logo).toHaveAttribute('src', 'https://assets.example.test/programs/lima.png');
    configFor.mockRestore();
  });

  it('displays French names when the language is French', async () => {
    (useLang as jest.Mock).mockReturnValue(LANG.FR);
    renderPage();

    expect(await screen.findByText('Alpha (FR)')).toBeInTheDocument();
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
  });
});
