import * as listingUtils from './ConditionalListing.utils';
import ConditionalCard from '../ConditionalCard';
import utils from '../../Utils';
import * as constants from '../../constants/constants';

export default class ConditionalListing {
  constructor(data) {
    this.data = data;
    this.wrapper = document.querySelector('.common-tables__wrapper');
    this.tableCards = {};
  }

  initCards(tableCards) {
    tableCards.forEach((tableCard, idx) => {
      this.tableCards[idx] = new ConditionalCard(tableCard, this.data[idx], this.countsData);
    });
  }

  async initCount() {
    const url = constants.apiUrls.worldometers;
    const urlParameter = constants.worldParameters.all;
    const countData = await utils.fetchData(url, { yesterday: false }, urlParameter);

    this.countsData = countData;
  }

  async render() {
    await this.initCount();

    let tableCards = null;
    const tableCardsTemplates = this.data.map((data) => listingUtils.getChunk(data));

    this.wrapper.innerHTML = `${tableCardsTemplates.join(' ')}`;
    tableCards = document.querySelectorAll('.common-table');
    this.initCards(tableCards);
  }
}
