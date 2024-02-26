import * as THREE from 'three';

import Experience from '../Experience';
import EventEmitter from './EventEmitter';

export default class MouseEvent extends EventEmitter {
	constructor() {
		super();

		this.experience = new Experience();
		this.sizes = this.experience.sizes;
		this.camera = this.experience.camera;

		// Setup
		this.mouseClick = new THREE.Vector2();
		this.mouseMove = new THREE.Vector2();

		// Events
		window.addEventListener('mousemove', (event) => {
			this.getMouseMove(event);
		});

		window.addEventListener('mousedown', () => {
			this.getMouseDown();

			this.trigger('mousedown');
		});

		window.addEventListener('mouseup', () => {
			this.getMouseUp();

			this.trigger('mouseup');
		});
	}

	getMouseMove(event) {
		this.mouseMove.x = (event.clientX / this.sizes.width) * 2 - 1;
		this.mouseMove.y = -(event.clientY / this.sizes.height) * 2 + 1;
	}

	getMouseDown() {
		// this.mouseClick.x = (event.clientX / this.sizes.width) * 2 - 1;
		// this.mouseClick.y = -(event.clientY / this.sizes.height) * 2 + 1;
		this.mouseClick.x = this.mouseMove.x;
		this.mouseClick.y = this.mouseMove.y;
	}

	getMouseUp(event) {}
}
