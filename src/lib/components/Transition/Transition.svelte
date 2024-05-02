<script>
	import { onMount } from 'svelte';
	import Transition from '$lib/three/Transition/main';

	onMount(async () => {
		const transition = new Transition();
		await transition.init();
	});
</script>

<div class="wrapper absolute inset-0 z-50 pointer-events-none h-screen w-screen overflow-hidden">
	<div class="clouds absolute inset-0 w-full h-[1585px]">
		<img
			src="images/transition/clouds_topRight.png"
			alt=""
			class="clouds__tr absolute inset-0 h-full w-full object-cover"
		/>
		<img
			src="images/transition/clouds_topLeft.png"
			alt=""
			class="clouds__tl absolute inset-0 h-full w-full object-cover"
		/>
		<img
			src="images/transition/clouds_bg.png"
			alt=""
			class="clouds__m absolute inset-0 h-full w-full object-cover"
		/>
		<img
			src="images/transition/clouds_bottom.png"
			alt=""
			class="clouds__b absolute inset-0 h-full w-full object-cover"
		/>
	</div>
</div>

<style lang="postcss">
	:global(.clouds__tl, .clouds__tr, .clouds__m, .clouds__b) {
		transform: translateY(100%);
	}
</style>
