import { Divider, Typography } from 'antd';

import styles from './index.module.css';

const { Title } = Typography;

const TitleDivider = ({ title }: { title: string }) => {
  return (
    <div className={styles.dividerWrapper}>
      <Divider className={styles.divider} />
      <Title level={5} className={styles.title}>
        {title}
      </Title>
      <Divider className={styles.divider} />
    </div>
  );
};

export default TitleDivider;
