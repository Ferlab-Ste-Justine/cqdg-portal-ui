import intl from 'react-intl-universal';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Tag } from 'antd';
import { IFileEntity } from 'graphql/files/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

import styles from 'views/FileEntity/index.module.css';

const getExperimentalProcedureDescriptions = (file?: IFileEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.file.strategy'),
    value: (
      <Tag className={styles.tag}>
        {file?.sequencing_experiment?.experimental_strategy || TABLE_EMPTY_PLACE_HOLDER}
      </Tag>
    ),
  },
  {
    label: intl.get('entities.file.sequencing_experiment.type_of_sequencing'),
    value: file?.sequencing_experiment?.type_of_sequencing || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.file.sequencing_experiment.read_length'),
    value: file?.sequencing_experiment?.read_length || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.file.sequencing_experiment.source'),
    value: file?.sequencing_experiment?.source?.display || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.file.sequencing_experiment.platform'),
    value: file?.sequencing_experiment?.platform || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.file.sequencing_experiment.selection'),
    value: file?.sequencing_experiment?.selection?.display || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.file.sequencing_experiment.capture_kit'),
    value: file?.sequencing_experiment?.capture_kit || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.file.sequencing_experiment.target_loci'),
    value: file?.sequencing_experiment?.target_loci || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.file.sequencing_experiment.protocol'),
    value: file?.sequencing_experiment?.protocol || TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getExperimentalProcedureDescriptions;
