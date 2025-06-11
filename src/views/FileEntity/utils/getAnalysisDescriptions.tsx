import intl from 'react-intl-universal';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { IFileEntity } from 'graphql/files/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

const getAnalysisDescriptions = (file?: IFileEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.file.sequencing_experiment.identifiant'),
    value: file?.sequencing_experiment?.analysis_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.file.sequencing_experiment.bio_informatic_analysis'),
    value: file?.sequencing_experiment?.bio_informatic_analysis || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.file.sequencing_experiment.workflow_name'),
    value: file?.sequencing_experiment?.workflow_name || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.file.sequencing_experiment.genome_build'),
    value: file?.sequencing_experiment?.genome_build || TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getAnalysisDescriptions;
