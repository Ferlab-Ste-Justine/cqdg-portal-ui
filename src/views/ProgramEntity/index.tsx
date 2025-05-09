import { useParams } from 'react-router-dom';
import { Space } from 'antd';
import { useProgram } from 'graphql/programs/actions';

import ProgramCard from './ProgramCard';
import StudiesList from './StudiesList';

import styles from './index.module.css';

const ProgramEntityPage = () => {
  const { program_id = '' } = useParams<{ program_id: string }>();
  const { loading, data: program } = useProgram({ field: 'program_id', value: program_id });

  return (
    <Space direction="vertical" size={48} className={styles.pageWrapper}>
      <ProgramCard loading={loading} program={program} />
      <StudiesList loading={loading} studies={program?.studies || []} />
    </Space>
  );
};

export default ProgramEntityPage;
