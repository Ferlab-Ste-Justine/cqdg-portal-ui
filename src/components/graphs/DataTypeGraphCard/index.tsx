import { useEffect, useRef, useState } from 'react';
import intl from 'react-intl-universal';
import BarChart from '@ferlab/ui/core/components/Charts/Bar';
import Empty from '@ferlab/ui/core/components/Empty';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ArrangerValues } from '@ferlab/ui/core/data/arranger/formatting';
import ResizableGridCard from '@ferlab/ui/core/layout/ResizableGridLayout/ResizableGridCard';
import { aggregationToChartData } from '@ferlab/ui/core/layout/ResizableGridLayout/utils';
import { INDEXES } from 'graphql/constants';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import { PARTICIPANT_AGG_QUERY } from 'graphql/summary/queries';

import useLazyResultQuery from 'hooks/graphql/useLazyResultQuery';
import { truncateString } from 'utils/string';
import { getResizableGridDictionary } from 'utils/translation';

import styles from './index.module.css';

const addToQuery = (field: string, key: string, queryId: string) =>
  updateActiveQueryField({
    queryBuilderId: queryId,
    field,
    value: [key.toLowerCase() === 'no data' ? ArrangerValues.missing : key],
    index: INDEXES.FILE,
  });

const BAR_HEIGHT = 18;
const CHART_MARGIN = {
  bottom: 45,
  left: 140,
  right: 12,
  top: 12,
};

const getChartHeight = (length: number) =>
  length * BAR_HEIGHT + CHART_MARGIN.top + CHART_MARGIN.bottom;

const DataTypeBarChart = ({
  data,
  isPlayable,
  queryId,
}: {
  data: any[];
  isPlayable: boolean;
  queryId: string;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [availableHeight, setAvailableHeight] = useState(0);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setAvailableHeight(entry.contentRect.height));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Nivo draws the first item at the bottom in horizontal layout: reverse so the largest is on top
  const chartData = [...data].reverse();
  const chartHeight = getChartHeight(data.length);
  // Only scroll when the chart really doesn't fit (1px tolerance for sub-pixel rounding)
  const needsScroll = availableHeight > 0 && chartHeight > availableHeight + 1;

  return (
    <div className={styles.scrollWrapper}>
      <div
        ref={scrollRef}
        className={styles.scrollContent}
        style={{ overflowY: needsScroll ? 'auto' : 'hidden' }}
      >
        <div
          className={styles.chartContainer}
          style={{ height: needsScroll ? chartHeight : '100%' }}
        >
          <BarChart
            data={chartData}
            axisLeft={{
              legend: intl.get('entities.file.data_type'),
              legendPosition: 'middle',
              legendOffset: -128,
              format: (title: string) => truncateString(title, 15),
            }}
            tooltipLabel={(node: any) => node.data.id}
            axisBottom={{
              legend: intl.get('screen.dataExploration.tabs.summary.availableData.axis'),
              legendPosition: 'middle',
              legendOffset: 35,
            }}
            onClick={(datum: any) =>
              isPlayable && addToQuery('data_type', datum.indexValue as string, queryId)
            }
            margin={CHART_MARGIN}
            layout="horizontal"
          />
        </div>
      </div>
    </div>
  );
};

const DataTypeGraphCard = ({
  gridUID,
  id,
  queryId,
  isPlayable = true,
}: {
  gridUID: string;
  id: string;
  queryId: string;
  isPlayable?: boolean;
}) => {
  const sqon = useParticipantResolvedSqon(queryId);
  const { loading, result } = useLazyResultQuery(PARTICIPANT_AGG_QUERY, {
    variables: { sqon },
  });
  const data = aggregationToChartData(
    result?.Participant?.aggregations?.files__data_type.buckets,
    result?.Participant?.hits?.total,
  ).sort((a, b) => b.value - a.value || a.id.localeCompare(b.id));

  return (
    <ResizableGridCard
      gridUID={gridUID}
      id={id}
      dictionary={getResizableGridDictionary().download}
      theme="shade"
      loading={loading}
      loadingType="spinner"
      headerTitle={intl.get('entities.participant.participantsByDataType')}
      tsvSettings={{
        data: [data],
      }}
      titleTruncateThresholdWidth={70}
      modalContent={<DataTypeBarChart data={data} isPlayable={isPlayable} queryId={queryId} />}
      modalSettings={{
        width: 800,
        height: 400,
      }}
      content={
        <>
          {!data?.length ? (
            <Empty imageType="grid" size="large" description={intl.get('api.noData')} />
          ) : (
            <DataTypeBarChart data={data} isPlayable={isPlayable} queryId={queryId} />
          )}
        </>
      }
    />
  );
};

export default DataTypeGraphCard;
