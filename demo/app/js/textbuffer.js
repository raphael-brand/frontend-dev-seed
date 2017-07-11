define('textbuffer', () => {
  var textbuffer = [];
  var lineIndex = 0;
  this.obj = {
    getBufferedText: function () {
      var v = [];
      for(var i=0;i<textbuffer.length; i++) {
        textbuffer[i] && v.push(textbuffer[i].join(''));
      }
      if(textbuffer.length == 1)
        return textbuffer[0].join('');
      return v.join('\n');
    },
    setBufferedText: function (k) {
      textbuffer[lineIndex] && textbuffer[lineIndex].push(k) || (textbuffer[lineIndex] = [k]);
    },
    emptyBuffer: function() {
      textbuffer = [];
    },
    removeFromBuffer: function() {
      textbuffer[lineIndex].pop();
    }

  };
  window.addEventListener('keyup', function (e) {
    if(e.key.match(/arrow|Alt|Shift|CapsLock/gi)) return;
    switch(e.key) {
      case 'Enter':
        lineIndex++;
      ; break;
      case 'Backspace':
        if(lineIndex > 0 && textbuffer[lineIndex].length == 0) {
          lineIndex--;
          this.obj.removeFromBuffer();
          break;
        }
        else if(textbuffer[lineIndex].length > 0)
          this.obj.removeFromBuffer();


      case 'Meta':; break;
      default:
        this.obj.setBufferedText(e.key);
    }
  });

  return function () { return this };
});