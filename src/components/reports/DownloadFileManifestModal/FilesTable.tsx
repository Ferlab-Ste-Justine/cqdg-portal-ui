import { useEffect, useMemo } from 'react';
import intl from 'react-intl-universal';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { Table } from 'antd';
import { AxiosRequestConfig } from 'axios';
import EnvironmentVariables from 'helpers/EnvVariables';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import styles from 'components/reports/DownloadFileManifestModal/index.module.css';
import useApi from 'hooks/useApi';
import { headers, REPORTS_ROUTES } from 'services/api/reports';
import { ReportType } from 'services/api/reports/models';
import { formatFileSize } from 'utils/formatFileSize';
const PROJECT_ID = EnvironmentVariables.configFor('PROJECT_ID');

interface IFileByDataType {
  key: string;
  value: string;
  nb_participants: number;
  nb_files: number;
  nb_files_skipped?: number;
  size: number;
}

export const getDataTypeColumns = (showSkipped: boolean): ProColumnType<any>[] => {
  const columns: ProColumnType<any>[] = [
    {
      key: 'value',
      dataIndex: 'value',
      title: intl.get('entities.file.data_type'),
      render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      key: 'nb_participants',
      dataIndex: 'nb_participants',
      title: intl.get('entities.participant.participants'),
      render: (nb_participants: number) =>
        nb_participants ? numberFormat(nb_participants) : TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      key: 'nb_files',
      dataIndex: 'nb_files',
      title: intl.get('entities.file.files'),
      render: (nb_files: number) => (nb_files ? numberFormat(nb_files) : TABLE_EMPTY_PLACE_HOLDER),
    },
  ];

  if (showSkipped) {
    columns.push({
      key: 'nb_files_skipped',
      dataIndex: 'nb_files_skipped',
      title: `${intl.get('entities.file.files_skipped')} *`,
      render: (nb_files_skipped: number) =>
        nb_files_skipped ? numberFormat(nb_files_skipped) : TABLE_EMPTY_PLACE_HOLDER,
    });
  }

  columns.push({
    key: 'size',
    dataIndex: 'size',
    title: intl.get('entities.file.file_size'),
    render: (size: number) =>
      formatFileSize(size, { output: 'string' }) || TABLE_EMPTY_PLACE_HOLDER,
  });

  return columns;
};

interface IFilesTableProps {
  sqon: ISyntheticSqon;
  onSkippedFilesChange?: (hasSkipped: boolean) => void;
}

const FilesTable = ({ sqon, onSkippedFilesChange }: IFilesTableProps) => {
  const config: AxiosRequestConfig = {
    url: REPORTS_ROUTES[ReportType.FILE_MANIFEST_STATS],
    method: 'POST',
    responseType: 'json',
    data: {
      sqon,
      projectId: PROJECT_ID,
    },
    headers: headers(),
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cachedConfig = useMemo(() => config, []);
  const { loading, result: files = [] } = useApi<IFileByDataType[]>({ config: cachedConfig });

  const hasSkippedFiles = files.some((file) => (file.nb_files_skipped ?? 0) > 0);

  useEffect(() => {
    onSkippedFilesChange?.(hasSkippedFiles);
  }, [hasSkippedFiles, onSkippedFilesChange]);

  return (
    <Table
      columns={getDataTypeColumns(hasSkippedFiles)}
      dataSource={files}
      pagination={false}
      size="small"
      rowClassName={styles.notStriped}
      className={styles.table}
      bordered
      loading={loading}
    />
  );
};

export default FilesTable;
