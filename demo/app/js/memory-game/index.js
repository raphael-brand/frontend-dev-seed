define('memory-game', ['./sets'], function(sets) {
  console.log('A Memory game!');
  let button = document.querySelector('button');
  button.addEventListener('click', () => {
    sets.init();
  });
  button.click();

});