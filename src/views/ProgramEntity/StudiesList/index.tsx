import intl from 'react-intl-universal';
import { List, Space, Typography } from 'antd';
import { IStudyEntity } from 'graphql/studies/models';

import StudyCard from './StudyCard';

import styles from './index.module.css';

const { Title, Text } = Typography;

const StudiesList = ({ studies, loading }: { studies: IStudyEntity[]; loading: boolean }) => {
  return (
    <Space direction="vertical" size={24} className={styles.containerWrapper}>
      <Space direction="vertical">
        <Title className={styles.title} level={4}>
          {intl.get('entities.study.studies')}
        </Title>
        <Text>{intl.get('entities.program.programStudies')}</Text>
      </Space>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        dataSource={studies}
        className={styles.listWrapper}
        loading={loading}
        renderItem={(item) => (
          <List.Item className={styles.listItem}>
            <StudyCard study={item} />
          </List.Item>
        )}
      ></List>
    </Space>
  );
};

export default StudiesList;
