import utils from '../../Utils';
import * as constants from '../../constants/constants';
import * as tableUtils from './MainTable.utils';
import statObserver from '../Observer';

export default class MainTable {
  constructor(data) {
    this.data = data;
    this.country = null;
    this.countsData = null;
    this.countElems = null;
    this.tableData = null;
    this.wrapper = document.querySelector('.countries-table');
    this.tbody = null;
    this.thead = null;
    this.table = null;
    this.search = null;
    this.initCount();
  }

  events() {
    this.tbody.addEventListener('click', ({ target }) => {
      if (target.classList.contains('country-btn')) {
        this.country = target.textContent;
        this.setSearchValue(this.country);
        this.stateSend();
      }
    });

    this.search.addEventListener('input', async () => {
      if (this.timer !== undefined) {
        clearInterval(this.timer);
      }

      this.timer = await setTimeout(() => {
        let pass = false;
        let word = null;

        if (this.search.value.length > 2) {
          word = this.checkCountry(this.search.value);
        }

        if (word) {
          pass = true;
          this.country = word;
        }

        if (!pass && this.tbody.querySelectorAll('tr').length === 1) {
          this.country = this.tbody.querySelector('tr').getAttribute('data-country');
        }

        if (this.search.value.length === 0) {
          this.country = '';
        }

        this.stateSend();
      }, 500);
    });
  }

  stateSend() {
    statObserver.broadcast({ country: this.country });
  }

  checkCountry(value) {
    return tableUtils.checkCountry(this.countsData, value);
  }

  setSearchValue(value) {
    const event = new Event('keyup');

    this.search.value = value;
    this.search.dispatchEvent(event);
  }

  render() {
    this.wrapper.innerHTML = tableUtils.getMainChunk();
    this.tbody = this.wrapper.querySelector('.countries-table__body');
    this.thead = this.wrapper.querySelector('.countries-table__head');
    this.renderHead();
  }

  renderHead() {
    const th = this.data.titles.map((type) => tableUtils.getTh(type));

    this.thead.innerHTML = `${th.join(' ')}`;
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
    const urlParameter = constants.worldParameters.countries;
    const countData = await utils.fetchData(url, this.data.sort, urlParameter);

    this.countsData = countData;
    statObserver.broadcast({ map: countData });
    this.renderCount();
    this.events();
  }

  renderCount() {
    this.countsData.forEach((data) => {
      const classTd = 'countries-table__row';
      const tr = document.createElement('tr');
      const caseElem = tableUtils.getElement('td', data.cases, classTd);
      const deathsElem = tableUtils.getElement('td', data.deaths, classTd);
      const recoveredsElem = tableUtils.getElement('td', data.recovered, classTd);
      const flagElem = tableUtils.getElement('td', `<img width="20" src="${data.countryInfo.flag}" alt="country">`, classTd);
      const countryBtn = tableUtils.getElement('td', `<button class="country-btn">${data.country}</button>`, classTd);

      this.tbody.append(tr);
      tr.setAttribute('data-country', data.country);
      tr.append(caseElem);
      tr.append(deathsElem);
      tr.append(recoveredsElem);
      tr.append(flagElem);
      tr.append(countryBtn);
    });

    this.tableData = new window.DataTable('#dataTable');
    this.search = this.wrapper.querySelector('.dataTable-search input');
  }
}
