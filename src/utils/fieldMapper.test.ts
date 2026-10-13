import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { INDEXES } from 'graphql/constants';

import {
  combineExtendedMappings,
  getIdFieldByType,
  mapFilterForBiospecimen,
  mapFilterForFiles,
  mapFilterForParticipant,
  mapFilterForStudies,
  mapFilterForVariant,
} from './fieldMapper';

// A filter on `field` coming from the facets of `index`.
const valueFilter = (index: string, field: string, value: string[] = ['x']) => ({
  op: 'in',
  content: { field, value, index },
});

// One filter per index, combined with "and".
const filterOnEveryIndex = (): ISqonGroupFilter => ({
  op: 'and',
  content: [
    valueFilter(INDEXES.PARTICIPANT, 'sex'),
    valueFilter(INDEXES.FILE, 'data_type'),
    valueFilter(INDEXES.BIOSPECIMEN, 'sample_type'),
    valueFilter(INDEXES.STUDY, 'study_code'),
    valueFilter(INDEXES.VARIANT, 'chromosome'),
  ],
});

const fieldsOf = (sqon: ISqonGroupFilter) => sqon.content.map((c: any) => c.content.field);

describe('mapFilterFor*', () => {
  // Each mapper rewrites the fields of the other indexes so that they can be
  // queried from its own index (e.g. a file filter becomes "files.data_type"
  // when querying participants). Fields of other indexes stay unchanged.
  it.each([
    [
      'mapFilterForParticipant',
      mapFilterForParticipant,
      ['sex', 'files.data_type', 'biospecimens.sample_type', 'study.study_code', 'chromosome'],
    ],
    [
      'mapFilterForFiles',
      mapFilterForFiles,
      [
        'participants.sex',
        'data_type',
        'biospecimens.sample_type',
        'study.study_code',
        'chromosome',
      ],
    ],
    [
      'mapFilterForBiospecimen',
      mapFilterForBiospecimen,
      ['participant.sex', 'files.data_type', 'sample_type', 'study.study_code', 'chromosome'],
    ],
    [
      'mapFilterForVariant',
      mapFilterForVariant,
      ['sex', 'data_type', 'sample_type', 'studies.study_code', 'chromosome'],
    ],
    [
      'mapFilterForStudies',
      mapFilterForStudies,
      ['sex', 'data_type', 'sample_type', 'study_code', 'chromosome'],
    ],
  ])('%s prefixes fields by index', (_name, mapper, expectedFields) => {
    expect(fieldsOf(mapper(filterOnEveryIndex()))).toEqual(expectedFields);
  });

  it('keeps the operator, value and index of each filter', () => {
    const sqon: ISqonGroupFilter = {
      op: 'or',
      content: [valueFilter(INDEXES.FILE, 'data_type', ['WGS', 'WXS'])],
    };

    expect(mapFilterForParticipant(sqon)).toEqual({
      op: 'or',
      content: [
        {
          op: 'in',
          content: { field: 'files.data_type', value: ['WGS', 'WXS'], index: INDEXES.FILE },
        },
      ],
    });
  });

  it('maps filters nested in boolean operators', () => {
    const sqon: ISqonGroupFilter = {
      op: 'and',
      content: [
        {
          op: 'not',
          content: [
            {
              op: 'or',
              content: [
                valueFilter(INDEXES.FILE, 'data_type'),
                valueFilter(INDEXES.PARTICIPANT, 'sex'),
              ],
            },
          ],
        },
      ],
    } as ISqonGroupFilter;

    const nested = (mapFilterForParticipant(sqon).content[0] as any).content[0];
    expect(nested.op).toBe('or');
    expect(fieldsOf(nested)).toEqual(['files.data_type', 'sex']);
  });

  it('does not modify the filter it receives', () => {
    const sqon = filterOnEveryIndex();
    const copy = JSON.parse(JSON.stringify(sqon));

    mapFilterForParticipant(sqon);

    expect(sqon).toEqual(copy);
  });

  it('returns an empty filter unchanged', () => {
    const empty: ISqonGroupFilter = { op: 'and', content: [] };

    expect(mapFilterForParticipant(empty)).toBe(empty);
  });
});

describe('combineExtendedMappings', () => {
  const mapping = (field: string) => ({
    active: true,
    displayName: field,
    isArray: false,
    type: 'keyword',
    field,
  });

  it('concatenates the mappings of every index, in order', () => {
    const result = combineExtendedMappings([
      { loading: true, data: [mapping('sex'), mapping('age')] },
      { loading: false, data: [mapping('data_type')] },
    ]);

    expect(result.data.map((m) => m.field)).toEqual(['sex', 'age', 'data_type']);
  });

  it('is never loading, even if an input mapping is', () => {
    expect(combineExtendedMappings([{ loading: true, data: [] }]).loading).toBe(false);
  });

  it('returns no mappings for an empty list', () => {
    expect(combineExtendedMappings([])).toEqual({ loading: false, data: [] });
  });
});

describe('getIdFieldByType', () => {
  it.each([
    [INDEXES.BIOSPECIMEN, 'sample_id'],
    [INDEXES.PARTICIPANT, 'participant_id'],
    [INDEXES.FILE, 'stable_file_id'],
    [INDEXES.VARIANT, 'locus'],
    [INDEXES.STUDY, 'study_code'],
  ])('returns the id field of %s', (type, expected) => {
    expect(getIdFieldByType(type)).toBe(expected);
  });

  it('returns an empty string for an index without id field', () => {
    expect(getIdFieldByType(INDEXES.GENE)).toBe('');
    expect(getIdFieldByType('unknown')).toBe('');
  });
});
