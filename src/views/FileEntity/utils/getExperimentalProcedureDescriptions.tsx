import intl from 'react-intl-universal';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Tag } from 'antd';
import { IFileEntity } from 'graphql/files/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { combineIndexLinked, joinList } from 'utils/indexLinkedArrays';

import styles from 'views/FileEntity/index.module.css';

const getExperimentalProcedureDescriptions = (file?: IFileEntity): IEntityDescriptionsItem[] => {
  const experiment = file?.sequencing_experiment;

  const strategyResolution = combineIndexLinked(
    experiment?.experimental_strategy_1?.map((strategy) => strategy?.display) ??
      experiment?.experimental_strategy,
    experiment?.profiling_resolution,
  );
  const platformInstrumentModel = combineIndexLinked(
    experiment?.platform,
    experiment?.instrument_model,
  );

  return [
    {
      label: intl.get('entities.file.sequencing_experiment.strategy_resolution'),
      value: strategyResolution.length ? (
        <>
          {strategyResolution.map((value) => (
            <Tag key={value} className={styles.tag}>
              {value}
            </Tag>
          ))}
        </>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
    },
    {
      label: intl.get('entities.file.sequencing_experiment.platform_instrument_model'),
      value: joinList(platformInstrumentModel) || TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      label: intl.get('entities.file.sequencing_experiment.type_of_sequencing'),
      value: experiment?.type_of_sequencing || TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      label: intl.get('entities.file.sequencing_experiment.selection'),
      value: experiment?.selection?.display || TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      label: intl.get('entities.file.sequencing_experiment.target_capture_kit'),
      value: experiment?.capture_kit || experiment?.target_capture_kit || TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      label: intl.get('entities.file.sequencing_experiment.target_loci'),
      value: experiment?.target_loci || TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      label: intl.get('entities.file.sequencing_experiment.read_length'),
      value: experiment?.read_length || TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      label: intl.get('entities.file.sequencing_experiment.pore_type'),
      value: experiment?.pore_type || TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      label: intl.get('entities.file.sequencing_experiment.protocol'),
      value: experiment?.protocol || TABLE_EMPTY_PLACE_HOLDER,
    },
  ];
};

export default getExperimentalProcedureDescriptions;
