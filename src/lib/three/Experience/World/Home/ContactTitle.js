import * as THREE from 'three';

import Experience from '../../Experience';
import Titles from '../Titles';

export default class ContactTitle extends Titles {
	constructor() {
		super();
		this.experience = new Experience();
		this.scene = this.experience.scene;

		// Setup
		this.titleContactGroup = new THREE.Group();

		this.createTitles();
	}

	createTitles() {
		this.createTitle("Let's", 'top', 0.4, 0.1, this.titleContactGroup);
		this.createTitle(
			'or take a drink',
			'bottom',
			0,
			-0.35,
			this.titleContactGroup
		);

		this.scene.add(this.titleContactGroup);
		this.titleContactGroup.position.x = -0.55;
		this.titleContactGroup.position.z = -0.7;
	}
}
