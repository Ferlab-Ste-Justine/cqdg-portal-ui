import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { CheckOutlined } from '@ant-design/icons';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { Popover } from 'antd';
import { ArrangerResultsTree } from 'graphql/models';
import { IProgramEntity } from 'graphql/programs/models';
import { IStudyEntity, ITableStudyEntity } from 'graphql/studies/models';
import EnvVariables from 'helpers/EnvVariables';

import { STATIC_ROUTES } from 'utils/routes';
import { truncateString } from 'utils/string';

const isProgramsEnabled: boolean = EnvVariables.configFor('PROGRAMS_ENABLED') === 'true';

const getPublicDefaultColumns = (
  setLoginModalUri: (value: string) => void,
): ProColumnType<ITableStudyEntity>[] => [
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
                <Link
                  to={''}
                  onClick={() => setLoginModalUri(`${STATIC_ROUTES.PROGRAMS}/${node.program_id}`)}
                >
                  {node.program_id}
                </Link>
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
    dataIndex: 'principal_investigators',
    key: 'principal_investigators',
    title: intl.get('entities.study.principal_investigators'),
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
    key: 'description',
    title: intl.get('screen.studies.description'),
    dataIndex: 'description',
    render: (description: string) => (
      <Popover content={description} trigger="hover">
        {truncateString(description, 20) || TABLE_EMPTY_PLACE_HOLDER}
      </Popover>
    ),
  },
  {
    key: 'participant_count',
    title: intl.get('screen.studies.participants'),
    render: (study: IStudyEntity) => {
      if (!study?.participant_count) return TABLE_EMPTY_PLACE_HOLDER;
      const isRestricted = study ? study.security === 'R' : true;
      if (isRestricted) return numberFormat(study.participant_count);
      return (
        <Link to={''} onClick={() => setLoginModalUri(STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS)}>
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
];

export default getPublicDefaultColumns;
