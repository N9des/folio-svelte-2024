import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

import Experience from '../Experience';

export default class Titles {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;

		// Options
		this.font = this.resources.items.font;

		this.setClipping(1, -1, -0.08);
		this.setTitles();
	}

	setClipping(posYTop, posYBottom, size) {
		this.localPlaneTop = new THREE.Plane(
			new THREE.Vector3(0, posYTop, 0),
			size
		);
		const helperPlane = new THREE.PlaneHelper(this.localPlaneTop, 2, 0xff0000);
		this.localPlaneBottom = new THREE.Plane(
			new THREE.Vector3(0, posYBottom, 0),
			size
		);
		const helperPlaneBottom = new THREE.PlaneHelper(
			this.localPlaneBottom,
			2,
			0x0000ff
		);
		// this.scene.add(helperPlane, helperPlaneBottom);
	}

	setTitles() {
		this.materialTop = new THREE.MeshStandardMaterial({
			color: 0xdbf38c,
			clippingPlanes: [this.localPlaneTop],
			name: 'top',
		});

		this.materialBottom = new THREE.MeshStandardMaterial({
			color: 0xdbf38c,
			clippingPlanes: [this.localPlaneBottom],
			name: 'bottom',
		});
	}

	createTitle(title, material, posX, posY, group) {
		if (material === 'top') {
			this.mat = this.materialTop;
		} else {
			this.mat = this.materialBottom;
		}

		const titleGeometry = new TextGeometry(title, {
			font: this.font,
			size: 0.29,
			height: 0,
		});

		const titleMesh = new THREE.Mesh(titleGeometry, this.mat);
		titleMesh.position.set(posX, posY, 0);
		group.add(titleMesh);

		this.setInitialPosition(titleMesh, material);
	}

	setInitialPosition(titleMesh, material) {
		if (material === 'top') {
			titleMesh.position.y = -0.5;
		} else {
			titleMesh.position.y = 0.5;
		}

		titleMesh.rotation.z = -0.2;
	}
}
