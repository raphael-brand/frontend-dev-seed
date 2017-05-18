const log = console.log;

log('Hello Bootstrap');
require(['test-module'], function(test) {
  log(test.test());
});
