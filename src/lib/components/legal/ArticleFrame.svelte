<script lang="ts">
	import { resolve } from '$app/paths';
	import { Topbar } from '@davincibot/components';
	import Footer from '$lib/components/share/Footer.svelte';
	import type { Snippet } from 'svelte';

	interface ArticleSection {
		id: string;
		label: string;
	}

	interface ArticleFrameProps {
		title?: string;
		intro?: string;
		updatedAt?: string;
		badge?: string;
		sections?: ArticleSection[];
		redirectToLegalHome?: boolean;
		children?: Snippet;
	}

	const {
		title = '',
		intro = '',
		updatedAt = '',
		badge = 'Légal',
		sections = [],
		redirectToLegalHome = false,
		children
	}: ArticleFrameProps = $props();

	const getValidDate = (value: string) => {
		if (!value) {
			return null;
		}
		const date = new Date(value);
		return Number.isNaN(date.getTime()) ? null : date;
	};

	const formatDate = (value: string) => {
		const date = getValidDate(value);
		if (!date) {
			return null;
		}
		return new Intl.DateTimeFormat('fr-FR', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		}).format(date);
	};

	const formattedDate = $derived(formatDate(updatedAt));
	const isoDate = $derived(getValidDate(updatedAt)?.toISOString() ?? null);
</script>

<Topbar />

<section class="bg-dark-blue relative text-white">
	<div class="pointer-events-none absolute inset-0 opacity-30">
		<div
			class="h-full w-full bg-[radial-gradient(circle_at_top,rgba(7,31,84,0.8),rgba(1,1,40,0.95))]"
		></div>
	</div>

	<div class="relative pt-28 pb-12 md:pb-16">
		<div class="px-6 md:px-96">
			<div class="max-w-3xl space-y-5">
				<a
					class="text-dark-light-blue/80 flex items-center gap-3 text-xs font-semibold tracking-[0.35em] uppercase"
					href={resolve('/legal' as '/')}
				>
					{#if redirectToLegalHome}
						<svg
							class="h-4 w-4 flex-none"
							aria-hidden="true"
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							viewBox="0 0 24 24"
						>
							<path d="M15 18l-6-6 6-6"></path>
						</svg>
					{/if}
					<span>{badge}</span>
				</a>
				<h1 class="text-3xl font-extrabold md:text-5xl">{title}</h1>
				{#if intro}
					<p class="text-dark-blue-gray text-base leading-relaxed md:text-lg">{intro}</p>
				{/if}
				{#if formattedDate}
					<p class="text-sm text-gray-400">
						Dernière mise à jour : <time datetime={isoDate}>{formattedDate}</time>
					</p>
				{/if}
			</div>
		</div>
	</div>

	<div class="relative pb-16">
		<div class="px-6 md:pr-16 md:pl-96">
			<div class="mx-auto flex w-full flex-col flex-nowrap items-start justify-between md:flex-row">
				<article class="prose legal-article prose-invert md-article w-full max-w-3xl shrink-0">
					{@render children?.()}
				</article>
				{#if sections.length}
					<aside
						class="legal-summary order-first mb-6 w-full space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-white md:order-last md:mt-12 lg:sticky lg:top-32 lg:mt-0 lg:w-80 lg:flex-none"
						aria-label="Sommaire de la page"
					>
						<p class="text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">Sommaire</p>
						<ol class="space-y-2 text-sm text-white/80" role="list">
							{#each sections as section (section.id)}
								<li>
									<a
										class="flex gap-2 rounded-xl px-3 py-2 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
										href={`#${section.id}`}
									>
										<span class="font-semibold text-white">{section.label}</span>
									</a>
								</li>
							{/each}
						</ol>
					</aside>
				{/if}
			</div>
		</div>
	</div>
</section>

<Footer />

<style>
	:global(.legal-article section) {
		margin-bottom: 2.75rem;
	}
	:global(.legal-article h2) {
		margin-top: 0;
		margin-bottom: 1rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.12);
		font-size: clamp(1.25rem, 1.05rem + 0.8vw, 1.8rem);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #fff;
	}
	:global(.legal-article h3) {
		font-size: clamp(1.05rem, 0.95rem + 0.4vw, 1.4rem);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #cbd5ff;
		margin-top: 2rem;
	}
	:global(.legal-article p),
	:global(.legal-article ul),
	:global(.legal-article ol) {
		max-width: 90ch;
	}
	:global(.legal-article ul) {
		margin-left: 1rem;
		list-style: disc;
	}
	:global(.legal-article ol) {
		margin-left: 1rem;
		list-style: decimal;
	}

	:global(html) {
		/* enable smooth scrolling for in-page anchors */
		scroll-behavior: smooth;
	}

	/* Respect users who prefer reduced motion */
	@media (prefers-reduced-motion: reduce) {
		:global(html) {
			scroll-behavior: auto;
		}
	}

	@media (min-width: 1024px) {
		.legal-summary {
			max-width: 18rem;
		}
		.legal-article {
			padding-right: 1.5rem;
		}
	}

	:global(.legal-article a) {
		text-decoration: underline;
	}
	:global(.legal-article a[href^='/legal']) {
		text-decoration: none;
	}
</style>
