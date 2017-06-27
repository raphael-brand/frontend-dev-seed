define('sets', ['./card'], function(card) {
  fetch('js/data.json').then(response => response.json())
        .then(result => {
          for(var item of result) {
            console.log(item.id);
            var cardWrapper = '<div class="cardWrapper"></div>';
            var tmp = document.createElement('div');
            tmp.innerHTML = cardWrapper;
            document.getElementById('memory-game').appendChild(tmp.querySelector('.cardWrapper'));
            var Card = card(item.id);
            Card.addEventListener('click', (e)=> {
              console.log(e.target.getAttribute('id'));
            });
            
            for(let card of document.getElementsByClassName('cardWrapper')) {
              card.appendChild(Card);
            }
          }
      }
  );
});
