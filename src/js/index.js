import * as THREE from "three";

const $result = document.getElementById('result');

// 1. Scene: 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);

// 2. Camera: Scene을 바라볼 시점을 결정
const camera = new THREE.PerspectiveCamera(50,
    $result.clientWidth / $result.clientHeight, 0.1, 1000
);

camera.position.set(2, 2, 2);
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

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 0xffaaaa,
    // wireframe: true,
    transparent: true,
    opacity: 0.5,
});

const standard = new THREE.MeshStandardMaterial({
    color: 0xffaaaa,
    roughness: 0.2,
    metalness: 0.8,
    // map: // texture
})

const physical = new THREE.MeshPhysicalMaterial({
    color: 0xffaaaa,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,
})

const box = new THREE.Mesh(geometry, physical);
scene.add(box);


function animate() {
    renderer.render(scene, camera)
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