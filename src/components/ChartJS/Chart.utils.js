/* Chart parameters */
const chart = document.getElementById('chart').getContext('2d');
const radioBtns = document.querySelectorAll('.radio-buttons-group__btn');

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

/* Chart options */
const lineOptions = {
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

const barOptions = {
  responsive: true,
  scales: {
    xAxes: [{
      ticks: {
        maxRotation: 10,
        minRotation: 0,
      },
      gridLines: {
        offsetGridLines: true,
      },
    },
    ],
    yAxes: [{
      ticks: {
        beginAtZero: true,
      },
    }],
  },
};

/* Get chart data */
function getLineChartData(cases, recovered, deaths, xData) {
  const data = {
    labels: xData,
    datasets: [{
      label: 'Cases',
      backgroundColor: gradientCases,
      pointBackgroundColor: 'rgba(92, 0, 167, 0.5)',
      borderWidth: 1,
      borderColor: '#911215',
      data: cases,
    },
    {
      label: 'Recovered',
      backgroundColor: gradientRecovered,
      pointBackgroundColor: 'rgba(0, 189, 85, 0.5)',
      borderWidth: 1,
      borderColor: '#911215',
      data: recovered,
    },
    {
      label: 'Deaths',
      backgroundColor: gradientDeaths,
      pointBackgroundColor: 'rgba(255, 0, 0, 3)',
      borderWidth: 1,
      borderColor: '#911215',
      data: deaths,
    }],
  };
  return data;
}

function getPieChartData(cases, recovered, deaths) {
  const data = {
    labels: ['Recovered', 'Cases', 'Deaths'],
    datasets: [{
      data: [cases, recovered, deaths],
      backgroundColor: [
        'rgba(0, 189, 85, 0.5)',
        'rgba(92, 0, 167, 0.5)',
        'rgba(255, 0, 0, 3)'],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    }],
  };

  return data;
}

function getBarChartData(cases, recovered, deaths) {
  const data = {
    labels: ['Cases', 'Recovered', 'Deaths'],
    datasets: [{
      data: [cases, recovered, deaths],
      fill: false,
      backgroundColor: [
        'rgba(0, 189, 85, 0.5)',
        'rgba(92, 0, 167, 0.5)',
        'rgba(255, 0, 0, 3)'],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    }],
  };
  return data;
}

export {
  chart, lineOptions, barOptions, radioBtns,
  getLineChartData, getPieChartData, getBarChartData,
};
