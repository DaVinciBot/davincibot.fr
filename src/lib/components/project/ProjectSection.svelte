<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Absent, le bandeau de titre n'est pas rendu du tout. */
		title?: string;
		lede?: string;
		id?: string;
		/** `muted` éclaircit le fond : on alterne d'une section à l'autre. */
		tone?: 'plain' | 'muted';
		align?: 'start' | 'center';
		width?: 'wide' | 'narrow';
		/** Moins d'air vertical, pour les bandeaux qui suivent immédiatement le héros. */
		compact?: boolean;
		children: Snippet;
	}

	let {
		title = '',
		lede = '',
		id,
		tone = 'plain',
		align = 'start',
		width = 'wide',
		compact = false,
		children
	}: Props = $props();
</script>

<section
	{id}
	class="px-4 sm:px-8 md:px-16 lg:px-32 {compact ? 'py-12' : 'py-16'} {tone === 'muted'
		? 'bg-white/5'
		: ''}"
>
	<div class="mx-auto {width === 'narrow' ? 'max-w-5xl' : 'max-w-6xl'}">
		{#if title}
			<div class="mb-10 {align === 'center' ? 'mx-auto max-w-3xl text-center' : ''}">
				<h2 class="text-3xl font-extrabold sm:text-4xl">{title}</h2>
				{#if lede}
					<p
						class="mt-3 text-base leading-relaxed text-white/70 sm:text-lg {align === 'start'
							? 'max-w-3xl'
							: ''}"
					>
						{lede}
					</p>
				{/if}
			</div>
		{/if}
		{@render children()}
	</div>
</section>
