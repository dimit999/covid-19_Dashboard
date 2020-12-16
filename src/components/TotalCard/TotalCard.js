import utils from '../Utils';
import worldometers from './constants';

export default class TotalCard {
  constructor(item, type) {
    this.item = item;
    this.type = type;
    this.count = 0;
    this.countElem = item.querySelector('.card_value');
    this.initCount(type);
  }

  async initCount(type) {
    const countData = await utils.fetchWorld({ yesterday: false }, worldometers.all);
    this.count = countData[type];
    this.renderCount();
  }

  renderCount() {
    this.countElem.textContent = `${this.count}`;
  }
}
