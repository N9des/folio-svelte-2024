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
					textContent: 100,
					duration: 4,
					ease: 'expo.inOut',
					stagger: {
						each: 1,
						onUpdate: () => {
							percent.textContent = Math.ceil(gsap.getProperty(percent, 'textContent'));
						},
					},
					onComplete: () => {
						setTimeout(() => {
							resolve();
						}, 500);
					},
					// onUpdate: () => {
					// 	document.addEventListener('loadedEvent', () => {
					// 		console.log('timeline');
					// 		gsap.to(percent, {
					// 			textContent: 100,
					// 			duration: 4,
					// 			ease: 'expo.out',
					// 			onUpdate: () => {
					// 				percent.textContent = Math.ceil(gsap.getProperty(percent, 'textContent'));
					// 			},
					// 			onComplete: () => {
					// 				resolve();
					// 			},
					// 		});
					// 	});
					// },
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
	<h1 class="">Loading...</h1>
	<div>
		<p bind:this={percent}>0</p>
	</div>
</div>
