<script>
	import { onMount } from 'svelte';
	import Experience from '$lib/three/Experience/Experience';

	// Video import
	import video from '$lib/assets/videos/office.mp4';
	import Loading from '$lib/components/Loading.svelte';

	/**
	 * @type {HTMLCanvasElement}
	 */
	let webgl;
	let exp;
	let loading = true;

	onMount(async () => {
		exp = new Experience();
		await exp.init(webgl);

		document.addEventListener('loadedEvent', () => {
			console.log('loadedEvent');

			document.addEventListener('loadingFinished', () => {
				loading = false;
			});
		});
	});
</script>

{#if loading}
	<Loading />
{/if}

<div class="home h-[500dvh]">
	<video
		id="office"
		loop
		crossorigin="anonymous"
		playsinline
		class="hidden"
		autoplay
		src={video}
		type="video/mp4; codecs='avc1.42E01E, mp4a.40.2'"
	>
		<track kind="captions" />
	</video>
	<video
		id="matawan"
		loop
		crossorigin="anonymous"
		playsinline
		class="hidden"
		autoplay
		src={video}
		type="video/mp4; codecs='avc1.42E01E, mp4a.40.2'"
	>
		<track kind="captions" />
	</video>
	<video
		id="sersi"
		loop
		crossorigin="anonymous"
		playsinline
		class="hidden"
		autoplay
		src={video}
		type="video/mp4; codecs='avc1.42E01E, mp4a.40.2'"
	>
		<track kind="captions" />
	</video>
	<div class="wrapper bg-[#0101] relative">
		<canvas
			bind:this={webgl}
			class="webgl inline-block w-screen h-screen fixed inset-0"
		></canvas>
	</div>
</div>
