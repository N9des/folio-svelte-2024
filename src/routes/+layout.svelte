<script>
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import { repositoryName } from '$lib/prismicio';
	import '../app.css';
	import Header from '$lib/components/Header/Header.svelte';
	import Transition from '$lib/components/Transition/Transition.svelte';
</script>

<Header />
<main>
	<Transition />
	<slot />
</main>
<PrismicPreview {repositoryName} />
