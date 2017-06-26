const log = console.log;

log('Hello Bootstrap');
require(['test-module','memory-game'], function(test) {
  log(test.test());
});
