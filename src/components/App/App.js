// Главный класс - будет запускать дочерние классы - компоненты.
// Также следить за их изменениями, отсылать через класс-посредник методы
import utils from '../../Utils';
import * as constants from './constants';
import TotalListing from '../TotalListing';
import ConditionalListing from '../ConditionalListing';
import ChartJS from '../ChartJS';
import MainTable from '../MainTable';
import statObserver from '../Observer';

export default class App {
  constructor() {
    this.totalListing = utils.listing(TotalListing, constants.totalsTypes);
    this.ConditionalListing = utils.listing(ConditionalListing, constants.conditionalValues);
    this.ChartJS = new ChartJS();
    this.mainTable = new MainTable(constants.MaintableData);
    this.countryInput = document.querySelector('.common-tables__country-title input');
    this.countryResetBtn = document.querySelector('.reset-btn');
    this.currentCountry = '';
  }

  init() {
    this.totalListing.render();
    this.ConditionalListing.render();
    this.mainTable.render();
    this.stateListener();
    this.events();
  }

  updateCountryInput() {
    let title = this.currentCountry;

    if (this.currentCountry === '') {
      title = constants.config.defaultCountryTitle;
    }

    this.countryInput.value = title;
  }

  events() {
    this.countryResetBtn.addEventListener('click', () => {
      this.currentCountry = '';
      this.updateCountryInput();
      this.ConditionalListing.update(this.currentCountry);
      this.ChartJS.renderDefaultTotalChart();
      this.mainTable.setSearchValue(this.currentCountry);
    });
  }

  stateListener() {
    statObserver.subscribe((data) => {
      if ('country' in data) {
        this.currentCountry = data.country;
        this.updateCountryInput();
        this.ConditionalListing.update(this.currentCountry);
        this.ChartJS.update(this.currentCountry);
      }
    });
  }
}
