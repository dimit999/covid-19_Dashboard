import './spinner';
import App from '../components/App';

const app = new App();
app.init();

/* Import assets to dist folder */
function requireAll(assets) {
  assets.keys().forEach(assets);
}

requireAll(require.context('../assets', true, /\.(png|svg|jpg|jpe?g|gif)$/));
