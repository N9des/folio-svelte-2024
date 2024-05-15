<script>
	import Logo from './Logo.svelte';

	let menuState = false;

	function toggleMenu() {
		menuState = !menuState;
	}
</script>

<header class="relative z-[1] flex items-center justify-between mx-[3.2rem] mt-8">
	<a href="/">
		<Logo />
	</a>
	<button
		on:click={toggleMenu}
		class="border border-primary-extralight leading-none rounded-full w-24 h-24 text-white font-heading font-medium text-[2.5rem]"
		>Menu</button
	>

	{#if menuState}
		<nav class="absolute -top-2 -right-[1.6rem] bg-primary rounded-3xl p-8 flex flex-col">
			<button
				on:click={toggleMenu}
				class="border border-primary-extralight rounded-full px-4 py-2 text-primary-extralight font-heading ml-auto font-medium text-[1.8rem] flex items-center gap-4"
			>
				Close
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					class="w-7 h-7"
					viewBox="0 0 16 17"
				>
					<path
						class="fill-primary-extralight"
						d="M8.7 10.3C5 23-7 14.2 7.5 8.3-6.3 6 2-6.6 8.7 7 12.3-2.4 19 5.2 10 8.4c10.9 5.2 3.3 14-1.3 2Z"
					/>
				</svg>
			</button>
			<ul
				class="font-special text-primary-extralight text-[4rem] mt-[7.5rem] mb-[12rem] mx-[5rem] text-center"
			>
				<li>
					<a href="www.google.com">About</a>
				</li>
				<li><a href="www.google.com">Works</a></li>
				<li><a href="www.google.com">Contact</a></li>
			</ul>
			<ul class="flex gap-16 items-center justify-end mb-4 mr-4">
				<li>
					<a
						href="www.google.com"
						class="relative"
						><img
							src="images/header/twitter.svg"
							alt="twitter logo"
						/>
						<span
							class="border border-primary-extralight rounded-full absolute inset-1/2 aspect-square w-[4rem] -translate-x-1/2 -translate-y-1/2"
						></span>
					</a>
				</li>
				<li>
					<a
						href="www.google.com"
						class="relative"
						><img
							src="images/header/linkedin.svg"
							alt="linkedin logo"
						/>
						<span
							class="border border-primary-extralight rounded-full absolute inset-1/2 aspect-square w-[4rem] -translate-x-1/2 -translate-y-1/2"
						></span>
					</a>
				</li>
				<li>
					<a
						href="www.google.com"
						class="relative"
						><img
							src="images/header/github.svg"
							alt="github logo"
						/>
						<span
							class="border border-primary-extralight rounded-full absolute inset-1/2 aspect-square w-[4rem] -translate-x-1/2 -translate-y-1/2"
						></span>
					</a>
				</li>
			</ul>
		</nav>
	{/if}
</header>
