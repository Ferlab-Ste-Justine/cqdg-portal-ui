import EnvVariables from 'helpers/EnvVariables';

import { LANG } from 'common/constants';

import { getDocUrl } from './doc';

// getDocUrl only reads the current language from the store, so the store is replaced by a stub.
let mockLang: string = LANG.EN;
jest.mock('store', () => ({
  __esModule: true,
  default: () => ({ store: { getState: () => ({ global: { lang: mockLang } }) } }),
}));

describe('getDocUrl', () => {
  beforeEach(() => {
    // Stub the env var so the expected URL does not depend on the local .env file.
    jest
      .spyOn(EnvVariables, 'configFor')
      .mockImplementation((key) =>
        key === 'CQDG_DOCUMENTATION' ? 'https://docs.example.test' : '',
      );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("préfixe le chemin par /en/ quand la langue est l'anglais", () => {
    mockLang = LANG.EN;

    expect(getDocUrl('acces-aux-donnees/')).toBe('https://docs.example.test/en/acces-aux-donnees/');
  });

  it('utilise la racine quand la langue est le français', () => {
    mockLang = LANG.FR;

    expect(getDocUrl('acces-aux-donnees/')).toBe('https://docs.example.test/acces-aux-donnees/');
  });

  it('utilise la racine française pour une langue inconnue', () => {
    mockLang = 'de';

    expect(getDocUrl('acces-aux-donnees/')).toBe('https://docs.example.test/acces-aux-donnees/');
  });

  it("pointe vers l'accueil de la documentation sans chemin", () => {
    mockLang = LANG.EN;

    expect(getDocUrl()).toBe('https://docs.example.test/en/');
  });
});
