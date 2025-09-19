import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined, ReadOutlined } from '@ant-design/icons';
import ScientificLiteratureIcon from '@ferlab/ui/core/components/Icons/Futuro/ScientificLiteratureIcon';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Button, Card, Space } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IProgramEntity } from 'graphql/programs/models';
import EnvVariables from 'helpers/EnvVariables';
import { STUDIES_REPO_QB_ID } from 'views/Studies/utils/constant';

import { STATIC_ROUTES } from 'utils/routes';

import BottomSection from './BottomSection';
import MainSection from './MainSection';

import styles from './index.module.css';

const ProgramCard = ({ loading, program }: { loading: boolean; program?: IProgramEntity }) => {
  return (
    <Card loading={loading}>
      <Space direction="vertical" size={40} className={styles.cardWrapper}>
        <Space direction="horizontal" className={styles.buttonWrapper}>
          <Link to={STATIC_ROUTES.PROGRAMS}>
            <Button type="text" icon={<ArrowLeftOutlined width={16} height={16} />}>
              {intl.get('entities.program.allPrograms')}
            </Button>
          </Link>
          <Link
            to={STATIC_ROUTES.STUDIES}
            onClick={() =>
              addQuery({
                queryBuilderId: STUDIES_REPO_QB_ID,
                query: generateQuery({
                  newFilters: [
                    generateValueFilter({
                      field: 'programs.program_id',
                      value: [program?.program_id || ''],
                      index: INDEXES.STUDY,
                    }),
                  ],
                }),
                setAsActive: true,
              })
            }
          >
            <Button type="default" icon={<ReadOutlined />}>
              {intl.get('entities.program.viewStudies')}
            </Button>
          </Link>
        </Space>

        <div className={styles.cardLogo}>
          {program?.logo_url ? (
            <object data={EnvVariables.configFor('S3_ASSETS_URL') + program.logo_url} />
          ) : (
            <ScientificLiteratureIcon height={80} width={80} />
          )}
        </div>

        <MainSection program={program} />
        <BottomSection program={program} />
      </Space>
    </Card>
  );
};

export default ProgramCard;
