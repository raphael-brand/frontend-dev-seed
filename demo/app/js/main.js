const log = console.log;

log('Hello Bootstrap');
require(['animation', 'test-module'], function(console) {
  console.animateText('.animation', 150);
});

