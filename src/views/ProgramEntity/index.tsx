import { Navigate, useParams } from 'react-router-dom';
import { Space } from 'antd';
import { useProgram } from 'graphql/programs/actions';

import { STATIC_ROUTES } from 'utils/routes';

import ProgramCard from './ProgramCard';
import StudiesList from './StudiesList';

import styles from './index.module.css';

const ProgramEntityPage = () => {
  const { program_id = '' } = useParams<{ program_id: string }>();
  const { loading, data: program } = useProgram({ field: 'program_id', value: program_id });

  if (!loading && !program) {
    return <Navigate to={STATIC_ROUTES.PROGRAMS} />;
  }

  const programStudies = program?.studies || [];

  return (
    <Space direction="vertical" size={48} className={styles.pageWrapper}>
      <ProgramCard loading={loading} program={program} />
      {programStudies.length > 0 && <StudiesList studies={programStudies} />}
    </Space>
  );
};

export default ProgramEntityPage;
