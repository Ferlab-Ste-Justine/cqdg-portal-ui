import { useDispatch } from 'react-redux';
import ResizableGridLayout, {
  TSerializedResizableGridLayoutConfig,
} from '@ferlab/ui/core/layout/ResizableGridLayout';
import { Space } from 'antd';

import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { getResizableGridDictionary } from 'utils/translation';

import getSummaryLayout, { SUMMARY_LAYOUTS_VERSION, UID } from './getSummaryLayout';

import styles from './index.module.css';

/**
 * Saved layouts contain the positions of every breakpoint, so they override the defaults.
 * When the default layout changes (new version), outdated positions are dropped
 * and only the visibility (hidden cards) chosen by the user is kept.
 */
const getUserLayouts = (
  layouts?: TSerializedResizableGridLayoutConfig[],
  version?: number,
): TSerializedResizableGridLayoutConfig[] | undefined => {
  if (!layouts || version === SUMMARY_LAYOUTS_VERSION) return layouts;

  // Without breakpoint keys, ResizableGridLayout falls back on the default positions
  return layouts.map(({ id, title, base, hidden }) => ({ id, title, base, hidden }));
};

const SummaryTab = () => {
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  const summaryConfig = userInfo?.config.data_exploration?.summary;

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
        defaultLayouts={getSummaryLayout()}
        dictionary={getResizableGridDictionary()}
        layouts={getUserLayouts(summaryConfig?.layouts, summaryConfig?.layoutsVersion)}
        onReset={saveLayouts}
        onConfigUpdate={saveLayouts}
      />
    </Space>
  );
};

export default SummaryTab;
