import { useDispatch } from 'react-redux';
import ResizableGridLayout, {
  TSerializedResizableGridLayoutConfig,
} from '@ferlab/ui/core/layout/ResizableGridLayout';
import { Space } from 'antd';

import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { getResizableGridDictionary } from 'utils/translation';

import getSummaryLayout, { UID } from './getSummaryLayout';
import { getUserLayouts, SUMMARY_LAYOUTS_VERSION } from './utils';

import styles from './index.module.css';

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
