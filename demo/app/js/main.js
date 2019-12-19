const log = console.log;

log('Hello Bootstrap');
require(['animation','canvas-app'], function(console, canvasApp) {
  document.querySelector('.animation').textContent = canvasApp;
  log(console.animateText('.animation', 150));

});
