import { TSortableItems } from '@ferlab/ui/core/layout/SortableGrid/SortableItem';
import { SorterResult } from 'antd/lib/table/interface';
import { TSortDirection } from 'graphql/queries';
import isEmpty from 'lodash/isEmpty';

export const scrollToTop = (scrollContentId: string) =>
  document
    .getElementById(scrollContentId)
    ?.querySelector('.simplebar-content-wrapper')
    ?.scrollTo(0, 0);

export const orderCardIfNeeded = (cards: TSortableItems[], userCardConfig: string[] | undefined) =>
  userCardConfig
    ? cards.sort((a, b) => (userCardConfig.indexOf(a.id) > userCardConfig.indexOf(b.id) ? 1 : -1))
    : cards;

export const getOrderFromAntdValue = (order: string): TSortDirection =>
  order === 'ascend' ? 'asc' : 'desc';

export const formatQuerySortList = (sorter: SorterResult<any> | SorterResult<any>[]) =>
  isEmpty(sorter)
    ? []
    : [sorter].flat().map((sorter) => ({
        field: sorter.columnKey as string,
        order: getOrderFromAntdValue(sorter.order!),
      }));

export const getCurrentUrl = () =>
  window.location.protocol + '//' + window.location.host + window.location.pathname;

const KEBAB_REGEX = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
export const EMAIL_REGEX = new RegExp(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/);

export const toKebabCase = (str: string) => {
  const match: string[] = (str && str.match(KEBAB_REGEX)) || [];
  return match.map((x: string) => x.toLowerCase()).join('-');
};

export const toExponentialNotation = (numberCandidate?: number, fractionDigits = 2): string =>
  numberCandidate ? numberCandidate.toExponential(fractionDigits) : '';

const canQuotientBeComputed = (num: number, denum: number) => {
  const areNumbers = !isNaN(num) && !isNaN(denum);
  return areNumbers && denum !== 0;
};

export const formatQuotientOrElse = (num: number, denum: number, defaultValue = '') =>
  canQuotientBeComputed(num, denum) ? `${num} / ${denum}` : defaultValue;

export const formatQuotientToExponentialOrElse = (num: number, denum: number, defaultValue = '') =>
  canQuotientBeComputed(num, denum) ? `${toExponentialNotation(num / denum)}` : defaultValue;
