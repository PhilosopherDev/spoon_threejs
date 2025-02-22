import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import printTree from "../mesh/tree.js";
import printOrange from "../mesh/orange.js";

const $result = document.getElementById('result');

// 1. Scene: 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);

// 2. Camera: Scene을 바라볼 시점을 결정
const camera = new THREE.PerspectiveCamera(50,
    $result.clientWidth / $result.clientHeight, 0.1, 1000
);

camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);

// 3. Renderer: Scene+Camera, 화면을 그려주는 역할
const renderer = new THREE.WebGLRenderer({
    canvas: $result
});

// renderer와 canvas 크기 맞춰주기!
renderer.setSize($result.clientWidth, $result.clientHeight);

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
    color: 0xffaaaa
})

const materials = [
    new THREE.MeshStandardMaterial({ color: 0xff0000 }),
    new THREE.MeshStandardMaterial({ color: 0xff8c00 }),
    new THREE.MeshStandardMaterial({ color: 0xffee00 }),
    new THREE.MeshStandardMaterial({ color: 0x4de94c }),
    new THREE.MeshStandardMaterial({ color: 0x3783ff }),
    new THREE.MeshStandardMaterial({ color: 0x4815aa }),
]

const mesh = new THREE.Mesh(geometry, materials);
scene.add(mesh);


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