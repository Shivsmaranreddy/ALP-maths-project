# ALP Maths Project — Custom 3D Shape Renderer

A small interactive WebGL demo that renders simple 3D shapes (cube, sphere, tetrahedron) using three.js. The demo provides a lightweight UI to change the shape type and its parameters (width/height/depth, radius/segments, size) in real-time and uses OrbitControls for easy camera navigation.

This repository contains a single-page example intended for educational/demo use — great for learning basic three.js concepts like geometry, materials, lights, controls and how to update geometry on-the-fly.

Demo highlights
- Choose between Cube, Sphere and Tetrahedron
- Real-time parameter sliders (dimensions, radius, segments, size)
- Smooth camera orbit, pan and zoom via OrbitControls
- Simple lighting (ambient + directional) and phong material

Files
- index.html — Minimal HTML page that loads three.js, OrbitControls and main.js.
- main.js — The demo logic: scene setup, UI creation, shape parameter handling, geometry updates and animation loop.
- .github — GitHub metadata (if present).

Quick preview of behavior (from main.js)
- Default shape: cube (1 × 1 × 1)
- Camera positioned at (3, 3, 5)
- Shape slowly rotates on the Y axis
- UI:
  - Shape select: Cube, Sphere, Tetrahedron
  - Cube params: Width, Height, Depth (range sliders)
  - Sphere params: Radius, Segments (range sliders)
  - Tetra params: Size (range slider)
- Geometries are rebuilt when parameters change and the mesh is updated in-place.

How to run locally
1. Clone the repo:
   git clone https://github.com/Shivsmaranreddy/ALP-maths-project.git
   cd ALP-maths-project

2. Open the demo:
   - Easiest: open index.html directly in a modern browser that supports WebGL.
   - Recommended: serve over a local HTTP server (some browsers restrict loading from file://):
     - Python 3: python -m http.server 8000
     - Then open http://localhost:8000 in your browser.

Notes on dependencies
- Uses three.js and OrbitControls from CDNs (no npm install required):
  - three.js r128 is loaded from CDN in index.html
  - OrbitControls is also loaded from CDN example bundle
- Works in modern browsers with WebGL support.

Usage
- Select a shape from the Shape dropdown.
- Adjust the visible sliders to change dimensions or tessellation.
- Drag the canvas to orbit around the model, scroll to zoom, right-drag or middle mouse to pan.
- The shape updates immediately as you move sliders.

Code overview (main.js)
- init(): sets up scene, camera, renderer, default geometry, lights and controls; creates the UI.
- createUI() + buildParamsUI(): build the on-screen interface and attach input handlers.
- updateGeometry(): disposes the old geometry and creates a new one based on the current shape & parameters.
- animate(): requestAnimationFrame loop that rotates the shape a little and renders the scene.
- onWindowResize(): handles responsive resizing.

Possible improvements / TODO
- Add material/color controls (wireframe, metalness/roughness, color picker)
- Allow exporting geometry (OBJ/STL)
- Add more shapes and custom param types (e.g., lathe/extrude)
- Replace the custom UI with dat.GUI or lil-gui for a more feature-rich control panel
- Add tests, build tooling and a proper packaging workflow (npm + bundler) for production use

Contributing
- Feel free to open issues or pull requests. For non-trivial changes, please describe the intent and add screenshots or a short demo link when relevant.

License
- No license specified in this repository. If you want to publish with a license, consider adding a LICENSE file (for example MIT) and updating this README.

Contact / Credits
- Built with three.js. Example uses the three.js OrbitControls helper.
- Author: Shivsmaranreddy (repository owner)

Enjoy exploring 3D geometry!
