const log = console.log;

log('Hello Bootstrap');
define('start', ['test-module', 'acceleration'], function (test, acc) {
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
  acc.draw() && acc.printMap();
  return acc;
});

require(['three-scene', 'start'], (Scene, acc) => {
  // Scene.animate({ rotation: { speed: { x: 0.01, y: 0 } } });
  Scene.animate({ position: { x: 100, y: 30 } })
  acc.onMove(acc.getPosition)
})