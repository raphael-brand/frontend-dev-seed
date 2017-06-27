define('card', function() {
  return function(id) {
      var Card = `<div class="cardWrapper">
      <div class="card" id="${id}"></div>
      </div>`;
      var wrapper = document.createElement('div');
      wrapper.innerHTML = Card;
      var Card = wrapper.querySelector('.card');
      Card.style.backgroundImage = 'url(../img/' + id + '.jpeg)';
      Card.addEventListener('click', (e)=> {
        var e = e.target;
        if(!(e.className.indexOf('flipped') > -1))
          e.classList.add('flipped');
        else
          e.classList.remove('flipped');
      });
      return wrapper;
    }
});
