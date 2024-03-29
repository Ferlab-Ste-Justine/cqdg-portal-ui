/** https://youmightnotneed.com/lodash#uniqBy */
export const uniqBy = (arr: any[], iteratee: any) => {
  if (typeof iteratee === 'string') {
    const prop = iteratee;
    iteratee = (item: { [x: string]: any }) => item[prop];
  }
  return arr.filter((x, i, self) => i === self.findIndex((y) => iteratee(x) === iteratee(y)));
};

export const lowerAll = (arr: string[]) => arr.map((val) => val.toLowerCase());
