<script lang="ts">
	import type { Component } from 'svelte';

	interface Props {
		title?: string;
		rank_and_points?: string;
		image?: string;
		/** Logo du thème. Toutes les éditions n'en ont pas eu : 2019 s'en passe. */
		logo?: Component<Record<string, unknown>>;
		marginLeft?: string;
		marginBottom?: string;
	}

	let {
		title = '',
		rank_and_points = '',
		image = '',
		logo,
		marginLeft = '',
		marginBottom = ''
	}: Props = $props();

	const SvelteComponent = $derived(logo);
	const transformStyle = $derived(
		`transform: translate(${String(Number(marginLeft || 0))}px, ${String(-Number(marginBottom || 0))}px)`
	);
</script>

<div
	class="border-dark-light-blue flex w-105 min-w-96 flex-col gap-2 rounded-xl border-[3.5px] p-4"
>
	<div class="flex flex-col">
		<h3 class="text-xl font-bold">{title}</h3>
		<p class="text-xl font-bold">{rank_and_points}</p>
	</div>
	<div class="flex h-28 flex-row items-center gap-3">
		{#if SvelteComponent}
			<img class="aspect-auto h-28" alt={title} src={image} />
			<div style={transformStyle} class="flex items-center">
				<SvelteComponent class="h-28" sizeH="185px" sizeW="163px" />
			</div>
		{:else}
			<!-- Sans logo, la photo prend toute la ligne plutôt que de laisser un vide à droite. -->
			<img class="h-28 w-full rounded-lg object-cover" alt={title} src={image} />
		{/if}
	</div>
</div>
