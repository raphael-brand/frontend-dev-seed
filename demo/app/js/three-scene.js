define('three-scene', () => {
  var scene, camera, renderer, container;
  var geometry, material, cube, w, h;
  w = h = 300;

  init();

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    container = document.createElement('div');
    document.getElementById('perspective').appendChild(container);

    gemoetry = new THREE.BoxGeometry(50, 50, 50);
    material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    cube = new THREE.Mesh(gemoetry, material);
    scene.add(cube);
    renderer = new THREE.CanvasRenderer();
    console.log(renderer);
    renderer.setSize(w, h);
    camera.position.z = 200;

    container.appendChild(renderer.domElement);
    
    renderer.render(scene, camera);

  }

  let currentFrame = 0;
  let animate;

  animate = (params) => {
    requestAnimationFrame(() => animate(params));
    cube.rotation.x += params.rotation.speed.x;
    cube.rotation.y += params.rotation.speed.y;
    //console.info(cube.rotation.y, scene, camera, cube);
    scene.add(cube);
    renderer.render(scene, camera);
    document.querySelector('#perspective_stats').innerHTML = cube.rotation.x;
  }
  return {
    "animate": animate
  }

  console.log(currentFrame);
})