import intl from 'react-intl-universal';
import { UserOutlined } from '@ant-design/icons';
import ExternalLinkIcon from '@ferlab/ui/core/components/ExternalLink/ExternalLinkIcon';
import { Button, Space, Typography } from 'antd';
import { IProgramEntity } from 'graphql/programs/models';
import EnvVariables from 'helpers/EnvVariables';

import { LANG } from 'common/constants';
import { useLang } from 'store/global';

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
        <Button type="default">
          {intl.get('entities.program.website')}
          <ExternalLinkIcon />
        </Button>
      </Space>
      <div className={styles.managersWrapper}>
        {program?.managers?.map((manager) => (
          <div className={styles.managerWrapper} key={manager.name}>
            {manager?.picture_url ? (
              <object
                data={EnvVariables.configFor('S3_ASSETS_URL') + manager.picture_url}
                className={styles.managerPicture}
              />
            ) : (
              <UserOutlined className={styles.defaultPicture} />
            )}

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
