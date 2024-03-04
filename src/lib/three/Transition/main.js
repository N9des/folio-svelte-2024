import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { gsap } from 'gsap';

import displacementImage from './displacement.jpeg';
import cloud from './transition.jpg';

import vertexShader from '../shaders/transition/vertexShader.glsl';
import fragmentShader from '../shaders/transition/fragmentShader.glsl';

export default class Transition {
	constructor() {
		// Resize
		window.addEventListener('resize', this.resize.bind(this));

		document.addEventListener('loadingFinished', () => {
			console.log('openTransition');
			this.openTransition();
		});
	}

	async init(canvas) {
		// Sizes
		this.sizes = {
			width: window.innerWidth,
			height: window.innerHeight,
		};
		// Init Renderer
		this.canvas = canvas;

		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
			alpha: true,
		});
		this.renderer.setClearColor(0xffffff, 0);
		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		// this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

		// Init scene
		this.scene = new THREE.Scene();
		this.firstLoading = true;

		this.addCamera();

		// this.addControls();

		this.addMesh();

		// Init values
		this.time = 0;
		this.clock = new THREE.Clock();

		this.addDebug();

		this.render();
	}

	addControls() {
		this.controls = new OrbitControls(this.camera, this.canvas);
		this.controls.enableDamping = true;
	}

	addCamera() {
		this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 1, 3000);
		this.camera.position.z = 700;
		this.camera.position.x = 0;
	}

	addMesh() {
		this.displacementTexture = new THREE.TextureLoader().load(displacementImage);
		this.cloud = new THREE.TextureLoader().load(cloud);

		this.geometry = new THREE.PlaneGeometry(1920, 1080, 1, 1);

		console.log(this.geometry);

		this.slideMaterial = new THREE.ShaderMaterial({
			transparent: true,
			vertexShader,
			fragmentShader,
			uniforms: {
				uProgress: { value: 1 },
				uCloud: { value: this.cloud },
				uDisplacement: { value: this.displacementTexture },
			},
		});

		let mesh = new THREE.Mesh(this.geometry, this.slideMaterial);

		this.scene.add(mesh);
	}

	addDebug() {
		this.settings = {
			progress: 0,
			progressSlide: 1,
			openTransition: () => {
				this.openTransition();
			},
			closeTransition: () => {
				this.closeTransition();
			},
		};
		const gui = new GUI();
		gui.add(this.settings, 'progressSlide', 0, 1, 0.01).onChange((val) => {
			this.slideMaterial.uniforms.uProgress.value = val;
		});
		gui.add(this.settings, 'openTransition');
		gui.add(this.settings, 'closeTransition');
	}

	openTransition() {
		gsap.fromTo(
			this.slideMaterial.uniforms.uProgress,
			{ value: 0.75 },
			{
				value: 0.2,
				duration: 3,
				ease: 'power4.inOut',
				onComplete: () => {
					if (this.firstLoading) {
						this.firstLoading = false;
						this.closeTransition();
					}
				},
			}
		);
	}

	closeTransition() {
		gsap.fromTo(
			this.slideMaterial.uniforms.uProgress,
			{ value: 0.2 },
			{
				value: 0.75,
				duration: 3,
				ease: 'power4.inOut',
				onStart: () => {
					this.dispatchEvent();
				},
			}
		);
	}

	dispatchEvent() {
		const event = new CustomEvent('closeTransition', {
			cancelable: true,
		});
		document.dispatchEvent(event);
	}

	addAnim() {
		// const elapsedTime = this.clock.getElapsedTime();
	}

	resize() {
		// Update sizes
		this.sizes.width = window.innerWidth;
		this.sizes.height = window.innerHeight;

		// Update geometry size
		this.geometry.parameters.width = this.sizes.width;
		// this.geometry.parameters.height = this.sizes.height * 2;

		// Update camera
		this.camera.aspect = this.sizes.width / this.sizes.height;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(this.sizes.width, this.sizes.height);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		console.log(this.geometry.parameters.width);
	}

	render() {
		this.addAnim();

		// Update controls
		this.controls && this.controls.update();

		this.renderer.render(this.scene, this.camera);
		window.requestAnimationFrame(this.render.bind(this));
	}
}
