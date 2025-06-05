import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
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
            <ExternalLink key={contact.email} href={`mailto:${contact.email}`}>
              <Text className={styles.footerItemValues}>{contact.email}</Text>
            </ExternalLink>
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
            <ExternalLink key={contact.email} href={contact.website}>
              <Text className={styles.footerItemValues}>{contact.website}</Text>
            </ExternalLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
