import Chart from 'chart.js';

const chart = document.getElementById('chart').getContext('2d');
const gradientRecovered = chart.createLinearGradient(0, 0, 0, 450);
const gradientCases = chart.createLinearGradient(0, 0, 0, 650);
const gradientDeaths = chart.createLinearGradient(0, 0, 0, 650);

gradientRecovered.addColorStop(0, 'rgba(132, 196, 148, 0.5)');
gradientRecovered.addColorStop(0.5, 'rgba(55, 184, 87, 0.5)');
gradientRecovered.addColorStop(1, 'rgba(0, 189, 85, 0.5)');

gradientCases.addColorStop(0, 'rgba(127, 78, 167, 0.5)');
gradientCases.addColorStop(0.5, 'rgba(110, 36, 170, 0.5)');
gradientCases.addColorStop(1, 'rgba(92, 0, 167, 0.5)');

gradientDeaths.addColorStop(0, 'rgba(255, 0,0, 8)');
gradientDeaths.addColorStop(0.5, 'rgba(255, 0, 0, 5.5)');
gradientDeaths.addColorStop(1, 'rgba(255, 0, 0, 3)');

const options = {
  responsive: true,
  maintainAspectRatio: true,
  animation: {
    easing: 'easeInOutQuad',
    duration: 520,
  },
  scales: {
    xAxes: [{
      gridLines: {
        color: 'rgba(200, 200, 200, 0.05)',
        lineWidth: 1,
      },
    }],
    yAxes: [{
      gridLines: {
        color: 'rgba(200, 200, 200, 0.08)',
        lineWidth: 1,
      },
    }],
  },
  elements: {
    line: {
      tension: 0.4,
    },
  },
  legend: {
    display: true,
  },
  point: {
    backgroundColor: 'white',
  },
  tooltips: {
    titleFontFamily: 'Open Sans',
    backgroundColor: 'rgba(0,0,4,0.3)',
    titleFontColor: 'red',
    caretSize: 5,
    cornerRadius: 2,
    xPadding: 10,
    yPadding: 10,
  },
};

function getData(recoveredArr, casesArr, deathsArr) {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Recovered',
      backgroundColor: gradientRecovered,
      pointBackgroundColor: 'rgba(0, 189, 85, 0.5)',
      borderWidth: 1,
      borderColor: '#911215',
      data: recoveredArr,
    },
    {
      label: 'Cases',
      backgroundColor: gradientCases,
      pointBackgroundColor: 'rgba(92, 0, 167, 0.5)',
      borderWidth: 1,
      borderColor: '#911215',
      data: casesArr,
    },
    {
      label: 'Deaths',
      backgroundColor: gradientDeaths,
      pointBackgroundColor: 'rgba(255, 0, 0, 3)',
      borderWidth: 1,
      borderColor: '#911215',
      data: deathsArr,
    }],
  };

  return data;
}

function chartWidget(recoveredArr, casesArr, deathsArr) {
  const chartInstance = new Chart(chart, {
    type: 'line',
    data: getData(recoveredArr, casesArr, deathsArr),
    options,
  });
  chartInstance.update();
}

function renderDefaultTotalChart(recoveredArr, casesArr, deathsArr) {
  chartWidget(recoveredArr, casesArr, deathsArr);
}

/* Render Chart */
renderDefaultTotalChart([50, 0, 80, 81, 54, 50, 100, 130, 140, 150, 160, 110],
  [50, 55, 80, 81, 80, 50, 100, 130, 140, 150, 200, 110],
  [5, 4, 1, 6, 8, 0, 3, 130, 140, 150, 8, 0]);

const radioBtns = document.querySelectorAll('.radio-buttons-group__btn');

function renderChart({ target }) {
  if (target.innerText.includes('Total')) {
    chartWidget([50, 0, 80, 81, 54, 50, 100, 130, 140, 150, 160, 110],
      [50, 55, 80, 81, 80, 50, 100, 130, 140, 150, 200, 110],
      [5, 4, 1, 6, 8, 0, 3, 130, 140, 150, 8, 0]);
  } else if (target.innerText === 'Last day') {
    chartWidget([1, 0, 5, 88, 13, 5, 6, 130, 140, 11, 18, 110],
      [180, 0, 5, 5, 13, 5, 6, 3, 140, 11, 18, 500],
      [5, 4, 1, 6, 8, 0, 3, 130, 140, 150, 8, 0]);
  } else if (target.innerText.includes('Per 100')) {
    chartWidget([1, 0, 8000, 88, 13, 300, 6, 130, 140, 11, 18, 110],
      [180, 10000, 5, 5, 13, 5, 6, 3, 11, 11, 18, 500],
      [5, 4, 1, 6, 8, 0, 3, 130, 5000, 150, 8, 0]);
  } else if (target.innerText.includes('Last day per 100')) {
    chartWidget([500, 0, 5, 88, 13, 5, 6, 130, 140, 11, 18, 110],
      [180, 0, 5, 5, 2000, 5, 6, 3, 140, 11, 18, 500],
      [5, 4, 100, 6, 8, 0, 3, 130, 1000, 150, 8, 0]);
  }
}

[...radioBtns].forEach((item) => {
  item.addEventListener('click', (target) => { renderChart(target); });
});
