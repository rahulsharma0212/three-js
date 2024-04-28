import gsap from "gsap";
import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const sizes = { width: 700, height: 400 };
const cursor = {
    x: 0,
    y: 0,
};
// cursor
document.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = event.clientY / sizes.height - 0.5;
});

// scene
const scene = new THREE.Scene();

// geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRatio,
//     1 * aspectRatio,
//     1,
//     -1,
//     0.1,
//     10
// );
camera.position.set(0, 0, 2);
camera.lookAt(mesh.position);
scene.add(camera);

// renderer
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const renderer = new THREE.WebGLRenderer({
    canvas,
});
renderer.setSize(sizes.width, sizes.height);

// let time = Date.now();
const clock = new THREE.Clock();

// orbt control
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;

// Animations
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    // mesh.rotation.y = elapsedTime;
    // camera.position.x = -cursor.x * 3;
    // camera.position.y = cursor.y * 3;
    /*  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    camera.position.y = cursor.y * 5;
    camera.lookAt(mesh.position); */

    // update control
    control.update();
    // renderer
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
};

tick();
