import intl from 'react-intl-universal';
import { Link, useLocation } from 'react-router-dom';
import { ReadOutlined, UserOutlined } from '@ant-design/icons';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { useKeycloak } from '@react-keycloak/web';
import { Button, Card, Divider, Tag, Typography } from 'antd';
import { IStudyEntity } from 'graphql/studies/models';
import EnvVariables from 'helpers/EnvVariables';
import getExperimentalStrategiesTag from 'views/StudyEntity/utils/getExperimentalStrategiesTag';

import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
import { PUBLIC_ROUTES, STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.css';

const { Text, Title } = Typography;

const StudyCard = ({ study }: { study: IStudyEntity }) => {
  const strategies = study.datasets?.hits?.edges?.map((d) => d.node.experimental_strategies);
  const strategiesUniqValues = [...new Set(strategies?.flatMap((d) => d))];

  const location = useLocation();
  const isPublicRoute = PUBLIC_ROUTES.some((route) => location.pathname.includes(route));
  const { keycloak } = useKeycloak();
  const isAuthenticated = keycloak.authenticated;
  const isPublicProgramEntityPage = isPublicRoute && !isAuthenticated;
  const linkTo = isPublicProgramEntityPage
    ? `${STATIC_ROUTES.PUBLIC_STUDIES}/${study.study_code}`
    : `${STATIC_ROUTES.STUDIES}/${study.study_code}`;

  return (
    <Card className={styles.cardWrapper}>
      <div className={styles.cardHeader}>
        <div className={styles.cardLogo}>
          {study?.logo_url ? (
            <object data={EnvVariables.configFor('S3_ASSETS_URL') + study.logo_url} />
          ) : (
            <ReadOutlined width={80} height={80} className={styles.cardIcon} />
          )}
        </div>
        {study.study_code}
      </div>
      <div className={styles.cardContent}>
        <Title level={5} className={styles.cardTitle}>
          {study.name}
        </Title>
        <div>
          {strategiesUniqValues?.map((strategy, index) => (
            <Tag key={index} color={getExperimentalStrategiesTag(strategy)}>
              {strategy}
            </Tag>
          ))}
        </div>

        <Typography.Text className={styles.cardDescription}>
          {study.description?.split('|')?.map((desc, index) => (
            <p key={index}>{desc}</p>
          ))}
        </Typography.Text>
      </div>

      <div className={styles.footerWrapper}>
        <Divider className={styles.divider} />
        <div className={styles.footerRow}>
          <div className={styles.statsWrapper}>
            <UserOutlined className={styles.statsIcon} />
            <div className={styles.countWrapper}>
              <Text className={styles.count}>{numberFormat(study.participant_count)}</Text>
              <Text>{intl.get('entities.participant.participants')}</Text>
            </div>
          </div>
          <Link to={linkTo}>
            <Button type="default" className={styles.programCardButton}>
              {intl.get('entities.program.viewStudy')}
              <ExternalLinkIcon />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default StudyCard;
