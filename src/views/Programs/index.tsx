import intl from 'react-intl-universal';
import { List, Space, Typography } from 'antd';
import { usePrograms } from 'graphql/programs/actions';
import { IProgramEntity } from 'graphql/programs/models';

import ProgramCard from './components/ProgramCard';

import styles from './index.module.css';

const { Title } = Typography;

const ProgramsPage = () => {
  const { loading, data } = usePrograms();

  /** sort programs by study_codes length DESC, then participants_count DESC finally by program_name_en ASC */
  const programsSorted: IProgramEntity[] = data.sort((a, b) =>
    a.study_codes.length > b.study_codes.length
      ? -1
      : a.study_codes.length < b.study_codes.length
      ? 1
      : a.participants_count > b.participants_count
      ? -1
      : a.participants_count < b.participants_count
      ? 1
      : a.name_en > b.name_en
      ? 1
      : a.name_en < b.name_en
      ? -1
      : 0,
  );

  return (
    <Space direction="vertical" size={24} className={styles.pageWrapper}>
      <div>
        <Title className={styles.title} level={4}>
          {intl.get('entities.program.programs')}
        </Title>
      </div>
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
        dataSource={programsSorted}
        className={styles.listWrapper}
        loading={loading}
        renderItem={(item) => (
          <List.Item className={styles.listItem}>
            <ProgramCard program={item} />
          </List.Item>
        )}
      ></List>
    </Space>
  );
};

export default ProgramsPage;
