<script>
	import favicon from '$lib/assets/favicon.webp';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>zkfs</title>
</svelte:head>

{@render children?.()}
