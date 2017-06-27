define('memory-game', ['./sets'], function(sets) {
  console.log('A Memory game!');

  document.querySelector('button').addEventListener('click', () => {
    sets.init();
  });

});