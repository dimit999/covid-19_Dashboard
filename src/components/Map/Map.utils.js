import statObserver from '../Observer';
import * as constants from './Map.constants';

export const addResources = async () => {
  const css = document.createElement('link');
  const script = document.createElement('script');

  css.setAttribute('rel', 'stylesheet');
  css.setAttribute('href', 'https://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css');
  script.setAttribute('src', 'https://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js');

  document.body.append(css);
  document.body.append(script);

  const pass = new Promise((resolve) => {
    if (typeof window.L === 'object') {
      resolve(true);
    }

    script.onload = () => {
      resolve(true);
    };
  });

  return pass;
};

export const getPopupChunk = (data) => {
  const chunk = `
    <b>${data.country}:</b><br>
    <span class="map-popup--span-purple">cases: ${data.cases}</span><br>
    <span class="map-popup--span-red">deaths: ${data.deaths}</span><br>
    <span class="map-popup--span-green">recovered: ${data.recovered}</span>
  `;

  return chunk;
};

export const buildMap = (mapOptions) => {
  const map = new window.L.Map('map', mapOptions);
  const layer = new window.L.TileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png');

  map.addLayer(layer);
  return map;
};

const setLegent = (map, arr) => {
  const currentMap = map;
  const legend = window.L.control({ position: 'bottomleft' });

  legend.onAdd = function set() {
    const div = window.L.DomUtil.create('div', 'legend');

    div.innerHTML += '<h4>Cases level:</h4>';
    div.innerHTML += `<i class="map-legend--icon" style="background: ${constants.colors[0]}"></i><span>${arr[0]}</span><br>`;
    div.innerHTML += `<i class="map-legend--icon" style="background: ${constants.colors[1]}"></i><span>${arr[1]}</span><br>`;
    div.innerHTML += `<i class="map-legend--icon" style="background: ${constants.colors[2]}"></i><span>${arr[2]}</span><br>`;
    div.innerHTML += `<i class="map-legend--icon" style="background: ${constants.colors[3]}"></i><span>${arr[3]}</span><br>`;
    div.innerHTML += `<i class="map-legend--icon" style="background: ${constants.colors[4]}"></i><span>${arr[4]}</span><br>`;

    return div;
  };

  legend.addTo(currentMap);
};

const setColor = (val, arr) => {
  let color = constants.colors[4];

  arr.some((key, idx) => {
    if (val >= key) {
      color = constants.colors[idx];
      return true;
    }

    return false;
  });

  return color;
};

export const setMarkers = (map, data) => {
  const customIcon = window.L.icon(constants.iconOptions);
  const ranges = constants.measures;

  setLegent(map, ranges);

  Object.keys(data).forEach((item) => {
    const markerOnClick = ({ target }) => {
      const country = target.options.title;
      statObserver.broadcast({ country });
    };

    const markOptions = {
      icon: customIcon,
      title: data[item].country,
    };

    const { lat } = data[item].countryInfo;
    const { long } = data[item].countryInfo;
    const marker = new window.L.Marker([lat, long], markOptions);
    const popup = getPopupChunk(data[item]);
    const circleCenter = [lat, long];

    const circleOptions = {
      color: setColor(data[item].cases, ranges),
      radius: 10,
    };

    const circle = window.L.circleMarker(circleCenter, circleOptions);

    circle.addTo(map);
    marker.bindPopup(popup, { className: 'map-popup' }).openPopup();
    marker.on('click', markerOnClick);
    marker.addTo(map);
  });
};

export const checkCountry = (data, value) => {
  const coord = [];

  Object.keys(data).some((idx) => {
    if (value.trim().toLowerCase() === data[idx].country.toLowerCase()) {
      coord.push(data[idx].countryInfo.lat);
      coord.push(data[idx].countryInfo.long);

      return true;
    }

    return false;
  });

  return coord;
};

export const changeCoordMap = (map, coords) => {
  map.panTo(coords);
  map.setZoom(4);

  return true;
};
