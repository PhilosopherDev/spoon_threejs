import * as THREE from "three";

// 1. Scene: 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();

// 2. Camera: Scene을 바라볼 시점을 결정
const camera = new THREE.PerspectiveCamera(50,
    window.innerWidth / window.innerHeight, 0.1, 100
);

// 3. Renderer: Scene+Camera, 화면을 그려주는 역할
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
console.log(renderer);
document.body.appendChild(renderer.domElement);

renderer.render(scene, camera)
