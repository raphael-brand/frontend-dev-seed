const log = console.log;

log('Hello Bootstrap');
require(['animation'], function(console) {
  log(console.animateText('.animation', 150));
});
