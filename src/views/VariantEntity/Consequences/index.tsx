import intl from 'react-intl-universal';
import Empty from '@ferlab/ui/core/components/Empty';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import ExpandableTable from '@ferlab/ui/core/components/tables/ExpandableTable';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Card, Collapse, Space, Tag, Tooltip, Typography } from 'antd';
import { ArrangerEdge } from 'graphql/models';
import { IGeneEntity, Impact, IVariantConsequence, IVariantEntity } from 'graphql/variants/models';
import capitalize from 'lodash/capitalize';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import CanonicalIcon from 'components/Icons/CanonicalIcon';
const { Title } = Typography;

import styles from './index.module.scss';

export const getVepImpactTag = (score: number | string) => {
  switch (score) {
    case 1:
    case 'modifier':
      return <Tag>MODIFIER</Tag>;
    case 2:
    case 'low':
      return <Tag color="green">LOW</Tag>;
    case 3:
    case 'moderate':
      return <Tag color="gold">MODERATE</Tag>;
    case 4:
    case 'high':
      return <Tag color="red">HIGH</Tag>;

    default:
      return true;
  }
};

type TableGroup = {
  consequences: ArrangerEdge<IVariantConsequence>[];
  omim: string;
  symbol: string;
  biotype: string;
  ensembleGeneId: string;
};

type SymbolToConsequences = {
  [key: string]: TableGroup;
};

const { Text } = Typography;
const INDEX_IMPACT_PREDICTION_FIELD = 0;
const INDEX_IMPACT_PREDICTION_SHORT_LABEL = 1;
const INDEX_IMPACT_SCORE = 2;

export const shortToLongPrediction: Record<string, string> = {
  'sift.d': 'damaging',
  'sift.t': 'tolerated',
  'polyphen2.p': 'possibly damaging',
  'polyphen2.d': 'probably damaging',
  'polyphen2.b': 'benign',
  'fathmm.d': 'damaging',
  'fathmm.t': 'tolerated',
  'lrt.d': 'deleterious',
  'lrt.n': 'neutral',
  'lrt.u': 'unknown',
};

const getLongPredictionLabelIfKnown = (predictionField: string, predictionShortLabel: string) => {
  if (!predictionField || !predictionShortLabel) {
    return null;
  }
  const dictionaryPath = `${predictionField.toLowerCase()}.${predictionShortLabel.toLowerCase()}`;
  const longPrediction = shortToLongPrediction[dictionaryPath];
  return longPrediction || null;
};

const groupConsequencesBySymbol = (
  consequences: ArrangerEdge<IVariantConsequence>[],
  genes: ArrangerEdge<IGeneEntity>[],
) => {
  if (consequences.length === 0) {
    return {};
  }
  return consequences.reduce(
    (acc: SymbolToConsequences, consequence: ArrangerEdge<IVariantConsequence>) => {
      const symbol = consequence.node.symbol;
      if (!symbol) {
        return acc;
      }
      const gene = genes.find((g) => g.node.symbol === symbol);
      const omim = gene ? gene.node.omim_gene_id : '';
      const biotype = gene ? gene.node.biotype : '';
      const ensembleGeneId = consequence.node.ensembl_gene_id || '';
      const oldConsequences = acc[symbol]?.consequences || [];

      return {
        ...acc,
        [symbol]: {
          consequences: [...oldConsequences, { ...consequence }],
          omim,
          symbol,
          ensembleGeneId,
          biotype,
        },
      };
    },
    {},
  );
};

const orderGenes = (mSymbolToConsequences: SymbolToConsequences) => {
  if (!mSymbolToConsequences || Object.keys(mSymbolToConsequences).length === 0) {
    return [];
  }
  return Object.entries(mSymbolToConsequences).map(([, values]) => ({
    ...values,
  }));
};

const orderConsequencesForTable = (tableGroups: TableGroup[]) => {
  if (!tableGroups || tableGroups.length === 0) {
    return [];
  }

  return tableGroups.map((tableGroup: TableGroup) => {
    const consequences = tableGroup.consequences;
    return {
      ...tableGroup,
      consequences: consequences,
    };
  });
};

const makeTables = (
  rawConsequences: ArrangerEdge<IVariantConsequence>[],
  rawGenes: ArrangerEdge<IGeneEntity>[],
) => {
  if (!rawConsequences?.length) {
    return [];
  }
  const symbolToConsequences = groupConsequencesBySymbol(rawConsequences, rawGenes);
  const orderedGenes = orderGenes(symbolToConsequences);
  return orderConsequencesForTable(orderedGenes);
};

const makeRows = (consequences: ArrangerEdge<IVariantConsequence>[]) =>
  consequences.map((consequence: ArrangerEdge<IVariantConsequence>, index: number) => ({
    key: `${index + 1}`,
    aa: consequence.node.aa_change,
    consequences: consequence.node.consequences?.filter((c) => c || c.length > 0),
    codingDna: consequence.node.coding_dna_change,
    strand: consequence.node.strand,
    vep: consequence.node.vep_impact,
    impact: [
      [
        'Sift',
        consequence.node.predictions?.sift_pred,
        consequence.node.predictions?.sift_converted_rank_score,
      ],
      [
        'Polyphen2',
        consequence.node.predictions?.polyphen2_hvar_pred,
        consequence.node.predictions?.sift_converted_rank_score,
      ],
      [
        'Fathmm',
        consequence.node.predictions?.fathmm_pred,
        consequence.node.predictions?.FATHMM_converted_rankscore,
      ],
      ['Cadd', null, consequence.node.predictions?.cadd_score],
      ['Dann', null, consequence.node.predictions?.dann_score],
      [
        'Lrt',
        consequence.node.predictions?.lrt_pred,
        consequence.node.predictions?.lrt_converted_rankscore,
      ],
      ['Revel', null, consequence.node.predictions?.revel_rankscore],
    ].filter(([, , score]) => score),
    conservation: consequence.node.conservations?.phylo_p17way_primate_rankscore,
    transcript: {
      // ids: consequence.node.refseq_mrna_id?.filter((i) => i?.length > 0),
      ids: consequence.node.refseq_mrna_id
        ? Array.isArray(consequence.node.refseq_mrna_id)
          ? consequence.node.refseq_mrna_id
          : [consequence.node.refseq_mrna_id]
        : [],
      transcriptId: consequence.node.ensembl_transcript_id || '',
      isCanonical: consequence.node.canonical || false,
    },
  }));

const columns = [
  {
    title: () => intl.get('screen.variantDetails.summaryTab.consequencesTable.AAColumn'),
    dataIndex: 'aa',
    render: (aa: string) => (
      <div className={styles.longValue}>{aa || TABLE_EMPTY_PLACE_HOLDER}</div>
    ),
    className: `${styles.longValue}`,
    width: '10%',
  },
  {
    title: () => intl.get('screen.variantDetails.summaryTab.consequencesTable.ConsequenceColumn'),
    dataIndex: 'consequences',
    render: (consequences: string[]) => {
      if (consequences.length === 0) {
        return <></>;
      }
      return (
        <ExpandableCell
          dataSource={consequences}
          renderItem={(item: any, id): React.ReactNode => (
            <StackLayout key={id} horizontal className={styles.cellList}>
              <Text>{item}</Text>
            </StackLayout>
          )}
        />
      );
    },
    width: '15%',
  },
  {
    title: () => intl.get('screen.variantDetails.summaryTab.consequencesTable.CDNAChangeColumn'),
    dataIndex: 'codingDna',
    render: (codingDna: string) => (
      <div className={styles.longValue}>{codingDna || TABLE_EMPTY_PLACE_HOLDER}</div>
    ),
    width: '12%',
  },
  {
    title: () => intl.get('screen.variantDetails.summaryTab.consequencesTable.strand'),
    dataIndex: 'strand',
  },
  {
    title: () => intl.get('screen.variantDetails.summaryTab.consequencesTable.vep_impact'),
    dataIndex: 'vep_impact',
    render: (vep: Impact) => getVepImpactTag(vep?.toLowerCase()),
  },
  {
    title: () => intl.get('prediction'),
    dataIndex: 'predictions',
    render: (impacts: string[][]) => {
      if (impacts?.length === 0) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }

      return (
        <ExpandableCell
          nOfElementsWhenCollapsed={2}
          dataSource={impacts}
          renderItem={(item: any, id): React.ReactNode => {
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
              <StackLayout key={id} horizontal className={styles.cellList}>
                <Text type={'secondary'}>{predictionField}:</Text>
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
    title: () => intl.get('screen.variantDetails.summaryTab.consequencesTable.ConservationColumn'),
    dataIndex: 'conservation',
    render: (conservation: number) =>
      conservation == null ? TABLE_EMPTY_PLACE_HOLDER : conservation,
  },
  {
    title: () => intl.get('ensemblID'),
    dataIndex: 'transcript',
    render: (transcript: { transcriptId: string; isCanonical?: boolean }) => (
      <Space>
        {transcript.transcriptId}
        {transcript.isCanonical && (
          <Tooltip title={intl.get('screen.variantDetails.summaryTab.canonical')}>
            <CanonicalIcon className={styles.canonicalIcon} height="14" width="14" />
          </Tooltip>
        )}
      </Space>
    ),
    width: '15%',
  },
  {
    title: () => intl.get('refSeq'),
    dataIndex: 'transcript',
    width: '15%',
    render: (transcript: { ids: string[] }) =>
      transcript?.ids?.map((id) => (
        <div key={id} className={styles.transcriptId}>
          <ExternalLink
            href={`https://www.ncbi.nlm.nih.gov/nuccore/${id}?report=graph`}
            className={styles.transcriptLink}
          >
            {id}
          </ExternalLink>
        </div>
      )) || TABLE_EMPTY_PLACE_HOLDER,
  },
];

const sortConsequences = (data: ArrangerEdge<IVariantConsequence>[]) =>
  data
    .sort((a, b) => b.node.impact_score! - a.node.impact_score!)
    .sort((a, b) => (a.node.canonical === b.node.canonical ? 0 : a.node.canonical ? -1 : 1));

interface IConsequencesProps {
  variant: IVariantEntity | null;
  loading: boolean;
  id: string;
}

const Consequences = ({ variant, loading, id }: IConsequencesProps) => {
  const consequences = variant?.consequences?.hits?.edges || [];
  const genes = variant?.genes?.hits?.edges || [];

  const tables = makeTables(consequences, genes);

  return (
    <div id={id} className={styles.container}>
      <Title level={5} className={styles.title}>
        {intl.get('Gene Consequences')} Gene Consequences
      </Title>
      <Collapse defaultActiveKey={['1']} className={styles.collapse}>
        <Collapse.Panel header="Gene Consequences" key="1" className={styles.panel}>
          <Card loading={loading} className={styles.card}>
            <Space className={styles.consequenceCards} direction="vertical" size={48}>
              {tables.length > 0 ? (
                tables.map((tableData: TableGroup, index: number) => {
                  const symbol = tableData.symbol;
                  const omim = tableData.omim;
                  const biotype = tableData.biotype;
                  const orderedConsequences = sortConsequences(tableData.consequences);

                  return (
                    <Space
                      key={index}
                      direction="vertical"
                      className={styles.consequenceTableWrapper}
                      size={12}
                    >
                      <Space size={12}>
                        <Space size={4}>
                          <span>
                            <ExternalLink
                              href={`https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=${symbol}`}
                            >
                              {symbol}
                            </ExternalLink>
                          </span>
                        </Space>
                        <Space size={4}>
                          {omim && (
                            <>
                              <span>Omim</span>
                              <span>
                                <ExternalLink href={`https://omim.org/entry/${omim}`}>
                                  {omim}
                                </ExternalLink>
                              </span>
                            </>
                          )}
                        </Space>
                        <span className="bold value">{biotype}</span>
                      </Space>
                      <ExpandableTable
                        bordered={true}
                        nOfElementsWhenCollapsed={1}
                        buttonText={(showAll, hiddenNum) =>
                          showAll
                            ? intl.get('screen.variant.entity.table.hidetranscript')
                            : intl.get('screen.variant.entity.table.showtranscript', {
                                count: hiddenNum,
                              })
                        }
                        key={index}
                        dataSource={makeRows(orderedConsequences)}
                        columns={columns}
                        pagination={false}
                        size="small"
                      />
                    </Space>
                  );
                })
              ) : (
                <Empty
                  showImage={false}
                  noPadding
                  align="left"
                  description={intl.get('no.data.available')}
                />
              )}
            </Space>
          </Card>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default Consequences;
