import QueryBuilder from '@ferlab/ui/core/components/QueryBuilder';
import { ReadOutlined, UserOutlined } from '@ant-design/icons';
import {
  STUDIES_EXPLORATION_QB_ID,
  DEFAULT_PAGE_INDEX,
  DEFAULT_QUERY_CONFIG,
  TAB_IDS,
} from 'views/Studies/utils/constant';
import intl from 'react-intl-universal';
import { ExtendedMapping, ExtendedMappingResults } from 'graphql/models';
import { getQueryBuilderDictionary } from 'utils/translation';
import { Space, Tabs } from 'antd';
import { combineExtendedMappings } from 'utils/fieldMapper';
import { isEmptySqon, resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import StudiesTab from 'views/Studies/components/PageContent/tabs/Studies';
import { ReactElement, useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import GenericFilters from 'components/uiKit/FilterList/GenericFilters';
import { dotToUnderscore } from '@ferlab/ui/core/data/arranger/formatting';
import { ArrangerApi } from 'services/api/arranger';
import { GET_STUDIES_COUNT } from 'graphql/studies/queries';

import styles from './index.module.scss';
import { IStudyResultTree } from 'graphql/studies/models';
import { useStudies } from 'graphql/studies/actions';
import { INDEXES } from 'graphql/constants';
import useQueryBuilderState from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';

type OwnProps = {
  studiesMapping: ExtendedMappingResults;
  tabId?: string;
};

const PageContent = ({ studiesMapping }: OwnProps) => {
  const { queryList, activeQuery } = useQueryBuilderState(STUDIES_EXPLORATION_QB_ID);
  const [selectedFilterContent, setSelectedFilterContent] = useState<ReactElement | undefined>(
    undefined,
  );
  const [studiesQueryConfig, setStudiesQueryConfig] = useState(DEFAULT_QUERY_CONFIG);
  const studiesResolvedSqon = resolveSyntheticSqon(queryList, activeQuery);

  const studiesResults = useStudies({
    first: studiesQueryConfig.size,
    offset: studiesQueryConfig.size * (studiesQueryConfig.pageIndex - 1),
    sqon: studiesResolvedSqon,
    sort: isEmpty(studiesQueryConfig.sort)
      ? [{ field: 'name', order: 'asc' }]
      : studiesQueryConfig.sort,
  });

  useEffect(() => {
    setStudiesQueryConfig({
      ...studiesQueryConfig,
      pageIndex: DEFAULT_PAGE_INDEX,
    });
    // eslint-disable-next-line
  }, [JSON.stringify(activeQuery)]);

  const facetTransResolver = (key: string) => {
    const title = intl.get(`facets.${key}`);
    return title
      ? title
      : combineExtendedMappings([studiesMapping])?.data?.find(
          (mapping: ExtendedMapping) => key === mapping.field,
        )?.displayName || key;
  };

  return (
    <Space direction="vertical" size={24} className={styles.studyExplorePageContent}>
      <QueryBuilder
        id={STUDIES_EXPLORATION_QB_ID}
        className="studies-exploration-repo__query-builder"
        headerConfig={{
          showHeader: false,
          showTools: false,
        }}
        facetFilterConfig={{
          enable: true,
          onFacetClick: (filter) => {
            const field = filter.content.field;
            setSelectedFilterContent(
              <GenericFilters
                queryBuilderId={STUDIES_EXPLORATION_QB_ID}
                index={INDEXES.STUDY}
                field={dotToUnderscore(field)}
                sqon={studiesResolvedSqon}
                extendedMappingResults={studiesMapping}
              />,
            );
          },
          selectedFilterContent: selectedFilterContent,
        }}
        enableCombine
        enableShowHideLabels
        IconTotal={<UserOutlined size={18} />}
        currentQuery={isEmptySqon(activeQuery) ? {} : activeQuery}
        total={studiesResults.total}
        dictionary={getQueryBuilderDictionary(facetTransResolver, [])}
        getResolvedQueryForCount={(sqon) => resolveSyntheticSqon(queryList, sqon)}
        fetchQueryCount={async (sqon) => {
          const { data } = await ArrangerApi.graphqlRequest<{ data: IStudyResultTree }>({
            query: GET_STUDIES_COUNT.loc?.source.body,
            variables: {
              sqon: resolveSyntheticSqon(queryList, sqon),
            },
          });

          return data?.data?.Study.hits.total ?? 0;
        }}
      />
      <Tabs type="card" className="navNoMarginBtm" activeKey={TAB_IDS.STUDIES}>
        <Tabs.TabPane
          tab={
            <span>
              <ReadOutlined />
              {intl.get('screen.studyExploration.tabs.studies.title')}
            </span>
          }
          key={TAB_IDS.STUDIES}
        >
          <StudiesTab
            results={studiesResults}
            setQueryConfig={setStudiesQueryConfig}
            queryConfig={studiesQueryConfig}
            sqon={studiesResolvedSqon}
          />
        </Tabs.TabPane>
      </Tabs>
    </Space>
  );
};

export default PageContent;