import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const $result = document.getElementById('result');

// 장면
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);

const camera = new THREE.PerspectiveCamera(50, $result.clientWidth / $result.clientHeight, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
    canvas: $result
});
renderer.setSize($result.clientWidth, $result.clientHeight);
renderer.shadowMap.enabled = true;

const loader = new THREE.TextureLoader();
const basecolor = loader.load('../../src/textures/bark/Bark_06_basecolor.jpg');
const normal = loader.load('../../src/textures/bark/Bark_06_normal.jpg');

// 도형
const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshStandardMaterial({
    // color: 0x2E6FF2,
    map: basecolor,
    normalMap: normal,
    // normalScale: new THREE.Vector2(0, 0),
    roughness: 0.4
})


const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true; // 그림자를 만들 mesh에는 cast
scene.add(cube);


const geometry2 = new THREE.PlaneGeometry(10, 10);
const material2 = new THREE.MeshStandardMaterial({
    color: 0x81a8f7,
    side: THREE.DoubleSide
})
const plane = new THREE.Mesh(geometry2, material2);
plane.rotation.x = Math.PI / -2;
plane.position.y = -1;
plane.receiveShadow = true; // 그림자가 맺히는 mesh
scene.add(plane);

// 빛 - DirectionalLight, PointLight, SpotLight 3가지가 그림자 생김
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 2, 2);
directionalLight.castShadow = true; // 빛에도 적용

// 그림자 해상도
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;

// Blur
directionalLight.shadow.radius = 5;

scene.add(directionalLight);


// OrbitContorls
const controls = new OrbitControls(camera, renderer.domElement);

// controls.autoRotate = true;
controls.autoRotateSpeed = -10;

controls.enableDamping = true;

function animate() {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); // 카메라 업데이트

    renderer.setSize(window.innerWidth, window.innerHeight);
})