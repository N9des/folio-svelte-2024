<script>
	import { onMount } from 'svelte';
	import Experience from '$lib/three/Experience/Experience';

	// Video import
	import video from '$lib/assets/videos/office.mp4';

	// Components import
	import Loading from '$lib/components/Loading/Loading.svelte';

	/**
	 * @type {HTMLCanvasElement}
	 */
	let webgl;
	let exp;
	let loading = true;

	let hideLoading = () => {
		loading = false;
		document.removeEventListener('closeTransition', hideLoading);
	};

	onMount(async () => {
		exp = new Experience();
		await exp.init(webgl);

		document.addEventListener('closeTransition', hideLoading);
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
