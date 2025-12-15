// ---------------------------------
// Global Variables
// ---------------------------------
let scene, camera, renderer, shape, geometry, controls;

// ---------------------------------
// Init
// ---------------------------------
function init() {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(3, 3, 5);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Geometry + Material
  geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({ color: 0x00ff88 });
  shape = new THREE.Mesh(geometry, material);
  scene.add(shape);

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);

  // Orbit Controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // UI
  createUI();

  // Resize
  window.addEventListener("resize", onWindowResize);
}

// ---------------------------------
// UI Creation (Injected via JS)
// ---------------------------------
function createUI() {
  const ui = document.createElement("div");
  ui.style.position = "fixed";
  ui.style.top = "10px";
  ui.style.left = "10px";
  ui.style.background = "rgba(0,0,0,0.7)";
  ui.style.color = "white";
  ui.style.padding = "10px";
  ui.style.fontFamily = "sans-serif";
  ui.style.zIndex = "10";

  ui.innerHTML = `
    <label>Width
      <input type="range" id="width" min="0.5" max="5" step="0.1" value="1">
    </label><br>
    <label>Height
      <input type="range" id="height" min="0.5" max="5" step="0.1" value="1">
    </label><br>
    <label>Depth
      <input type="range" id="depth" min="0.5" max="5" step="0.1" value="1">
    </label>
  `;

  document.body.appendChild(ui);

  const w = ui.querySelector("#width");
  const h = ui.querySelector("#height");
  const d = ui.querySelector("#depth");

  function update() {
    geometry.dispose();
    geometry = new THREE.BoxGeometry(
      parseFloat(w.value),
      parseFloat(h.value),
      parseFloat(d.value)
    );
    shape.geometry = geometry;
  }

  w.oninput = update;
  h.oninput = update;
  d.oninput = update;
}

// ---------------------------------
// Animate
// ---------------------------------
function animate() {
  requestAnimationFrame(animate);

  shape.rotation.y += 0.003;
  controls.update();

  renderer.render(scene, camera);
}

// ---------------------------------
// Resize
// ---------------------------------
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// ---------------------------------
// Boot
// ---------------------------------
init();
animate();


