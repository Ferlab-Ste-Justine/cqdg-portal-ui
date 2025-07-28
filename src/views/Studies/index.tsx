import React from 'react';
import { useLocation } from 'react-router-dom';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { INDEXES } from 'graphql/constants';
import EnvVariables from 'helpers/EnvVariables';
import SideBarFacet from 'views/Studies/components/SideBarFacet';

import { FilterInfo } from 'components/uiKit/FilterList/types';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';
import { STATIC_ROUTES } from 'utils/routes';

import PageContent from './components/PageContent';
import { SCROLL_WRAPPER_ID } from './utils/constant';
import getDefaultColumns from './utils/getDefaultColumns';

import styles from './index.module.css';

const isProgramsEnabled: boolean = EnvVariables.configFor('PROGRAMS_ENABLED') === 'true';

const Studies = () => {
  const studyMappingResults = useGetExtendedMappings(INDEXES.STUDY);
  const location = useLocation();
  const isPublicStudiesPage = location.pathname === STATIC_ROUTES.PUBLIC_STUDIES;

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
      {!isPublicStudiesPage && (
        <SideBarFacet extendedMappingResults={studyMappingResults} filterInfo={filterInfo} />
      )}
      <ScrollContent id={SCROLL_WRAPPER_ID} className={styles.scrollContent}>
        <PageContent defaultColumns={getDefaultColumns()} />
      </ScrollContent>
    </div>
  );
};

export default Studies;
