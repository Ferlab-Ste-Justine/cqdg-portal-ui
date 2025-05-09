import intl from 'react-intl-universal';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip, Typography } from 'antd';
import { IProgramEntity } from 'graphql/programs/models';
import EnvVariables from 'helpers/EnvVariables';

import TitleDivider from '../TitleDivider';

import styles from './index.module.css';

const { Text } = Typography;

const BottomSection = ({ program }: { program?: IProgramEntity }) => {
  return (
    <div className={styles.sectionWrapper}>
      <TitleDivider title={intl.get('entities.program.partners')} />
      <div className={styles.logosWrapper}>
        {program?.partners?.map(
          (p) =>
            p.logo_url && (
              <object
                key={p.name}
                data={EnvVariables.configFor('S3_ASSETS_URL') + p.logo_url}
                className={styles.managerPicture}
              />
            ),
        )}
      </div>
      <TitleDivider title={intl.get('entities.program.citation')} />
      <div className={styles.citationWrapper}>
        <Text className={styles.citation}>« {program?.citation_statement} »</Text>
        <Text type="secondary" className={styles.citationStatement}>
          {intl.get('entities.program.citation_statement')}
          <Tooltip title={intl.get('entities.program.citation_statement')}>
            <InfoCircleOutlined />
          </Tooltip>
        </Text>
      </div>
    </div>
  );
};

export default BottomSection;
