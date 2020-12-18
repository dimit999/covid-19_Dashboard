export const totalsTypes = ['cases', 'deaths', 'recovered'];

export const conditionalValues = [
  {
    title: 'Number of cases in the last day',
    types: totalsTypes,
    params: { yesterday: true },
    populationCondition: false,
  },
  {
    title: 'The total number of cases per 100 thousand population',
    types: totalsTypes,
    params: { yesterday: false },
    populationCondition: true,
  },
  {
    title: 'The total number of cases in the last day per 100 thousand population',
    types: totalsTypes,
    params: { yesterday: true },
    populationCondition: true,
  },
];
