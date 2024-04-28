import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/*
const image = new Image();
const doorTexture = new THREE.Texture(image);
image.onload = () => {
    doorTexture.needsUpdate = true;
};
image.src = "textures/door/color.jpg";
 */

// texture loader
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
    console.log("Start");
};
loadingManager.onProgress = () => {
    console.log("Progress");
};
loadingManager.onLoad = () => {
    console.log("load");
};
loadingManager.onError = () => {
    console.log("Error");
};
const textureLoader = new THREE.TextureLoader(loadingManager);
const colortexture = textureLoader.load("textures/minecraft.png");
// const colortexture = textureLoader.load("textures/checkerboard-8x8.png");
// const colortexture = textureLoader.load("textures/checkerboard-1024x1024.png");
// const colortexture = textureLoader.load("textures/door/color.jpg");
const alphatexture = textureLoader.load("textures/door/alpha.jpg");
const heighttexture = textureLoader.load("textures/door/height.jpg");
const normaltexture = textureLoader.load("textures/door/normal.jpg");
const metalnesstexture = textureLoader.load("textures/door/metalness.jpg");
const roughnesstexture = textureLoader.load("textures/door/roughness.jpg");

// colortexture.repeat.x = 2;
// colortexture.repeat.y = 3;
// colortexture.wrapS = THREE.MirroredRepeatWrapping;
// colortexture.wrapT = THREE.MirroredRepeatWrapping;

// colortexture.offset.x = 0.5;
// colortexture.offset.y = 0.5;

// colortexture.rotation = Math.PI / 4;
// colortexture.center.x = 0.5;
// colortexture.center.y = 0.5;

colortexture.generateMipmaps = false;
// colortexture.minFilter = THREE.NearestFilter;
colortexture.magFilter = THREE.NearestFilter;

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
console.log(geometry.attributes.uv);
// const geometry = new THREE.SphereGeometry(1, 32, 32);
// const geometry = new THREE.ConeGeometry(1, 1, 32);
// const geometry = new THREE.TorusGeometry(1, 0.25, 32, 32);
const material = new THREE.MeshBasicMaterial({
    map: colortexture,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // update renderer
    renderer.setSize(sizes.width, sizes.height);
    // update pixel ratio
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
    } else if (!document.webkitFullscreenElement) {
        canvas.webkitRequestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    } else {
        document.webkitExitFullscreen();
    }
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
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.enabled = false;

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

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
