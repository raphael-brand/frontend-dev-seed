const log = console.log;

log('Hello Bootstrap');
require(['test-module', 'acceleration'], function(test, acc) {
  test.test();
  acc.setCanvas(document.querySelector('#canvas'));
  acc.setLevel([
    [2, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1]
  ]);
  acc.draw() && acc.printMap()
});
