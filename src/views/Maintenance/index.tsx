import intl from 'react-intl-universal';
import { ToolOutlined } from '@ant-design/icons';

import CQDGLogo from 'components/assets/cqdg-logo.svg';

import styles from './index.module.css';

const Maintenance = () => (
  <div className={styles.maintenance}>
    <div className={styles.card}>
      <img src={CQDGLogo} className={styles.logo} alt="CQDG" />
      <ToolOutlined className={styles.icon} />
      <div className={styles.title}>{intl.get('global.maintenance.title')}</div>
      <div className={styles.description}>{intl.get('global.maintenance.description')}</div>
    </div>
  </div>
);

export default Maintenance;
