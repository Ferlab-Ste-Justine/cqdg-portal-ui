import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Tag } from 'antd';
import { IFileEntity } from 'graphql/files/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { formatFileSize } from 'utils/formatFileSize';
import { truncateString } from 'utils/string';

import styles from 'views/FileEntity/index.module.scss';

const getSummaryDescriptions = (file?: IFileEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.file.file_id'),
    value: file?.file_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.file.file_name'),
    value: file?.file_name || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.file.file_format'),
    value: <Tag className={styles.tag}>{file?.file_format || TABLE_EMPTY_PLACE_HOLDER}</Tag>,
  },
  {
    label: intl.get('entities.file.file_size'),
    value: formatFileSize(file?.file_size, { output: 'string' }) || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.file.ferload_url'),
    value: (
      <ExternalLink href={file?.ferload_url}>
        {file?.ferload_url ? truncateString(file.ferload_url, 50) : TABLE_EMPTY_PLACE_HOLDER}
      </ExternalLink>
    ),
  },
  {
    label: intl.get('entities.file.file_hash'),
    value: file?.file_hash || TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getSummaryDescriptions;