export default class CurrentDate {
  constructor() {
    this.data = document.querySelector('.header_date');
  }

  init() {
    const today = new Date();
    const day = today.getUTCDate();
    const month = today.getUTCMonth() + 1;
    const year = today.getUTCFullYear();

    this.data.innerHTML = `<div>${day}</div><span>.</span><div>${month}</div><span>.</span><div>${year}</div>`;
  }
}
