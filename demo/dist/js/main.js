define('test-module', function() {
  return {
    test: () => {return 'this is a test'}
  }
});
const log = console.log;
log('Hello Bootstrap');
require(['bundle'], function() {
  log('bundler loaded ...');
}); // 
/*window.addEventListener('load', function() {
  
});
*/