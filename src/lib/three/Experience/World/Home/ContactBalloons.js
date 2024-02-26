import * as THREE from 'three';

import Experience from '../../Experience';
import Balloons from '../Balloons';

export default class ContactBalloons extends Balloons {
	constructor() {
		super();
		this.experience = new Experience();
		this.resources = this.experience.resources;

		// Setup
		this.resource = this.resources.items.balloonContact;
		this.balloonsCoverContact = [];

		this.setModel();
	}

	setModel() {
		this.model = this.resource.scene;

		this.model.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				this.letters.push(child);
				this.balloonsCoverContact.push(child);
			}
		});

		// Add each letter as a mesh in our scene
		for (let i = 0; i < this.letters.length; i++) {
			const mesh = this.letters[i];
			const name = mesh.name.toLowerCase();

			if (name === 'f') {
				this.addBalloon(
					mesh,
					-0.45,
					-0.6,
					0,
					3,
					[0.11, 0.08, 0.08],
					[0, 0.05, -0.05],
					true
				);
			} else if (name === 'e') {
				this.addBalloon(
					mesh,
					-0.23,
					-0.6,
					1,
					3,
					[0.11, 0.08, 0.08],
					[0, 0.05, -0.05],
					true
				);
			} else if (name === 'l') {
				this.addBalloon(
					mesh,
					0,
					-0.6,
					2,
					3,
					[0.11, 0.08, 0.08],
					[0, 0.05, -0.05],
					true
				);
			} else if (name === 'i') {
				this.addBalloon(
					mesh,
					0.22,
					-0.6,
					3,
					3,
					[0.11, 0.08, 0.08],
					[0, 0.05, -0.05],
					true
				);
			} else {
				this.addBalloon(
					mesh,
					0.45,
					-0.6,
					4,
					3,
					[0.11, 0.08, 0.08],
					[0, 0.05, -0.05],
					true
				);
			}
		}

		this.setSleepy();
	}

	setSleepy() {
		if (this.children) {
			this.children.forEach((child) => {
				child.meshBody.sleep();
			});
		}
	}
}
