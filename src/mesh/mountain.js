import * as THREE from 'three';

export default function printMountain() {

    const geometry = new THREE.CylinderGeometry(1, 3, 3);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffaaaa
    })
    const mountain = new THREE.Mesh(geometry, material);

    return mountain;
}
