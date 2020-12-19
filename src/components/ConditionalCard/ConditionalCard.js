import utils from '../../Utils';
import * as constants from '../../constants/constants';

export default class ConditionalCard {
  constructor(item, data) {
    this.item = item;
    this.data = data;
    this.countsData = null;
    this.countElems = null;
    this.getCountElems();
    this.initCount();
  }

  getCountElems() {
    this.countElems = this.data.typesTitles.reduce((acc, item) => {
      const obj = { ...acc };

      obj[item] = this.item.querySelector(`[data-label="${item}"]`);
      return obj;
    }, {});
  }

  async initCount() {
    const url = constants.apiUrls.worldometers;
    const urlParameter = constants.worldParameters.all;
    const countData = await utils.fetchData(url, this.data.params, urlParameter);

    this.countsData = countData;
    this.renderCount();
  }

  renderCount() {
    this.data.types.forEach((type, idx) => {
      let count = this.countsData[type].toLocaleString();

      if (this.data.populationCondition) {
        count = Math.ceil((this.countsData[type] / this.countsData.population) * 100000);
      }

      this.countElems[this.data.typesTitles[idx]].textContent = `${count}`;
    });
  }
}
