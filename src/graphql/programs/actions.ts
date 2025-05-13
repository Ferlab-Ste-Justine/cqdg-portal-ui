import { hydrateResults } from 'graphql/models';
import { QueryVariable } from 'graphql/queries';

import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';

import { INDEXES } from '../constants';

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

export const useProgram = ({ field, value }: { field: string; value: string }) => {
  const sqon = {
    content: [{ content: { field, value, index: INDEXES.PROGRAM }, op: 'in' }],
    op: 'and',
  };

  const { loading, result } = useLazyResultQuery<IProgramResultTree>(GET_PROGRAMS, {
    variables: { sqon },
  });

  return {
    loading,
    data: result?.Program?.hits?.edges[0]?.node,
  };
};
