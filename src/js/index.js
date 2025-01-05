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

camera.position.set(5, 5, 5);
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
const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0xff7f00,
    // wireframe: true
})
const bottomGeometry = new THREE.DodecahedronGeometry(2, 1);
const bottom = new THREE.Mesh(bottomGeometry, bodyMaterial);
scene.add(bottom);

const topGeometry = new THREE.TetrahedronGeometry(0.8, 3);
const top = new THREE.Mesh(topGeometry, bodyMaterial);
top.position.y = 1.7;
scene.add(top)

const leafMaterial = new THREE.MeshStandardMaterial({
    color: 0x008000,
    side: THREE.DoubleSide,
})

const stemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.4);
const stem = new THREE.Mesh(stemGeometry, leafMaterial);
stem.position.y = 2.5;
scene.add(stem);

const leafGeometry = new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI / 3);
const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
leaf.position.set(-0.5, 2.4, -0.1);
leaf.rotation.z = Math.PI / -2;
scene.add(leaf);

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