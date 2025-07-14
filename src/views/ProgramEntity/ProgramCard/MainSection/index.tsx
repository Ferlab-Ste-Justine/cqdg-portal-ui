import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import ExternalLinkIcon from '@ferlab/ui/core/components/ExternalLink/ExternalLinkIcon';
import { Button, Space, Typography } from 'antd';
import { IProgramEntity } from 'graphql/programs/models';

import { LANG } from 'common/constants';
import { useLang } from 'store/global';

import ManagerPicture from './ManagerPicture';

import styles from './index.module.css';

const { Title, Text } = Typography;

const ProgramCard = ({ program }: { program?: IProgramEntity }) => {
  const lang = useLang();

  return (
    <div className={styles.contentWrapper}>
      <Space direction="vertical" size={24} className={styles.descriptionWrapper}>
        <Title className={styles.title} level={4}>
          {lang === LANG.FR ? program?.name_fr : program?.name_en}
        </Title>
        <Text className={styles.cardDescription}>
          {lang === LANG.FR ? program?.description_fr : program?.description_en}
        </Text>
        {program?.website && (
          <Link to={program.website} target="_blank">
            <Button type="default">
              {intl.get('entities.program.website')}
              <ExternalLinkIcon />
            </Button>
          </Link>
        )}
      </Space>
      <div className={styles.managersWrapper}>
        {program?.managers?.map((manager) => (
          <div className={styles.managerWrapper} key={manager.name}>
            <ManagerPicture pictureUrl={manager.picture_url} />
            <Text className={styles.managerText}>{manager.name}</Text>
            <Text className={styles.managerText}>
              {lang === LANG.FR ? manager.role_fr : manager.role_en}
            </Text>
            <Text type="secondary">{manager.institution}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramCard;
