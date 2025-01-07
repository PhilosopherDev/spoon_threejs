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


// 도형
const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshStandardMaterial({ color: 0x2E6FF2 })
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const geometry2 = new THREE.PlaneGeometry(10, 10);
const material2 = new THREE.MeshStandardMaterial({
    color: 0x81a8f7,
    side: THREE.DoubleSide
})
const plane = new THREE.Mesh(geometry2, material2);
plane.rotation.x = Math.PI / -2;
plane.position.y = -1;
scene.add(plane);


// ambientLight
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// directionalLight - 광원 (0, 1, 0) -> target (0, 0, 0)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-2, 2, 0);
directionalLight.target.position.set(0, 2, 0);
// scene.add(directionalLight);

const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 1, 0xff0000);
// scene.add(dlHelper);

// pointLight - 팔면체의 중심에서 모든 방향으로 빛을 발산. 전등 같음. 
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(1, 1, 0);
// scene.add(pointLight);

const plHelper = new THREE.PointLightHelper(pointLight, 1, 0x00ff00);
// scene.add(plHelper);

// SpotLight - 원뿔형으로 빛이 발산, 각도 조절 가능
const spotLight = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 6, 0.5);
spotLight.position.y = 2;
scene.add(spotLight);

const slHelper = new THREE.SpotLightHelper(spotLight, 0xff0000);
scene.add(slHelper);

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