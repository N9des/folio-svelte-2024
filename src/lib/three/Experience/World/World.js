import Experience from '../Experience';
import Environment from './Environment';
import Clouds from './Clouds';
import Background from './Background';
import ScrollAnim from './ScrollAnim';
import CoverBalloons from './Home/CoverBalloons';
import CoverTitle from './Home/CoverTitle';
import WorkBalloons from './Home/WorkBalloons';
import WorkTitle from './Home/WorkTitle';
import ContactBalloons from './Home/ContactBalloons';
import ContactTitle from './Home/ContactTitle';
import ProjectCard from './ProjectCard';

export default class World {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		// this.transition = this.experience.transition;

		this.transitionEnd = false;

		// this.transition.on('transitionEnd', () => {
		// 	console.log('end');
		// 	this.transitionEnd = true;
		// });

		this.resources.on('loaded', async () => {
			await this.loadingWorld();

			const event = new Event('loadedEvent');

			document.addEventListener('loadedEvent', (e) => {
				console.log('ok', e);
			});

			document.dispatchEvent(event);
		});
	}

	async loadingWorld() {
		this.transitionEnd = true;
		// Setup
		this.clouds = new Clouds();
		this.background = new Background();
		this.coverBalloons = new CoverBalloons();
		this.coverTitle = new CoverTitle();
		this.workBalloons = new WorkBalloons();
		this.workTitle = new WorkTitle();
		this.contactBalloons = new ContactBalloons();
		this.contactTitle = new ContactTitle();
		this.projectCard = new ProjectCard();
		this.environment = new Environment();

		document.addEventListener('loadingFinished', () => {
			this.scrollAnim = new ScrollAnim(
				this.coverBalloons,
				this.coverTitle,
				this.workBalloons,
				this.workTitle,
				this.contactBalloons,
				this.contactTitle,
				this.projectCard,
				this.transitionEnd
			);
		});

		return Promise.resolve();
	}

	update() {
		this.background && this.background.update();
		this.coverBalloons && this.coverBalloons.update();
		this.workBalloons && this.workBalloons.update();
		this.contactBalloons && this.contactBalloons.update();
		this.clouds && this.clouds.update();
	}
}
