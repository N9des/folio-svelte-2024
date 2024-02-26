// @ts-ignore
import * as THREE from 'three';

import Experience from '../Experience';

// @ts-ignore
import vertexShader from '../../shaders/clouds/vertexShader.glsl';
// @ts-ignore
import fragmentShader from '../../shaders/clouds/fragmentShader.glsl';

export default class Clouds {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.tools = this.experience.tools;
		this.cloudsGroup = this.experience.cloudsGroup;
		this.scroll = this.experience.scroll;

		// Setup
		this.lastDirection = 1;

		this.setGeometry();
		this.setTexture();
		this.setMaterial();
		this.setMesh();
	}

	setGeometry() {
		this.geometry = new THREE.PlaneGeometry(3, 3);
	}

	setTexture() {
		// @ts-ignore
		this.cloudsTexture = this.resources.items.cloud;
	}

	setMaterial() {
		this.material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			transparent: true,
			// depthTest: false,
			depthWrite: false,
			uniforms: {
				uTexture: { value: this.cloudsTexture },
			},
			side: THREE.DoubleSide,
		});
	}

	setMesh() {
		const count = 500;

		for (let i = 0; i < count; i++) {
			// @ts-ignore
			this.cloud = new THREE.Mesh(this.geometry, this.material);
			// @ts-ignore
			this.cloud.position.x = Math.random() * 25 - 12.5;
			// this.cloud.position.y = this.utils.rand(-2, -1.15);
			// @ts-ignore
			this.cloud.position.y = this.tools.rand(-2.5, -2);
			// @ts-ignore
			this.cloud.position.z = this.tools.rand(1, -10);
			// @ts-ignore
			this.cloud.rotation.z = Math.random() * Math.PI;
			// @ts-ignore
			this.cloud.scale.x = this.cloud.scale.y = Math.random() * Math.random() * 1.5 + 0.5;
			// @ts-ignore
			this.cloudsGroup.add(this.cloud);
		}

		// @ts-ignore
		this.scene.add(this.cloudsGroup);
	}

	update() {
		// @ts-ignore
		const clouds = this.cloudsGroup.children;
		// @ts-ignore
		const direction = this.scroll.lenis.direction;
		// @ts-ignore
		const stopped = this.scroll.lenis.isStopped;

		clouds.forEach((cloud) => {
			if (cloud.position.z >= 1) {
				cloud.position.z = -10;
			} else if (cloud.position.z < -10) {
				cloud.position.z = 1;
			}
			if (this.lastDirection === -1) {
				cloud.position.z -= 0.0015;
			} else if (this.lastDirection === 1) {
				cloud.position.z += 0.0015;
			}
		});

		if (direction !== 0 && this.lastDirection !== direction && !stopped) {
			this.lastDirection = direction;
		} else if (direction === 0) {
			this.lastDirection = 1;
		}
	}
}
