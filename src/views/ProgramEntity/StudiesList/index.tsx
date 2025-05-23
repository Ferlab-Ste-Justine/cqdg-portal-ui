import intl from 'react-intl-universal';
import { Space, Typography } from 'antd';
import { IStudyEntity } from 'graphql/studies/models';

import StudyCard from './StudyCard';

import styles from './index.module.css';

const { Title, Text } = Typography;

const StudiesList = ({ studies }: { studies: IStudyEntity[] }) => {
  return (
    <Space direction="vertical" size={24} className={styles.containerWrapper}>
      <Space direction="vertical" size={0}>
        <Title className={styles.title} level={4}>
          {intl.get('entities.study.studies')}
        </Title>
        <Text>{intl.get('entities.program.programStudies')}</Text>
      </Space>

      <div className={styles.listWrapper}>
        {studies.map((study) => (
          <StudyCard key={study.study_code} study={study} />
        ))}
      </div>
    </Space>
  );
};

export default StudiesList;
