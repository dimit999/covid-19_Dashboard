export const getTd = (type) => `<td data-label="${type}">0</td>`;
export const getTh = (type) => `<th class="countries-table__column">${type}</th>`;

export const getElement = (tag, value = '') => {
  const elem = document.createElement(tag);
  elem.innerHTML = `${value}`;
  return elem;
};

export const getMainChunk = () => {
  const chunk = `
  <div class="countries-table__wrapper wrapper">
    <table class="table table-bordered table-sortable" id="dataTable" width="100%" cellspacing="0">
      <thead class="countries-table__head">
          <tr></tr>
      </thead>
      <tbody class="countries-table__body">
      </tbody>
    </table>
  </div>`;
  return chunk;
};
