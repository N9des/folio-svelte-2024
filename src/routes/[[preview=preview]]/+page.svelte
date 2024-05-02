<script>
	import { onMount } from 'svelte';
	import Experience from '$lib/three/Experience/Experience';
	import detect from '$lib/utils/utils';

	// Components import
	import Loading from '$lib/components/Loading/Loading.svelte';
	import Desktop from '$lib/components/Home/Desktop.svelte';
	import Mobile from '$lib/components/Home/Mobile.svelte';

	/**
	 * @type {HTMLCanvasElement}
	 */
	let webgl;
	let exp;
	let loading = true;
	let innerWidth;
	let isMobile;

	let hideLoading = () => {
		loading = false;
		document.removeEventListener('closeTransition', hideLoading);
	};

	onMount(async () => {
		isMobile = detect.isMobile();

		console.log('isMobile', isMobile);
		if (isMobile) {
			setTimeout(() => {
				document.addEventListener('closeTransition', hideLoading);
			}, 3500);
		} else {
			exp = new Experience();
			await exp.init(webgl);

			document.addEventListener('closeTransition', hideLoading);
		}
	});
</script>

<svelte:window on:innerWidth={() => (innerWidth = window.innerWidth)} />

{#if loading}
	<Loading />
{/if}

{#if isMobile}
	<Mobile />
{:else if !isMobile}
	<Desktop bind:webgl />
{/if}
