import Chart from 'chart.js';
import {
  chart, getPieChartOptions, getLineChartOptions, radioBtns,
  getLineChartData, getPieChartData,
  addSelectedClassBtn, removeClassBtn,
  getRadioBtnsDefaultBg,
} from './ChartJS.utils';
import utils from '../../Utils';
import * as constants from '../../constants/constants';
import chartButtons from './ChartJS.constants';

export default class ChartJS {
  constructor() {
    this.allRecovered = null;
    this.allCases = null;
    this.allDeaths = null;
    this.todayRecovered = null;
    this.todayCases = null;
    this.todayDeaths = null;
    this.recoveredPer100k = null;
    this.casesPer100k = null;
    this.deathsPer100k = null;
    this.todayRecoveredPer100k = null;
    this.todayCasesPer100k = null;
    this.todayDeathsPer100k = null;
    this.daysTotalCases = null;
    this.daysTotalRecovered = null;
    this.daysTotalDeaths = null;
    this.daysTotalCountriesData = null;
    this.commonTotalCountriesData = null;
    this.selectedCountry = null;
    this.initTotalCount();
    this.initTotalCountByCountries();
    this.initDaysCountTotal();
    this.initDaysCountTotalByCountries();
    this.addRadioBtnsEvent();
    this.region = null;
  }

  async update(country) {
    if (country) {
      this.selectedCountry = country;
      this.renderDefaultTotalChart();
    } else {
      this.selectedCountry = null;
      this.renderDefaultTotalChart();
    }
  }

  async initTotalCount() {
    const url = constants.apiUrls.worldometers;
    const urlParameter = constants.worldParameters.all;
    const totalData = await utils.fetchData(url, { yesterday: false }, urlParameter);
    const {
      recovered, cases, deaths,
      todayRecovered, todayCases, todayDeaths,
      population,
    } = totalData;
    this.allRecovered = recovered;
    this.allCases = cases;
    this.allDeaths = deaths;
    this.todayRecovered = todayRecovered;
    this.todayCases = todayCases;
    this.todayDeaths = todayDeaths;
    this.recoveredPer100k = Math.ceil((recovered / population) * 100000);
    this.casesPer100k = Math.ceil((cases / population) * 100000);
    this.deathsPer100k = Math.ceil((deaths / population) * 100000);
    this.todayRecoveredPer100k = Math.ceil((todayRecovered / population) * 100000);
    this.todayCasesPer100k = Math.ceil((todayCases / population) * 100000);
    this.todayDeathsPer100k = Math.ceil((todayDeaths / population) * 100000);
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
    this.region = this.selectedCountry || 'All World';
    getRadioBtnsDefaultBg();
    if (this.selectedCountry) {
      this.daysTotalCountriesData.forEach((element) => {
        if (element.country === this.selectedCountry) {
          this.chartLineWidget(element.timeline.cases,
            element.timeline.deaths, element.timeline.recovered);
        }
      });
    } else {
      this.chartLineWidget(this.daysTotalCases, this.daysTotalDeaths, this.daysTotalRecovered);
    }
  }

  chartLineWidget(cases, deaths, recovered) {
    const xData = Object.keys(cases);
    if (window.chartInstance) window.chartInstance.destroy();
    window.chartInstance = new Chart(chart, {
      type: 'line',
      data: getLineChartData(Object.values(cases),
        Object.values(deaths),
        Object.values(recovered), xData),
      options: getLineChartOptions(this.region),
    });
    window.chartInstance.update();
  }

  chartPieWidget(cases, deaths, recovered) {
    if (window.chartInstance) window.chartInstance.destroy();
    window.chartInstance = new Chart(chart, {
      type: 'pie',
      data: getPieChartData(cases, deaths, recovered),
      options: getPieChartOptions(this.region),
    });
    window.chartInstance.update();
  }

  renderChart(target, commonCases, commonDeaths, commonRecovered) {
    if (this.selectedCountry) {
      this.commonTotalCountriesData.forEach((element) => {
        if (element.country === this.selectedCountry) {
          if (target.control.id === chartButtons.total) {
            this.chartPieWidget(element.cases,
              element.deaths, element.recovered);
          } else if (target.control.id === chartButtons.lastDay) {
            this.chartPieWidget(element.todayCases,
              element.todayDeaths, element.todayRecovered);
          } else if (target.control.id === chartButtons.per100) {
            this.chartPieWidget(Math.ceil((element.cases / element.population) * 100000),
              Math.ceil((element.deaths / element.population) * 100000),
              Math.ceil((element.recovered / element.population) * 100000));
          } else if (target.control.id === chartButtons.lastDayPer100) {
            this.chartPieWidget(Math.ceil((element.todayCases / element.population) * 100000),
              Math.ceil((element.todayDeaths / element.population) * 100000),
              Math.ceil((element.todayRecovered / element.population) * 100000));
          }
        }
      });
    } else {
      this.chartPieWidget(commonCases, commonDeaths, commonRecovered);
    }
  }

  /* Render Chart */
  renderCharts({ target }) {
    removeClassBtn();
    if (target.control.id === chartButtons.historical) {
      this.renderDefaultTotalChart();
      getRadioBtnsDefaultBg();
    } else if (target.control.id === chartButtons.total) {
      this.renderChart(target, this.allCases, this.allDeaths, this.allRecovered);
      addSelectedClassBtn(target);
    } else if (target.control.id === chartButtons.lastDay) {
      this.renderChart(target, this.todayCases, this.todayDeaths, this.todayRecovered);
      addSelectedClassBtn(target);
    } else if (target.control.id === chartButtons.per100) {
      this.renderChart(target, this.casesPer100k,
        this.deathsPer100k, this.recoveredPer100k);
      addSelectedClassBtn(target);
    } else if (target.control.id === chartButtons.lastDayPer100) {
      this.renderChart(target, this.todayCasesPer100k,
        this.todayDeathsPer100k, this.todayRecoveredPer100k);
      addSelectedClassBtn(target);
    }
  }

  addRadioBtnsEvent() {
    [...radioBtns].forEach((item) => {
      item.addEventListener('click', (target) => { this.renderCharts(target); });
    });
  }
}
