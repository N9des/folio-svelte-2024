import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

import EventEmitter from './EventEmitter';

export default class Resources extends EventEmitter {
	constructor(sources) {
		super();

		// Options
		this.sources = sources;

		//Setup
		this.items = {};
		this.toLoad = this.sources.length;
		this.loaded = 0;

		this.setLoaders();
		this.startLoading();
	}

	setLoaders() {
		this.loaders = {};
		this.loaders.gltfLoader = new GLTFLoader();
		this.loaders.textureLoader = new THREE.TextureLoader();
		this.loaders.fontLoader = new FontLoader();
	}

	startLoading() {
		// Load each source
		for (const source of this.sources) {
			if (source.type === 'gltfLoader') {
				this.loaders.gltfLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file);
				});
			} else if (source.type === 'textureLoader') {
				this.loaders.textureLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file);
				});
			} else if (source.type === 'fontLoader') {
				this.loaders.fontLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file);
				});
			}
		}
	}

	sourceLoaded(source, file) {
		this.items[source.name] = file;

		this.loaded++;

		if (this.loaded === this.toLoad) {
			this.trigger('loaded');
		}
	}
}
