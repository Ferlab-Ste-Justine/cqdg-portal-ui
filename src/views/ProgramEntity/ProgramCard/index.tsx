import intl from 'react-intl-universal';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ExternalLinkIcon from '@ferlab/ui/core/components/ExternalLink/ExternalLinkIcon';
import ScientificLiteratureIcon from '@ferlab/ui/core/components/Icons/Futuro/ScientificLiteratureIcon';
import { Button, Card, Space, Typography } from 'antd';
import { IProgramEntity } from 'graphql/programs/models';

import { LANG } from 'common/constants';
import { useLang } from 'store/global';

import styles from './index.module.css';

const { Title, Text } = Typography;

const ProgramCard = ({ loading, program }: { loading: boolean; program?: IProgramEntity }) => {
  const lang = useLang();

  //TODO: resolve the rules for the logo url
  const isUrl = (url?: string) => url?.startsWith('https://');

  return (
    <Card loading={loading}>
      <Space direction="vertical" size={24} className={styles.cardWrapper}>
        <Button type="text" icon={<ArrowLeftOutlined width={16} height={16} />}>
          {intl.get('entities.program.allPrograms')}
        </Button>

        {isUrl(program?.logo_url) ? (
          <image href={program?.logo_url} />
        ) : (
          <ScientificLiteratureIcon width={60} height={49} className={styles.cardLogo} />
        )}

        <Title className={styles.title} level={4}>
          {lang === LANG.FR ? program?.name_fr : program?.name_en}
        </Title>

        <Text className={styles.cardDescription}>
          {lang === LANG.FR ? program?.description_fr : program?.description_en}
        </Text>

        <Button type="default">
          {intl.get('global.website')}
          <ExternalLinkIcon />
        </Button>
      </Space>
    </Card>
  );
};

export default ProgramCard;
