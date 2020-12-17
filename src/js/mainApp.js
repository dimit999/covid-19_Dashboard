import './spinner';

/* Import assets to dist folder */
function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(require.context('../assets', true, /\.(png|svg|jpg|jpe?g|gif)$/));
