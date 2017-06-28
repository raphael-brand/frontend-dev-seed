define('card', function() {
  return function(id, onClick) {
      var Card = `<div class="cardWrapper">
      <div class="card" id="${id}"></div>
      </div>`;
      var wrapper = document.createElement('div');
      wrapper.innerHTML = Card;
      var Card = wrapper.querySelector('.card');
      Card.style.backgroundImage = 'url(../img/' + id.replace(/\_\d$/,'') + '.jpeg)';
      Card.addEventListener('click', onClick);
      return wrapper;
    }
});

define('memory-game', ['./sets'], function(sets) {
  console.log('A Memory game!');
  let button = document.querySelector('button');
  button.addEventListener('click', () => {
    sets.init();
  });
  button.click();

});
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
  var first = [], second = [], timeout = null;
  let solved = [];
  let visibleCards = 0;

  let isMatch = (id) => {
    let base = id.replace(/\_\d$/, '');
    return document.querySelector('*[id="' + base + '_1"]').className.indexOf('flipped') > -1 && document.querySelector('*[id="' + base + '_2"]').className.indexOf('flipped') > -1
  }

  let isSolved = (id) => {
    let base = id.replace(/\_\d$/, '');
    return new RegExp('("' + base + '")', "gi").test(JSON.stringify(solved)) == true;
  }

  let diffCards = (t) => {
    let id = t.getAttribute('id')
    let base = id.replace(/\_\d$/, '');

    if (document.querySelector('*[id="' + base + '_1"]').className.indexOf('flipped') > -1
      && document.querySelector('*[id="' + base + '_2"]').className.indexOf('flipped') > -1) {
      solved.push(base);
      console.log(solved);
      document.querySelector('*[id="' + base + '_1"]').classList.add('flipped', 'solved')
      document.querySelector('*[id="' + base + '_2"]').classList.add('flipped', 'solved')
      visibleCards = 0;
      //clearTimeout(timeout);
    }
    //else if (!isMatch(t.getAttribute('id'))) {
      if (visibleCards > 2) {
        hideNonMatching()
        //timeout = setTimeout(hideNonMatching, 2000);
      }
    //}
  }

  let hideNonMatching = () => {
    for (let card of Array.from(document.querySelectorAll('.flipped'))) {
      if (isSolved(card.getAttribute('id')))
        continue;
      else
        card.classList.remove('flipped');
    }
    visibleCards = 0;
  }

  let flipCard = (e, solved) => {
    if (solved) return;

    if (e.className.indexOf('flipped') > -1) {
      e.classList.remove('flipped')
      if (visibleCards > 0)
        visibleCards--;
    }
    else {
      e.classList.add('flipped');
      visibleCards++;
    }

    diffCards(e)
  }

  let onClick = (e) => {
    var e = e.target;
    var solved = isSolved(e.getAttribute('id'));
    flipCard(e, solved);
  };

  let result = [];
  let onCardsReady = () => {
    solved = [];
    document.querySelector('#memory-game').innerHTML = '';
    for (let item of result) {
      var Card = card(item, onClick)
      document.querySelector('#memory-game').appendChild(Card);
    }
  }
  
  let initializeGame = () => {
    if(first.length)
      (result = shuffle(first.concat(second))) && onCardsReady();
    else
    fetch('js/data.json').then(response => response.json())
      .then(r => {
        result = [];
        for (let item of r) {
          first.push(item.id + '_1');
          second.push(item.id + '_2');
        }

        result = shuffle(first.concat(second));

        onCardsReady();
      }
      );
  }
  return {init:initializeGame}
});

define('test-module', function() {
  return {
    test: () => {return 'this is a test'}
  }
});
const log = console.log;

log('Hello Bootstrap');
require(['test-module','memory-game'], function(test) {
  log(test.test());
});
