<script>
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import Logo from './Logo.svelte';

	let progressContainer;
	let progressBar;
	let progressBarInner;
	let percent;

	let logo;
	let f;
	let e;
	let l;
	let i;
	let x;
	let topRight;
	let bottomLeft;

	async function progress() {
		return new Promise((resolve) => {
			const tl = gsap.timeline();

			tl.fromTo(
				percent,
				{
					textContent: 0,
				},
				{
					textContent: 100,
					y: 0,
					duration: 4,
					ease: 'expo.inOut',
					stagger: {
						each: 1,
						onUpdate: () => {
							percent.textContent = Math.ceil(gsap.getProperty(percent, 'textContent'));
						},
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
			// tl.fromTo(
			// 	progressBarInner,
			// 	{ strokeDashoffset: 300 },
			// 	{
			// 		strokeDashoffset: 0,
			// 		duration: 4,
			// 		ease: 'expo.inOut',
			// 	},
			// 	'<'
			// );
			tl.to(
				progressBarInner,
				{
					y: 0,
					duration: 4,
					ease: 'expo.inOut',
				},
				'<'
			);
			tl.to(
				[f, e, l, i, x],
				{
					y: 0,
					x: 0,
					rotate: 0,
					duration: 3,
					ease: 'elastic.out(1, 0.6)',
				},
				'<+=0.5'
			);
			tl.fromTo(
				[topRight, bottomLeft],
				{ strokeDashoffset: 300 },
				{
					strokeDashoffset: 0,
					duration: 2,
					ease: 'power4.inOut',
					onComplete: () => {
						setTimeout(() => {
							resolve();
						}, 500);
					},
				},
				'<+=0.5'
			);
		});
	}

	onMount(async () => {
		await progress();

		// const event = new Event('loadingFinished');
		// document.addEventListener('loadingFinished', () => {
		// 	console.log('loadingFinished');
		// });
		// document.dispatchEvent(event);
	});
</script>

<div
	class="bg-primary w-screen h-screen absolute inset-0 flex flex-col items-center pt-[30dvh] z-10"
>
	<Logo
		bind:logo
		bind:f
		bind:e
		bind:l
		bind:i
		bind:x
		bind:topRight
		bind:bottomLeft
	/>

	<div
		bind:this={progressContainer}
		class="flex flex-col gap-4 items-center justify-center"
	>
		<p
			class="text-secondary translate-y-[30dvh]"
			bind:this={percent}
		>
			0
		</p>
		<div
			bind:this={progressBar}
			class="h-[30dvh] overflow-hidden"
		>
			<span
				bind:this={progressBarInner}
				class="block bg-secondary w-[1px] h-full translate-y-[30dvh]"
			></span>

			<!-- <svg
				bind:this={progressBarInner}
				class="w-full h-full progress"
				viewBox="0 0 19 256"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M7.9997 0.5C7.9997 30.5 16.5005 51.5 17.5005 73C18.5005 94.5 0.500481 126.982 0.5 162C0.499479 200 7.9997 242 7.9997 255.5"
					stroke="#DBF38C"
				/>
			</svg> -->
		</div>
	</div>
</div>

<style lang="postcss">
	/* :global(svg.progress) {
		stroke-dasharray: 300;
		stroke-dashoffset: -300;
	} */
</style>
