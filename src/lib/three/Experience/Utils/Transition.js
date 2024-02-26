import EventEmitter from './EventEmitter';

export default class Transition extends EventEmitter {
	constructor() {
		super();

		// Setup
		this.page = document.querySelector('main.home');

		this.setLoadingListener();
	}

	setLoadingListener() {
		window.addEventListener('load', () => {
			this.trigger('transitionEnd');
		});
	}
}
