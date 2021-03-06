import { compose, withState } from 'recompose';
import { isEqual } from 'lodash';

import withPropsOnChange from '@cqdg/utils/withPropsOnChange';

export default compose(
  withState('selectedIds', 'setSelectedIds', []),
  withPropsOnChange(
    (props, nextProps) => !isEqual(props.filters, nextProps.filters),
    ({ setSelectedIds }) => {
      setSelectedIds([]);
    },
  ),
);
