import EnvVariables from 'helpers/EnvVariables';

import { LANG } from 'common/constants';
import getStoreConfig from 'store';

const getDocLangPrefix = () => {
  const { store } = getStoreConfig();
  const locale = store.getState().global.lang;

  switch (locale) {
    case LANG.EN:
      return '/en/';
    case LANG.FR:
    default:
      return '/';
  }
};

export const getDocUrl = (path = '') =>
  `${EnvVariables.configFor('CQDG_DOCUMENTATION')}${getDocLangPrefix()}${path}`;
