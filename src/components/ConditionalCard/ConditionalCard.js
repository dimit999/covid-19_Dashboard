export default class ConditionalCard {
  constructor(item, data, countData) {
    this.item = item;
    this.data = data;
    this.countsData = countData;
    this.countElems = null;
    this.getCountElems();
    this.renderCount();
  }

  getCountElems() {
    this.countElems = this.data.typesTitles.reduce((acc, item) => {
      const obj = { ...acc };

      obj[item] = this.item.querySelector(`[data-label="${item}"]`);
      return obj;
    }, {});
  }

  update(data) {
    this.countsData = data;
    console.log(this.countsData);
    this.renderCount();
  }

  renderCount() {
    this.data.types.forEach((type, idx) => {
      let count = this.countsData[type].toLocaleString('ru-RU');
      if (this.data.populationCondition) {
        count = Math.ceil((this.countsData[type] / this.countsData.population) * 100000);
      }

      this.countElems[this.data.typesTitles[idx]].textContent = `${count}`;
    });
  }
}
