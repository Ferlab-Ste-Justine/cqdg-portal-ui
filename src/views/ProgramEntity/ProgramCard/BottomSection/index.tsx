import intl from 'react-intl-universal';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Popover, Typography } from 'antd';
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
              <div key={p.name}>
                <object
                  data={EnvVariables.configFor('S3_ASSETS_URL') + p.logo_url}
                  className={styles.managerPicture}
                />
              </div>
            ),
        )}
      </div>

      <TitleDivider title={intl.get('entities.program.citation')} />
      <div className={styles.citationWrapper}>
        <Text className={styles.citation}>« {program?.citation_statement} »</Text>
        <Text type="secondary" className={styles.citationStatement}>
          {intl.get('entities.program.citation_statement')}
          <Popover
            title={intl.get('entities.program.citation_statement')}
            content={intl.get('entities.program.citation_statement_info', {
              program_id: program?.program_id,
            })}
            overlayClassName={styles.citationStatementTooltip}
            // className={styles.citationStatementTooltip}
          >
            <InfoCircleOutlined />
          </Popover>
        </Text>
      </div>
    </div>
  );
};

export default BottomSection;
