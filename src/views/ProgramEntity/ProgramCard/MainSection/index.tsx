import { Typography } from 'antd';
import { IProgramEntity } from 'graphql/programs/models';

import { LANG } from 'common/constants';
import { useLang } from 'store/global';

import ContactSection from '../ContactSection';

import ManagerPicture from './ManagerPicture';

import styles from './index.module.css';

const { Title, Text } = Typography;

const ProgramCard = ({ program }: { program?: IProgramEntity }) => {
  const lang = useLang();
  const fourFirstManagers = program?.managers?.slice(0, 4) || [];
  const hasManagers = !!fourFirstManagers?.length;

  return (
    <div className={styles.contentWrapper}>
      <div className={hasManagers ? styles.descriptionWrapper : styles.fullDescriptionWrapper}>
        <Title className={styles.title} level={4}>
          {lang === LANG.FR ? program?.name_fr : program?.name_en}
        </Title>
        <Text className={styles.cardDescription}>
          {lang === LANG.FR ? program?.description_fr : program?.description_en}
        </Text>
        <ContactSection program={program} />
      </div>
      {hasManagers && (
        <div className={styles.managersWrapper}>
          {fourFirstManagers.map((manager) => (
            <div className={styles.managerWrapper} key={manager.name}>
              <ManagerPicture pictureUrl={manager.picture_url} />
              <Text className={styles.managerText}>{manager.name}</Text>
              <Text className={styles.managerText}>
                {lang === LANG.FR ? manager.role_fr : manager.role_en}
              </Text>
              <Text type="secondary" className={styles.managerInstitution}>
                {manager.institution}
              </Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgramCard;
