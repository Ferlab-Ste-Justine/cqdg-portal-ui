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

  it('prefixes the path with /en/ when the language is English', () => {
    mockLang = LANG.EN;

    expect(getDocUrl('acces-aux-donnees/')).toBe('https://docs.example.test/en/acces-aux-donnees/');
  });

  it('uses the root path when the language is French', () => {
    mockLang = LANG.FR;

    expect(getDocUrl('acces-aux-donnees/')).toBe('https://docs.example.test/acces-aux-donnees/');
  });

  it('falls back to the French root for an unknown language', () => {
    mockLang = 'de';

    expect(getDocUrl('acces-aux-donnees/')).toBe('https://docs.example.test/acces-aux-donnees/');
  });

  it('points to the documentation home when no path is given', () => {
    mockLang = LANG.EN;

    expect(getDocUrl()).toBe('https://docs.example.test/en/');
  });
});
