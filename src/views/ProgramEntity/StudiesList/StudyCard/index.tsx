import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ReadOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Space, Tag, Typography } from 'antd';
import { IStudyEntity } from 'graphql/studies/models';

import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.css';

const { Text } = Typography;

const StudyCard = ({ study }: { study: IStudyEntity }) => {
  return (
    <Card className={styles.cardWrapper}>
      <Space direction="vertical" size={16}>
        <ReadOutlined width={80} height={80} className={styles.cardLogo} />
        <Typography.Title level={5}>{study.name}</Typography.Title>
        {study.experimental_strategies?.hits?.edges?.map((e) => (
          <Tag key={e.node.experimental_strategy} color="blue">
            {e.node.experimental_strategy}
          </Tag>
        ))}
        <Typography.Text className={styles.cardDescription}>{study.description}</Typography.Text>
        <Divider className={styles.divider} />
        <div className={styles.footerRow}>
          <div className={styles.statsWrapper}>
            <UserOutlined className={styles.statsIcon} />
            <div className={styles.countWrapper}>
              <Text className={styles.count}>{study.participant_count}</Text>
              <Text>{intl.get('entities.participant.participants')}</Text>
            </div>
          </div>
          <Link to={`${STATIC_ROUTES.STUDIES}/${study.study_code}`}>
            <Button type="default" className={styles.programCardButton}>
              {intl.get('entities.program.viewStudy')}
              <ExternalLinkIcon />
            </Button>
          </Link>
        </div>
      </Space>
    </Card>
  );
};

export default StudyCard;
