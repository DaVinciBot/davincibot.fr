<script lang="ts">
	import type { Snippet } from 'svelte';

	// Duration in seconds for a full loop
	interface CarouselProps {
		time?: number;
		pauseOnHover?: boolean;
		small?: boolean;
		children?: Snippet;
	}

	const { time = 50, pauseOnHover = true, small = false, children }: CarouselProps = $props();
</script>

<div class="h-full w-full">
	<div
		class="carrousel relative h-full w-full overflow-hidden"
		class:py-5={!small}
		class:py-2={small}
		class:pause-on-hover={pauseOnHover}
	>
		<!--
			The inner track duplicates the slot content to create an infinite marquee.
			CSS handles width via max-content, avoiding JS measurements that can be flaky in Firefox.
		-->
		<div class="carousel-inner flex" style={`--duration: ${String(time)}s`}>
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
		/* optional background color to match gradient edges; adjust to your theme */
		background-color: transparent;
	}

	.pause-on-hover:hover .carousel-inner {
		animation-play-state: paused;
	}

	.carrousel::after {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: linear-gradient(90deg, rgb(1, 1, 40) 0%, rgba(1, 1, 40, 0) 50%, #010128 100%);
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
