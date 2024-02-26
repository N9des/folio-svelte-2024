import * as THREE from 'three';

import Experience from '../../Experience';
import Titles from '../Titles';

export default class WorkTitle extends Titles {
	constructor() {
		super();
		this.experience = new Experience();
		this.scene = this.experience.scene;

		// Setup
		this.titleWorkGroup = new THREE.Group();

		this.createTitles();
	}

	createTitles() {
		this.createTitle("Let's fly", 'top', 0, 0.1, this.titleWorkGroup);
		this.createTitle('in my', 'bottom', 0.1, -0.35, this.titleWorkGroup);

		this.scene.add(this.titleWorkGroup);
		this.titleWorkGroup.position.x = -0.25;
		this.titleWorkGroup.position.z = -0.7;
	}
}
