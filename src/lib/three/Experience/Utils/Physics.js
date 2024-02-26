import * as CANNON from 'cannon-es';

import Experience from '../Experience';

export default class Physics {
	constructor() {
		this.experience = new Experience();
		this.time = this.experience.time;
		this.setPhysics();
	}

	setPhysics() {
		this.world = new CANNON.World({
			gravity: new CANNON.Vec3(0, 0, 0),
		});
	}

	update() {
		this.world.fixedStep();
	}
}
