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
