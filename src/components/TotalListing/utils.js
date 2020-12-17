const getChunk = (name) => {
  const chunk = `
    <div class="cards_statistic__default-card">
      <div class="card">
        <div class="card_title">Total ${name}</div>
        <div class="card_value">0</div>
      </div>
    </div>`;

  return chunk;
};

export default getChunk;
