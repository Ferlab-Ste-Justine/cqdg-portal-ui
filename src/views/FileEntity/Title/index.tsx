import React from 'react';
import intl from 'react-intl-universal';
import { FileTextOutlined, LockOutlined, UnlockFilled } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink/index';
import { EntityTitle } from '@ferlab/ui/core/pages/EntityPage';
import { Popover, Space } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IFileEntity } from 'graphql/files/models';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';

import DownloadFileManifestModal from 'components/reports/DownloadFileManifestModal';

import EnvVariables from '../../../helpers/EnvVariables';

import styles from './index.module.scss';

interface IFileEntityTitleProps {
  file?: IFileEntity;
  loading?: boolean;
}

const FileEntityTitle = ({ file, loading }: IFileEntityTitleProps) => {
  const hasFamily = file?.participants?.hits?.edges?.some((e) => e.node.family_id);
  const hasAccess = !!file?.user_authorized;
  const getCurrentSqon = (): any => generateSelectionSqon(INDEXES.FILE, [file?.file_id || '']);
  const docHref = `${EnvVariables.configFor(
    'CQDG_DOCUMENTATION',
  )}/docs/faire-une-demande-daccès-aux-données-du-cqdg`;

  const title = {
    text: file?.file_id,
    icon: <FileTextOutlined />,
    tag: hasAccess ? (
      <Popover
        placement="bottom"
        overlayClassName={styles.popOverContent}
        title={intl.get('entities.file.file_authorization')}
        content={intl.get('entities.file.unlocked')}
      >
        <UnlockFilled className={styles.unlocked} />
      </Popover>
    ) : (
      <Popover
        placement="bottom"
        overlayClassName={styles.popOverContent}
        title={intl.get('entities.file.file_authorization')}
        content={
          <span>
            {intl.get('entities.file.locked')}
            <ExternalLink href={docHref}>{intl.get('entities.file.fileReadMore')}</ExternalLink>.
          </span>
        }
      >
        <LockOutlined className={styles.locked} />
      </Popover>
    ),
    extra: (
      <Space>
        <DownloadFileManifestModal sqon={getCurrentSqon()} type="primary" hasFamily={hasFamily} />
      </Space>
    ),
  };

  return <EntityTitle {...title} loading={loading} />;
};

export default FileEntityTitle;
