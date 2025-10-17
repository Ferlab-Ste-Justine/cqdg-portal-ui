import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import {
  ExperimentOutlined,
  FileTextOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { Button, Tooltip } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IStudyEntity } from 'graphql/studies/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.css';

interface ISummaryBarProps {
  study?: IStudyEntity;
  isRestricted?: boolean;
  setLoginModalUri?: (uri: string) => void; //setLoginModalUri exists when the user is on a public page
}

const SummaryHeader = ({ study, isRestricted, setLoginModalUri }: ISummaryBarProps) => (
  <div className={styles.buttonGroup}>
    <Button
      className={`${styles.button} ${isRestricted && styles.buttonDisabled}`}
      size="large"
      data-cy="SummaryHeader_Participants_Button"
      block
    >
      <Tooltip title={isRestricted ? intl.get('entities.study.restrictedTooltip') : ''}>
        <Link
          className={styles.link}
          to={setLoginModalUri ? '' : STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
          onClick={(e) => {
            if (isRestricted) {
              e.preventDefault();
              return;
            }
            study &&
              addQuery({
                queryBuilderId: DATA_EXPLORATION_QB_ID,
                query: generateQuery({
                  newFilters: [
                    generateValueFilter({
                      field: 'study.study_code',
                      value: [study.study_code],
                      index: INDEXES.PARTICIPANT,
                    }),
                  ],
                }),
                setAsActive: true,
              });
            setLoginModalUri?.(STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS);
          }}
        >
          <UserOutlined className={styles.icon} />
          <div className={styles.alignBaseline}>
            <span className={styles.count}>
              {study?.participant_count ? numberFormat(study.participant_count) : '-'}
            </span>
            <span className={styles.name}>{intl.get('entities.participant.participants')}</span>
          </div>
        </Link>
      </Tooltip>
    </Button>
    <Button
      className={`${styles.button} ${styles.disableHover} ${isRestricted && styles.buttonDisabled}`}
      size="large"
      data-cy="SummaryHeader_Families_Button"
      block
    >
      <Tooltip title={isRestricted ? intl.get('entities.study.restrictedTooltip') : ''}>
        <div className={styles.link}>
          <TeamOutlined className={styles.icon} />
          <div className={styles.alignBaseline}>
            <span className={styles.count}>
              {study?.family_count ? numberFormat(study.family_count) : '-'}
            </span>
            <span className={styles.name}>{intl.get('entities.participant.families')}</span>
          </div>
        </div>
      </Tooltip>
    </Button>
    <Button
      className={`${styles.button} ${isRestricted && styles.buttonDisabled}`}
      size="large"
      data-cy="SummaryHeader_Biospecimens_Button"
      block
    >
      <Tooltip title={isRestricted ? intl.get('entities.study.restrictedTooltip') : ''}>
        <Link
          className={styles.link}
          to={setLoginModalUri ? '' : STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS}
          onClick={(e) => {
            if (isRestricted) {
              e.preventDefault();
              return;
            }
            study &&
              addQuery({
                queryBuilderId: DATA_EXPLORATION_QB_ID,
                query: generateQuery({
                  newFilters: [
                    generateValueFilter({
                      field: 'study.study_code',
                      value: [study.study_code],
                      index: INDEXES.PARTICIPANT,
                    }),
                  ],
                }),
                setAsActive: true,
              });
            setLoginModalUri?.(STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS);
          }}
        >
          <ExperimentOutlined className={styles.icon} />
          <div className={styles.alignBaseline}>
            <span className={styles.count}>
              {study?.sample_count ? numberFormat(study.sample_count) : '-'}
            </span>
            <span className={styles.name}>
              {intl.get('entities.biospecimen.biospecimensAuto', {
                count: study?.sample_count || 0,
              })}
            </span>
          </div>
        </Link>
      </Tooltip>
    </Button>
    <Button
      className={`${styles.button} ${isRestricted && styles.buttonDisabled}`}
      size="large"
      data-cy="SummaryHeader_Files_Button"
      block
    >
      <Tooltip title={isRestricted ? intl.get('entities.study.restrictedTooltip') : ''}>
        <Link
          className={styles.link}
          to={setLoginModalUri ? '' : STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
          onClick={(e) => {
            if (isRestricted) {
              e.preventDefault();
              return;
            }
            study &&
              addQuery({
                queryBuilderId: DATA_EXPLORATION_QB_ID,
                query: generateQuery({
                  newFilters: [
                    generateValueFilter({
                      field: 'study.study_code',
                      value: [study.study_code],
                      index: INDEXES.PARTICIPANT,
                    }),
                  ],
                }),
                setAsActive: true,
              });
            setLoginModalUri?.(STATIC_ROUTES.DATA_EXPLORATION_DATAFILES);
          }}
        >
          <FileTextOutlined className={styles.icon} />
          <div className={styles.alignBaseline}>
            <span className={styles.count}>
              {study?.file_count ? numberFormat(study.file_count) : '-'}
            </span>
            <span className={styles.name}>{intl.get('entities.file.files')}</span>
          </div>
        </Link>
      </Tooltip>
    </Button>
  </div>
);

export default SummaryHeader;
