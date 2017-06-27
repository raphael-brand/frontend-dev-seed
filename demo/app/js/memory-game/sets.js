define('sets', ['./card'], function(card) {

  // Thanks to Mike Bostock for this great article about the
  // Fisher-Yates shuffle! https://bost.ocks.org/mike/shuffle/
  function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }
  let result = [];
  fetch('js/data.json').then(response => response.json())
        .then(r => {

          for(let item of r) {
            result.push(item.id);
          }

          let second = result.slice();
          result = shuffle(second.concat(result));
          
          for(let item of result) {
            var Card = card(item)
            document.querySelector('#memory-game').appendChild(Card);
          }
      }
  );
});
