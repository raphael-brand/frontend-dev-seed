define('three-scene', () => {
  var scene, camera, renderer, container;
  var geometry, material, cube, w, h;
  w = h = 300;
  var camera_start = {x:0,y:0,z:0};
  init();

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(100, 1, 0.1, 1000);
    container = document.createElement('div');
    document.getElementById('perspective').appendChild(container);

    gemoetry = new THREE.BoxGeometry(50, 50, 50);
    material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    cube = new THREE.Mesh(gemoetry, material);
    scene.add(cube);
    renderer = new THREE.CanvasRenderer();
    console.log(renderer);
    renderer.setSize(w, h);

    camera_start.x = 50;
    camera_start.y = 50;
    camera_start.z = 300;

    camera.position = camera_start;

    container.appendChild(renderer.domElement);
    
    renderer.render(scene, camera);

  }

  let currentFrame = 0;
  let animate;
  let rotationSpeed = (rotation={speed:{x:0,y:0}}) => {
    cube.rotation.x += rotation.speed.x;
    cube.rotation.y += rotation.speed.y;
  }
  let position = (position={x:0,y:0,z:0}) => {
    //cube.position = position;
    //return;
    if(position.x > 0)
      cube.translateX(position.x);
    else
      cube.position.x = 0;

    cube.translateY(position.y);
    cube.translateZ(position.z);
    //console.log(cube);
    //cube.updateMatrix();
    //requestAnimationFrame(() => animate(position));
    log(cube.position.x);
    log('x:%i, y:%i, z:%i', cube.position.x, cube.position.y, cube.position.z)
  }

  animate = (params) => {
    requestAnimationFrame(() => animate(params));
    if(params.rotation) rotationSpeed(params.rotation);
    if(params.position) position(params.position);
    //console.info(cube.rotation.y, scene, camera, cube);
    scene.add(cube);
    renderer.render(scene, camera);
    document.querySelector('#perspective_stats').innerHTML = cube.position.x;
  }
  return {
    "animate": animate
  }

  console.log(currentFrame);
})