import { TSortableItems } from '@ferlab/ui/core/layout/SortableGrid/SortableItem';

import SavedFilters from './SavedFilters';
import SavedSets from './SavedSets';

import styles from './index.module.css';

export interface DashboardCardProps {
  id: string;
  key?: string;
  className?: string;
}

// Important do not change the ID
// Its is used for user config
export const getDashboardCards = (): TSortableItems[] => [
  {
    id: '3',
    xs: 24,
    md: 12,
    component: <SavedFilters id="3" className={styles.dashboardCard} />,
  },
  {
    id: '4',
    xs: 24,
    md: 12,
    component: <SavedSets id="4" className={styles.dashboardCard} />,
  },
];
