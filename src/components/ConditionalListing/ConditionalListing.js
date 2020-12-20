import * as listingUtils from './ConditionalListing.utils';
import ConditionalCard from '../ConditionalCard';
import utils from '../../Utils';
import * as constants from '../../constants/constants';

export default class ConditionalListing {
  constructor(data) {
    this.data = data;
    this.currentCountry = null;
    this.countsData = null;
    this.wrapper = document.querySelector('.common-tables__wrapper');
    this.tableCards = {};
  }

  initCards(tableCards) {
    tableCards.forEach((tableCard, idx) => {
      this.tableCards[idx] = new ConditionalCard(tableCard, this.data[idx], this.countsData);
    });
  }

  updateCards() {
    Object.keys(this.tableCards).forEach((idx) => {
      this.tableCards[idx].update(this.countsData);
    });
  }

  async update(country) {
    const url = constants.apiUrls.worldometers;
    const urlParameter = `${constants.worldParameters.countries}/${country}`;
    const countData = await utils.fetchData(url, { yesterday: false }, urlParameter);

    this.currentCountry = country;
    this.countsData = countData;
    this.updateCards();
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
