import React from 'react';
import intl from 'react-intl-universal';
import ColorTag, { ColorTagType } from '@ferlab/ui/core/components/ColorTag';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Tooltip } from 'antd';
import { ageCategories, ICodeDisplayMethod } from 'graphql/participants/models';
import capitalize from 'lodash/capitalize';
import { extractNcitTissueTitleAndCode } from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { IProColumnExport } from 'common/types';

import styles from '../index.module.css';

const getDiagnosesColumns = (): IProColumnExport[] => [
  {
    key: 'sample_id',
    dataIndex: 'sample_id',
    title: intl.get('entities.biospecimen.sample'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'biospecimen_id',
    dataIndex: 'biospecimen_id',
    title: intl.get('entities.biospecimen.biospecimen'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'sample_type',
    dataIndex: 'sample_type',
    title: intl.get('entities.biospecimen.sample_type'),
    render: (sample_type: string) => {
      if (!sample_type) return TABLE_EMPTY_PLACE_HOLDER;
      const { code, title } = extractNcitTissueTitleAndCode(sample_type);
      return (
        <>
          {title} (NCIT:{' '}
          <ExternalLink href={`http://purl.obolibrary.org/obo/NCIT_${code}`}>{code}</ExternalLink>)
        </>
      );
    },
  },
  {
    key: 'biospecimen_tissue_source',
    dataIndex: 'biospecimen_tissue_source',
    title: intl.get('entities.biospecimen.biospecimen_tissue_source'),
    render: (biospecimen_tissue_source: string) => {
      if (!biospecimen_tissue_source) return TABLE_EMPTY_PLACE_HOLDER;
      const { code, title } = extractNcitTissueTitleAndCode(biospecimen_tissue_source);
      if (!code) return biospecimen_tissue_source;
      return (
        <>
          {title} (NCIT:{' '}
          <ExternalLink href={`http://purl.obolibrary.org/obo/NCIT_${code}`}>{code}</ExternalLink>)
        </>
      );
    },
  },
  {
    key: 'cancer_biospecimen_type',
    dataIndex: 'cancer_biospecimen_type',
    title: intl.get('entities.biospecimen.cancer_biospecimen_type'),
    sorter: { multiple: 1 },
    defaultHidden: true,
    render: (cancer_biospecimen_type: string) =>
      cancer_biospecimen_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'age_biospecimen_collection',
    dataIndex: 'age_biospecimen_collection',
    title: intl.get('entities.biospecimen.age'),
    popoverProps: {
      title: <b>{intl.get('entities.biospecimen.age_biospecimen_collection')}</b>,
      content: ageCategories.map((category) => (
        <div key={category.key}>
          <b>{category.label}:</b>
          {` ${category.tooltip}`}
          <br />
        </div>
      )),
    },
    exportValue: (row) => {
      const category = ageCategories.find((cat) => cat.key === row?.age_biospecimen_collection);
      return category ? `${category.label}: ${category.tooltip}` : row?.age_biospecimen_collection;
    },
    render: (age_biospecimen_collection: string) => {
      const category = ageCategories.find((cat) => cat.key === age_biospecimen_collection);
      if (!category) return TABLE_EMPTY_PLACE_HOLDER;
      return category.tooltip ? (
        <Tooltip title={category.tooltip} className={styles.tooltip}>
          {category.label}
        </Tooltip>
      ) : (
        category.label
      );
    },
  },
  {
    key: 'tumor_normal_designation',
    dataIndex: 'tumor_normal_designation',
    title: intl.get('entities.biospecimen.tumor_normal_designation'),
    sorter: { multiple: 1 },
    render: (tumor_normal_designation: string) => (
      <ColorTag
        type={ColorTagType.TumorType}
        value={capitalize(tumor_normal_designation)}
      ></ColorTag>
    ),
  },
  {
    key: 'tumor_histological_type.display',
    dataIndex: 'tumor_histological_type',
    title: intl.get('entities.biospecimen.tumor_histological_type.display'),
    sorter: { multiple: 1 },
    defaultHidden: true,
    render: (value: ICodeDisplayMethod) => {
      if (!value?.display) return TABLE_EMPTY_PLACE_HOLDER;
      const { code, title } = extractNcitTissueTitleAndCode(value?.display);
      if (!code) return value?.display;
      return (
        <>
          {title} (NCIT:{' '}
          <ExternalLink href={`http://purl.obolibrary.org/obo/NCIT_${code}`}>{code}</ExternalLink>)
        </>
      );
    },
  },
  {
    key: 'tumor_histological_type.text',
    dataIndex: 'tumor_histological_type',
    title: intl.get('entities.biospecimen.tumor_histological_type.text'),
    sorter: { multiple: 1 },
    defaultHidden: true,
    render: (value: ICodeDisplayMethod) => value?.text || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'cancer_anatomic_location.display',
    dataIndex: 'cancer_anatomic_location',
    title: intl.get('entities.biospecimen.cancer_anatomic_location.display'),
    sorter: { multiple: 1 },
    defaultHidden: true,
    render: (value: ICodeDisplayMethod) => {
      if (!value?.display) return TABLE_EMPTY_PLACE_HOLDER;
      const { code, title } = extractNcitTissueTitleAndCode(value?.display);
      if (!code) return value?.display;
      return (
        <>
          {title} (NCIT:{' '}
          <ExternalLink href={`http://purl.obolibrary.org/obo/NCIT_${code}`}>{code}</ExternalLink>)
        </>
      );
    },
  },
  {
    key: 'cancer_anatomic_location.text',
    dataIndex: 'cancer_anatomic_location',
    title: intl.get('entities.biospecimen.cancer_anatomic_location.text'),
    sorter: { multiple: 1 },
    defaultHidden: true,
    render: (value: ICodeDisplayMethod) => value?.text || TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getDiagnosesColumns;
