// @ts-ignore
import * as THREE from 'three';

import Experience from '../Experience';

// @ts-ignore
import vertexShader from '../../shaders/background/vertexShader.glsl';
// @ts-ignore
import fragmentShader from '../../shaders/background/fragmentShader.glsl';

export default class Background {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.camera = this.experience.camera;
		this.scroll = this.experience.scroll;

		// Setup
		this.setGeometry();
		this.setMaterial();
		this.setMesh();
	}

	setGeometry() {
		this.geometry = new THREE.SphereGeometry(1.5, 25, 25);
	}

	setMaterial() {
		this.material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			depthWrite: false,
			uniforms: {
				uTime: { value: 0 },
				uSpeed: { value: 0.01 },
				uBase: { value: 0.1 },
				uSecond: { value: 0.5 },
				uFrequency: { value: new THREE.Vector2(15, 15) },
			},
			side: THREE.BackSide,
		});
	}

	setMesh() {
		// @ts-ignore
		this.bg = new THREE.Mesh(this.geometry, this.material);
		// @ts-ignore
		this.bg.position.z = this.camera.instance.position.z;
		// @ts-ignore
		this.bg.position.x = this.camera.instance.position.x;
		// @ts-ignore
		this.bg.position.y = this.camera.instance.position.y;
		// @ts-ignore
		this.scene.add(this.bg);
	}

	update() {
		if (this.material) {
			// @ts-ignore
			this.material.uniforms.uTime.value = this.experience.time.elapsed * 0.001;
		}

		// this.bg
		// 	? (this.bg.position.z = this.scroll.scrollValue * this.scroll.sceneDepth)
		// 	: null;
	}
}
