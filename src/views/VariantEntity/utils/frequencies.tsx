import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ProColumnType, TProTableSummary } from '@ferlab/ui/core/components/ProTable/types';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import {
  formatQuotientOrElse,
  formatQuotientToExponentialOrElse,
  numberFormat,
  toExponentialNotation,
} from '@ferlab/ui/core/utils/numberUtils';
import { Button, Space, Tooltip } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IVariantEntity, IVariantStudyEntity } from 'graphql/variants/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { STATIC_ROUTES } from 'utils/routes';

import styles from '../index.module.scss';

export const getFrequenciesItems = (): ProColumnType[] => [
  {
    dataIndex: 'study_code',
    key: 'study_code',
    title: intl.get('entities.variant.frequencies.studies'),
    render: (study_code: string) => (
      <Link
        to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
        onClick={() =>
          addQuery({
            queryBuilderId: DATA_EXPLORATION_QB_ID,
            query: generateQuery({
              newFilters: [
                generateValueFilter({
                  field: 'study.study_code',
                  value: [study_code],
                  index: INDEXES.PARTICIPANT,
                }),
              ],
            }),
            setAsActive: true,
          })
        }
      >
        {study_code}
      </Link>
    ),
  },
  {
    title: intl.get('entities.study.domain'),
    key: 'domain',
    render: (study: IVariantStudyEntity) => study?.domain || TABLE_EMPTY_PLACE_HOLDER,
    width: '14%',
  },
  {
    title: intl.get('entities.variant.frequencies.participants'),
    iconTitle: (
      <Space>
        <Tooltip
          className={styles.dotted}
          title={intl.get('entities.variant.frequencies.participantsTooltip')}
        >
          {intl.get('entities.variant.frequencies.participants')}
        </Tooltip>
      </Space>
    ),
    key: 'participants',
    render: (row: IVariantStudyEntity) =>
      row?.participant_ids?.length ? (
        <>
          <Button
            type="link"
            href={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
            className={styles.frequencyParticipantLink}
            onClick={() =>
              addQuery({
                queryBuilderId: DATA_EXPLORATION_QB_ID,
                query: generateQuery({
                  newFilters: [
                    generateValueFilter({
                      field: 'participant_id',
                      index: INDEXES.PARTICIPANT,
                      value: row.participant_ids || [],
                    }),
                  ],
                }),
                setAsActive: true,
              })
            }
          >
            {numberFormat(row.total?.pc || 0)}
          </Button>
          {row.total?.pc && row.total?.pn ? ` / ${numberFormat(row.total?.pn)}` : ''}
        </>
      ) : (
        formatQuotientOrElse(row.total?.pc || NaN, row.total?.pn || NaN, TABLE_EMPTY_PLACE_HOLDER)
      ),
  },
  {
    title: intl.get('entities.variant.frequencies.frequency'),
    tooltip: intl.get('entities.variant.frequencies.frequencyTooltip'),
    key: 'frequency',
    render: (row: IVariantStudyEntity) => toExponentialNotation(row.total.af),
  },
  {
    title: intl.get('entities.variant.frequencies.altAlleles'),
    tooltip: intl.get('entities.variant.frequencies.altAllelesTooltip'),
    key: 'alt',
    render: (row: IVariantStudyEntity) => (row.total?.ac ? numberFormat(row.total.ac) : 0),
    width: '14%',
  },
  {
    title: intl.get('entities.variant.frequencies.homozygotes'),
    tooltip: intl.get('entities.variant.frequencies.homozygotesTooltip'),
    key: 'hom',
    render: (row: IVariantStudyEntity) => (row.total?.hom ? numberFormat(row.total?.hom) : 0),
    width: '14%',
  },
];

export const getFrequenciesTableSummaryColumns = (
  v?: IVariantEntity,
  studies?: IVariantStudyEntity[],
): TProTableSummary[] => {
  const totalNbOfParticipants = v?.internal_frequencies?.total?.pc || 0;
  const participantIds = studies?.map((study) => study.participant_ids || [])?.flat() || [];
  return [
    {
      index: 0,
      value: intl.get('entities.variant.frequencies.total'),
    },
    {
      index: 1,
      value: '',
    },
    {
      index: 2,
      value: participantIds.length ? (
        <>
          <Button
            type="link"
            href={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
            className={styles.frequencyParticipantLink}
            onClick={() =>
              addQuery({
                queryBuilderId: DATA_EXPLORATION_QB_ID,
                query: generateQuery({
                  newFilters: [
                    generateValueFilter({
                      field: 'participant_id',
                      index: INDEXES.PARTICIPANT,
                      value: participantIds || [],
                    }),
                  ],
                }),
                setAsActive: true,
              })
            }
          >
            {numberFormat(totalNbOfParticipants)}
          </Button>
          {v?.internal_frequencies?.total?.pn
            ? ` / ${numberFormat(v.internal_frequencies?.total?.pn)}`
            : ''}
        </>
      ) : (
        formatQuotientOrElse(
          totalNbOfParticipants,
          v?.internal_frequencies?.total?.pn || NaN,
          TABLE_EMPTY_PLACE_HOLDER,
        )
      ),
    },
    {
      index: 3,
      value: formatQuotientToExponentialOrElse(
        totalNbOfParticipants,
        v?.internal_frequencies?.total?.pn || NaN,
        TABLE_EMPTY_PLACE_HOLDER,
      ),
    },
    {
      index: 4,
      value: v?.internal_frequencies?.total?.ac ? numberFormat(v.internal_frequencies.total.ac) : 0,
    },
    {
      index: 4,
      value: v?.internal_frequencies?.total?.hom
        ? numberFormat(v.internal_frequencies.total.hom)
        : 0,
    },
  ];
};

export const getPublicCohorts = (): ProColumnType[] => [
  {
    dataIndex: 'cohort',
    key: 'cohort',
    render: (cohort: { cohortName: string; link?: string }) =>
      cohort.link ? (
        <a href={cohort.link} rel="noopener noreferrer" target="_blank">
          {cohort.cohortName}
        </a>
      ) : (
        cohort.cohortName
      ),
    title: intl.get('entities.variant.frequencies.cohort'),
  },
  {
    dataIndex: 'alt',
    key: 'alt',
    render: (alt: string | number | null) => {
      if (!alt) return TABLE_EMPTY_PLACE_HOLDER;
      return typeof alt === 'number' ? numberFormat(alt) : alt;
    },
    title: intl.get('entities.variant.frequencies.altAlleles'),
    tooltip: intl.get('entities.variant.frequencies.altAllelesTooltip'),
  },
  {
    dataIndex: 'altRef',
    key: 'altRef',
    render: (altRef: string | number | null) => {
      if (!altRef) return TABLE_EMPTY_PLACE_HOLDER;
      return typeof altRef === 'number' ? numberFormat(altRef) : altRef;
    },
    title: intl.get('entities.variant.frequencies.altRef'),
    tooltip: intl.get('entities.variant.frequencies.altRefTooltip'),
  },
  {
    dataIndex: 'homozygotes',
    key: 'homozygotes',
    render: (homozygotes: string | number | null) => {
      if (!homozygotes) return TABLE_EMPTY_PLACE_HOLDER;
      return typeof homozygotes === 'number' ? numberFormat(homozygotes) : homozygotes;
    },
    title: intl.get('entities.variant.frequencies.homozygotes'),
    tooltip: intl.get('entities.variant.frequencies.homozygotesTooltip'),
  },
  {
    dataIndex: 'frequency',
    key: 'frequency',
    render: (frequency: string) => frequency || TABLE_EMPTY_PLACE_HOLDER,
    title: intl.get('entities.variant.frequencies.frequency'),
  },
];
