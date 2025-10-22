import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useLocation, useParams } from 'react-router-dom';
import { IAnchorLink } from '@ferlab/ui/core/components/AnchorMenu';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import EntityPage, { EntityDescriptions, EntityTitleLogo } from '@ferlab/ui/core/pages/EntityPage';
import { useKeycloak } from '@react-keycloak/web';
import { Space } from 'antd';
import { INDEXES } from 'graphql/constants';
import useFileResolvedSqon from 'graphql/files/useFileResolvedSqon';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import { useStudy } from 'graphql/studies/actions';
import { pageId, queryId } from 'views/StudyEntity/utils/constant';

import { MAX_ITEMS_QUERY } from 'common/constants';
import LoginModal from 'components/Layout/PublicHeader/LoginModal';
import DownloadClinicalDataButton from 'components/reports/DownloadClinicalDataButton';
import DownloadFileManifestModal from 'components/reports/DownloadFileManifestModal';
import DownloadRequestAccessModal from 'components/reports/DownloadRequestAccessModal';
import { PUBLIC_ROUTES } from 'utils/routes';

import getDataAccessDescriptions from './utils/getDataAccessDescriptions';
import getSummaryDescriptions from './utils/getSummaryDescriptions';
import { getLogoByStudyCode } from './utils/title';
import Datasets from './Datasets';
import FilesTable from './FilesTable';
import SummaryHeader from './SummaryHeader';

const StudyEntity = () => {
  const { study_code = '' } = useParams<{ study_code: string }>();
  const participantSqon = useParticipantResolvedSqon(queryId);
  const fileSqon = useFileResolvedSqon(queryId);

  const location = useLocation();
  const { keycloak } = useKeycloak();
  const isAuthenticated = keycloak.authenticated;
  const isPublicStudyPage =
    !isAuthenticated && PUBLIC_ROUTES.some((route) => location.pathname.includes(route));

  const [loginModalUri, setLoginModalUri] = useState('');

  const { data: study, loading } = useStudy({
    field: 'study_code',
    value: study_code,
  });

  const hasTooManyFiles = (study?.file_count || 0) > MAX_ITEMS_QUERY;
  const isRestricted = study ? study.security === 'R' : true;
  const hasFamily = !!study?.family_count;

  enum SectionId {
    SUMMARY = 'summary',
    DATA_ACCESS = 'data_access',
    DATASET = 'dataset',
    DATA_FILE = 'data_file',
  }

  const defaultLinks: any = [
    { href: `#${SectionId.SUMMARY}`, title: intl.get('global.summary') },
    {
      href: `#${SectionId.DATA_ACCESS}`,
      title: intl.get('entities.study.data_access'),
    },
    ...[
      study?.datasets && {
        href: `#${SectionId.DATASET}`,
        title: intl.get('entities.file.specialized_datasets'),
      },
    ],
    ...[
      !isRestricted && {
        href: `#${SectionId.DATA_FILE}`,
        title: intl.get('entities.file.datafile'),
      },
    ],
  ];
  const links: IAnchorLink[] = defaultLinks.filter((link: IAnchorLink) => link);

  /** We initialize here a sqon by queryBuilderId to handle graphs and actions */
  useEffect(() => {
    if (study_code) {
      addQuery({
        queryBuilderId: queryId,
        query: generateQuery({
          newFilters: [
            generateValueFilter({
              field: 'study_code',
              value: [study_code],
              index: INDEXES.STUDY,
            }),
          ],
        }),
        setAsActive: true,
      });
    }
  }, [study_code]);

  return (
    <EntityPage loading={loading} data={study} links={links} pageId={pageId}>
      <EntityTitleLogo
        logo={getLogoByStudyCode(study?.study_code)}
        title={study?.name}
        loading={loading}
        extra={
          !isPublicStudyPage && (
            <Space>
              {!isRestricted && study && <DownloadClinicalDataButton sqon={participantSqon} />}
              {!isRestricted && study && (
                <DownloadFileManifestModal
                  sqon={fileSqon}
                  hasTooManyFiles={hasTooManyFiles}
                  hasFamily={hasFamily}
                  isStudy
                />
              )}
              {study && (
                <DownloadRequestAccessModal
                  sqon={fileSqon}
                  buttonType={'primary'}
                  withoutFiles
                  isRestricted={isRestricted}
                  study={study}
                />
              )}
            </Space>
          )
        }
      />
      <EntityDescriptions
        id={SectionId.SUMMARY}
        loading={loading}
        descriptions={getSummaryDescriptions(study)}
        header={intl.get('global.summary')}
        subheader={
          <SummaryHeader
            study={study}
            isRestricted={isRestricted}
            setLoginModalUri={isPublicStudyPage ? setLoginModalUri : undefined}
          />
        }
      />
      <EntityDescriptions
        id={SectionId.DATA_ACCESS}
        loading={loading}
        descriptions={getDataAccessDescriptions(study)}
        header={intl.get('entities.file.data_access')}
        title={intl.get('entities.file.data_access')}
      />
      {study?.datasets && (
        <Datasets
          id={SectionId.DATASET}
          loading={loading}
          title={intl.get('entities.file.specialized_datasets')}
          datasets={study?.datasets}
          study_code={study_code}
          setLoginModalUri={isPublicStudyPage ? setLoginModalUri : undefined}
        />
      )}
      {!isRestricted && (
        <FilesTable
          id={SectionId.DATA_FILE}
          study={study}
          loading={loading}
          setLoginModalUri={isPublicStudyPage ? setLoginModalUri : undefined}
        />
      )}
      {isPublicStudyPage && (
        <LoginModal
          isOpen={!!loginModalUri}
          onClose={() => setLoginModalUri('')}
          redirectUri={loginModalUri}
        />
      )}
    </EntityPage>
  );
};

export default StudyEntity;
