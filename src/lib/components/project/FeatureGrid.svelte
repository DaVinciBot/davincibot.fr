<script lang="ts">
	import type { ProjectFeature } from './types';

	interface Props {
		items: ProjectFeature[];
		/** `1` empile les cartes : c'est la forme utilisée en colonne étroite. */
		columns?: 1 | 2 | 3;
	}

	let { items, columns = 3 }: Props = $props();

	// Classes littérales : Tailwind n'analyse pas les chaînes construites.
	const COLUMNS = {
		1: '',
		2: 'md:grid-cols-2',
		3: 'md:grid-cols-3'
	} as const;
</script>

<div class="grid gap-6 {COLUMNS[columns]}">
	{#each items as item (item.title)}
		<article class="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-6">
			<h3 class="text-xl font-semibold text-white">{item.title}</h3>
			{#if item.description}
				<p class="text-sm leading-relaxed text-white/70">{item.description}</p>
			{/if}
			{#if item.points}
				<ul class="space-y-3 text-sm leading-relaxed text-white/70">
					{#each item.points as point (point)}
						<li>• {point}</li>
					{/each}
				</ul>
			{/if}
		</article>
	{/each}
</div>
