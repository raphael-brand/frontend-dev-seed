import Acceleration from './acceleration';
import Scene from './Scene';

const log = console.log;
let acc = new Acceleration();
let scene = new Scene();

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

let setPosition = () => {
  scene.animate({ position: acc.getPosition() })
}
acc.onMove(setPosition);


