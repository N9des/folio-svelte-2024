import Lenis from '@studio-freight/lenis';

import Experience from '../Experience';

export default class Scroll {
	constructor() {
		this.experience = new Experience();
		this.camera = this.experience.camera;
		this.clouds = this.experience.cloudsGroup;

		// Setup
		this.scrollValue = 0;
		this.sceneDepth = -5;

		this.initLenis();

		window.addEventListener('load', () => {
			this.lenis.scrollTo('top', {
				duration: 1,
			});
		});
	}

	initLenis() {
		const lenis = new Lenis({
			lerp: 0.08,
			wheelMultiplier: 0.025,
			touchMultiplier: 0.025,
			smoothTouch: true,
		});

		this.lenis = lenis;

		lenis.on('scroll', (e) => {
			this.scrollValue = e.progress;
		});

		this.lenis.scrollTo('top', {
			immediate: true,
		});

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	}

	update() {
		this.clouds.position.z = -this.scrollValue * this.sceneDepth;
	}
}
