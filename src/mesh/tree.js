import * as THREE from 'three';

export default function printTree() {
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

    const leafMaterial = new THREE.MeshStandardMaterial({
        color: 0x008000,
        side: THREE.DoubleSide,
    })

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

    // scene.add(tree);
    return tree;
}