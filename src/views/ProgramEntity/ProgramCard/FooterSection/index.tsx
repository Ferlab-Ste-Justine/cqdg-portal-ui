import intl from 'react-intl-universal';
import EmailLetterIcon from '@ferlab/ui/core/components/Icons/Futuro/EmailLetterIcon';
import OfficeBuildingIcon from '@ferlab/ui/core/components/Icons/Futuro/OfficeBuildingIcon';
import WebNavigationIcon from '@ferlab/ui/core/components/Icons/Futuro/WebNavigationIcon';
import { Typography } from 'antd';
import { IProgramEntity } from 'graphql/programs/models';

import styles from './index.module.css';

const { Text } = Typography;

const FooterSection = ({ program }: { program?: IProgramEntity }) => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerItemWrapper}>
        <EmailLetterIcon width={48} height={48} className={styles.footerItemIcon} />
        <div className={styles.footerItem}>
          <Text className={styles.footerItemLabel}>{intl.get('entities.program.contact')}</Text>
          {program?.contacts?.map((contact) => (
            <Text key={contact.email} className={styles.footerItemValues}>
              {contact.email}
            </Text>
          ))}
        </div>
      </div>

      <div className={styles.footerItemWrapper}>
        <OfficeBuildingIcon width={48} height={48} className={styles.footerItemIcon} />
        <div className={styles.footerItem}>
          <Text className={styles.footerItemLabel}>{intl.get('entities.program.affiliation')}</Text>
          {program?.contacts?.map((contact) => (
            <Text key={contact.institution} className={styles.footerItemValues}>
              {contact.institution}
            </Text>
          ))}
        </div>
      </div>

      <div className={styles.footerItemWrapper}>
        <WebNavigationIcon width={48} height={48} className={styles.footerItemIcon} />
        <div className={styles.footerItem}>
          <Text className={styles.footerItemLabel}>{intl.get('entities.program.website')}</Text>
          {program?.contacts?.map((contact) => (
            <Text key={contact.website} className={styles.footerItemValues}>
              {contact.website}
            </Text>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
