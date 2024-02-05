import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { EntityTable } from '@ferlab/ui/core/pages/EntityPage';
import { INDEXES } from 'graphql/constants';
import { useParticipantsAggFromField } from 'graphql/participants/actions';
import { IParticipantEntity } from 'graphql/participants/models';
import getDiagnosesColumns from 'views/ParticipantEntity/utils/getDiagnosesColumns';

import { generateLocalTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { userColumnPreferencesOrDefault } from 'utils/tables';
import { getProTableDictionary } from 'utils/translation';

interface IDiagnosesTableProps {
  participant?: IParticipantEntity;
  id: string;
  loading: boolean;
}

const DiagnosesTable = ({ participant, id, loading }: IDiagnosesTableProps) => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();

  const diagnosesData = participant?.diagnoses
    ? participant.diagnoses?.hits?.edges?.map(({ node }) => ({ ...node, key: node.fhir_id }))
    : [];

  const defaultCols = getDiagnosesColumns();
  const userCols = userInfo?.config?.participants?.tables?.diagnoses?.columns || [];
  const userColumns = userColumnPreferencesOrDefault(userCols, defaultCols);

  const { data: buckets } = useParticipantsAggFromField({
    parentField: 'diagnoses',
    field: 'diagnosis_mondo_display',
    values: diagnosesData.map((e) => e.diagnosis_mondo_display),
  });

  const diagnosesWithCounts = diagnosesData?.map((diag) => {
    const countTerm =
      buckets?.find((b: any) => b.key === diag.diagnosis_mondo_display)?.doc_count || 0;
    return {
      ...diag,
      countTerm,
    };
  });

  return (
    <EntityTable
      id={id}
      loading={loading}
      title={intl.get('entities.participant.diagnosis')}
      header={intl.get('entities.participant.diagnoses')}
      columns={getDiagnosesColumns()}
      data={diagnosesWithCounts}
      total={diagnosesWithCounts.length}
      initialColumnState={userColumns}
      dictionary={getProTableDictionary()}
      headerConfig={{
        enableTableExport: true,
        onTableExportClick: () =>
          dispatch(
            generateLocalTsvReport({
              fileName: 'diagnoses',
              index: INDEXES.PARTICIPANT,
              headers: defaultCols,
              cols: userColumns,
              rows: diagnosesWithCounts,
            }),
          ),
        enableColumnSort: true,
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({ participants: { tables: { diagnoses: { columns: newState } } } }),
          ),
      }}
    />
  );
};
export default DiagnosesTable;
