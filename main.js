// ---------------------------------
// Globals
// ---------------------------------
let scene, camera, renderer, shape, geometry, controls;
let currentShape = "cube";

// ---------------------------------
// Init
// ---------------------------------
function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(3, 3, 5);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const material = new THREE.MeshPhongMaterial({ color: 0x00ff88 });
  geometry = new THREE.BoxGeometry(1, 1, 1);
  shape = new THREE.Mesh(geometry, material);
  scene.add(shape);

  scene.add(new THREE.AmbientLight(0xffffff, 0.4));

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  createUI();
  window.addEventListener("resize", onWindowResize);
}

// ---------------------------------
// UI
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
    <label>
      Shape:
      <select id="shapeSelect">
        <option value="cube">Cube</option>
        <option value="sphere">Sphere</option>
        <option value="tetra">Tetrahedron</option>
      </select>
    </label>
    <div id="params"></div>
  `;

  document.body.appendChild(ui);

  const shapeSelect = ui.querySelector("#shapeSelect");
  const paramsDiv = ui.querySelector("#params");

  shapeSelect.onchange = () => {
    currentShape = shapeSelect.value;
    buildParamsUI(paramsDiv);
    updateGeometry();
  };

  buildParamsUI(paramsDiv);
}

// ---------------------------------
// Parameter UI per Shape
// ---------------------------------
function buildParamsUI(container) {
  if (currentShape === "cube") {
    container.innerHTML = `
      <label>Width <input type="range" id="w" min="0.5" max="5" step="0.1" value="1"></label><br>
      <label>Height <input type="range" id="h" min="0.5" max="5" step="0.1" value="1"></label><br>
      <label>Depth <input type="range" id="d" min="0.5" max="5" step="0.1" value="1"></label>
    `;
  }

  if (currentShape === "sphere") {
    container.innerHTML = `
      <label>Radius <input type="range" id="r" min="0.5" max="3" step="0.1" value="1"></label><br>
      <label>Segments <input type="range" id="seg" min="8" max="64" step="1" value="32"></label>
    `;
  }

  if (currentShape === "tetra") {
    container.innerHTML = `
      <label>Size <input type="range" id="size" min="0.5" max="4" step="0.1" value="1"></label>
    `;
  }

  container.querySelectorAll("input").forEach(input => {
    input.oninput = updateGeometry;
  });
}

// ---------------------------------
// Geometry Builder
// ---------------------------------
function updateGeometry() {
  geometry.dispose();

  if (currentShape === "cube") {
    const w = document.getElementById("w").value;
    const h = document.getElementById("h").value;
    const d = document.getElementById("d").value;
    geometry = new THREE.BoxGeometry(w, h, d);
  }

  if (currentShape === "sphere") {
    const r = document.getElementById("r").value;
    const seg = document.getElementById("seg").value;
    geometry = new THREE.SphereGeometry(r, seg, seg);
  }

  if (currentShape === "tetra") {
    const size = document.getElementById("size").value;
    geometry = new THREE.TetrahedronGeometry(size);
  }

  shape.geometry = geometry;
}

// ---------------------------------
// Animation
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

