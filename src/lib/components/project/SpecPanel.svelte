<script lang="ts">
	interface Props {
		title: string;
		description: string;
		/** Intitulé de l'encadré du bas. */
		listTitle?: string;
		items: string[];
	}

	let { title, description, listTitle = 'Composants clés', items }: Props = $props();
</script>

<div class="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
	<h3 class="text-2xl font-bold">{title}</h3>
	<p class="mt-3 text-sm leading-relaxed text-white/75">{description}</p>
	<div class="bg-dark-blue/40 mt-6 grid gap-4 rounded-2xl border border-white/10 p-5 text-sm">
		<p class="font-semibold tracking-[0.25em] text-white/60 uppercase">{listTitle}</p>
		<ul class="space-y-2 text-white/75">
			{#each items as item (item)}
				<li>• {item}</li>
			{/each}
		</ul>
	</div>
</div>
