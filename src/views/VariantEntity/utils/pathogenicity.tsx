import intl from 'react-intl-universal';
import ColorTag, { ColorTagType } from '@ferlab/ui/core/components/ColorTag';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import {
  CosmicConditionCell,
  DddConditionCell,
  HpoConditionCell,
  OmimConditionCell,
  OrphanetConditionCell,
} from '@ferlab/ui/core/pages/EntityPage';
import {
  ClinicalGenesTableSource,
  Conditions,
  CosmicConditions,
  DddConditions,
  HpoConditions,
  IGeneRecord,
  OmimConditions,
  OmimGene,
  OmimInheritance,
  OrphanetConditions,
  OrphanetInheritance,
  SingleValuedInheritance,
} from '@ferlab/ui/core/pages/EntityPage/type';
import { addUnderscoreAndLowercase } from '@ferlab/ui/core/utils/stringUtils';
import { Space, Tag, Tooltip, Typography } from 'antd';
import { ClinvarColorMap } from 'views/Variants/components/PageContent/VariantsTable/utils';

import style from '../index.module.css';

const renderInterpretation = (interpretation: string) => {
  const clinVarSigKey: string = addUnderscoreAndLowercase(interpretation);
  return (
    <Tag color={ClinvarColorMap[clinVarSigKey]}>
      <Typography.Text className={style.interpretation}>
        {intl.get(`entities.variant.pathogenicity.clinVarLabel.${clinVarSigKey}`)}
      </Typography.Text>
    </Tag>
  );
};

export const getClinvarColumns = (): ProColumnType[] => [
  {
    key: 'interpretation',
    dataIndex: 'interpretation',
    width: '50%',
    title: intl.get('entities.variant.pathogenicity.interpretation'),
    render: (text: string) => renderInterpretation(text),
  },
  {
    key: 'condition',
    dataIndex: 'condition',
    title: intl.get('entities.variant.pathogenicity.condition'),
    width: '50%',
    render: (text: string, record: any) => {
      const tagMap: { [key: string]: React.ReactNode } = {
        germline: (
          <Tooltip title={intl.get('entities.variant.pathogenicity.germline')}>
            <div>
              <ColorTag type={ColorTagType.Other}>
                {intl.get('entities.variant.pathogenicity.germlineAbvr')}
              </ColorTag>
            </div>
          </Tooltip>
        ),
        somatic: (
          <Tooltip title={intl.get('entities.variant.pathogenicity.somatic')}>
            <div>
              <ColorTag type={ColorTagType.Other}>
                {intl.get('entities.variant.pathogenicity.somaticAbvr')}
              </ColorTag>
            </div>
          </Tooltip>
        ),
      };

      const textCapitalized = text?.[0] ? text[0].toUpperCase() + text.slice(1) : '';
      return (
        <Space direction="horizontal">
          <Typography.Text>{textCapitalized}</Typography.Text>
          {tagMap[record.inheritance] || null}
        </Space>
      );
    },
  },
];

export const getGenePhenotypeColumns = (): ProColumnType[] => [
  {
    key: 'source',
    dataIndex: 'source',
    title: intl.get('entities.variant.pathogenicity.source'),
  },
  {
    key: 'gene',
    dataIndex: 'gene',
    title: intl.get('entities.variant.gene'),
    render: (text: Conditions, record: IGeneRecord) => {
      const { source } = record;
      if (source === ClinicalGenesTableSource.omim) {
        const [geneName, omimId] = record.gene as OmimGene;
        return (
          <>
            {`${geneName} (MIM:`}
            <ExternalLink href={`https://www.omim.org/entry/${omimId}`}>{omimId}</ExternalLink>)
          </>
        );
      }
      return record.gene;
    },
  },
  {
    key: 'conditions',
    dataIndex: 'conditions',
    render: (_text: Conditions, record: IGeneRecord) => {
      switch (record.source) {
        case ClinicalGenesTableSource.omim:
          return (
            <OmimConditionCell
              conditions={record.conditions as OmimConditions}
              withInheritanceTags
              inheritances={record.inheritance as OmimInheritance}
            />
          );
        case ClinicalGenesTableSource.orphanet:
          return (
            <OrphanetConditionCell
              conditions={record.conditions as OrphanetConditions}
              withInheritanceTags
              inheritances={record.inheritance as OrphanetInheritance}
            />
          );
        case ClinicalGenesTableSource.hpo:
          return (
            <HpoConditionCell
              conditions={record.conditions as HpoConditions}
              withInheritanceTags
              inheritances={record.inheritance as SingleValuedInheritance}
              dictionary={{
                'see.less': intl.get('global.seeLess'),
                'see.more': intl.get('global.seeMore'),
              }}
            />
          );
        case ClinicalGenesTableSource.ddd:
          return (
            <DddConditionCell
              conditions={record.conditions as DddConditions}
              withInheritanceTags
              inheritances={record.inheritance as SingleValuedInheritance}
            />
          );
        default:
          return (
            <CosmicConditionCell
              conditions={record.conditions as CosmicConditions}
              withInheritanceTags
              inheritances={record.inheritance as SingleValuedInheritance}
            />
          );
      }
    },
    title: intl.get('entities.variant.pathogenicity.condition'),
    width: '60%',
  },
];
