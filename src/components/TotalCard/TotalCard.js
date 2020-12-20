export default class TotalCard {
  constructor(item, type, countData) {
    this.item = item;
    this.type = type;
    this.countData = countData;
    this.count = 0;
    this.countElem = item.querySelector('.card-item__value');
    this.initCount();
  }

  initCount() {
    this.count = this.countData[this.type].toLocaleString('ru-RU');
    this.renderCount();
  }

  renderCount() {
    this.countElem.textContent = `${this.count}`;
  }
}
