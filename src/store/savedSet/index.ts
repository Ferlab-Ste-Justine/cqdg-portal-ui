import { useSelector } from 'react-redux';
import EnvironmentVariables from 'helpers/EnvVariables';

import { savedSetSelector } from './selector';

export type { initialState as SavedSetInitialState } from './types';
export { default, SavedSetState } from './slice';
import { singularizeSetTypeIfNeeded } from 'views/DataExploration/components/SetsManagementDropdown';
import { BIOSPECIMENS_SAVED_SETS_FIELD } from 'views/DataExploration/utils/constant';
import { VARIANT_SAVED_SETS_FIELD } from 'views/Variants/utils/constants';

import { SetType } from 'services/api/savedSet/models';

export const PROJECT_ID = EnvironmentVariables.configFor('PROJECT_ID');

export const getSetFieldId = (type: SetType) => {
  if (type === SetType.VARIANT) {
    return VARIANT_SAVED_SETS_FIELD;
  }

  if (type === SetType.BIOSPECIMEN_REQUEST || type === SetType.BIOSPECIMEN) {
    return BIOSPECIMENS_SAVED_SETS_FIELD;
  }

  if (type === SetType.FILE) {
    return `${singularizeSetTypeIfNeeded(type)}_facet_ids.${singularizeSetTypeIfNeeded(
      type,
    )}_fhir_id_1`;
  }

  return `${type}_facet_ids.${type}_fhir_id_1`;
};

export const useSavedSet = () => useSelector(savedSetSelector);
