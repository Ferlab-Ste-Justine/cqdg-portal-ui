import intl from 'react-intl-universal';
import { InfoCircleOutlined } from '@ant-design/icons';
import ExternalLinkIcon from '@ferlab/ui/core/components/ExternalLink/ExternalLinkIcon';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { EntityTableRedirectLink } from '@ferlab/ui/core/pages/EntityPage';
import EntityDataset from '@ferlab/ui/core/pages/EntityPage/EntityDataset';
import { Popover, Typography } from 'antd';
import { INDEXES } from 'graphql/constants';
import { ArrangerResultsTree } from 'graphql/models';
import { IDataSet } from 'graphql/studies/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import getDatasetDescriptions from 'views/StudyEntity/utils/getDatasetDescriptions';

import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.scss';

interface IDatasetsProps {
  id: string;
  loading: boolean;
  title: string;
  datasets?: ArrangerResultsTree<IDataSet>;
}

const Datasets = ({ id, loading, title, datasets }: IDatasetsProps) => (
  <div className={styles.container} id={id}>
    <Typography.Title className={styles.title} level={4}>
      {title}
      <Popover
        overlayClassName={styles.titlePopover}
        content={intl.get('entities.file.datasetInfo')}
      >
        <InfoCircleOutlined className={styles.tooltipIcon} />
      </Popover>
    </Typography.Title>
    {datasets?.hits?.edges?.map(({ node: dataset }) => (
      <EntityDataset
        key={dataset?.name}
        id={id}
        descriptions={getDatasetDescriptions(dataset)}
        loading={loading}
        header={dataset?.name}
        participant_count={dataset?.participant_count || 0}
        file_count={dataset?.file_count || 0}
        dictionnary={{
          participants: intl.get('entities.participant.participants'),
          files: intl.get('entities.file.files'),
        }}
        titleExtra={[
          <EntityTableRedirectLink
            key="1"
            to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
            icon={<ExternalLinkIcon width="14" />}
            data-cy="Dataset_RedirectLink"
            onClick={() =>
              addQuery({
                queryBuilderId: DATA_EXPLORATION_QB_ID,
                query: generateQuery({
                  newFilters: [
                    generateValueFilter({
                      field: 'dataset',
                      value: dataset?.name ? [dataset.name] : [],
                      index: INDEXES.FILE,
                    }),
                  ],
                }),
                setAsActive: true,
              })
            }
          >
            {intl.get('global.viewInDataExploration')}
          </EntityTableRedirectLink>,
        ]}
      />
    ))}
  </div>
);

export default Datasets;
