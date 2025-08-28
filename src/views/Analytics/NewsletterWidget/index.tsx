import intl from 'react-intl-universal';
import { Card, Typography } from 'antd';

import logo1 from 'components/assets/analytics/newsletterWidget1.svg';
import logo2 from 'components/assets/analytics/newsletterWidget2.svg';
import logo3 from 'components/assets/analytics/newsletterWidget3.svg';

import styles from './index.module.css';

const { Title } = Typography;

const NewsletterWidget = () => {
  return (
    <Card className={styles.widget}>
      <div className={styles.spaceWrapper}>
        <div className={styles.icons}>
          <img alt="Logo circles" src={logo1} />
          <img alt="Logo line chart" src={logo2} />
          <img alt="Logo bar chart" src={logo3} />
        </div>
        <div className={styles.content}>
          <Title level={5}>{intl.get('screen.analytics.newsletter.title')}</Title>
        </div>
      </div>
    </Card>
  );
};

export default NewsletterWidget;
