export const getTd = (type) => `<td data-label="${type}">0</td>`;
export const getTh = (type) => `<th class="countries-table__column">${type}</th>`;

export const getElement = (tag, value = '', classes = '') => {
  const elem = document.createElement(tag);

  if (classes) {
    elem.classList.add(classes);
  }

  elem.innerHTML = `${value}`;
  return elem;
};

export const getMainChunk = () => {
  const chunk = `
  <div class="countries-table__wrapper wrapper">
    <table class="table table-bordered table-sortable" id="dataTable" width="100%" cellspacing="0">
      <thead class="countries-table__head">
      </thead>
      <tbody class="countries-table__body">
      </tbody>
    </table>
  </div>`;
  return chunk;
};

export const checkCountry = (data, value) => {
  let word = null;
  Object.keys(data).some((idx) => {
    if (value.trim().toLowerCase() === data[idx].country.toLowerCase()) {
      word = data[idx].country;
      return true;
    }
    return false;
  });

  return word;
};
