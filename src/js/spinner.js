document.onreadystatechange = () => {
  if (document.readyState !== 'complete') {
    document.querySelector('body').style.visibility = 'hidden';
    document.querySelector('body').style.background.Color = 'black';
    document.querySelector('#loading').style.visibility = 'visible';
  } else {
    document.querySelector('#loading').style.display = 'none';
    document.querySelector('body').style.visibility = 'visible';
  }
};
