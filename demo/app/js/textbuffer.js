define('textbuffer', () => {
  var textbuffer = [];
  this.obj = {
    getBufferedText: function () {
      return textbuffer;
    },
    setBufferedText: function (k) {
      textbuffer.push(k);
    },
    emptyBuffer: function() {
      textbuffer = [];
    },
    removeFromBuffer: function() {
      textbuffer.pop()
    }

  };
  window.addEventListener('keyup', function (e) {
    switch(e.key) {
      case 'Alt':; break;
      case 'Shift':; break;
      case 'CapsLock':; break;
      case 'Enter':
        this.obj.setBufferedText('\n');
      ;
      case 'Backspace':
        this.obj.removeFromBuffer(); break;
      case 'Meta':; break;
      default:
        this.obj.setBufferedText(e.key);
    }
  });

  return function () { return this };
});