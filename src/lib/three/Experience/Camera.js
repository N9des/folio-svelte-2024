import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import Experience from './Experience';

export default class Camera {
	constructor() {
		// Setup
		this.experience = new Experience();
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.canvas = this.experience.canvas;

		this.setInstance();
		// this.setOrbitControls();

		this.sizes.on('resize', this.resize.bind(this));
	}

	setInstance() {
		this.instance = new THREE.PerspectiveCamera(
			90,
			this.sizes.width / this.sizes.height,
			0.001,
			10
		);
		// REMOVE
		// this.instance.position.set(0, 0, 0.1);
		this.scene.add(this.instance);
	}

	setOrbitControls() {
		this.controls = new OrbitControls(this.instance, this.canvas);
		this.controls.enableDamping = true;
	}

	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height;
		this.instance.updateProjectionMatrix();
	}

	update() {
		this.controls && this.controls.update();
	}
}
