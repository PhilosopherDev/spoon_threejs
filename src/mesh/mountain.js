import * as THREE from 'three';

export default function printMountain() {

    const geometry = new THREE.CylinderGeometry(1, 3, 3, 8);
    const material = new THREE.MeshStandardMaterial({
        color: 0xffaaaa
    })
    const materials = [
        new THREE.MeshStandardMaterial({ color: 0xff0000 }),
        new THREE.MeshStandardMaterial({ color: 0x00ff00 }),
        new THREE.MeshStandardMaterial({ color: 0x0000ff }),
    ]

    const mountain = new THREE.Mesh(geometry, materials);

    return mountain;
}
