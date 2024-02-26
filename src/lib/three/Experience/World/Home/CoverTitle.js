import * as THREE from 'three';

import Experience from '../../Experience';
import Titles from '../Titles';

export default class CoverTitle extends Titles {
	constructor() {
		super();
		this.experience = new Experience();
		this.scene = this.experience.scene;

		// Setup
		this.titleGroup = new THREE.Group();

		this.createTitles();
	}

	createTitles() {
		this.createTitle('Creative web', 'top', 0, 0.1, this.titleGroup);
		this.createTitle('developer', 'bottom', 0.15, -0.35, this.titleGroup);

		this.scene.add(this.titleGroup);
		this.titleGroup.position.x = -0.55;
		this.titleGroup.position.z = -0.7;
	}
}
