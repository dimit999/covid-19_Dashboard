import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';

function initKeyboard() {
  const defaultTheme = 'hg-theme-default myTheme1';

  const keyboard = new Keyboard({
    theme: defaultTheme,
    onChange: (input) => onChange(input),
    onKeyPress: (button) => onKeyPress(button),
    // preventMouseDownDefault: true,
    // preventMouseUpDefault: true,
    // stopMouseUpPropagation: false,
    // stopMouseDownPropagation: false,
  });

  const inputDOM = document.querySelector('.dataTable-input');

  function handleShift() {
    const currentLayout = keyboard.options.layoutName;
    const shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

    keyboard.setOptions({
      layoutName: shiftToggle,
    });
  }

  function showKeyboard() {
    keyboard.setOptions({
      theme: `${defaultTheme} show-keyboard`,
    });
  }

  function hideKeyboard() {
    keyboard.setOptions({
      theme: defaultTheme,
    });
  }

  /**
   * Keyboard show
   */
  inputDOM.addEventListener('focus', () => {
    showKeyboard();
  });

  /**
   * Keyboard show toggle
   */
  document.addEventListener('click', (event) => {
    if (
      /**
       * Hide the keyboard when you're not clicking it or when clicking an input
       * If you have installed a "click outside" library, please use that instead.
       */
      keyboard.options.theme.includes('show-keyboard')
      && !event.target.className.includes('dataTable-input')
      && !event.target.className.includes('hg-button')
      && !event.target.className.includes('hg-row')
      && !event.target.className.includes('simple-keyboard')
    ) {
      hideKeyboard();
    }
  });

  /**
   * Update simple-keyboard when input is changed directly
   */
  document.querySelector('.dataTable-input').addEventListener('input', (event) => {
    keyboard.setInput(event.target.value);
  });

  function onChange(input) {
    document.querySelector('.dataTable-input').value = input;
  }

  function onKeyPress(button) {
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === '{shift}' || button === '{lock}') handleShift();
  }
}

function addKeyboardAttr() {
  const gameResultsContainer = document.querySelector('.dataTable-search');
  const defaultCardElement = '<div class="simple-keyboard"></div>';
  gameResultsContainer.insertAdjacentHTML('afterBegin', defaultCardElement);
}

export { initKeyboard, addKeyboardAttr };
