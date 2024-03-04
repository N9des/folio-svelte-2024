<script>
	import { onMount } from 'svelte';
	import Transition from '$lib/three/Transition/main';

	let transitionWebgl;

	onMount(async () => {
		const transition = new Transition();
		await transition.init(transitionWebgl);
	});
</script>

<div class="wrapper relative z-50 pointer-events-none">
	<canvas
		bind:this={transitionWebgl}
		class="transition webgl inline-block w-screen h-screen fixed inset-0"
	></canvas>
</div>
