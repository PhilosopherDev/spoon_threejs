import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const $result = document.getElementById('result');

// 1. Scene: 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);

// 2. Camera: Scene을 바라볼 시점을 결정
const camera = new THREE.PerspectiveCamera(50,
    $result.clientWidth / $result.clientHeight, 0.1, 1000
);

camera.position.set(0, 0, 15);
camera.lookAt(0, 0, 0);

// 3. Renderer: Scene+Camera, 화면을 그려주는 역할
const renderer = new THREE.WebGLRenderer({
    canvas: $result
});

// renderer와 canvas 크기 맞춰주기!
renderer.setSize($result.clientWidth, $result.clientHeight);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 4, 3);
scene.add(light);

// 한라봉
// const bodyMaterial = new THREE.MeshStandardMaterial({
//     color: 0xff7f00,
//     // wireframe: true
// })
// const bottomGeometry = new THREE.DodecahedronGeometry(2, 1);
// const bottom = new THREE.Mesh(bottomGeometry, bodyMaterial);
// scene.add(bottom);

// const topGeometry = new THREE.TetrahedronGeometry(0.8, 3);
// const top = new THREE.Mesh(topGeometry, bodyMaterial);
// top.position.y = 1.7;
// scene.add(top)

const leafMaterial = new THREE.MeshStandardMaterial({
    color: 0x008000,
    side: THREE.DoubleSide,
})

// const stemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.4);
// const stem = new THREE.Mesh(stemGeometry, leafMaterial);
// stem.position.y = 2.5;
// scene.add(stem);

// const leafGeometry = new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI / 3);
// const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
// leaf.position.set(-0.5, 2.4, -0.1);
// leaf.rotation.z = Math.PI / -2;
// scene.add(leaf);

// 야자수
const tree = new THREE.Group();

const trunk = new THREE.Group();

const trunkMaterial = new THREE.MeshStandardMaterial({
    color: 0xa38049
})
const trunkGeometry = new THREE.CylinderGeometry(0.8, 1, 1.5);

const trunk1 = new THREE.Mesh(trunkGeometry, trunkMaterial);
const trunk2 = new THREE.Mesh(trunkGeometry, trunkMaterial);
const trunk3 = new THREE.Mesh(trunkGeometry, trunkMaterial);
const trunk4 = new THREE.Mesh(trunkGeometry, trunkMaterial);

trunk2.position.set(0.1, 1.3, 0);
trunk3.position.set(0.2, 2.5, 0);
trunk4.position.set(0.3, 3.5, 0);

trunk2.scale.set(0.9, 0.9, 0.9);
trunk3.scale.set(0.8, 0.8, 0.8);
trunk4.scale.set(0.8, 0.8, 0.8);

trunk2.rotation.z = THREE.MathUtils.degToRad(-5);
trunk3.rotation.z = THREE.MathUtils.degToRad(-5);
trunk4.rotation.z = THREE.MathUtils.degToRad(-2);

trunk.add(trunk1);
trunk.add(trunk2);
trunk.add(trunk3);
trunk.add(trunk4);

tree.add(trunk);

const leaf = new THREE.Group();

const leafGeometry = new THREE.SphereGeometry(2, 32, 16, Math.PI / 3, Math.PI / 3);
const leaf1 = new THREE.Mesh(leafGeometry, leafMaterial);
const leaf2 = new THREE.Mesh(leafGeometry, leafMaterial);
const leaf3 = new THREE.Mesh(leafGeometry, leafMaterial);
const leaf4 = new THREE.Mesh(leafGeometry, leafMaterial);

leaf1.rotation.x = -Math.PI / 2
leaf2.rotation.x = -Math.PI / 2
leaf3.rotation.x = -Math.PI / 2
leaf4.rotation.x = -Math.PI / 2

leaf2.rotation.z = -Math.PI / 2
leaf3.rotation.z = -Math.PI
leaf4.rotation.z = Math.PI / 2

leaf1.position.set(0.3, 3.2, 2);
leaf2.position.set(2.3, 3.2, 0);
leaf3.position.set(0.3, 3.2, -2);
leaf4.position.set(-1.7, 3.2, 0);

leaf.add(leaf1);
leaf.add(leaf2);
leaf.add(leaf3);
leaf.add(leaf4);

tree.add(leaf);

scene.add(tree);

const axes = new THREE.AxesHelper(10);
scene.add(axes);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    renderer.render(scene, camera)
    controls.update();
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    // 1. 카메라의 종횡비
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); // Camera 업데이트

    // 2. 렌더러의 크기
    renderer.setSize(window.innerWidth, window.innerHeight);
})