import * as THREE from 'three';

import Experience from '../Experience';

export default class Environment {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;

		// Setup
		this.setLights();
	}

	setLights() {
		const white = 0xffffff;
		const intensity = 6;
		this.spotLight = new THREE.SpotLight(white, intensity);
		this.spotLight.position.set(1, 1, 1);
		this.scene.add(this.spotLight);

		this.spotLightHelper = new THREE.SpotLightHelper(this.spotLight);
		// this.scene.add(this.spotLightHelper);

		const green = 0xf9f863;
		const intensityGreen = 1.5;
		this.pointLight = new THREE.SpotLight(white, intensityGreen);
		this.pointLight.lookAt(0, 0, 0);
		this.pointLight.position.set(0, -1.5, 0);
		this.scene.add(this.pointLight);

		this.pointLightHelper = new THREE.SpotLightHelper(this.pointLight);
		// this.scene.add(this.pointLightHelper);

		const intensityWhite = 2;
		this.pointLightWhite = new THREE.PointLight(white, intensityWhite);
		this.pointLightWhite.position.set(-1, 1, 1);
		this.scene.add(this.pointLightWhite);

		this.pointLightWhiteHelper = new THREE.PointLightHelper(
			this.pointLightWhite
		);
		// this.scene.add(this.pointLightWhiteHelper);

		const intensityAmbient = 2;
		this.ambientLight = new THREE.AmbientLight(white, intensityAmbient);
		this.scene.add(this.ambientLight);
	}
}
