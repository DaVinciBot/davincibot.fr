<script lang="ts">
	import { CtaButton } from '@davincibot/components';
	import type { Snippet } from 'svelte';
	import type { ProjectAction } from './types';

	interface Props {
		title: string;
		description: string;
		actions: ProjectAction[];
		/** Contenu libre glissé sous les boutons (adresse, mention, précision). */
		children?: Snippet;
	}

	let { title, description, actions, children }: Props = $props();

	// Classes littérales : Tailwind n'analyse pas les chaînes construites.
	const COLUMNS: Record<number, string> = {
		1: 'sm:grid-cols-1',
		2: 'sm:grid-cols-2',
		3: 'sm:grid-cols-3'
	};

	const columns = $derived(COLUMNS[actions.length] ?? COLUMNS[3]);
</script>

<section class="px-4 py-16 sm:px-8 md:px-16 lg:px-32">
	<div
		class="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-linear-to-br from-white/10 via-white/5 to-white/10 p-10 text-center backdrop-blur"
	>
		<h2 class="text-3xl font-extrabold sm:text-4xl">{title}</h2>
		<p class="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">{description}</p>
		<div class="mt-8 grid gap-4 {columns}">
			{#each actions as action (action.href)}
				<CtaButton href={action.href} variant={action.variant ?? 'secondary'}>
					{action.label}
				</CtaButton>
			{/each}
		</div>
		{#if children}
			<div class="mt-10 border-t border-white/10 pt-8">
				{@render children()}
			</div>
		{/if}
	</div>
</section>
