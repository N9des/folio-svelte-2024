import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import Experience from '../Experience';

export default class ScrollAnim {
	constructor(
		// @ts-ignore
		coverBalloons,
		// @ts-ignore
		coverTitle,
		// @ts-ignore
		workBalloons,
		// @ts-ignore
		workTitle,
		// @ts-ignore
		contactBalloons,
		// @ts-ignore
		contactTitle,
		// @ts-ignore
		projectCard,
		// @ts-ignore
		transitionEnd
	) {
		this.experience = new Experience();
		this.scroll = this.experience.scroll;
		// @ts-ignore
		this.lenis = this.scroll.lenis;
		this.tools = this.experience.tools;

		// Setup
		// @ts-ignore
		this.entryTimeline = [];

		this.coverBalloonsChildren = coverBalloons.children;
		this.coverTitleChildren = coverTitle.titleGroup.children;

		this.workBalloonsChildren = workBalloons.children;
		this.workTitleChildren = workTitle.titleWorkGroup.children;

		this.contactBalloonsChildren = contactBalloons.children;
		this.contactTitleChildren = contactTitle.titleContactGroup.children;

		this.projectCards = projectCard.cardsGroup;

		if (transitionEnd) {
			// @ts-ignore
			this.lenis.stop();
			this.entryAnimation(this.coverTitleChildren, this.coverBalloonsChildren, 'home');
		}
	}

	// @ts-ignore
	setToSleep(children) {
		// @ts-ignore
		children.forEach((child) => {
			child.meshBody.sleep();
		});
	}

	// @ts-ignore
	setToAwake(children) {
		// @ts-ignore
		children.forEach((child) => {
			child.meshBody.wakeUp();
		});
	}

	// @ts-ignore
	entryAnimation(titles, balloons, section) {
		if (titles.length < 0 || balloons.length < 0) {
			console.error('Titles and Balloons are not empty !');
			return;
		}

		const tl = gsap.timeline({
			data: section,
			onStart: () => {
				// @ts-ignore
				this.lenis.stop();
			},
			onComplete: () => {
				// @ts-ignore
				this.lenis.start();

				if (tl['data'] === 'home') {
					this.coverHome();
				} else if (tl['data'] === 'work') {
					this.workHome();
				}
			},
		});

		this.entryTimeline[section] = tl;

		// @ts-ignore
		balloons.forEach((child) => {
			tl.to(
				[child.curr, child.meshBody.position, child.planeBody.position],
				{
					y: 0,
					ease: 'elastic.out(1, 0.6)',
					duration: 1.5,
				},
				'<+=0.2'
			);
		});

		tl.to(
			titles[0].position,
			{
				y: 0.1,
				ease: 'power3.out',
				duration: 1,
			},
			'<-=0.2'
		)
			.to(
				titles[1].position,
				{
					y: -0.35,
					ease: 'power3.out',
					duration: 1,
				},
				'<'
			)
			.to(
				titles[0].rotation,
				{
					z: 0,
					ease: 'power3.out',
					duration: 1,
				},
				'<'
			)
			.to(
				titles[1].rotation,
				{
					z: 0,
					ease: 'power3.out',
					duration: 1,
				},
				'<'
			);
	}

	coverHome() {
		const tl = gsap.timeline({
			scrollTrigger: {
				// @ts-ignore
				trigger: this.canvas,
				scrub: 1,
				start: '+=100',
				end: '+=100',
				// markers: true,
				onLeave: () => {
					this.entryAnimation(this.workTitleChildren, this.workBalloonsChildren, 'work');

					this.setToSleep(this.coverBalloonsChildren);
					this.setToSleep(this.contactBalloonsChildren);
				},
				onEnterBack: () => {
					// @ts-ignore
					this.lenis.stop();
					// @ts-ignore
					this.entryTimeline['work'].reverse();

					setTimeout(() => {
						// @ts-ignore
						this.lenis.start();
					}, 1200);

					this.setToSleep(this.workBalloonsChildren);
					this.setToAwake(this.coverBalloonsChildren);
				},
			},
		});

		tl.to(this.coverTitleChildren[0].position, {
			y: -0.5,
		})
			.to(
				this.coverTitleChildren[1].position,
				{
					y: 0.5,
				},
				'<'
			)
			.to(
				this.coverTitleChildren[0].rotation,
				{
					z: -0.2,
				},
				'<'
			)
			.to(
				this.coverTitleChildren[1].rotation,
				{
					z: -0.2,
				},
				'<'
			);

		// @ts-ignore
		this.coverBalloonsChildren.forEach((child) => {
			let randomNbr = Math.round(
				// @ts-ignore
				this.tools.rand(1, this.workBalloonsChildren.length + 1)
			);

			tl.to(
				[child.targ, child.meshBody.position, child.planeBody.position],
				{
					y: child.outPosY * randomNbr * 0.75,
					x: child.outPosX * randomNbr * 0.75,
					z: child.outPosZ * randomNbr * 0.75,
				},
				'<'
			);
		});
	}

	workHome() {
		const tl = gsap.timeline({
			onStart: () => {
				this.moveProjectCards();
			},
			scrollTrigger: {
				// @ts-ignore
				trigger: this.canvas,
				scrub: 1,
				start: '+=300',
				end: '+=100',
				// markers: true,
			},
			onEnterBack: () => {
				// @ts-ignore
				this.workBalloonsChildren.forEach((child) => {
					child.position.z;
				});
			},
		});

		tl.to(this.workTitleChildren[0].position, {
			y: -0.5,
		})
			.to(
				this.workTitleChildren[1].position,
				{
					y: 0.5,
				},
				'<'
			)
			.to(
				this.workTitleChildren[0].rotation,
				{
					z: -0.2,
				},
				'<'
			)
			.to(
				this.workTitleChildren[1].rotation,
				{
					z: -0.2,
				},
				'<'
			);
	}

	moveProjectCards() {
		const tlCards = gsap.timeline({
			ease: 'none',
			scrollTrigger: {
				// @ts-ignore
				trigger: this.canvas,
				scrub: 0.1,
				start: '+=350',
				end: '+=200',
				markers: { startColor: 'blue', endColor: 'purple' },
			},
		});

		// @ts-ignore
		this.projectCards.forEach((card, idx) => {
			const video = document.getElementById(card.userData.id);
			console.log(video);
			let finalRotation, finalXPos, midXPos;

			if (idx % 2 === 0) {
				finalRotation = 0.5;
				finalXPos = 0.25;
				midXPos = 0.2;
			} else {
				finalRotation = -0.5;
				finalXPos = -0.25;
				midXPos = -0.2;
			}

			tlCards.to(
				card.position,
				{
					y: 0,
					ease: 'power1.out',
					onUpdate: () => {
						let first = true;
						if (first && card.position.y > -0.2) {
							first = false;
							// this.playPromise = video?.play();
						}
					},
					onComplete: () => {
						// if (this.playPromise !== undefined) {
						// 	this.playPromise
						// 		.then(() => {
						// 			video.pause();
						// 		})
						// 		.catch((error) => {
						// 			console.log(error);
						// 		});
						// }
						// // @ts-ignore
						// video.currentTime = 0;
					},
				},
				'<'
			);
			tlCards.to(
				card.position,
				{
					x: midXPos,
					ease: 'power1.out',
				},
				'<'
			);
			tlCards.to(
				card.rotation,
				{
					z: 0,
					ease: 'power1.out',
				},
				'<'
			);
			tlCards.to(card.position, {
				y: 0.7,
				ease: 'power1.in',

				// ease: 'power1.out',
			});
			tlCards.to(
				card.position,
				{
					x: finalXPos,
					ease: 'power1.in',
				},
				'<'
			);
			tlCards.to(
				card.rotation,
				{
					z: finalRotation,
					ease: 'power1.in',
				},
				'<'
			);
		});

		this.worksBalloons();
	}

	worksBalloons() {
		// Works balloons timeline
		const tlBalloons = gsap.timeline({
			scrollTrigger: {
				// @ts-ignore
				trigger: this.canvas,
				scrub: 1,
				start: '+=600',
				end: '+=50',
				// markers: { startColor: 'blue', endColor: 'purple' },
				onLeave: () => {
					this.entryAnimation(this.contactTitleChildren, this.contactBalloonsChildren, 'contact');

					this.setToSleep(this.workBalloonsChildren);
				},
				onEnterBack: () => {
					// @ts-ignore
					this.lenis.stop();
					// @ts-ignore
					this.entryTimeline['contact'].reverse();

					setTimeout(() => {
						// @ts-ignore
						this.lenis.start();
					}, 1500);

					this.setToSleep(this.contactBalloonsChildren);
					this.setToAwake(this.workBalloonsChildren);
				},
			},
		});

		// @ts-ignore
		this.workBalloonsChildren.forEach((child) => {
			let randomNbr = Math.round(
				// @ts-ignore
				this.tools.rand(1, this.workBalloonsChildren.length + 1)
			);

			tlBalloons.to(
				[child.targ, child.meshBody.position, child.planeBody.position],
				{
					y: child.outPosY * randomNbr * 0.75,
					x: child.outPosX * randomNbr * 0.75,
					z: child.outPosZ * randomNbr * 0.75,
				},
				'<'
			);
		});
	}
}
