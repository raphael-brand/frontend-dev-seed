const log = console.log;
log('Hello Bootstrap');
require(['bundle'], function() {
  log('bundler loaded ...');
}); // 
/*window.addEventListener('load', function() {
  
});
*/