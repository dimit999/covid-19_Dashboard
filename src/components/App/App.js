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
    // тут будут отслеживаться dom евенты
  }

  stateListener() {
    // state менеджер, будет следить за изменениями объектов
    /* observer.subscribe((data) => {

    });
  } */
}
