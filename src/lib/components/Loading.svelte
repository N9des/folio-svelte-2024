<script>
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	let percent;

	async function progress() {
		return new Promise((resolve) => {
			gsap.fromTo(
				percent,
				{
					textContent: 0,
				},
				{
					textContent: 75,
					duration: 2.5,
					ease: 'power4.out',
					stagger: {
						each: 1,
						onUpdate: () => {
							percent.textContent = Math.ceil(gsap.getProperty(percent, 'textContent'));
						},
					},
					onUpdate: () => {
						document.addEventListener('loadedEvent', () => {
							console.log('timeline');
							gsap.to(percent, {
								textContent: 100,
								duration: 2.5,
								ease: 'power4.out',
								onUpdate: () => {
									percent.textContent = Math.ceil(gsap.getProperty(percent, 'textContent'));
								},
								onComplete: () => {
									resolve();
								},
							});
						});
					},
				}
			);
		});
	}

	onMount(async () => {
		await progress();

		const event = new Event('loadingFinished');
		document.addEventListener('loadingFinished', () => {
			console.log('loadingFinished');
		});
		document.dispatchEvent(event);
	});
</script>

<div class="bg-primary w-screen h-screen absolute inset-0 flex items-center justify-center z-10">
	<h1 class="text-secondary text-[10rem] font-normal font-heading">Loading...</h1>
	<p><span bind:this={percent}>0</span>%</p>
</div>
