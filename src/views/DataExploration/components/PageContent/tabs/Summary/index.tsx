import { useDispatch } from 'react-redux';
import ResizableGridLayout, {
  TSerializedResizableGridLayoutConfig,
} from '@ferlab/ui/core/layout/ResizableGridLayout';
import { Space } from 'antd';

import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { getResizableGridDictionary } from 'utils/translation';

import getSummaryLayout, { UID } from './getSummaryLayout';
import {
  getUserLayouts,
  hasVisibilityChanged,
  packLayouts,
  SUMMARY_LAYOUTS_VERSION,
} from './utils';

import styles from './index.module.css';

const SummaryTab = () => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const summaryConfig = userInfo?.config.data_exploration?.summary;
  const defaultLayouts = getSummaryLayout();
  const userLayouts = getUserLayouts(
    defaultLayouts,
    summaryConfig?.layouts,
    summaryConfig?.layoutsVersion,
  );

  const saveLayouts = (layouts: TSerializedResizableGridLayoutConfig[]) =>
    dispatch(
      updateUserConfig({
        data_exploration: { summary: { layouts, layoutsVersion: SUMMARY_LAYOUTS_VERSION } },
      }),
    );

  return (
    <Space className={styles.wrapper} direction="vertical">
      <ResizableGridLayout
        uid={UID}
        defaultLayouts={defaultLayouts}
        dictionary={getResizableGridDictionary()}
        layouts={userLayouts}
        onReset={saveLayouts}
        onConfigUpdate={(layouts: TSerializedResizableGridLayoutConfig[]) =>
          // Hiding or showing a card repacks the grid, dragging or resizing keeps the user positions
          saveLayouts(
            hasVisibilityChanged(layouts, userLayouts)
              ? packLayouts(layouts, defaultLayouts)
              : layouts,
          )
        }
      />
    </Space>
  );
};

export default SummaryTab;
