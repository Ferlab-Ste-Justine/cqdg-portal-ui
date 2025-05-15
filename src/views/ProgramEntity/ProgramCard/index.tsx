import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ScientificLiteratureIcon from '@ferlab/ui/core/components/Icons/Futuro/ScientificLiteratureIcon';
import { Button, Card, Space } from 'antd';
import { IProgramEntity } from 'graphql/programs/models';
import EnvVariables from 'helpers/EnvVariables';

import { STATIC_ROUTES } from 'utils/routes';

import BottomSection from './BottomSection';
import FooterSection from './FooterSection';
import MainSection from './MainSection';

import styles from './index.module.css';

const ProgramCard = ({ loading, program }: { loading: boolean; program?: IProgramEntity }) => {
  return (
    <Card loading={loading}>
      <Space direction="vertical" size={40} className={styles.cardWrapper}>
        <Link to={STATIC_ROUTES.PROGRAMS}>
          <Button type="text" icon={<ArrowLeftOutlined width={16} height={16} />}>
            {intl.get('entities.program.allPrograms')}
          </Button>
        </Link>

        {program?.logo_url ? (
          <img
            alt={program.name_en}
            loading="eager"
            src={EnvVariables.configFor('S3_ASSETS_URL') + program.logo_url}
          >
            {/*<object data={EnvVariables.configFor('S3_ASSETS_URL') + program.logo_url} />*/}
          </img>
        ) : (
          <ScientificLiteratureIcon width={60} height={49} className={styles.cardLogo} />
        )}

        <MainSection program={program} />
        <BottomSection program={program} />
        <FooterSection program={program} />
      </Space>
    </Card>
  );
};

export default ProgramCard;
