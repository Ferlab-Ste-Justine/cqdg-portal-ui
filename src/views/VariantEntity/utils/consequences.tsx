import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import CanonicalIcon from '@ferlab/ui/core/components/Icons/CanonicalIcon';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import {
  getLongPredictionLabelIfKnown,
  getVepImpactTag,
  INDEX_IMPACT_PREDICTION_FIELD,
  INDEX_IMPACT_PREDICTION_SHORT_LABEL,
  INDEX_IMPACT_SCORE,
} from '@ferlab/ui/core/pages/EntityPage/utils/consequences';
import { removeUnderscoreAndCapitalize } from '@ferlab/ui/core/utils/stringUtils';
import { Space, Tooltip, Typography } from 'antd';
import { IConsequenceEntity, Impact } from 'graphql/variants/models';
import capitalize from 'lodash/capitalize';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { getEntityConsequenceDictionary } from 'utils/translation';
const { Text } = Typography;

import { getPredictionScore } from '../FerlabComponent/Consequences.utils';

import styles from '../index.module.scss';

export const getConsequencesProColumn = (): ProColumnType[] => [
  {
    title: intl.get('entities.variant.consequences.aaColumn'),
    tooltip: intl.get('entities.variant.consequences.aaColumnTooltip'),
    key: 'consequence',
    dataIndex: 'aa_change',
    width: '10%',
    render: (aa_change: string) => aa_change || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    title: intl.get('entities.variant.consequences.consequence'),
    dataIndex: 'consequence',
    key: 'consequence',
    render: (consequence: string[]) => {
      if (!consequence?.length) return TABLE_EMPTY_PLACE_HOLDER;
      return (
        <ExpandableCell
          dataSource={consequence}
          renderItem={(item: any, id) => (
            <StackLayout horizontal key={id}>
              <Text>{removeUnderscoreAndCapitalize(item)}</Text>
            </StackLayout>
          )}
        />
      );
    },
    width: '15%',
  },
  {
    title: intl.get('entities.variant.consequences.cdnaChangeColumn'),
    key: 'consequence',
    dataIndex: 'hgvsc',
    width: '15%',
    render: (hgvsc: string) => hgvsc?.split(':')[1] || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    title: intl.get('entities.variant.consequences.strand'),
    dataIndex: 'strand',
    key: 'consequences',
    width: '5%',
    render: (strand: string) => strand || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    title: intl.get('entities.variant.consequences.vep'),
    dataIndex: 'vep_impact',
    key: 'consequences',
    width: '5%',
    render: (vep: Impact) =>
      getVepImpactTag(vep?.toLowerCase(), getEntityConsequenceDictionary().impactTag) ||
      TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    title: intl.get('entities.variant.consequences.predictions.predictions'),
    key: 'consequences',
    render: (consequences) => {
      const impact = getPredictionScore(
        consequences.predictions,
        getEntityConsequenceDictionary().predictions,
      );
      if (!impact?.length) return TABLE_EMPTY_PLACE_HOLDER;
      return (
        <ExpandableCell
          dataSource={impact}
          dictionnary={{
            'see.less': intl.get('see.less'),
            'see.more': intl.get('see.more'),
          }}
          nOfElementsWhenCollapsed={2}
          renderItem={(item: any, id) => {
            const predictionField = item[INDEX_IMPACT_PREDICTION_FIELD];
            const score = item[INDEX_IMPACT_SCORE];
            const predictionShortLabel = item[INDEX_IMPACT_PREDICTION_SHORT_LABEL];
            const predictionLongLabel = getLongPredictionLabelIfKnown(
              predictionField,
              predictionShortLabel,
            );
            const label = predictionLongLabel || predictionShortLabel;
            const description = label ? `${capitalize(label)} - ${score}` : score;
            return (
              <StackLayout className={styles.cellList} horizontal key={id}>
                <Text className={styles.predictionLabel} type={'secondary'}>
                  {predictionField}:
                </Text>
                <Text>{description}</Text>
              </StackLayout>
            );
          }}
        />
      );
    },
    width: '15%',
  },
  {
    title: intl.get('entities.variant.consequences.conservationColumn'),
    dataIndex: 'conservations',
    key: 'consequences',
    width: '10%',
    render: (conservations) => conservations?.phyloP17way_primate || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    title: intl.get('entities.variant.consequences.transcript'),
    key: 'consequences',
    render: (consequence: IConsequenceEntity) => {
      const { ensembl_transcript_id, canonical } = consequence;
      return (
        <Space>
          <ExternalLink href={`https://www.ensembl.org/id/${ensembl_transcript_id}`}>
            {ensembl_transcript_id}
          </ExternalLink>
          {canonical && (
            <Tooltip title={intl.get('entities.variant.consequences.canonical')}>
              <div>
                <CanonicalIcon className={styles.canonicalIcon} height={14} width={14} />
              </div>
            </Tooltip>
          )}
        </Space>
      );
    },
    width: '15%',
  },
  {
    title: intl.get('entities.variant.consequences.refSeq'),
    dataIndex: 'refseq_mrna_id',
    key: 'consequences',
    render: (refseq_mrna_id: string[]) =>
      refseq_mrna_id?.length
        ? refseq_mrna_id.map((id, index) => (
            <ExternalLink
              key={index}
              href={`https://www.ncbi.nlm.nih.gov/nuccore/${refseq_mrna_id}?report=graph`}
            >
              {id}
            </ExternalLink>
          ))
        : TABLE_EMPTY_PLACE_HOLDER,
    width: '10%',
  },
];
