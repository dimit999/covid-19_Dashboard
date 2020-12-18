export const getTd = (type) => `<td class="${type}_value" data-label="${type}">0</td>`;
export const getTh = (type) => `<th class="${type}" scope="col">${type}</th>`;

export const getChunk = (data) => {
  const thCols = data.types.map((type) => getTh(type));
  const tdCols = data.types.map((type) => getTd(type));

  return `
    <table class="common-tables_last_day common-table">
      <caption class="common-table__title">${data.title}</caption>
      <thead>
        <tr>
          ${thCols.join(' ')}
        </tr>
      </thead>
      <tbody>
        <tr>
          ${tdCols.join(' ')}
        </tr>
      </tbody>
    </table>
  `;
};
