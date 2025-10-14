import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import { IProgramEntity } from 'graphql/programs/models';
import EnvVariables from 'helpers/EnvVariables';

import { LANG } from 'common/constants';
import getStoreConfig from 'store';
import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.css';

export type TProgramsProps = {
  programs: IProgramEntity[];
};

const Programs = ({ programs }: TProgramsProps) => {
  const { store } = getStoreConfig();
  const lang = store.getState().global.lang;
  return (
    <div className={styles.container}>
      <div className={styles.title}>{intl.get('screen.loginPage.cards.programs.title')}</div>
      <div className={styles.programsGrid}>
        {programs.map((program) => {
          if (program.logo_url) {
            return (
              <Tooltip
                title={lang === LANG.FR ? program.name_fr : program.name_en}
                key={program.id}
              >
                <Link
                  to={`${STATIC_ROUTES.PROGRAMS}/${program.program_id}`}
                  className={styles.programCardLink}
                >
                  <img
                    className={styles.programLogo}
                    src={EnvVariables.configFor('S3_ASSETS_URL') + program.logo_url}
                    alt={program.program_id}
                  />
                </Link>
              </Tooltip>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Programs;
