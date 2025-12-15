// --- Global Variables for the 3D Scene ---

let scene, camera, renderer, shape;



// --- 1. Initialization Function ---

function init() {

    // 1. Scene Setup

    scene = new THREE.Scene();

    

    // 2. Camera Setup (PerspectiveCamera: field of view, aspect ratio, near, far)

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    camera.position.z = 5; // Move the camera back so we can see the shape



    // 3. Renderer Setup (Renders the scene onto the HTML canvas)

    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);



    // --- 4. Define and Create Your Custom 3D Shape Here ---

    

    // **EXAMPLE SHAPE: A Basic Cube**

    const geometry = new THREE.BoxGeometry(1, 1, 1); // Width, Height, Depth

    

    // **TO DRAW A SPHERE, use this instead:**

    // const geometry = new THREE.SphereGeometry(1, 32, 32); // Radius, segments width, segments height



    // **TO DRAW A CUSTOM SHAPE (e.g., an L-shape):**

    // This is where advanced geometry creation would go.

    // For simple custom shapes, you might combine multiple basic shapes or define vertices manually.

    

    // 5. Material Setup (How the shape looks - color, texture, lighting response)

    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 }); // Green, responds to light



    // 6. Mesh Creation (The final object: geometry + material)

    shape = new THREE.Mesh(geometry, material);

    scene.add(shape);



    // 7. Lighting

    const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light

    scene.add(ambientLight);

    

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);

    directionalLight.position.set(5, 5, 5).normalize();

    scene.add(directionalLight);

    

    // Handle window resizing

    window.addEventListener('resize', onWindowResize, false);

}



// --- 2. Animation/Render Loop Function ---

function animate() {

    requestAnimationFrame(animate);



    // Make the shape rotate for visual effect

    shape.rotation.x += 0.005;

    shape.rotation.y += 0.005;



    renderer.render(scene, camera);

}



// --- 3. Resize Handler ---

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}



// Start the application

init();

animate();

