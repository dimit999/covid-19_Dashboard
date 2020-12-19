export const totalsTypes = ['cases', 'deaths', 'recovered', 'flag', 'country'];
export const todayTypes = ['todayCases', 'todayDeaths', 'todayRecovered'];

export const conditionalValues = [
  {
    title: 'Number of cases in the last day',
    types: todayTypes,
    typesTitles: totalsTypes,
    params: { yesterday: false },
    populationCondition: false,
  },
  {
    title: 'The total number of cases per 100 thousand population',
    types: totalsTypes,
    typesTitles: totalsTypes,
    params: { yesterday: false },
    populationCondition: true,
  },
  {
    title: 'The total number of cases in the last day per 100 thousand population',
    types: todayTypes,
    typesTitles: totalsTypes,
    params: { yesterday: false },
    populationCondition: true,
  },
];
