<script lang="ts">
	import type { ProjectFigure } from './types';

	interface Props {
		figures: ProjectFigure[];
	}

	let { figures }: Props = $props();

	// Classes littérales : Tailwind n'analyse pas les chaînes construites.
	const COLUMNS: Record<number, string> = {
		2: 'sm:grid-cols-2',
		3: 'sm:grid-cols-2 xl:grid-cols-3',
		4: 'sm:grid-cols-2 xl:grid-cols-4'
	};

	const columns = $derived(COLUMNS[figures.length] ?? COLUMNS[3]);
</script>

<div class="grid gap-6 {columns}">
	{#each figures as figure (figure.label)}
		<article class="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
			<p class="text-dark-light-blue text-3xl font-extrabold sm:text-4xl">{figure.value}</p>
			<p class="mt-2 text-lg font-semibold text-white/80">{figure.label}</p>
			{#if figure.description}
				<p class="mt-4 text-sm leading-relaxed text-white/70">{figure.description}</p>
			{/if}
		</article>
	{/each}
</div>
