define('sets', ['./card'], function (card) {

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
  var first = [], second = [];
  let solved = [];

  let isMatch = (id) => {
    let base = id.replace(/\_\d$/, '');
    return new RegExp('("' + base + '")', "gi").test(JSON.stringify(solved)) == true;
  }

  let diffCards = (id) => {
    let base = id.replace(/\_\d$/, '');

    if (document.querySelector('*[id="' + base + '_1"]').className.indexOf('flipped') > -1
    && document.querySelector('*[id="' + base + '_2"]').className.indexOf('flipped') > -1) {
      document.querySelector('*[id="' + base + '_1"]').classList.add('flipped', 'solved')
      document.querySelector('*[id="' + base + '_2"]').classList.add('flipped', 'solved')
      solved.push(base);
      console.log(solved);
    }
  }

  let flipCard = (e, match) => {
    if(match) return;

    if(e.className.indexOf('flipped') > -1)
      e.classList.remove('flipped')
    else
      e.classList.add('flipped');
    diffCards(e.getAttribute('id'))
  }

  let onClick = (e) => {
    var e = e.target;
    var match = isMatch(e.getAttribute('id'));
    flipCard(e, match);
  };

  fetch('js/data.json').then(response => response.json())
    .then(r => {
      let result = [];
      for (let item of r) {
        first.push(item.id + '_1');
        second.push(item.id + '_2');
      }

      result = shuffle(first.concat(second));

      for (let item of result) {
        var Card = card(item, onClick)
        document.querySelector('#memory-game').appendChild(Card);
      }
    }
    );
});
