const log = console.log;

log('Hello Bootstrap');
require(['animation', 'test-module'], function (console) {
  console.animateText('.animation', 150);
});

require(['textbuffer'], function (TextBuffer) {
  var t = TextBuffer().obj;

  window.addEventListener('keyup', () => {
    console.log(t.getBufferedText());
  });
});

