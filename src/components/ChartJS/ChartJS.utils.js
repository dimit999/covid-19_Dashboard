import utils from '../../Utils';

/* Chart parameters */
const chart = document.getElementById('chart').getContext('2d');
const radioBtns = document.querySelectorAll('.radio-buttons-group__btn');
const lineChartSection = document.querySelector('.line-chart');

const gradientRecovered = chart.createLinearGradient(0, 0, 0, 850);
const gradientCases = chart.createLinearGradient(0, 0, 0, 650);
const gradientDeaths = chart.createLinearGradient(0, 0, 0, 550);

gradientRecovered.addColorStop(0, 'rgb(4, 221, 76)');
gradientRecovered.addColorStop(0.5, 'rgb(28, 182, 79)');
gradientRecovered.addColorStop(1, 'rgb(4, 221, 76)');

gradientCases.addColorStop(0, 'rgb(135, 20, 243)');
gradientCases.addColorStop(0.5, 'rgb(117, 35, 194)');
gradientCases.addColorStop(1, 'rgb(135, 20, 243)');

gradientDeaths.addColorStop(0, 'rgb(255, 4, 25)');
gradientDeaths.addColorStop(0.5, 'rgb(184, 44, 56)');
gradientDeaths.addColorStop(1, 'rgb(255, 4, 25)');

/* Chart options */
function getLineChartOptions(region) {
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: true,
    title: {
      display: true,
      text: `Statistic for ${region}`,
      fontColor: 'white',
      fontSize: 16,
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
        ticks: {
          fontColor: 'white',
          fontSize: 13,
          fontStyle: 'bold',
        },
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(200, 200, 200, 0.2)',
          lineWidth: 1,
        },
        ticks: {
          fontColor: 'white',
          fontSize: 13,
          fontStyle: 'bold',
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
      labels: {
        fontColor: 'white',
      },
    },
    point: {
      backgroundColor: 'white',
    },
    tooltips: {
      titleFontFamily: 'Open Sans',
      backgroundColor: 'rgba(0,0,4,0.3)',
      titleFontColor: 'white',
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
      fontColor: 'white',
      fontSize: 16,
    },
    legend: {
      labels: {
        fontColor: 'white',
      },
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
      pointBackgroundColor: '#956BD6',
      borderWidth: 1,
      borderColor: 'rgba(255,99,132,1)',
      data: cases,
    },
    {
      label: 'Deaths',
      backgroundColor: gradientDeaths,
      pointBackgroundColor: '#ff0000',
      borderWidth: 1,
      borderColor: 'rgba(255, 206, 86, 1)',
      data: deaths,
    },
    {
      label: 'Recovered',
      backgroundColor: gradientRecovered,
      pointBackgroundColor: '#07c400',
      borderWidth: 1,
      borderColor: 'rgba(54, 162, 235, 1)',
      data: recovered,
    }],
  };
  return data;
}

function getPieChartData(cases, deaths, recovered) {
  const data = {
    labels: ['Cases', 'Deaths', 'Recovered'],
    datasets: [{
      data: [cases, deaths, recovered],
      backgroundColor: [
        'rgb(135, 20, 243)',
        '#ff0000',
        '#07c400'],
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
    if (radioBtn.innerHTML.includes('Historical')) {
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
