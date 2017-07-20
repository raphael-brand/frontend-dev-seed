import Acceleration from './acceleration';

const log = console.log;
let acc = new Acceleration();

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
