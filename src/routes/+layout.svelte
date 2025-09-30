<script>
	import favicon from '$lib/assets/favicon.webp';
	import { onMount } from 'svelte';

	onMount(async () => {
		const { Buffer } = await import('buffer');
		window.Buffer = Buffer;
	});


	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>zkfs</title>
</svelte:head>

{@render children?.()}
