// @ts-ignore
import * as THREE from 'three';
import * as CANNON from 'cannon-es';

import Experience from '../Experience.js';

export default class Balloons {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.camera = this.experience.camera;
		this.mouse = this.experience.mouse;
		this.physics = this.experience.physics;
		this.tools = this.experience.tools;
		this.world = this.physics?.world;
		this.time = this.experience.time;
		this.raycaster = new THREE.Raycaster();

		// Setup
		// @ts-ignore
		this.letters = [];
		// @ts-ignore
		this.children = [];
		// @ts-ignore
		this.meshBodies = [];
		this.speedsPos = [1, 0.8, 1.2, 1.4, 1.2];
		this.speedsRot = [1, 1.1, 1.2, 1.4, 1.2];
		this.draggable = null;
		this.found = null;
		this.down = false;
		this.outPositions = [
			{ y: 1.5, x: -2.5, z: 0.5 },
			{ y: 1.5, x: -1, z: 0.5 },
			{ y: 1.5, x: 0, z: 0.5 },
			{ y: 1.5, x: 1, z: 0.5 },
			{ y: 1.5, x: 2.5, z: 0.5 },
		];

		// Events
		// @ts-ignore
		this.mouse.on('mousedown', () => {
			this.getMouseDown();
		});

		// @ts-ignore
		this.mouse.on('mouseup', () => {
			this.getMouseUp();
		});
	}

	/**
	 * Adds a balloon to the scene.
	 * @param {THREE.Mesh} mesh - The mesh of the balloon.
	 * @param {number} posX - The x-coordinate position of the balloon.
	 * @param {number} posZ - The z-coordinate position of the balloon.
	 * @param {number} index - The index of the balloon.
	 * @param {number} numberSphere - The number of spheres in the balloon.
	 * @param {number} sphereSize - The size of each sphere in the balloon.
	 * @param {number} spherePosY - The y-coordinate position of the spheres in the balloon.
	 */
	addBalloon(
		mesh,
		posX = 0,
		posZ = 0,
		index,
		numberSphere,
		sphereSize,
		spherePosY,
		// @ts-ignore
		isSleeping
	) {
		// Create balloon
		this.mesh = mesh;
		// @ts-ignore
		this.mesh.scale.set(0.3, 0.3, 0.3);
		// @ts-ignore
		this.mesh.position.set(posX, -2, posZ);
		// @ts-ignore
		this.mesh.userData.draggable = true;
		// @ts-ignore
		this.mesh.userData.id = index;
		// @ts-ignore
		this.mesh.material = new THREE.MeshStandardMaterial({
			color: 0x7b79eb,
			metalness: 0.1,
			roughness: 0.4,
		});
		// @ts-ignore
		this.scene.add(this.mesh);

		// Set physical meshes
		this.setPhysicalMeshes(index, this.mesh, numberSphere, sphereSize, spherePosY);

		// Set point to point constraint
		this.setPointToPoint(posZ);

		// Set constraints
		this.setConstraints(posZ);

		const meshBody = this.meshBody;
		const planeBody = this.planeBody;

		// @ts-ignore
		this.meshBody.sleep();

		if (isSleeping === false) {
			// @ts-ignore
			this.meshBody.wakeUp();
		}

		// Add mesh to an array
		this.children[index] = {
			mesh,
			meshBody,
			planeBody,
			posX,
			targ: {
				// @ts-ignore
				x: mesh.position.x,
				// @ts-ignore
				y: mesh.position.y,
				// @ts-ignore
				z: mesh.position.z,
				// @ts-ignore
				zRot: mesh.rotation.z,
			},
			curr: {
				// @ts-ignore
				x: mesh.position.x,
				// @ts-ignore
				y: mesh.position.y,
				// @ts-ignore
				z: mesh.position.z,
				// @ts-ignore
				zRot: mesh.rotation.z,
			},
			outPosX: this.outPositions[index].x,
			outPosY: this.outPositions[index].y,
			outPosZ: this.outPositions[index].z,
		};
	}

	// @ts-ignore
	setPhysicalMeshes(index, mesh, numberSphere, sphereSize, spherePosY) {
		// Add physics mesh on balloon
		// const meshShape = new CANNON.Sphere(0.11);
		// const meshShapeTop = new CANNON.Sphere(0.08);
		// const meshShapeBottom = new CANNON.Sphere(0.08);
		this.meshBody = new CANNON.Body({
			mass: 1,
			velocity: new CANNON.Vec3(0.1, 0.1, 0),
			angularFactor: new CANNON.Vec3(0, 0, 0),
			linearDamping: 0.85,
		});

		for (let i = 0; i < numberSphere; i++) {
			const sphere = new CANNON.Sphere(sphereSize[i]);
			this.meshBody.addShape(sphere, new CANNON.Vec3(0, spherePosY[i], 0));
		}

		// this.meshBody.addShape(meshShape, new CANNON.Vec3(0, 0, 0));
		// this.meshBody.addShape(meshShapeTop, new CANNON.Vec3(0, 0.05, 0));
		// this.meshBody.addShape(meshShapeBottom, new CANNON.Vec3(0, -0.05, 0));
		this.meshBody.position.x = mesh.position.x;
		this.meshBody.position.y = mesh.position.y;
		this.meshBody.position.z = mesh.position.z;
		Object.assign(this.meshBody, { balloonID: index });
		// @ts-ignore
		this.world.addBody(this.meshBody);
		this.meshBodies.push(this.meshBody);
	}

	// @ts-ignore
	setPointToPoint(posZ) {
		// Add bg plane for balloon
		const planeGeo = new THREE.PlaneGeometry(0.1, 0.1);
		const planeMat = new THREE.MeshNormalMaterial();
		// @ts-ignore
		const planeMesh = new THREE.Mesh(planeGeo, planeMat);
		// @ts-ignore
		planeMesh.position.set(
			// @ts-ignore
			this.meshBody.position.x,
			// @ts-ignore
			this.meshBody.position.y,
			posZ - 0.1
		);
		planeMesh.visible = false;
		// @ts-ignore
		this.scene.add(planeMesh);

		// Add physics to plane
		const planeShape = new CANNON.Plane();
		this.planeBody = new CANNON.Body({
			mass: 0,
			shape: planeShape,
		});
		// @ts-ignore
		this.planeBody.position.x = planeMesh.position.x;
		// @ts-ignore
		this.planeBody.position.y = planeMesh.position.y;
		// @ts-ignore
		this.planeBody.position.z = planeMesh.position.z;
		// @ts-ignore
		this.world.addBody(this.planeBody);
	}

	// @ts-ignore
	setConstraints(posZ) {
		// Add constraint point between plane and balloon
		const localPivotBody = new CANNON.Vec3(0, 0, -posZ);
		// @ts-ignore
		const localPivotPlane = new CANNON.Vec3(0, 0, -this.planeBody.position.z);
		const constraints = new CANNON.PointToPointConstraint(
			// @ts-ignore
			this.meshBody,
			localPivotBody,
			this.planeBody,
			localPivotPlane
		);
		// @ts-ignore
		this.world.addConstraint(constraints);
	}

	setStaticAnimation() {
		// @ts-ignore
		let elapsedTime = this.time.elapsed * 0.001;
		this.children.forEach((child, idx) => {
			const rotationZ = Math.sin(elapsedTime * this.speedsRot[idx]) * 0.1;
			child.targ.zRot = rotationZ;
		});
	}

	// @ts-ignore
	getIntersect(pos) {
		// @ts-ignore
		this.raycaster.setFromCamera(pos, this.camera.instance);
		return this.raycaster.intersectObjects(this.letters);
	}

	getMouseDown() {
		// @ts-ignore
		this.found = this.getIntersect(this.mouse.mouseClick);

		if (this.found.length > 0) {
			if (this.found[0].object.userData.draggable) {
				this.draggable = this.found[0].object.userData.id;
			}
		}

		this.down = true;
	}

	getMouseUp() {
		if (this.draggable !== null) {
			this.draggable = null;

			setTimeout(() => {
				this.down = false;
			}, 1000);
		}
	}

	setDragObject() {
		if (this.draggable !== null) {
			if (this.found !== null && this.found.length > 0) {
				for (let i = 0; i < this.found.length; i++) {
					const index = this.found[i].object.userData.id;

					// @ts-ignore
					this.children[index].targ.x = this.mouse.mouseMove.x;
					// @ts-ignore
					this.children[index].targ.y = this.mouse.mouseMove.y;
				}
			}
		}
	}

	moveBalloons() {
		// Balloon mouvement
		const child = this.children.find((x) => x.mesh.userData.id === this.draggable);

		if (child && child.mesh) {
			const meshBody = this.meshBodies.find((m) => m.balloonID === this.draggable);

			meshBody.position.x = child.curr.x;
			meshBody.position.y = child.curr.y;
			meshBody.position.z = child.curr.z;
			meshBody.velocity.set(0, 0, 0);
			meshBody.angularVelocity.set(0, 0, 0);
		}

		const children = this.children.filter((x) => x.mesh.userData.id !== this.draggable);

		for (const child of children) {
			const meshBody = this.meshBodies.find((m) => m.balloonID === child.mesh.userData.id);

			child.targ.x = meshBody.position.x;
			child.targ.y = meshBody.position.y;
			child.targ.z = meshBody.position.z;
		}
	}

	update() {
		// @ts-ignore
		if (this.model) {
			this.children.forEach((child) => {
				// @ts-ignore
				child.curr.x = this.tools.lerp(child.curr.x, child.targ.x, 0.5);
				// @ts-ignore
				child.curr.y = this.tools.lerp(child.curr.y, child.targ.y, 0.5);
				// @ts-ignore
				child.curr.z = this.tools.lerp(child.curr.z, child.targ.z, 0.5);
				// @ts-ignore
				child.curr.zRot = this.tools.lerp(child.curr.zRot, child.targ.zRot, 0.5);

				child.mesh.position.x = child.curr.x;
				child.mesh.position.y = child.curr.y;
				child.mesh.position.z = child.curr.z;
				child.mesh.rotation.z = child.curr.zRot;
			});

			// Grab/Drop anim
			this.setDragObject();
			// Move Balloons out of drag
			this.moveBalloons();
			// Static anim
			this.setStaticAnimation();
		}
	}
}
