// @ts-nocheck
import * as THREE from 'three';

import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import World from './World/World.js';
import Resources from './Utils/Resources.js';
import sources from './sources.js';
import Scroll from './Utils/Scroll.js';
import MouseEvent from './Utils/MouseEvent.js';
import Physics from './Utils/Physics.js';
import Debug from './Utils/Debug.js';
import tools from './Utils/tools.js';
import Transition from './Utils/Transition.js';

// @ts-ignore
let instance = null;

export default class Experience {
	constructor() {
		if (instance) {
			return instance;
		}

		instance = this;
	}

	async init(canvas) {
		// Options
		this.canvas = canvas;

		// Setup
		this.cloudsGroup = new THREE.Group();
		this.sizes = new Sizes();
		this.time = new Time();
		this.scene = new THREE.Scene();
		this.resources = new Resources(sources);
		this.transition = new Transition();
		this.camera = new Camera();
		this.renderer = new Renderer();
		this.mouse = new MouseEvent();
		this.physics = new Physics();
		this.raycaster = new THREE.Raycaster();
		this.debug = new Debug();
		this.scroll = new Scroll();
		this.tools = tools;
		this.world = new World();

		// Resize event
		this.sizes.on('resize', this.resize.bind(this));

		// Time event
		this.time.on('tick', this.update.bind(this));

		// Scene Options
		this.scene.background = new THREE.Color('#7FB2F0');

		return Promise.resolve();
	}

	resize() {
		this.camera.resize();
		this.renderer.resize();
	}

	update() {
		this.camera.update();
		this.world.update();
		this.scroll.update();
		this.physics.update();
		this.debug.update();
		this.renderer.update();
	}
}
