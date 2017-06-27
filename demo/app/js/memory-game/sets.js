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
            Card.style.backgroundImage = 'url(../img/'+item.id + '.jpeg)';
            Card.addEventListener('click', (e)=> {
              var e = e.target;
              if(!(e.className.indexOf('flipped') > -1))
                e.classList.add('flipped');
              else
                e.classList.remove('flipped');
              
            });
            
            for(let card of document.getElementsByClassName('cardWrapper')) {
              card.appendChild(Card);
            }
          }
      }
  );
});
