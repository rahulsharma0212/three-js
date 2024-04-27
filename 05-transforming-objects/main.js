import "./style.css";
import * as THREE from "three";

const sizes = { width: 700, height: 400 };
// scene
const scene = new THREE.Scene();
/*
// geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);



// positioning

// mesh.position.x = 0.2;
// mesh.position.y = -0.6;
// mesh.position.z = 0.5;

mesh.position.set(0.2, -0.6, 0.5);

console.log("🚀 ~ mesh.position.length():", mesh.position.length());
console.log(
    "🚀 ~ mesh.position.distanceTo(camera.position):",
    mesh.position.distanceTo(camera.position)
);

// reduce position length to 1
mesh.position.normalize();
console.log("🚀 ~ mesh.position.length():", mesh.position.length());

// scale
// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;

mesh.scale.set(2, 0.5, 0.5);

// rotation
mesh.rotation.reorder("YXZ");
mesh.rotation.x = Math.PI / 4;
mesh.rotation.y = Math.PI / 4;

// axes helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

*/
// group
const group = new THREE.Group();
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
group.add(cube1);
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cube2.position.x = -2;
group.add(cube2);
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.x = 2;
group.add(cube3);
scene.add(group);

group.position.x = 0.5;
group.rotation.y = 0.4;
group.scale.x = 0.8;

// camera
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height);
camera.position.z = 3;
// camera.position.x = 0.5;
// camera.position.y = 0.5;
scene.add(camera);

// look at
// camera.lookAt(mesh.position);

// renderer
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const renderer = new THREE.WebGLRenderer({
    canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
