import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

const gui = new dat.GUI();

/*
    Texture loader
*/

const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
    "textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("textures/door/roughness.jpg");
const matCapTexture = textureLoader.load("textures/matcaps/1.png");
const gradientTexture = textureLoader.load("textures/gradients/5.jpg");
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMapTexture = cubeTextureLoader.load([
    "textures/environmentMaps/1/px.jpg",
    "textures/environmentMaps/1/nx.jpg",
    "textures/environmentMaps/1/py.jpg",
    "textures/environmentMaps/1/ny.jpg",
    "textures/environmentMaps/1/pz.jpg",
    "textures/environmentMaps/1/nz.jpg",
]);
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/*
Objects
*/
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color = new THREE.Color(0xff0000);
// material.wireframe = true;

// material.transparent = true;
// material.opacity = 0.5;

// material.map = doorColorTexture;
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide;

// const material = new THREE.MeshNormalMaterial();
// // material.wireframe = true;
// material.flatShading = true;

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matCapTexture;

// const material = new THREE.MeshDepthMaterial();

// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 1000;
// material.specular = new THREE.Color(0x1188ff);

// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;

const material = new THREE.MeshStandardMaterial();
material.metalness = 0;
material.roughness = 1;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1.5;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.01;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.x = 0.5;
// material.normalScale.y = 0.5;
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;
material.envMap = environmentMapTexture;

gui.add(material, "wireframe");
gui.add(material, "metalness").min(0).max(1).step(0.01);
gui.add(material, "roughness").min(0).max(1).step(0.01);
gui.add(material, "aoMapIntensity").min(1).max(10).step(0.01);
gui.add(material, "displacementScale").min(0).max(1).step(0.001);
gui.add(material.normalScale, "x")
    .min(0)
    .max(1)
    .step(0.001)
    .name("normalscale.x");
gui.add(material.normalScale, "y")
    .min(0)
    .max(1)
    .step(0.001)
    .name("normalscale.y");

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphere.position.x = -1.5;
sphere.geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
plane.geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
);
torus.position.x = 1.5;
torus.geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);
scene.add(sphere, plane, torus);
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Point light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 3, 4);
scene.add(light);

// scene.add(new THREE.PointLightHelper(light, 2, 0xff0000));

window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    sphere.rotation.x = 0.1 * elapsedTime;
    // plane.rotation.x = 0.1 * elapsedTime;
    torus.rotation.x = 0.1 * elapsedTime;

    sphere.rotation.y = 0.15 * elapsedTime;
    // plane.rotation.y = 0.15 * elapsedTime;
    torus.rotation.y = 0.15 * elapsedTime;

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
