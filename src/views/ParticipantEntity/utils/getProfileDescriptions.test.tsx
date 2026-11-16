import { ReactNode } from 'react';
import intl from 'react-intl-universal';
import { render } from '@testing-library/react';
import { IParticipantEntity } from 'graphql/participants/models';
import locales from 'locales';

import { LANG, TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

import getProfileDescriptions, { isAlive } from './getProfileDescriptions';

const buildParticipant = (overrides: Partial<IParticipantEntity> = {}): IParticipantEntity =>
  ({
    sex: 'female',
    gender: { code: 'woman', display: 'Woman' },
    race: { code: 'white', display: 'White', another_category: 'Other race' },
    age_at_recruitment: 'G-young adult',
    vital_status: 'Deceased',
    age_of_death: 'H-middle age',
    cause_of_death: 'Cancer',
    ...overrides,
  } as unknown as IParticipantEntity);

// Label -> rendered text, so assertions don't depend on the row order.
const renderRows = (participant?: IParticipantEntity): Record<string, string> =>
  Object.fromEntries(
    getProfileDescriptions(participant).map(({ label, value }) => {
      const { container, unmount } = render(<>{value as ReactNode}</>);
      const text = container.textContent ?? '';
      unmount();
      return [label as string, text];
    }),
  );

describe('isAlive', () => {
  it.each(['Alive', 'alive', 'ALIVE', ' Alive '])('is true for "%s"', (value) => {
    expect(isAlive(value)).toBe(true);
  });

  it.each(['Deceased', 'Unknown', '', undefined])('is false for "%s"', (value) => {
    expect(isAlive(value)).toBe(false);
  });
});

describe.each([
  {
    lang: LANG.EN,
    labels: {
      sex: 'Sex',
      gender: 'Gender',
      race: 'Race',
      raceOther: 'Race (Other)',
      ageAtRecruitment: 'Age at Recruitment',
      vitalStatus: 'Vital Status',
      ageOfDeath: 'Age at Death',
      causeOfDeath: 'Cause of Death',
    },
  },
  {
    lang: LANG.FR,
    labels: {
      sex: 'Sexe',
      gender: 'Genre',
      race: 'Race',
      raceOther: 'Race (autre)',
      ageAtRecruitment: 'Âge au recrutement',
      vitalStatus: 'Statut vital',
      ageOfDeath: 'Âge au décès',
      causeOfDeath: 'Cause du décès',
    },
  },
])('getProfileDescriptions ($lang)', ({ lang, labels }) => {
  beforeAll(() => {
    intl.init({ currentLocale: lang, locales, warningHandler: () => '' });
  });

  it('keeps the same rows, in the same order', () => {
    expect(getProfileDescriptions(buildParticipant()).map((row) => row.label)).toEqual([
      labels.sex,
      labels.gender,
      labels.race,
      labels.raceOther,
      labels.ageAtRecruitment,
      labels.vitalStatus,
      labels.ageOfDeath,
      labels.causeOfDeath,
    ]);
  });

  it('displays every value of a deceased participant', () => {
    const rows = renderRows(buildParticipant());

    expect(rows[labels.sex]).toBe('Female');
    expect(rows[labels.gender]).toBe('Woman');
    expect(rows[labels.race]).toBe('White');
    expect(rows[labels.raceOther]).toBe('Other race');
    expect(rows[labels.ageAtRecruitment]).toBe('Young Adult (>= 16 years and < 40 years)');
    expect(rows[labels.vitalStatus]).toBe('Deceased');
    expect(rows[labels.ageOfDeath]).toBe('Middle Age (>= 40 years and < 60 years)');
    expect(rows[labels.causeOfDeath]).toBe('Cancer');
  });

  it.each(['Alive', 'alive', 'ALIVE'])(
    'never displays death data for a participant whose vital status is "%s"',
    (vital_status) => {
      const rows = renderRows(buildParticipant({ vital_status }));

      expect(rows[labels.vitalStatus]).toBe(vital_status);
      expect(rows[labels.ageOfDeath]).toBe(TABLE_EMPTY_PLACE_HOLDER);
      expect(rows[labels.causeOfDeath]).toBe(TABLE_EMPTY_PLACE_HOLDER);
    },
  );

  it('leaves the other rows untouched for a living participant', () => {
    const rows = renderRows(buildParticipant({ vital_status: 'Alive' }));

    expect(rows[labels.sex]).toBe('Female');
    expect(rows[labels.gender]).toBe('Woman');
    expect(rows[labels.race]).toBe('White');
    expect(rows[labels.raceOther]).toBe('Other race');
    expect(rows[labels.ageAtRecruitment]).toBe('Young Adult (>= 16 years and < 40 years)');
  });

  it('displays the placeholder for missing values', () => {
    const rows = renderRows(
      buildParticipant({
        gender: undefined,
        race: undefined,
        age_at_recruitment: '',
        vital_status: '',
        age_of_death: '',
        cause_of_death: '',
      } as unknown as Partial<IParticipantEntity>),
    );

    expect(rows[labels.gender]).toBe(TABLE_EMPTY_PLACE_HOLDER);
    expect(rows[labels.race]).toBe(TABLE_EMPTY_PLACE_HOLDER);
    expect(rows[labels.raceOther]).toBe(TABLE_EMPTY_PLACE_HOLDER);
    expect(rows[labels.ageAtRecruitment]).toBe(TABLE_EMPTY_PLACE_HOLDER);
    expect(rows[labels.vitalStatus]).toBe(TABLE_EMPTY_PLACE_HOLDER);
    expect(rows[labels.ageOfDeath]).toBe(TABLE_EMPTY_PLACE_HOLDER);
    expect(rows[labels.causeOfDeath]).toBe(TABLE_EMPTY_PLACE_HOLDER);
  });

  it('displays placeholders without crashing when there is no participant', () => {
    const rows = renderRows(undefined);

    expect(rows[labels.ageOfDeath]).toBe(TABLE_EMPTY_PLACE_HOLDER);
    expect(rows[labels.causeOfDeath]).toBe(TABLE_EMPTY_PLACE_HOLDER);
  });
});
