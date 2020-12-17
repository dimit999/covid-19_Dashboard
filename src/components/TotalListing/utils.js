const getChunk = (name) => {
  const chunk = `
    <div class="card-item">
      <div class="card-item__content">
        <div class="card-item__title">Total ${name}</div>
        <div class="card-item__value">0</div>
      </div>
    </div>`;

  return chunk;
};

export default getChunk;
