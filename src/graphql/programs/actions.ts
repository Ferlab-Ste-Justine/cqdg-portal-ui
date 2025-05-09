import { hydrateResults } from 'graphql/models';
import { QueryVariable } from 'graphql/queries';

import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';

import { IProgramResultTree } from './models';
import { GET_PROGRAMS } from './queries';

export const usePrograms = (variables?: QueryVariable) => {
  const { loading, result } = useLazyResultQuery<IProgramResultTree>(GET_PROGRAMS, {
    variables,
  });

  return {
    loading,
    data: hydrateResults(result?.Program?.hits?.edges || []),
    total: result?.Program?.hits?.total || 0,
  };
};
