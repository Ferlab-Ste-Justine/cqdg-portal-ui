import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink/index';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Tag } from 'antd';
import { IStudyEntity } from 'graphql/studies/models';
import EnvVariables from 'helpers/EnvVariables';
import capitalize from 'lodash/capitalize';

import { LANG } from 'common/constants';
import getStoreConfig from 'store';
import { STATIC_ROUTES } from 'utils/routes';

import styles from '../index.module.css';

const getSummaryDescriptions = (study?: IStudyEntity): IEntityDescriptionsItem[] => {
  const { store } = getStoreConfig();
  const lang = store.getState().global.lang;
  const isProgramsEnabled: boolean = EnvVariables.configFor('PROGRAMS_ENABLED') === 'true';

  const summaryDescriptions = [
    {
      label: intl.get('entities.study.study_code'),
      value: study?.study_code,
    },
    {
      label: intl.get('entities.study.name'),
      value: study?.name,
    },
    {
      label: intl.get('entities.program.program'),
      value:
        isProgramsEnabled &&
        study?.programs?.hits?.edges?.length &&
        study.programs.hits.edges.map(({ node }) => (
          <div key={node.program_id}>
            <Link to={`${STATIC_ROUTES.PROGRAMS}/${node.program_id}`}>
              {lang === LANG.FR ? node.name_fr : node.name_en}
            </Link>
          </div>
        )),
    },
    {
      label: intl.get('entities.study.description'),
      value: study?.description?.split('|')?.map((desc, index) => (
        <div key={index} className={styles.whiteSpace}>
          {desc}
        </div>
      )),
    },
    {
      label: intl.get('entities.study.design'),
      value:
        study?.study_designs?.length &&
        study.study_designs.map((e) => (
          <Tag key={e} className={styles.tag}>
            {e}
          </Tag>
        )),
    },
    {
      label: intl.get('entities.study.population'),
      value: study?.population && <Tag className={styles.tagCyan}>{study.population}</Tag>,
    },
    {
      label: intl.get('entities.study.selection_criteria'),
      value: study?.selection_criteria,
    },
    {
      label: intl.get('entities.study.domain'),
      value: study?.domain && <Tag className={styles.tagGold}>{study.domain}</Tag>,
    },
    {
      label: intl.get('entities.study.keywords'),
      value: study?.keyword
        ?.map((key) =>
          key
            .split(' ')
            .map((word) => capitalize(word))
            .join(' '),
        )
        ?.join(', '),
    },
    {
      label: intl.get('entities.study.data_categories'),
      value: study?.data_categories?.hits?.edges?.map(({ node }) => node.data_category).join(', '),
    },
    {
      label: intl.get('entities.study.data_collection_methods'),
      value: study?.data_collection_methods?.map((e) => e).join(', '),
    },
    {
      label: intl.get('entities.study.principal_investigators'),
      value: study?.principal_investigators?.map((e) => e).join(', '),
    },
    {
      label: intl.get('entities.study.contact_names'),
      value: study?.contact_names?.map((e) => e).join(', '),
    },
    {
      label: intl.get('entities.study.contact_institutions'),
      value: study?.contact_institutions?.map((e) => e).join(', '),
    },
    {
      label: intl.get('entities.study.website'),
      value:
        study?.websites?.length &&
        study.websites.map((website, i) => (
          <ExternalLink key={i} href={website} className={styles.marginRight}>
            {website}
          </ExternalLink>
        )),
    },
    {
      label: intl.get('entities.study.funding_sources'),
      value: study?.funding_sources?.map((e) => e).join(', '),
    },
    {
      label: intl.get('entities.study.citation_statement'),
      value: study?.citation_statement,
    },
  ];

  return summaryDescriptions.filter(({ value }) => value);
};

export default getSummaryDescriptions;
