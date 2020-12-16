// Главный класс - будет запускать дочерние классы - компоненты.
// Также следить за их изменениями, отсылать через класс-посредник методы
import utils from '../Utils';
import totalsTypes from './constants';
import TotalListing from '../TotalListing';

export default class App {
  constructor() {
    this.totalListing = utils.listing(TotalListing, totalsTypes);
  }

  init() {
    // запуск
    this.totalListing.render();
    // this.stateListener();
    // this.events();
  }

  /* events() {
    // тут будут отслеживаться dom евенты
  }

  stateListener() {
    // state менеджер, будет следить за изменениями объектов
    /* observer.subscribe((datas) => {

    });
  } */
}
