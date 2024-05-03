import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { gsap } from 'gsap';

export default class Transition {
	constructor() {
		// Resize
		window.addEventListener('resize', this.resize.bind(this));

		this.clouds = document.querySelector('.clouds');
		this.cloudsTL = this.clouds.querySelector('.clouds__tl');
		this.cloudsTR = this.clouds.querySelector('.clouds__tr');
		this.cloudsM = this.clouds.querySelector('.clouds__m');
		this.cloudsB = this.clouds.querySelector('.clouds__b');
		this.cloudsArray = [this.cloudsTL, this.cloudsTR, this.cloudsM, this.cloudsB];

		document.addEventListener('loadingFinished', () => {
			console.log('openTransition');
			this.openTransition();
		});
	}

	async init() {
		this.firstLoading = true;

		this.addDebug();
	}

	addDebug() {
		this.settings = {
			openTransition: () => {
				this.openTransition();
			},
			closeTransition: () => {
				this.closeTransition();
			},
		};
		const gui = new GUI();
		gui.add(this.settings, 'openTransition');
		gui.add(this.settings, 'closeTransition');
	}

	openTransition() {
		gsap.to(this.cloudsArray, {
			yPercent: -120,
			stagger: 0.1,
			duration: 3,
			ease: 'power4.inOut',
			onComplete: () => {
				if (this.firstLoading) {
					this.firstLoading = false;
					this.closeTransition();
				}
			},
		});
	}

	closeTransition() {
		const invertedArray = this.cloudsArray.reverse();
		gsap.to(invertedArray, {
			yPercent: -200,
			stagger: 0.1,
			duration: 3,
			ease: 'power4.inOut',
			onStart: () => {
				this.dispatchEvent();
			},
		});
	}

	dispatchEvent() {
		const event = new CustomEvent('closeTransition', {
			cancelable: true,
		});
		document.dispatchEvent(event);
	}

	resize() {}
}
