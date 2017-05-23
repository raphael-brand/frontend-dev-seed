define('test-module', function() {
  return {
    test: () => {return 'this is a test'}
  }
});

require(['random'], function(r) {
  console.log(r(1,10));
});

require(['textbuffer'], function(TextBuffer) {
  var t = TextBuffer().obj;

  window.addEventListener('keyup', () => {
    console.log(t.getBufferedText().join(''));
  });

})