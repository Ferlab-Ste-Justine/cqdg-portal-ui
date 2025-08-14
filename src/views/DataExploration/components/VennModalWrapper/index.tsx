import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ExperimentOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';
import { THandleSubmit } from '@ferlab/ui/core/components/Charts/Venn/utils';
import VennModal from '@ferlab/ui/core/components/Charts/Venn/VennModal';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ISqonGroupFilter, ISyntheticSqon, SET_ID_PREFIX } from '@ferlab/ui/core/data/sqon/types';
import {
  generateQuery,
  generateValueFilter,
  resolveSyntheticSqon,
} from '@ferlab/ui/core/data/sqon/utils';
import { INDEXES } from 'graphql/constants';

import { getSetFieldId, PROJECT_ID, useSavedSet } from 'store/savedSet';
import { createSavedSet } from 'store/savedSet/thunks';
import { useVennData } from 'store/venn';
import { fetchVennData } from 'store/venn/thunks';
import { getIdFieldByType } from 'utils/fieldMapper';
import { STATIC_ROUTES } from 'utils/routes';
import { getQueryBuilderDictionary } from 'utils/translation';

import { DATA_EXPLORATION_QB_ID, TAB_IDS } from '../../utils/constant';

interface VennModalWrapperProps {
  vennOpen: boolean;
  setVennOpen: any;
  facetTransResolver: any;
}

const VennModalWrapper = ({ vennOpen, setVennOpen, facetTransResolver }: VennModalWrapperProps) => {
  const vennData = useVennData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { savedSets } = useSavedSet();

  const handleSubmit = async ({ index, name, sets, invisible, callback }: THandleSubmit) => {
    const sqons: ISyntheticSqon[] = sets.map((set) => set.entitySqon);
    const sqonGroupFilter: ISqonGroupFilter = { op: 'or', content: [] };
    sets.forEach((set) => {
      sqonGroupFilter.content.push(resolveSyntheticSqon(sqons, set.entitySqon));
    });

    dispatch(
      createSavedSet({
        idField: getIdFieldByType(index),
        projectId: PROJECT_ID,
        sort: [],
        sqon: sqonGroupFilter,
        tag: name,
        type: index,
        is_invisible: invisible,
        onCompleteCb: (data) => {
          callback();
          if (!data) return;
          const setValue = `${SET_ID_PREFIX}${data.id}`;
          addQuery({
            queryBuilderId: DATA_EXPLORATION_QB_ID,
            query: generateQuery({
              newFilters: [
                generateValueFilter({
                  field: getSetFieldId(data.setType),
                  value: [setValue],
                  index: data.setType,
                }),
              ],
            }),
            setAsActive: true,
          });
        },
      }),
    );

    let newTabId = TAB_IDS.PARTICIPANTS;
    if (index === INDEXES.BIOSPECIMEN) {
      newTabId = TAB_IDS.BIOSPECIMENS;
    } else if (index === INDEXES.FILE) {
      newTabId = TAB_IDS.DATA_FILES;
    }
    if (!location.pathname.includes(newTabId)) {
      navigate(`${STATIC_ROUTES.DATA_EXPLORATION}/${newTabId}${window.location.search}`);
    }
  };

  return (
    <VennModal
      //analytics prop is required on ferlab-ui, but we don't have it on cqdg yet
      analytics={{
        trackVennViewInExploration: () => {},
        trackVennClickOnSections: () => {},
        trackVennViewSet: () => {},
        trackVennViewEntityCounts: () => {},
      }}
      vennSize={{ width: 540, height: 498 }}
      savedSets={savedSets}
      handleSubmit={handleSubmit}
      queryPillDictionary={getQueryBuilderDictionary(facetTransResolver, savedSets)}
      error={vennData.error}
      options={[
        {
          label: intl.get('entities.participant.participants'),
          value: INDEXES.PARTICIPANT,
          tabId: TAB_IDS.PARTICIPANTS,
          icon: <UserOutlined size={16} />,
        },
        {
          label: intl.get('entities.biospecimen.biospecimens'),
          value: INDEXES.BIOSPECIMEN,
          tabId: TAB_IDS.BIOSPECIMENS,
          icon: <ExperimentOutlined size={16} />,
        },

        {
          label: intl.get('entities.file.files'),
          value: INDEXES.FILE,
          tabId: TAB_IDS.DATA_FILES,
          icon: <FileTextOutlined size={16} />,
        },
      ]}
      open={vennOpen}
      summary={vennData.summary}
      operations={vennData.operations}
      loading={vennData.loading}
      handleClose={() => {
        setVennOpen(false);
      }}
      handleIndexChange={(qbSqons: ISyntheticSqon[], index: string) => {
        dispatch(fetchVennData({ qbSqons, index: index as INDEXES }));
      }}
      dictionary={{
        query: {
          column: intl.get('screen.analytics.venn.query.column'),
          title: intl.get('screen.analytics.venn.query.title'),
        },
        download: {
          png: intl.get('screen.analytics.venn.download.png'),
          fileNameDateFormat: intl.get('screen.analytics.venn.download.fileNameDateFormat'),
          fileNameTemplate: intl.get('screen.analytics.venn.download.fileNameTemplate'),
        },
        set: {
          column: intl.get('screen.analytics.venn.set.column'),
          title: intl.get('screen.analytics.venn.set.title'),
          footer: intl.get('screen.analytics.venn.set.footer'),
          tooltipDataExplo: intl.get('screen.analytics.venn.set.tooltipDataExplo'),
          max: intl.get('screen.analytics.venn.set.max'),
        },
        save: {
          nameTemplate: intl.get('screen.analytics.venn.save.nameTemplate'),
          maximumLength: intl.get('components.querybuilder.header.modal.edit.input.maximumLength'),
          permittedCharacters: intl.get('components.savedSets.modal.errors.permittedCharacters'),
          alreadyExist: intl.get('screen.analytics.venn.save.alreadyExist'),
          requiredField: intl.get('global.forms.errors.requiredField'),
          titleData: intl.get('screen.analytics.venn.save.titleData'),
          getEntityText: (index: string, entityCount: number) => {
            if (index === INDEXES.BIOSPECIMEN) {
              return intl.get('screen.analytics.venn.save.entity.biospecimens', {
                count: entityCount,
              });
            } else if (index === INDEXES.FILE) {
              return intl.get('screen.analytics.venn.save.entity.files', {
                count: entityCount,
              });
            } else {
              return intl.get('screen.analytics.venn.save.entity.participants', {
                count: entityCount,
              });
            }
          },
          label: intl.get('screen.analytics.venn.save.label'),
          checkbox: {
            label: intl.get('screen.analytics.venn.save.checkbox.label'),
            tooltips: intl.get('screen.analytics.venn.save.checkbox.tooltips'),
          },
          ok: intl.get('screen.analytics.venn.save.ok'),
          cancel: intl.get('screen.analytics.venn.save.cancel'),
        },
        participants: intl.get('entities.participant.participants'),
        biospecimens: intl.get('entities.biospecimen.biospecimens'),
        files: intl.get('entities.file.files'),
        title: intl.get('screen.analytics.venn.title'),
        count: intl.get('screen.analytics.venn.count'),
        ok: intl.get('screen.analytics.venn.ok'),
      }}
    />
  );
};

export default VennModalWrapper;
