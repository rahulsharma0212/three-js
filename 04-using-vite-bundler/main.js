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
renderer.render(scene, camera);
