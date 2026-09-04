<script lang="ts">
	import type { ProjectMilestone } from './types';

	interface Props {
		milestones: ProjectMilestone[];
	}

	let { milestones }: Props = $props();
</script>

<ol class="space-y-8">
	{#each milestones as milestone, index (milestone.title)}
		<li class="bg-dark-blue/60 relative rounded-2xl border border-white/10 p-6">
			<div
				class="bg-dark-light-blue text-dark-blue absolute top-6 -left-8 hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 text-xl font-bold lg:flex"
				aria-hidden="true"
			>
				{index + 1}
			</div>
			<p class="text-sm font-semibold tracking-[0.3em] text-white/50 uppercase">
				{milestone.period}
			</p>
			<h3 class="mt-2 text-2xl font-semibold text-white">{milestone.title}</h3>
			<p class="mt-3 text-sm leading-relaxed text-white/75">{milestone.description}</p>
		</li>
	{/each}
</ol>
