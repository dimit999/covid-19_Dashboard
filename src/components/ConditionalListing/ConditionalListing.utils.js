export const getTd = (type) => `<td class="td-elem" data-label="${type}">0</td>`;
export const getTh = (type) => `<th class="th-elem" scope="col">${type}</th>`;

export const getChunk = (data) => {
  const thCols = data.typesTitles.map((type) => getTh(type));
  const tdCols = data.typesTitles.map((type) => getTd(type));

  return `
    <table class="common-table">
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
