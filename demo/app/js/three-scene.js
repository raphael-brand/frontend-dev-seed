define('three-scene', () => {
  var scene, camera, renderer, container;
  var geometry, material, cube, w, h;
  w = h = 300;

  init();

  function init() {
    container = document.createElement('div');
    document.getElementById('perspective').appendChild(container);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, 1, 1, 1000);
    camera.position.z = 500;
    scene.add(camera);

    geometry = new THREE.CubeGeometry(50, 50, 50);
    material = new THREE.MeshNormalMaterial({ color: 0xff0000 });

    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    renderer = new THREE.CanvasRenderer();
    console.log(renderer);
    renderer.setSize(w, h);

    container.appendChild(renderer.domElement);
    
    //renderer.render(scene, camera);

  }

  let currentFrame = 0;
  let animate;

  let rotationSpeed = (rotation={ speed:{ x:0, y:0 } }) => {
    cube.rotation.x += rotation.speed.x;
    cube.rotation.y += rotation.speed.y;
  }

  let positionSpeed = (position={ x:0, y:0 }) => {
    cube.position.x += position.x * 0.01;
    cube.position.z += position.y * 0.01;
  }

  animate = (params) => {
    requestAnimationFrame(() => animate(params));
    if(params.rotation) rotationSpeed(params.rotation)
    if(params.position) positionSpeed(params.position)
    //cube.position.x += 2.0; // auto move right
    cube.position.y = 30; // make it visible, do not change ...
    //cube.position.z += params.position.z * 0.1;
    //log(cube.position.z);
    renderer.render(scene, camera);
    document.querySelector('#perspective_stats').innerHTML = cube.rotation.x;
  }
  return {
    "animate": animate
  }

  console.log(currentFrame);
})