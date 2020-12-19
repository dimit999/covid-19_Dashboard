import utils from '../../Utils';
import * as constants from '../../constants/constants';

export default class TotalCard {
  constructor(item, type) {
    this.item = item;
    this.type = type;
    this.count = 0;
    this.countElem = item.querySelector('.card-item__value');
    this.initCount(type);
  }

  async initCount(type) {
    const url = constants.apiUrls.worldometers;
    const urlParameter = constants.worldParameters.all;
    const countData = await utils.fetchData(url, { yesterday: false }, urlParameter);

    this.count = countData[type].toLocaleString();
    this.renderCount();
  }

  renderCount() {
    this.countElem.textContent = `${this.count}`;
  }
}
