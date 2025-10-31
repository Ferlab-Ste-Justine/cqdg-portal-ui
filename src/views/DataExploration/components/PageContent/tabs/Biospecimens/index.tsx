import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ColorTag from '@ferlab/ui/core/components/ColorTag';
import { ColorTagType } from '@ferlab/ui/core/components/ColorTag/index';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import ProTable from '@ferlab/ui/core/components/ProTable';
import { PaginationViewPerQuery } from '@ferlab/ui/core/components/ProTable/Pagination/constants';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { resetSearchAfterQueryConfig, tieBreaker } from '@ferlab/ui/core/components/ProTable/utils';
import useQueryBuilderState, {
  addQuery,
  updateActiveQueryField,
} from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { IQueryConfig } from '@ferlab/ui/core/graphql/types';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { Tooltip, Typography } from 'antd';
import { useBiospecimens } from 'graphql/biospecimens/actions';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { INDEXES } from 'graphql/constants';
import { ageCategories, ICodeDisplayMethod, IParticipantEntity } from 'graphql/participants/models';
import capitalize from 'lodash/capitalize';
import {
  BIOSPECIMENS_SAVED_SETS_FIELD,
  DATA_EXPLORATION_QB_ID,
  DEFAULT_BIOSPECIMEN_QUERY_SORT,
  DEFAULT_OFFSET,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  DEFAULT_QUERY_CONFIG,
  SCROLL_WRAPPER_ID,
} from 'views/DataExploration/utils/constant';
import { extractNcitTissueTitleAndCode } from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import DownloadSampleDataButton from 'components/reports/DownloadSamplelDataButton';
import SetsManagementDropdown from 'components/uiKit/SetsManagementDropdown';
import { SetType } from 'services/api/savedSet/models';
import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { formatQuerySortList, scrollToTop } from 'utils/helper';
import { STATIC_ROUTES } from 'utils/routes';
import { userColumnPreferencesOrDefault } from 'utils/tables';
import { getProTableDictionary } from 'utils/translation';

import styles from './index.module.css';

const getDefaultColumns = (): ProColumnType[] => [
  {
    key: 'sample_id',
    dataIndex: 'sample_id',
    title: intl.get('entities.biospecimen.sample_id'),
    render: (sample_id: string) => sample_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'biospecimen_id',
    dataIndex: 'biospecimen_id',
    title: intl.get('entities.biospecimen.biospecimen_id'),
    render: (biospecimen_id: string) =>
      biospecimen_id ? (
        <Typography.Link
          onClick={() =>
            updateActiveQueryField({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              field: 'biospecimen_id',
              value: [biospecimen_id],
              index: INDEXES.BIOSPECIMEN,
            })
          }
        >
          {biospecimen_id}
        </Typography.Link>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'participant.participant_id',
    dataIndex: 'participant',
    title: intl.get('entities.participant.participant_id'),
    render: (participant: IParticipantEntity) => (
      <Link to={`${STATIC_ROUTES.PARTICIPANTS}/${participant.participant_id}`}>
        {participant.participant_id}
      </Link>
    ),
  },
  {
    key: 'study_code',
    title: intl.get('entities.study.study'),
    dataIndex: 'study_code',
    sorter: { multiple: 1 },
    render: (study_code: string) => (
      <Link to={`${STATIC_ROUTES.STUDIES}/${study_code}`}>{study_code}</Link>
    ),
  },
  {
    key: 'sample_type',
    dataIndex: 'sample_type',
    title: intl.get('entities.biospecimen.sample_type'),
    sorter: { multiple: 1 },
    render: (sample_type: string) => {
      if (!sample_type) return TABLE_EMPTY_PLACE_HOLDER;
      const { code, title } = extractNcitTissueTitleAndCode(sample_type);
      return (
        <>
          {title} (NCIT:{' '}
          <ExternalLink href={`http://purl.obolibrary.org/obo/NCIT_${code}`}>{code}</ExternalLink>)
        </>
      );
    },
  },
  {
    key: 'biospecimen_tissue_source',
    dataIndex: 'biospecimen_tissue_source',
    title: intl.get('entities.biospecimen.biospecimen_tissue_source'),
    sorter: { multiple: 1 },
    render: (biospecimen_tissue_source: string) => {
      if (!biospecimen_tissue_source) return TABLE_EMPTY_PLACE_HOLDER;
      const { code, title } = extractNcitTissueTitleAndCode(biospecimen_tissue_source);
      if (!code) return biospecimen_tissue_source;
      return (
        <>
          {title} (NCIT:{' '}
          <ExternalLink href={`http://purl.obolibrary.org/obo/NCIT_${code}`}>{code}</ExternalLink>)
        </>
      );
    },
  },
  {
    key: 'cancer_biospecimen_type',
    dataIndex: 'cancer_biospecimen_type',
    title: intl.get('entities.biospecimen.cancer_biospecimen_type'),
    sorter: { multiple: 1 },
    defaultHidden: true,
    // render: (cancer_biospecimen_type: string) =>
    //   cancer_biospecimen_type || TABLE_EMPTY_PLACE_HOLDER,
    render: (cancer_biospecimen_type: string) => {
      if (!cancer_biospecimen_type) return TABLE_EMPTY_PLACE_HOLDER;
      const { code, title } = extractNcitTissueTitleAndCode(cancer_biospecimen_type);
      if (!code) return cancer_biospecimen_type;
      return (
        <>
          {title} (NCIT:{' '}
          <ExternalLink href={`http://purl.obolibrary.org/obo/NCIT_${code}`}>{code}</ExternalLink>)
        </>
      );
    },
  },
  {
    key: 'age_biospecimen_collection',
    dataIndex: 'age_biospecimen_collection',
    sorter: { multiple: 1 },
    title: intl.get('entities.biospecimen.age'),
    popoverProps: {
      title: <b>{intl.get('entities.biospecimen.age_biospecimen_collection')}</b>,
      content: ageCategories.map((category) => (
        <div key={category.key}>
          <b>{category.label}:</b>
          {` ${category.tooltip}`}
          <br />
        </div>
      )),
    },
    render: (age_biospecimen_collection: string) => {
      const category = ageCategories.find((cat) => cat.key === age_biospecimen_collection);
      if (!category) return TABLE_EMPTY_PLACE_HOLDER;
      return category.tooltip ? (
        <Tooltip className={styles.tooltip} title={category.tooltip}>
          {category.label}
        </Tooltip>
      ) : (
        category.label
      );
    },
  },
  {
    key: 'files',
    title: intl.get('entities.file.files'),
    render: (biospecimen: IBiospecimenEntity) => {
      const fileCount = biospecimen?.files?.hits?.total || 0;
      return fileCount ? (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'sample_id',
                    value: [biospecimen.sample_id],
                    index: INDEXES.BIOSPECIMEN,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {numberFormat(fileCount)}
        </Link>
      ) : (
        0
      );
    },
  },
  {
    key: 'tumor_normal_designation',
    dataIndex: 'tumor_normal_designation',
    title: intl.get('entities.biospecimen.tumor_normal_designation'),
    sorter: { multiple: 1 },
    render: (tumor_normal_designation: string) => (
      <ColorTag
        type={ColorTagType.TumorType}
        value={capitalize(tumor_normal_designation)}
      ></ColorTag>
    ),
  },
  {
    key: 'tumor_histological_type.display',
    dataIndex: 'tumor_histological_type',
    title: intl.get('entities.biospecimen.tumor_histological_type.display'),
    sorter: { multiple: 1 },
    defaultHidden: true,
    render: (value: ICodeDisplayMethod) => {
      if (!value?.display) return TABLE_EMPTY_PLACE_HOLDER;
      const { code, title } = extractNcitTissueTitleAndCode(value?.display);
      if (!code) return value?.display;
      return (
        <>
          {title} (NCIT:{' '}
          <ExternalLink href={`http://purl.obolibrary.org/obo/NCIT_${code}`}>{code}</ExternalLink>)
        </>
      );
    },
  },
  {
    key: 'tumor_histological_type.text',
    dataIndex: 'tumor_histological_type',
    title: intl.get('entities.biospecimen.tumor_histological_type.text'),
    sorter: { multiple: 1 },
    defaultHidden: true,
    render: (value: ICodeDisplayMethod) => value?.text || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'cancer_anatomic_location.display',
    dataIndex: 'cancer_anatomic_location',
    title: intl.get('entities.biospecimen.cancer_anatomic_location.display'),
    sorter: { multiple: 1 },
    defaultHidden: true,
    render: (value: ICodeDisplayMethod) => {
      if (!value?.display) return TABLE_EMPTY_PLACE_HOLDER;
      const { code, title } = extractNcitTissueTitleAndCode(value?.display);
      if (!code) return value?.display;
      return (
        <>
          {title} (NCIT:{' '}
          <ExternalLink href={`http://purl.obolibrary.org/obo/NCIT_${code}`}>{code}</ExternalLink>)
        </>
      );
    },
  },
  {
    key: 'cancer_anatomic_location.text',
    dataIndex: 'cancer_anatomic_location',
    title: intl.get('entities.biospecimen.cancer_anatomic_location.text'),
    sorter: { multiple: 1 },
    defaultHidden: true,
    render: (value: ICodeDisplayMethod) => value?.text || TABLE_EMPTY_PLACE_HOLDER,
  },
];

interface IBiospecimenTabProps {
  sqon?: ISqonGroupFilter;
}

const BiospecimenTab = ({ sqon }: IBiospecimenTabProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const { activeQuery } = useQueryBuilderState(DATA_EXPLORATION_QB_ID);
  const [selectedAllResults, setSelectedAllResults] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [selectedRows, setSelectedRows] = useState<IBiospecimenEntity[]>([]);
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX);
  const [queryConfig, setQueryConfig] = useState({
    ...DEFAULT_QUERY_CONFIG,
    sort: DEFAULT_BIOSPECIMEN_QUERY_SORT,
    size:
      userInfo?.config?.data_exploration?.tables?.biospecimens?.viewPerQuery || DEFAULT_PAGE_SIZE,
  });
  const results = useBiospecimens(
    {
      first: queryConfig.size,
      offset: DEFAULT_OFFSET,
      searchAfter: queryConfig.searchAfter,
      sqon,
      sort: tieBreaker({
        sort: queryConfig.sort,
        defaultSort: DEFAULT_BIOSPECIMEN_QUERY_SORT,
        field: 'sample_id',
        order: queryConfig.operations?.previous ? SortDirection.Desc : SortDirection.Asc,
      }),
    },
    queryConfig.operations,
  );

  const defaultCols = getDefaultColumns();
  const userCols = userInfo?.config.data_exploration?.tables?.biospecimens?.columns || [];
  const userColumns = userColumnPreferencesOrDefault(userCols, defaultCols);

  const getCurrentSqon = (): any =>
    selectedAllResults || !selectedKeys.length
      ? sqon
      : generateQuery({
          newFilters: [
            generateValueFilter({
              field: BIOSPECIMENS_SAVED_SETS_FIELD,
              index: INDEXES.BIOSPECIMEN,
              value: selectedRows.map((row) => row[BIOSPECIMENS_SAVED_SETS_FIELD]),
            }),
          ],
        });

  useEffect(() => {
    if (selectedKeys.length) {
      setSelectedKeys([]);
      setSelectedRows([]);
    }

    resetSearchAfterQueryConfig(
      {
        ...DEFAULT_QUERY_CONFIG,
        sort: DEFAULT_BIOSPECIMEN_QUERY_SORT,
        size:
          userInfo?.config?.data_exploration?.tables?.biospecimens?.viewPerQuery ||
          DEFAULT_PAGE_SIZE,
      },
      setQueryConfig,
    );
    setPageIndex(DEFAULT_PAGE_INDEX);

    // eslint-disable-next-line
  }, [JSON.stringify(activeQuery)]);

  useEffect(() => {
    if (queryConfig.firstPageFlag !== undefined || queryConfig.searchAfter === undefined) {
      return;
    }

    setQueryConfig({
      ...queryConfig,
      firstPageFlag: queryConfig.searchAfter,
    });
  }, [queryConfig]);

  return (
    <ProTable
      data-cy="ProTable_Biospecimens"
      tableId="biospecimen_table"
      columns={getDefaultColumns()}
      wrapperClassName={styles.biospecimenTabWrapper}
      loading={results.loading}
      initialColumnState={userInfo?.config.data_exploration?.tables?.biospecimens?.columns}
      enableRowSelection={true}
      showSorterTooltip={false}
      initialSelectedKey={selectedKeys}
      onChange={(_pagination, _filter, sorter) => {
        setPageIndex(DEFAULT_PAGE_INDEX);
        setQueryConfig({
          pageIndex: DEFAULT_PAGE_INDEX,
          size: queryConfig.size,
          sort: formatQuerySortList(sorter),
        } as IQueryConfig);
      }}
      headerConfig={{
        itemCount: {
          pageIndex: pageIndex,
          pageSize: queryConfig.size,
          total: results.total,
        },
        enableColumnSort: true,
        enableTableExport: true,
        onSelectAllResultsChange: setSelectedAllResults,
        onSelectedRowsChange: (keys, rows) => {
          setSelectedKeys(keys);
          setSelectedRows(rows);
        },
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({
              data_exploration: { tables: { biospecimens: { columns: newState } } },
            }),
          ),
        onTableExportClick: () =>
          dispatch(
            fetchTsvReport({
              columnStates: userColumns,
              columns: defaultCols,
              index: INDEXES.BIOSPECIMEN,
              sqon: getCurrentSqon(),
            }),
          ),
        extra: [
          <SetsManagementDropdown
            key={1}
            results={results}
            sqon={getCurrentSqon()}
            selectedAllResults={selectedAllResults}
            type={SetType.BIOSPECIMEN}
            selectedKeys={selectedKeys}
          />,
          <DownloadSampleDataButton key={2} sampleIds={selectedKeys} sqon={getCurrentSqon()} />,
        ],
      }}
      bordered
      size="small"
      pagination={{
        current: pageIndex,
        queryConfig,
        setQueryConfig,
        onChange: (page: number) => {
          scrollToTop(SCROLL_WRAPPER_ID);
          setPageIndex(page);
        },
        searchAfter: results.searchAfter,
        onViewQueryChange: (viewPerQuery: PaginationViewPerQuery) => {
          dispatch(
            updateUserConfig({
              data_exploration: {
                tables: {
                  biospecimens: {
                    ...userInfo?.config.data_exploration?.tables?.biospecimens,
                    viewPerQuery,
                  },
                },
              },
            }),
          );
        },
        defaultViewPerQuery: queryConfig.size,
      }}
      dataSource={results.data.map((i) => ({ ...i, key: i.sample_id }))}
      dictionary={getProTableDictionary()}
    />
  );
};

export default BiospecimenTab;
