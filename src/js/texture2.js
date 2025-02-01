import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import printTree from "../mesh/tree.js";
import printOrange from "../mesh/orange.js";
import printStone from "../mesh/stone.js";
import printMountain from "../mesh/mountain.js";

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
const orange1 = printOrange();
orange1.position.x = -5;
orange1.scale.set(0.6, 0.6, 0.6);
scene.add(orange1);

// 야자수
const tree1 = printTree();
tree1.position.x = 5;
scene.add(tree1);

// 돌하르방
const stone1 = printStone();
stone1.position.x = -10;
scene.add(stone1);

const axes = new THREE.AxesHelper(10);
scene.add(axes);

// 산
const mountain1 = printMountain();
scene.add(mountain1);



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