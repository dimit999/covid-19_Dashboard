import Chart from 'chart.js';
import {
  chart, lineOptions, barOptions, radioBtns,
  getLineChartData, getPieChartData, getBarChartData,
} from './Chart.utils';
import utils from '../../Utils';
import * as constants from '../../constants/constants';

export default class ChartJS {
  constructor() {
    this.allRecovered = null;
    this.allCases = null;
    this.allDeaths = null;
    this.todayRecovered = null;
    this.todayCases = null;
    this.todayDeaths = null;
    this.recoveredPerOneMillion = null;
    this.casesPerOneMillion = null;
    this.deathsPerOneMillion = null;
    this.todayRecoveredPerOneMillion = null;
    this.todayCasesPerOneMillion = null;
    this.todayDeathsPerOneMillion = null;
    this.daysTotalCases = null;
    this.daysTotalRecovered = null;
    this.daysTotalDeaths = null;
    this.daysTotalCountriesData = null;
    this.commonTotalCountriesData = null;
    this.initTotalCount();
    this.initTotalCountByCountries();
    this.initDaysCountTotal();
    this.initDaysCountTotalByCountries();
    this.addRadioBtnsEvent();
  }

  async initTotalCount() {
    const url = constants.apiUrls.worldometers;
    const urlParameter = constants.worldParameters.all;
    const totalData = await utils.fetchData(url, { yesterday: false }, urlParameter);
    const {
      recovered, cases, deaths,
      todayRecovered, todayCases, todayDeaths,
      recoveredPerOneMillion, casesPerOneMillion, deathsPerOneMillion,
      population,
    } = totalData;
    this.allRecovered = recovered;
    this.allCases = cases;
    this.allDeaths = deaths;
    this.todayRecovered = todayRecovered;
    this.todayCases = todayCases;
    this.todayDeaths = todayDeaths;
    this.recoveredPerOneMillion = recoveredPerOneMillion;
    this.casesPerOneMillion = casesPerOneMillion;
    this.deathsPerOneMillion = deathsPerOneMillion;
    this.todayRecoveredPerOneMillion = Math.ceil((todayRecovered / population) * 100000);
    this.todayCasesPerOneMillion = Math.ceil((casesPerOneMillion / population) * 100000);
    this.todayDeathsPerOneMillion = Math.ceil((deathsPerOneMillion / population) * 100000);
  }

  async initTotalCountByCountries() {
    const url = constants.apiUrls.worldometers;
    const urlParameter = constants.worldParameters.countries;
    const totalData = await utils.fetchData(url, { yesterday: false }, urlParameter);
    this.commonTotalCountriesData = totalData;
  }

  async initDaysCountTotal() {
    const url = constants.apiUrls.jhucsse;
    const urlParameter = constants.worldDaysParameters.historicalAll;
    const totalData = await utils.fetchData(url, { lastdays: 90 }, urlParameter);
    this.daysTotalCases = totalData.cases;
    this.daysTotalRecovered = totalData.recovered;
    this.daysTotalDeaths = totalData.deaths;
  }

  async initDaysCountTotalByCountries() {
    const url = constants.apiUrls.jhucsse;
    const urlParameter = constants.worldDaysParameters.historical;
    const totalData = await utils.fetchData(url, { lastdays: 90 }, urlParameter);
    this.daysTotalCountriesData = totalData;
    this.renderDefaultTotalChart();
  }

  /* Render Chart */
  renderDefaultTotalChart() {
    if ('USA1') {
      this.daysTotalCountriesData.forEach((element) => {
        if (element.country === 'USA') {
          this.chartLineWidget(element.timeline.cases,
            element.timeline.recovered, element.timeline.deaths);
        }
      });
    } else {
      this.chartLineWidget(this.daysTotalCases, this.daysTotalRecovered, this.daysTotalDeaths);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  chartLineWidget(cases, recovered, deaths) {
    const xData = Object.keys(cases);
    if (window.chartInstance) window.chartInstance.destroy();
    window.chartInstance = new Chart(chart, {
      type: 'line',
      data: getLineChartData(Object.values(cases),
        Object.values(recovered),
        Object.values(deaths), xData),
      lineOptions,
    });
    window.chartInstance.update();
  }

  // eslint-disable-next-line class-methods-use-this
  chartPieWidget(cases, recovered, deaths) {
    if (window.chartInstance) window.chartInstance.destroy();
    window.chartInstance = new Chart(chart, {
      type: 'pie',
      data: getPieChartData(cases, recovered, deaths),
      options: {
        responsive: true,
      },
    });
    window.chartInstance.update();
  }

  // eslint-disable-next-line class-methods-use-this
  chartBarWidget(cases, recovered, deaths) {
    if (window.chartInstance) window.chartInstance.destroy();
    window.chartInstance = new Chart(chart, {
      type: 'bar',
      data: getBarChartData(cases, recovered, deaths),
      options: barOptions,
    });
    window.chartInstance.update();
  }

  renderChart(target, commonCases, commonRecovered, commonDeaths) {
    if (true) {
      this.commonTotalCountriesData.forEach((element) => {
        if (element.country === 'USA') {
          if (target.innerText.includes('Total')) {
            this.chartPieWidget(element.cases,
              element.recovered, element.deaths);
          } else if (target.innerText === 'Last day') {
            this.chartPieWidget(element.todayCases,
              element.todayRecovered, element.todayDeaths);
          } else if (target.innerText.includes('Per 100')) {
            this.chartPieWidget(element.casesPerOneMillion,
              element.recoveredPerOneMillion, element.deathsPerOneMillion);
          } else if (target.innerText.includes('Last day per 100')) {
            this.chartPieWidget(element.oneCasePerPeople,
              element.oneTestPerPeople,
              element.oneDeathPerPeople);
          }
        }
      });
    } else {
      this.chartPieWidget(commonCases, commonRecovered, commonDeaths);
    }
  }

  /* Render Chart */
  renderCharts({ target }) {
    if (target.innerText.includes('Days')) {
      this.renderDefaultTotalChart();
    } else if (target.innerText.includes('Total')) {
      this.renderChart(target, this.allCases, this.allRecovered, this.allDeaths);
    } else if (target.innerText === 'Last day') {
      this.renderChart(target, this.todayCases, this.todayRecovered, this.todayDeaths);
    } else if (target.innerText.includes('Per 100')) {
      this.renderChart(target, this.casesPerOneMillion,
        this.recoveredPerOneMillion, this.deathsPerOneMillion);
    } else if (target.innerText.includes('Last day per 100')) {
      this.renderChart(target, this.todayRecoveredPerOneMillion,
        this.todayCasesPerOneMillion,
        this.todayDeathsPerOneMillion);
    }
  }

  addRadioBtnsEvent() {
    [...radioBtns].forEach((item) => {
      item.addEventListener('click', (target) => { this.renderCharts(target); });
    });
  }
}
