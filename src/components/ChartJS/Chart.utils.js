import utils from '../../Utils';

/* Chart parameters */
const chart = document.getElementById('chart').getContext('2d');
const radioBtns = document.querySelectorAll('.radio-buttons-group__btn');
const lineChartSection = document.querySelector('.line-chart');

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
function getLineChartOptions(region) {
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: true,
    title: {
      display: true,
      text: `Statistic for ${region}`,
    },
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
  return lineOptions;
}

function getPieChartOptions(region) {
  const pieOptions = {
    responsive: true,
    title: {
      display: true,
      text: `Statistic for ${region}`,
    },
  };
  return pieOptions;
}

/* Get chart data */
function getLineChartData(cases, deaths, recovered, xData) {
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
      label: 'Deaths',
      backgroundColor: gradientDeaths,
      pointBackgroundColor: 'rgba(255, 0, 0, 3)',
      borderWidth: 1,
      borderColor: '#911215',
      data: deaths,
    },
    {
      label: 'Recovered',
      backgroundColor: gradientRecovered,
      pointBackgroundColor: 'rgba(0, 189, 85, 0.5)',
      borderWidth: 1,
      borderColor: '#911215',
      data: recovered,
    }],
  };
  return data;
}

function getPieChartData(cases, deaths, recovered) {
  const data = {
    labels: ['Cases', 'Deaths', 'Recovered'],
    datasets: [{
      label: 'TEST',
      data: [cases, deaths, recovered],
      backgroundColor: [
        'rgba(92, 0, 167, 0.5)',
        'rgba(255, 0, 0, 3)',
        'rgba(0, 189, 85, 0.5)'],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(255, 206, 86, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    }],
  };

  return data;
}

/* Get fullscreen for chart */
function fullScreenBtnEvent() {
  document.querySelector('.full-screen').addEventListener('click', () => { utils.openFullscreen(lineChartSection); });
}

fullScreenBtnEvent();

/* Radio btn colored actions */
function addSelectedClassBtn(target) {
  target.classList.add('selected-btn');
}

function removeClassBtn() {
  [...radioBtns].forEach((item) => {
    item.classList.remove('selected-btn');
    item.classList.remove('not-selected-btn');
  });
}

function getRadioBtnsDefaultBg() {
  [...radioBtns].forEach((item) => {
    const radioBtn = item;
    if (radioBtn.innerHTML.includes('Days')) {
      radioBtn.classList.add('selected-btn');
      radioBtn.classList.remove('not-selected-btn');
    } else {
      radioBtn.classList.remove('selected-btn');
      radioBtn.classList.add('not-selected-btn');
    }
  });
}

export {
  chart, getLineChartOptions, radioBtns,
  getPieChartOptions, getLineChartData, getPieChartData, addSelectedClassBtn,
  removeClassBtn, getRadioBtnsDefaultBg,
};
