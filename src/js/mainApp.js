import './spinner';

/* Import assets to dist folder */
function requireAll(assets) {
  assets.keys().forEach(assets);
}

requireAll(require.context('../assets', true, /\.(png|svg|jpg|jpe?g|gif)$/));
