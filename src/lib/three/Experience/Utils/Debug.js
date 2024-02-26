import CannonDebugger from 'cannon-es-debugger';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import Experience from '../Experience';

export default class Debug {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.physics = this.experience.physics;
		this.world = this.physics.world;

		if (window.location.hash === '#debug') {
			this.setGui();
			this.setCannonDebugger();
		}
	}

	setGui() {
		this.gui = new GUI();
	}

	setCannonDebugger() {
		this.cannonDebugger = new CannonDebugger(this.scene, this.world, {});
	}

	update() {
		this.cannonDebugger && this.cannonDebugger.update();
	}
}
