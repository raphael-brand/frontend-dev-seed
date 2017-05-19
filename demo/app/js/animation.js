define('animation', function(test) {
  var createAnimatedText = function(querySelector, staggerInterval) {
    var target = document.querySelector(querySelector);
    var chars = target.innerText.split('');
    div = document.createElement('div');
    div.classList.add('animated');
    target.innerHTML = '';
    var i = staggerInterval;
    for(var c=0; c<chars.length; c++) {
      div = div.cloneNode()
      if(chars[c] == ' ') chars[c] = '&nbsp;'
      div.innerHTML = chars[c];
      target.appendChild(div)
      setTimeout((id) => {
       Array.from(document.querySelectorAll('.animated'))[id].classList.add('animating');
      }
      , i, c);
      i += staggerInterval; 
    }

  };
  return {
    animateText: createAnimatedText
  }
});