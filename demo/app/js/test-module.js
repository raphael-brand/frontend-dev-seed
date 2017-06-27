define('test-module', function() {
  return {
    test: () => {return 'this is a test'}
  }
});

require(['random'], function(r) {
  console.log(r(1,10));
});

require(['textbuffer', 'animation'], function(TextBuffer, cons) {
  var t = TextBuffer().obj;
  
  window.addEventListener('keyup', () => {
    console.log(t.getBufferedText());
    document.querySelector('.animation').innerHTML = ''
    document.querySelector('.animation').innerText = t.getBufferedText();
    cons.animateText('.animation', 150);
  });

})