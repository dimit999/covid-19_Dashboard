import './spinner';
import App from '../components/App';
import CurrentDate from './currentDate';

// import * as keyboard from './keyboard';

const app = new App();
app.init();

// window.onload = function fn() {
//   const gameResultsContainer = document.querySelector('.dataTable-search');
//   const defaultCardElement = '<div class="simple-keyboard"></div>';
//   gameResultsContainer.insertAdjacentHTML('afterBegin', defaultCardElement);
//   keyboard.initKeyboard();
// };

const currentDate = new CurrentDate();
currentDate.init();

/* Import assets to dist folder */
function requireAll(assets) {
  assets.keys().forEach(assets);
}

requireAll(require.context('../assets', true, /\.(png|svg|jpg|jpe?g|gif)$/));
