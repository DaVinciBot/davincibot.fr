<script lang="ts">
	import { CtaButton } from '@davincibot/components';
	import type { ProjectAction } from './types';

	interface Props {
		/** Surtitre en petites capitales, au-dessus du titre. */
		eyebrow: string;
		title: string;
		lede: string;
		image: string;
		imageAlt: string;
		actions?: ProjectAction[];
		/**
		 * `card` encadre le visuel comme une photo ; `plain` le laisse détouré,
		 * pour les rendus sur fond transparent.
		 */
		frame?: 'card' | 'plain';
		/** Halo coloré derrière la section. */
		glow?: boolean;
	}

	let {
		eyebrow,
		title,
		lede,
		image,
		imageAlt,
		actions = [],
		frame = 'card',
		glow = false
	}: Props = $props();
</script>

<section
	class="relative overflow-hidden px-4 pt-24 pb-16 sm:px-8 md:px-16 md:pt-28 lg:px-32 lg:pt-36"
>
	{#if glow}
		<div
			style="background: radial-gradient(circle at 10% 20%, rgba(2, 50, 255, 0.25), transparent 55%), radial-gradient(circle at 90% 10%, rgba(255, 255, 255, 0.15), transparent 45%);"
			class="absolute inset-0 -z-10 opacity-70"
			aria-hidden="true"
		></div>
	{/if}
	<div class="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
		<div class="space-y-6">
			<p class="text-sm font-semibold tracking-[0.3em] text-white/70 uppercase">{eyebrow}</p>
			<h1 class="text-4xl leading-tight font-extrabold sm:text-5xl lg:text-6xl">{title}</h1>
			<p class="text-base leading-relaxed text-white/80 sm:text-lg">{lede}</p>
			{#if actions.length > 0}
				<div class="flex flex-col gap-4 sm:flex-row sm:items-center">
					{#each actions as action (action.href)}
						<CtaButton href={action.href} variant={action.variant ?? 'primary'}>
							{action.label}
						</CtaButton>
					{/each}
				</div>
			{/if}
		</div>
		<div class="relative flex justify-center">
			<div
				class="bg-dark-light-blue/20 absolute h-full w-full max-w-sm rounded-3xl blur-3xl"
				aria-hidden="true"
			></div>
			{#if frame === 'card'}
				<img
					class="shadow-dark-light-blue/40 relative w-full max-w-md rounded-3xl border border-white/10 shadow-2xl"
					alt={imageAlt}
					fetchpriority="high"
					loading="eager"
					src={image}
				/>
			{:else}
				<img
					class="relative w-full max-w-md object-contain drop-shadow-[0_30px_45px_rgba(2,50,255,0.28)]"
					alt={imageAlt}
					fetchpriority="high"
					loading="eager"
					src={image}
				/>
			{/if}
		</div>
	</div>
</section>
