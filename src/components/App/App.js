// Главный класс - будет запускать дочерние классы - компоненты.
// Также следить за их изменениями, отсылать через класс-посредник методы
import utils from '../../Utils';
import * as constants from './constants';
import TotalListing from '../TotalListing';
import ConditionalListing from '../ConditionalListing';
import MainTable from '../MainTable';

export default class App {
  constructor() {
    this.totalListing = utils.listing(TotalListing, constants.totalsTypes);
    this.ConditionalListing = utils.listing(ConditionalListing, constants.conditionalValues);
    this.mainTable = new MainTable(constants.MaintableData);
    this.countryInput = document.querySelector('.common-tables__country-title input');
    this.currentCountry = null;
  }

  init() {
    // запуск
    this.totalListing.render();
    this.ConditionalListing.render();
    this.mainTable.render();
    // this.stateListener();
    // this.events();
  }

  /* events() {
    this.countryInput.addEventListener('change', () => {
      let val = this.countryInput.value;
    });
  } */

  /* stateListener() {
    // state менеджер, будет следить за изменениями объектов
     observer.subscribe((data) => {

    });
  } */
}
