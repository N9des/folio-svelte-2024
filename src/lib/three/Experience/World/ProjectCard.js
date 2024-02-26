// @ts-ignore
import * as THREE from 'three';
// @ts-ignore
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

import Experience from '../Experience';

// @ts-ignore
import vertexShader from '../../shaders/projectCard/vertexShader.glsl';
// @ts-ignore
import fragmentShader from '../../shaders/projectCard/fragmentShader.glsl';

export default class ProjectCard {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.raycaster = this.experience.raycaster;
		this.mouse = this.experience.mouse;
		this.camera = this.experience.camera;

		// Setup
		// @ts-ignore
		this.projectAssets = [];
		// @ts-ignore
		this.cardsGroup = [];

		this.getProjectAssets();
		this.setProjectCards();

		// Events
		// @ts-ignore
		this.mouse.on('mousedown', () => {
			this.getMouseDown();
		});
	}

	getProjectAssets() {
		this.projectAssets = [
			{
				id: 'office',
				name: 'Office concept',
				// @ts-ignore
				texture: this.resources.items.officeImg,
				url: 'https://www.office-concept.fr',
			},
			{
				id: 'matawan',
				name: 'Matawan',
				// @ts-ignore
				texture: this.resources.items.matawanImg,
				url: 'https://matawan-mobility.com/',
			},
			{
				id: 'sersi',
				name: 'Sersi',
				// @ts-ignore
				texture: this.resources.items.sersiImg,
				url: 'https://sersi.fr/',
			},
		];
	}

	setProjectCards() {
		for (let i = 0; i < this.projectAssets.length; i++) {
			const { name, texture, id, url } = this.projectAssets[i];
			this.createProjectCard(i, name, texture, id, url);
		}
	}

	// @ts-ignore
	createProjectCard(index, name, texture, title, url) {
		const projectGroup = new THREE.Group();
		const plane = new THREE.PlaneGeometry(0.25, 0.35);
		const material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: {
				uTexture: { value: texture },
			},
			side: THREE.FrontSide,
			transparent: true,
			depthWrite: false,
		});

		// @ts-ignore
		const mesh = new THREE.Mesh(plane, material);
		mesh.name = 'image';
		// @ts-ignore
		mesh.userData.url = url;

		this.setVideoCard(projectGroup, title, url, index);
		this.capsules(projectGroup, name, index, mesh);

		projectGroup.add(mesh);
		projectGroup.name = name;
		// @ts-ignore
		projectGroup.userData.id = title;
		// @ts-ignore
		projectGroup.position.y = -0.7;
		// @ts-ignore
		projectGroup.position.z = -0.3;

		if (index % 2 === 0) {
			// @ts-ignore
			projectGroup.position.x = 0.25;
			// @ts-ignore
			projectGroup.rotation.z = -0.5;
		} else {
			// @ts-ignore
			projectGroup.position.x = -0.25;
			// @ts-ignore
			projectGroup.rotation.z = 0.5;
		}

		this.cardsGroup.push(projectGroup);
		// @ts-ignore
		this.scene.add(projectGroup);
	}

	// @ts-ignore
	getVideoTexture(id) {
		this.video = document.getElementById(id);

		this.videoTexture = new THREE.VideoTexture(this.video);
		this.videoTexture.colorSpace = THREE.SRGBColorSpace;
	}

	// @ts-ignore
	setVideoCard(projectGroup, title, url, index) {
		this.getVideoTexture(title);

		if (index % 2 === 0) {
			this.localPlane = new THREE.Plane(new THREE.Vector3(1, 5, -4), 0);
			this.localPlane1 = new THREE.Plane(new THREE.Vector3(-1, -5, -5), 0);
		} else {
			this.localPlane = new THREE.Plane(new THREE.Vector3(-1, 5, -4), 0);
			this.localPlane1 = new THREE.Plane(new THREE.Vector3(1, -5, -5), 0);
		}

		const helperPlane = new THREE.PlaneHelper(this.localPlane, 2, 0xff0000);
		const helperPlane1 = new THREE.PlaneHelper(this.localPlane1, 2, 0x00ff00);
		// this.scene.add(helperPlane, helperPlane1);

		const plane = new THREE.PlaneGeometry(0.22, 0.13);
		const material = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			map: this.videoTexture,
			transparent: true,
			depthWrite: false,
			clippingPlanes: [this.localPlane, this.localPlane1],
		});

		const mesh = new THREE.Mesh(plane, material);
		mesh.name = 'video';
		// @ts-ignore
		mesh.userData.url = url;
		projectGroup.add(mesh);
	}

	// @ts-ignore
	capsules(projectGroup, name, index) {
		const div = document.createElement('div');
		div.classList.add('caps');

		for (let i = 0; i < 6; i++) {
			const p = document.createElement('p');
			p.textContent = '- ' + name;
			div.appendChild(p);
		}

		const divContainer = new CSS2DObject(div);
		projectGroup.add(divContainer);

		if (index % 2 === 0) {
			// @ts-ignore
			divContainer.position.y = 0.1;
		} else {
			// @ts-ignore
			divContainer.position.y = -0.075;
		}
	}

	// @ts-ignore
	getIntersect(pos) {
		// @ts-ignore
		this.raycaster.setFromCamera(pos, this.camera.instance);
		// @ts-ignore
		return this.raycaster.intersectObjects(this.cardsGroup);
	}

	getMouseDown() {
		this.found = this.getIntersect(this.mouse?.mouseClick);

		if (this.found.length > 0) {
			if (this.found[0].object.userData.url) {
				this.url = this.found[0].object.userData.url;

				window.open(this.url, '_blank');
			}
		}
	}
}
