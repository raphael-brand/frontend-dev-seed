define('textbuffer', () => {
  var textbuffer = [];
  this.obj = {
    getBufferedText: function () {
      return textbuffer;
    },
    setBufferedText: function (k) {
      textbuffer.push(k);
    }
  };
  window.addEventListener('keyup', function (e) {
    this.obj.setBufferedText(e.keyCode);
  });

  return function () { return this };
});