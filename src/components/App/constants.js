export const config = {
  defaultCountryTitle: 'All worlds',
};

export const totalsTypes = ['cases', 'deaths', 'recovered'];
export const todayTypes = ['todayCases', 'todayDeaths', 'todayRecovered'];
export const totalsTypesTable = ['cases', 'deaths', 'recovered', 'flag', 'country'];
export const totalsTypesTableTitles = ['Total cases', 'Total deaths', 'Total recovered', 'Flag', 'Country'];

export const MaintableData = {
  titles: totalsTypesTableTitles,
  types: totalsTypesTable,
  sort: { sort: 'cases' },
};

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
