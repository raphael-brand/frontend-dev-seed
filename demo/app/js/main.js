const log = console.log;

log('Hello Bootstrap');
require(['animation'], function(console) {
  console.animateText('.animation', 150);
  log('Hello World!')
});

