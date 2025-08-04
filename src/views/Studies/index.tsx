import React from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { CheckOutlined } from '@ant-design/icons';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { Popover } from 'antd';
import { INDEXES } from 'graphql/constants';
import { ArrangerResultsTree } from 'graphql/models';
import { IProgramEntity } from 'graphql/programs/models';
import { IStudyDataAccessCodes, IStudyEntity, ITableStudyEntity } from 'graphql/studies/models';
import EnvVariables from 'helpers/EnvVariables';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import { extractDuoTitleAndCode } from 'views/DataExploration/utils/helper';
import SideBarFacet from 'views/Studies/components/SideBarFacet';

import { FilterInfo } from 'components/uiKit/FilterList/types';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';
import { STATIC_ROUTES } from 'utils/routes';
import { truncateString } from 'utils/string';

import PageContent from './components/PageContent';
import { SCROLL_WRAPPER_ID } from './utils/constant';

import styles from './index.module.css';
const isProgramsEnabled: boolean = EnvVariables.configFor('PROGRAMS_ENABLED') === 'true';

const getDefaultColumns = (): ProColumnType<ITableStudyEntity>[] => [
  {
    key: 'study_code',
    dataIndex: 'study_code',
    title: intl.get('screen.studies.code'),
    sorter: { multiple: 1 },
    render: (study_code: string) => (
      <Link to={`${STATIC_ROUTES.STUDIES}/${study_code}`}>{study_code}</Link>
    ),
  },
  {
    dataIndex: 'name',
    key: 'name',
    title: intl.get('screen.studies.name'),
    sorter: { multiple: 1 },
    render: (name: string) => name || TABLE_EMPTY_PLACE_HOLDER,
  },
  ...(isProgramsEnabled
    ? [
        {
          key: 'programs.program_id',
          dataIndex: 'programs',
          title: intl.get('entities.program.program'),
          render: (programs: ArrangerResultsTree<IProgramEntity>) => {
            return programs?.hits?.edges?.map(({ node }) => (
              <div key={node.program_id}>
                <Link to={`${STATIC_ROUTES.PROGRAMS}/${node.program_id}`}>{node.program_id}</Link>
              </div>
            ));
          },
        },
      ]
    : []),
  {
    dataIndex: 'domain',
    key: 'domain',
    title: intl.get('screen.studies.domain'),
    sorter: { multiple: 1 },
    render: (domain: string) => domain || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    dataIndex: 'population',
    key: 'population',
    title: intl.get('screen.studies.population'),
    sorter: { multiple: 1 },
    defaultHidden: true,
    render: (population: string) => population || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'participant_count',
    title: intl.get('screen.studies.participants'),
    render: (study: IStudyEntity) => {
      if (!study?.participant_count) return TABLE_EMPTY_PLACE_HOLDER;
      const isRestricted = study ? study.security === 'R' : true;
      if (isRestricted) return numberFormat(study.participant_count);
      return (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'study_code',
                    value: [study.study_code],
                    index: INDEXES.STUDY,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {numberFormat(study.participant_count)}
        </Link>
      );
    },
  },
  {
    key: 'family_count',
    title: intl.get('screen.studies.families'),
    dataIndex: 'family_count',
    render: (family_count: number) =>
      family_count ? numberFormat(family_count) : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'file_count',
    title: intl.get('screen.studies.files'),
    render: (study: IStudyEntity) => {
      if (!study?.file_count) return TABLE_EMPTY_PLACE_HOLDER;
      const isRestricted = study ? study.security === 'R' : true;
      if (isRestricted) return numberFormat(study.file_count);
      return (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'study_code',
                    value: [study.study_code],
                    index: INDEXES.STUDY,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {numberFormat(study.file_count)}
        </Link>
      );
    },
  },
  {
    key: 'sample_count',
    title: intl.get('entities.biospecimen.biospecimens'),
    defaultHidden: true,
    render: (study: IStudyEntity) => {
      if (!study?.sample_count) return TABLE_EMPTY_PLACE_HOLDER;
      const isRestricted = study ? study.security === 'R' : true;
      if (isRestricted) return numberFormat(study.sample_count);
      return (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'study_code',
                    value: [study.study_code],
                    index: INDEXES.STUDY,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {numberFormat(study.sample_count)}
        </Link>
      );
    },
  },
  {
    key: 'genomics',
    title: intl.get('screen.studies.genomics'),
    align: 'center',
    render: (study: IStudyEntity) => {
      const elem = study.data_categories?.hits.edges.find(
        (item: any) => item.node.data_category === 'Genomics',
      );
      return elem?.node?.participant_count ? <CheckOutlined /> : TABLE_EMPTY_PLACE_HOLDER;
    },
  },
  {
    key: 'transcriptomics',
    title: intl.get('screen.studies.transcriptomics'),
    align: 'center',
    render: (study: IStudyEntity) => {
      const elem = study.data_categories?.hits.edges.find(
        (item: any) => item.node.data_category === 'Transcriptomics',
      );
      return elem?.node?.participant_count ? <CheckOutlined /> : TABLE_EMPTY_PLACE_HOLDER;
    },
  },
  {
    key: 'imaging',
    title: intl.get('screen.studies.imaging'),
    align: 'center',
    render: (study: IStudyEntity) => {
      const elem = study.data_categories?.hits.edges.find(
        (item: any) => item.node.data_category === 'Imaging',
      );
      return elem?.node?.participant_count ? <CheckOutlined /> : TABLE_EMPTY_PLACE_HOLDER;
    },
  },
  {
    key: 'access_limitations',
    title: intl.get('screen.studies.accessLimitation'),
    dataIndex: 'data_access_codes',
    defaultHidden: true,
    render: (data_access_codes: IStudyDataAccessCodes) => (
      <ExpandableCell
        nOfElementsWhenCollapsed={1}
        dataSource={data_access_codes?.access_limitations || []}
        dictionnary={{
          'see.less': intl.get('global.seeLess'),
          'see.more': intl.get('global.seeMore'),
        }}
        renderItem={(item, index) => {
          const info = extractDuoTitleAndCode(item);
          return info ? (
            <div key={index}>
              {info.title} (DUO:{' '}
              <ExternalLink
                href={`http://purl.obolibrary.org/obo/DUO_${info.code}`}
                className={styles.link}
              >
                {info.code}
              </ExternalLink>
              )
            </div>
          ) : (
            TABLE_EMPTY_PLACE_HOLDER
          );
        }}
      />
    ),
  },
  {
    key: 'access_requirements',
    title: intl.get('screen.studies.accessRequirement'),
    dataIndex: 'data_access_codes',
    defaultHidden: true,
    render: (data_access_codes: IStudyDataAccessCodes) => (
      <ExpandableCell
        nOfElementsWhenCollapsed={1}
        dataSource={data_access_codes?.access_requirements || []}
        dictionnary={{
          'see.less': intl.get('global.seeLess'),
          'see.more': intl.get('global.seeMore'),
        }}
        renderItem={(item, index) => {
          const info = extractDuoTitleAndCode(item);
          return info ? (
            <div key={index}>
              {info.title} (DUO:{' '}
              <ExternalLink
                href={`http://purl.obolibrary.org/obo/DUO_${info.code}`}
                className={styles.link}
              >
                {info.code}
              </ExternalLink>
              )
            </div>
          ) : (
            TABLE_EMPTY_PLACE_HOLDER
          );
        }}
      />
    ),
  },
  {
    key: 'description',
    title: intl.get('screen.studies.description'),
    dataIndex: 'description',
    defaultHidden: true,
    render: (description: string) => (
      <Popover content={description} trigger="hover">
        {truncateString(description, 20) || TABLE_EMPTY_PLACE_HOLDER}
      </Popover>
    ),
  },
  {
    dataIndex: 'study_designs',
    key: 'study_designs',
    title: intl.get('entities.study.design'),
    defaultHidden: true,
    render: (study_designs: string[]) => (
      <ExpandableCell
        nOfElementsWhenCollapsed={1}
        dataSource={study_designs || []}
        renderItem={(item, index) => <div key={index}>{item}</div>}
        dictionnary={{
          'see.less': intl.get('global.seeLess'),
          'see.more': intl.get('global.seeMore'),
        }}
      />
    ),
  },
  {
    dataIndex: 'data_collection_methods',
    key: 'data_collection_methods',
    title: intl.get('entities.study.data_collection_methods'),
    defaultHidden: true,
    render: (data_collection_methods: string[]) => (
      <ExpandableCell
        nOfElementsWhenCollapsed={1}
        dataSource={data_collection_methods || []}
        renderItem={(item, index) => <div key={index}>{item}</div>}
        dictionnary={{
          'see.less': intl.get('global.seeLess'),
          'see.more': intl.get('global.seeMore'),
        }}
      />
    ),
  },
  {
    dataIndex: 'principal_investigators',
    key: 'principal_investigators',
    title: intl.get('entities.study.principal_investigators'),
    defaultHidden: true,
    render: (principal_investigators: string[]) => (
      <ExpandableCell
        nOfElementsWhenCollapsed={1}
        dataSource={principal_investigators || []}
        renderItem={(item, index) => <div key={index}>{item}</div>}
        dictionnary={{
          'see.less': intl.get('global.seeLess'),
          'see.more': intl.get('global.seeMore'),
        }}
      />
    ),
  },
  {
    dataIndex: 'contact_names',
    key: 'contact_names',
    title: intl.get('entities.study.contact_names'),
    defaultHidden: true,
    render: (contact_names: string[]) => (
      <ExpandableCell
        nOfElementsWhenCollapsed={1}
        dataSource={contact_names || []}
        renderItem={(item, index) => <div key={index}>{item}</div>}
        dictionnary={{
          'see.less': intl.get('global.seeLess'),
          'see.more': intl.get('global.seeMore'),
        }}
      />
    ),
  },
  {
    dataIndex: 'contact_institutions',
    key: 'contact_institutions',
    title: intl.get('entities.study.contact_institutions'),
    defaultHidden: true,
    render: (contact_institutions: string[]) => (
      <ExpandableCell
        nOfElementsWhenCollapsed={1}
        dataSource={contact_institutions || []}
        renderItem={(item, index) => <div key={index}>{item}</div>}
        dictionnary={{
          'see.less': intl.get('global.seeLess'),
          'see.more': intl.get('global.seeMore'),
        }}
      />
    ),
  },
  {
    dataIndex: 'selection_criteria',
    key: 'selection_criteria',
    title: intl.get('entities.study.selection_criteria'),
    defaultHidden: true,
    render: (selection_criteria: string) => (
      <ExpandableCell
        nOfElementsWhenCollapsed={1}
        dataSource={Array.isArray(selection_criteria) ? selection_criteria : [selection_criteria]}
        renderItem={(item, index) => <div key={index}>{item}</div>}
        dictionnary={{
          'see.less': intl.get('global.seeLess'),
          'see.more': intl.get('global.seeMore'),
        }}
      />
    ),
  },
];

const Studies = () => {
  const studyMappingResults = useGetExtendedMappings(INDEXES.STUDY);

  const filterInfo: FilterInfo = {
    defaultOpenFacets: [
      'programs__program_id',
      'domain',
      'population',
      'data_access_codes__access_limitations',
      'data_access_codes__access_requirements',
      'data_categories__data_category',
      'study_designs',
      'data_collection_methods',
    ],
    groups: [
      {
        facets: [
          isProgramsEnabled && 'programs__program_id',
          'domain',
          'population',
          'data_access_codes__access_limitations',
          'data_access_codes__access_requirements',
          'data_categories__data_category',
          'study_designs',
          'data_collection_methods',
        ],
        tooltips: ['study_designs', 'data_collection_methods'],
      },
    ],
  };

  return (
    <div className={styles.studiesPage}>
      <SideBarFacet extendedMappingResults={studyMappingResults} filterInfo={filterInfo} />
      <ScrollContent id={SCROLL_WRAPPER_ID} className={styles.scrollContent}>
        <PageContent defaultColumns={getDefaultColumns()} />
      </ScrollContent>
    </div>
  );
};

export default Studies;
