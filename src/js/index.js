import './spinner';
import App from '../components/App';
import CurrentDate from './currentDate';

const app = new App();
app.init();

const currentDate = new CurrentDate();
currentDate.init();

/* Import assets to dist folder */
function requireAll(assets) {
  assets.keys().forEach(assets);
}

requireAll(require.context('../assets', true, /\.(png|svg|jpg|jpe?g|gif)$/));
