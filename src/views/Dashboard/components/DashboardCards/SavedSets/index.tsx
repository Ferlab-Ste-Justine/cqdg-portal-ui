import { ReactElement } from 'react';
import intl from 'react-intl-universal';
import { ExperimentOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';
import Empty from '@ferlab/ui/core/components/Empty';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { List, Tabs, Typography } from 'antd';
import cx from 'classnames';
import CardErrorPlaceholder from 'views/Dashboard/components/CardErrorPlaceHolder';
import CardHeader from 'views/Dashboard/components/CardHeader';
import { DashboardCardProps } from 'views/Dashboard/components/DashboardCards';

import PopoverContentLink from 'components/uiKit/PopoverContentLink';
import { IUserSetOutput, SetType } from 'services/api/savedSet/models';
import { SUPPORT_EMAIL } from 'store/report/thunks';
import { useSavedSet } from 'store/savedSet';
import { STATIC_ROUTES } from 'utils/routes';

import ListItem from './ListItem';

import styles from './index.module.scss';

const { Text } = Typography;

const getItemList = (
  type: SetType,
  savedSets: IUserSetOutput[],
  fetchingError: boolean,
  isLoading: boolean,
  icon: ReactElement,
) => (
  <List<IUserSetOutput>
    className={styles.savedFiltersList}
    bordered
    locale={{
      emptyText: fetchingError ? (
        <CardErrorPlaceholder
          title={intl.get('screen.dashboard.cards.savedSets.failedFetch')}
          subTitle={
            <Text>
              {intl.get('screen.dashboard.cards.pleaseRefresh')}
              <ExternalLink href={`mailto:${SUPPORT_EMAIL}`}>
                <Text>{intl.get('screen.dashboard.cards.contact')}</Text>
              </ExternalLink>
              .
            </Text>
          }
        />
      ) : (
        <Empty
          imageType="grid"
          description={intl.get('screen.dashboard.cards.savedSets.noSaved')}
        />
      ),
    }}
    dataSource={fetchingError ? [] : savedSets.filter((s) => s.setType === type)}
    loading={isLoading}
    renderItem={(item) => <ListItem data={item} icon={icon} />}
  />
);

const SavedSets = ({ id, key, className = '' }: DashboardCardProps) => {
  const { savedSets, isLoading, fetchingError } = useSavedSet();

  const items = [
    {
      label: (
        <div>
          <UserOutlined />
          {intl.get('screen.dashboard.cards.savedSets.participants')} (
          {savedSets.filter((s) => s.setType === SetType.PARTICIPANT).length})
        </div>
      ),
      key: 'participants',
      children: getItemList(
        SetType.PARTICIPANT,
        savedSets,
        fetchingError,
        isLoading,
        <UserOutlined />,
      ),
    },
    {
      label: (
        <div>
          <ExperimentOutlined />
          {intl.get('screen.dashboard.cards.savedSets.biospecimens')} (
          {savedSets.filter((s) => s.setType === SetType.BIOSPECIMEN).length})
        </div>
      ),
      key: 'biospecimens',
      children: getItemList(
        SetType.BIOSPECIMEN,
        savedSets,
        fetchingError,
        isLoading,
        <ExperimentOutlined />,
      ),
    },
    {
      label: (
        <div>
          <FileTextOutlined />
          {intl.get('screen.dashboard.cards.savedSets.files')} (
          {savedSets.filter((s) => s.setType === SetType.FILE).length})
        </div>
      ),
      key: 'files',
      children: getItemList(
        SetType.FILE,
        savedSets,
        fetchingError,
        isLoading,
        <FileTextOutlined />,
      ),
    },
  ];

  return (
    <GridCard
      theme="shade"
      wrapperClassName={className}
      title={
        <CardHeader
          id={id}
          key={key}
          title={intl.get('screen.dashboard.cards.savedSets.title')}
          withHandle
          infoPopover={{
            title: intl.get('screen.dashboard.cards.savedSets.popoverTitle'),
            content: (
              <Text>
                {intl.get('screen.dashboard.cards.savedSets.popoverContent')}
                <PopoverContentLink
                  to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
                  title={intl.get('screen.dashboard.cards.savedSets.popoverContentLink')}
                />
                .
              </Text>
            ),
          }}
        />
      }
      // @ts-ignore
      content={
        <Tabs
          className={cx(styles.setTabs, 'navNoMarginBtm')}
          defaultActiveKey="participants"
          items={items}
        />
      }
    />
  );
};

export default SavedSets;
