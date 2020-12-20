const css = document.createElement('link');
const script = document.createElement('script');

css.setAttribute('rel', 'stylesheet');
css.setAttribute('href', 'http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css');
script.setAttribute('src', 'http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js');

document.body.append(css);
document.body.append(script);
