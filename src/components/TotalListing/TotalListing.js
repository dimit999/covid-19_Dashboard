import getChunk from './TotalListing.utils';
import TotalCard from '../TotalCard';

export default class TotalListing {
  constructor(types) {
    this.types = types;
    this.wrapper = document.querySelector('.cards_statistic');
    this.cards = {};
  }

  initCards(cards) {
    cards.forEach((card, idx) => {
      this.cards[idx] = new TotalCard(card, this.types[idx]);
    });
  }

  render() {
    let cards = null;
    const cardsTemplates = this.types.map((name) => getChunk(name));

    this.wrapper.innerHTML = `<div class="cards_statistic__wrapper wrapper">${cardsTemplates.join(' ')}</div>`;
    cards = document.querySelectorAll('.card-item');
    this.initCards(cards);
  }
}
