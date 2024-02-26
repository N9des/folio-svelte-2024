import * as THREE from 'three';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';

import Experience from './Experience';

export default class Renderer {
	constructor() {
		this.experience = new Experience();
		this.canvas = this.experience.canvas;
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.camera = this.experience.camera;

		this.setInstance();
	}

	setInstance() {
		// WebGL Renderer
		this.instance = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
		});
		// this.instance.physicallyCorrectLights = true;
		// this.instance.toneMapping = THREE.CineonToneMapping;
		// this.instance.toneMappingExposure = 1.75;
		// this.instance.shadowMap.enabled = true;
		// this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
		this.instance.setSize(this.sizes.width, this.sizes.height);
		this.instance.setPixelRatio(this.sizes.pixelRatio);
		this.instance.localClippingEnabled = true;

		// Css Renderer
		this.cssRenderer = new CSS2DRenderer();
		this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
		this.cssRenderer.domElement.style.position = 'fixed';
		this.cssRenderer.domElement.style.top = '0px';
		this.cssRenderer.domElement.style.pointerEvents = 'none';
		document.body.appendChild(this.cssRenderer.domElement);
	}

	resize() {
		this.instance.setSize(this.sizes.width, this.sizes.height);
		this.instance.setPixelRatio(this.sizes.pixelRatio);

		this.cssRenderer.setSize(this.sizes.width, this.sizes.height);
	}

	update() {
		this.instance.render(this.scene, this.camera.instance);
		this.cssRenderer.render(this.scene, this.camera.instance);
	}
}
