import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ReadOutlined } from '@ant-design/icons';
import ScientificLiteratureIcon from '@ferlab/ui/core/components/Icons/Futuro/ScientificLiteratureIcon';
import { Button, Card, Space, Tag, Typography } from 'antd';
import { IProgramEntity } from 'graphql/programs/models';
import EnvVariables from 'helpers/EnvVariables';

import { LANG } from 'common/constants';
import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
import { useLang } from 'store/global';
import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.css';

interface IProgramCardProps {
  program: IProgramEntity;
}

const ProgramCard = ({ program }: IProgramCardProps) => {
  const lang = useLang();

  if (program.isAdCard) {
    return (
      <Card className={styles.adCardWrapper}>
        <Space direction="vertical" align={'center'} size={16}>
          <ScientificLiteratureIcon width={60} height={49} className={styles.gray2} />
          <Typography.Title level={5} className={styles.gray2}>
            {intl.get('entities.program.newProgramSoon')}
          </Typography.Title>
          <Typography.Text className={styles.adCardDescription}>
            {intl.get('entities.program.newProgramSoonDescription')}
          </Typography.Text>
        </Space>
      </Card>
    );
  }

  const studiesCount = program.study_codes?.length || 0;

  return (
    <Card className={styles.cardWrapper}>
      <Space direction="vertical" size={16}>
        {program.logo_url ? (
          <object data={EnvVariables.configFor('S3_ASSETS_URL') + program.logo_url} />
        ) : (
          <ScientificLiteratureIcon width={60} height={49} className={styles.cardLogo} />
        )}

        <Typography.Title level={5}>
          {lang === LANG.FR ? program.name_fr : program.name_en}
        </Typography.Title>
        <Typography.Text className={styles.cardDescription}>
          {lang === LANG.FR ? program.description_fr : program.description_en}
        </Typography.Text>

        <div className={styles.footerRow}>
          {studiesCount > 0 && (
            <Tag icon={<ReadOutlined width={16} height={16} />} className={styles.cardTag}>
              {`${studiesCount} ${intl.get('entities.study.studies_min')}`}
            </Tag>
          )}
          <Link
            to={`${STATIC_ROUTES.PROGRAMS}/${program.program_id}`}
            className={styles.programCardLink}
          >
            <Button type="default">
              {intl.get('screen.dashboard.cards.learnMore')}
              <ExternalLinkIcon />
            </Button>
          </Link>
        </div>
      </Space>
    </Card>
  );
};

export default ProgramCard;
