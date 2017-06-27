define('sets', ['./card'], function(card) {
  fetch('js/data.json').then(response => response.json())
        .then(result => {
          for(var item of result) {
            console.log(item.id);
            var Card = card(item.id)
            document.querySelector('#memory-game').appendChild(Card);
          }
      }
  );
});
