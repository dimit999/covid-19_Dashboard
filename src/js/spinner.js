document.onreadystatechange = () => {
  if (document.readyState !== 'complete') {
    document.querySelector('body').style.visibility = 'hidden';
    document.querySelector('body').style.background = 'black';
    document.querySelector('#loading').style.visibility = 'visible';
  } else {
    document.querySelector('#loading').style.display = 'none';
    document.querySelector('body').style.visibility = 'visible';
    document.querySelector('body').style = `background-image: url('./assets/images/jpeg/bg.jpeg');
    background-repeat: no-repeat center fixed;
    background-size: cover;
    background-position-y: no-repeat center;
    background-position-x: no-repeat;
    color: $color-white;`;
  }
};
