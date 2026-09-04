<script lang="ts">
	import type { Snippet } from 'svelte';

	// Duration in seconds for a full loop
	interface Props {
		time?: number;
		pauseOnHover?: boolean;
		small?: boolean;
		children?: Snippet;
	}

	let { time = 50, pauseOnHover = true, small = false, children }: Props = $props();
</script>

<div class="h-full w-full">
	<div
		class="carrousel relative h-full w-full overflow-hidden"
		class:pause-on-hover={pauseOnHover}
		class:py-2={small}
		class:py-5={!small}
	>
		<!--
			The inner track duplicates the slot content to create an infinite marquee.
			CSS handles width via max-content, avoiding JS measurements that can be flaky in Firefox.
		-->
		<div style={`--duration: ${String(time)}s`} class="carousel-inner flex">
			<div class="flex h-full items-center gap-8">
				{@render children?.()}
			</div>
			<div class="flex h-full items-center gap-8 pl-8" aria-hidden="true">
				{@render children?.()}
			</div>
		</div>
	</div>
</div>

<style>
	.carousel-inner {
		/* Use CSS var for duration to avoid inline animation style precedence issues */
		animation: slidein var(--duration, 50s) linear infinite;
		/* Ensure smooth and stable animation across browsers (esp. Firefox) */
		will-change: transform;
		transform: translateZ(0);
		/* Prevent shrinking and let intrinsic width define the track */
		width: max-content;
		flex: none;
	}

	.carrousel {
		position: relative;
		background-color: transparent;
		/* Le fondu des bords efface le contenu lui-même plutôt que de peindre la
		   couleur de la page par-dessus : le carrousel reste juste sur n'importe
		   quelle surface (fond de page, section éclaircie, encart). */
		-webkit-mask-image: linear-gradient(
			90deg,
			transparent 0%,
			#000 12%,
			#000 88%,
			transparent 100%
		);
		mask-image: linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%);
	}

	.pause-on-hover:hover .carousel-inner {
		animation-play-state: paused;
	}

	@keyframes slidein {
		from {
			transform: translateX(0);
		}
		to {
			/* Move by half the track width; with duplicated content this loops seamlessly */
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.carousel-inner {
			animation: none;
		}
	}
</style>
