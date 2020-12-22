export const mapOptions = {
  center: [54.628333, 27.041901],
  zoom: 4,
};

export const iconOptions = {
  iconUrl: './assets/images/svg/circle_map.svg',
  iconSize: [10, 10],
};

export const config = {
  layersUrl: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
};

export const measures = [15000000, 10000000, 1000000, 500000, 50000];

/*
  $color-purple-light: #7D44D6;
  $color-purple: #313186;
  $color-red: #ff0000;
  $color-yellow:  #fdc408;
*/

export const colors = {
  0: '#ff0000',
  1: '#fdc408',
  2: '#008BE4',
  3: '#4A62FF',
  4: '#7D44D6',
};

export const minRadius = 50000;
