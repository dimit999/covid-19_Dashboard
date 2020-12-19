import * as utils from './ConditionalListing.utils';
import ConditionalCard from '../ConditionalCard';

export default class ConditionalListing {
  constructor(data) {
    this.data = data;
    this.wrapper = document.querySelector('.common-tables__wrapper');
    this.tableCards = {};
  }

  initCards(tableCards) {
    tableCards.forEach((tableCard, idx) => {
      this.tableCards[idx] = new ConditionalCard(tableCard, this.data[idx]);
    });
  }

  render() {
    let tableCards = null;
    const tableCardsTemplates = this.data.map((data) => utils.getChunk(data));

    this.wrapper.innerHTML = `${tableCardsTemplates.join(' ')}`;
    tableCards = document.querySelectorAll('.common-table');
    this.initCards(tableCards);
  }
}
