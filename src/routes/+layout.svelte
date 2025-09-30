<script>
	import favicon from '$lib/assets/favicon.webp';
	import { Buffer } from 'buffer';

	if (typeof window !== 'undefined') {
	window.Buffer = Buffer;
	}

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>zkfs</title>
</svelte:head>

{@render children?.()}
