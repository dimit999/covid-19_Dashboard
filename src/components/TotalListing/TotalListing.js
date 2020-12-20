import getChunk from './TotalListing.utils';
import TotalCard from '../TotalCard';
import utils from '../../Utils';
import * as constants from '../../constants/constants';

export default class TotalListing {
  constructor(types) {
    this.types = types;
    this.wrapper = document.querySelector('.cards_statistic');
    this.cards = {};
  }

  initCards(cards) {
    cards.forEach((card, idx) => {
      this.cards[idx] = new TotalCard(card, this.types[idx], this.countData);
    });
  }

  async initCount() {
    const url = constants.apiUrls.worldometers;
    const urlParameter = constants.worldParameters.all;
    const countData = await utils.fetchData(url, { yesterday: false }, urlParameter);

    this.countData = countData;
  }

  async render() {
    await this.initCount();
    let cards = null;
    const cardsTemplates = this.types.map((name) => getChunk(name));

    this.wrapper.innerHTML = `<div class="cards_statistic__wrapper wrapper">${cardsTemplates.join(' ')}</div>`;
    cards = document.querySelectorAll('.card-item');
    this.initCards(cards);
  }
}
