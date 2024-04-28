import gsap from "gsap";
import "./style.css";
import * as THREE from "three";

// scene
const scene = new THREE.Scene();

// geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = { width: 700, height: 400 };

// camera
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height);
camera.position.z = 3;
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

// gsap
gsap.to(mesh.position, { x: 2, duration: 1, delay: 1 });
gsap.to(mesh.position, { x: 0, duration: 1, delay: 2 });
// Animations
const tick = () => {
    //delta
    // const delta = Date.now() - time;
    // time = Date.now();
    // // update objects
    // mesh.rotation.y += 0.001 * delta;

    // const elapsedTime = clock.getElapsedTime();
    // // mesh.rotation.y = elapsedTime;
    // mesh.position.x = Math.sin(elapsedTime);
    // mesh.position.y = Math.cos(elapsedTime);

    // renderer
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
};

tick();
