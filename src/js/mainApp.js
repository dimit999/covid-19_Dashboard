import './spinner';

function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(require.context('../assets', true, /\.(png|svg|jpg|jpe?g|gif)$/));

const fileref = document.createElement('script');
fileref.setAttribute('type', 'text/javascript');
fileref.setAttribute('src', 'https://apis.google.com/js/api.js');
