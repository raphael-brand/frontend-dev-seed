define('card', function() {
  return function(id) {
      var div = document.createElement('div');
      div.innerHTML = `<div class="card" id="${id}"></div>`;
      return div.querySelector('.card');
    }
});
