import intl from 'react-intl-universal';
import { List, Space, Typography } from 'antd';

import { usePrograms } from '../../graphql/programs/actions';
import { IProgramEntity } from '../../graphql/programs/models';

import ProgramCard from './components/ProgramCard';

import styles from './index.module.css';

const { Title } = Typography;

const CommunityPage = () => {
  const { loading, data: programs } = usePrograms();

  /** sort programs by study_codes length DESC, then participants_count DESC finally by program_name_en ASC */
  const programsSorted = programs.sort((a, b) =>
    a.study_codes.length > b.study_codes.length
      ? -1
      : a.study_codes.length < b.study_codes.length
      ? 1
      : a.participants_count > b.participants_count
      ? -1
      : a.participants_count < b.participants_count
      ? 1
      : a.program_name_en > b.program_name_en
      ? 1
      : a.program_name_en < b.program_name_en
      ? -1
      : 0,
  );

  /** fakeAdCard on array is a way to add the ad card to the grid of List component */
  const fakeAdCard = { ...programs[0], isAdCard: true };
  const dataSource: IProgramEntity[] = loading ? programsSorted : [...programsSorted, fakeAdCard];

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
        dataSource={dataSource}
        className={styles.listWrapper}
        loading={loading}
        renderItem={(item, key) => (
          <List.Item key={key} className={styles.listItem}>
            <ProgramCard program={item} />
          </List.Item>
        )}
      ></List>
    </Space>
  );
};

export default CommunityPage;
