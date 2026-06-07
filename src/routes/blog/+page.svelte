<script lang="ts">
	import { resolve } from '$app/paths';
	import Footer from '$lib/components/share/Footer.svelte';
	import Topbar from '$lib/components/share/Topbar.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();

	type BlogPost = PageData['posts'][number];

	interface BlogApiPayload {
		posts?: BlogPost[];
		count?: number | null;
	}

	function isBlogApiPayload(value: unknown): value is BlogApiPayload {
		return typeof value === 'object' && value !== null;
	}

	function getInitialPageSize(): number {
		return data.pageSize;
	}

	function getInitialPosts(): BlogPost[] {
		return [...data.posts];
	}

	function getInitialTotalCount(): number {
		return data.totalCount;
	}

	const pageSize = getInitialPageSize();
	const initialPosts = getInitialPosts();
	let posts = $state(initialPosts);
	let totalCount = $state(getInitialTotalCount());
	let filterTotalCount = $state<number | null>(null);
	let filterSignature = $state('');
	let loadingMore = $state(false);
	let loadError = $state('');
	let searchQuery = $state('');
	let selectedTag = $state('all');

	function fmt(dateStr: string | null | undefined): string {
		if (!dateStr) {
			return '';
		}
		try {
			return new Date(dateStr).toLocaleDateString('fr-FR', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
		} catch {
			return dateStr;
		}
	}

	function matchesSearch(post: BlogPost, searchTerm: string): boolean {
		if (!searchTerm) {
			return true;
		}
		const haystack = `${post.title} ${post.excerpt} ${post.plainBody} ${post.body}`.toLowerCase();
		return haystack.includes(searchTerm);
	}

	function matchesTag(post: BlogPost, tag: string | null): boolean {
		if (!tag) {
			return true;
		}
		return post.tags.some((t) => t.toLowerCase() === tag.toLowerCase());
	}

	function buildFilterSignature(search: string, tag: string | null): string {
		return `${search}::${tag ?? 'all'}`;
	}

	const dedupePosts = (existing: BlogPost[], incoming: BlogPost[]): BlogPost[] => {
		const seen = existing.map((post) => post.slug);
		const merged = [...existing];
		incoming.forEach((post) => {
			if (!seen.includes(post.slug)) {
				seen.push(post.slug);
				merged.push(post);
			}
		});
		return merged;
	};

	function buildQuery(params: Record<string, string>): string {
		return Object.entries(params)
			.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
			.join('&');
	}

	async function loadMorePosts() {
		if (loadingMore || !hasMoreForFilter) {
			return;
		}
		loadingMore = true;
		loadError = '';
		const offset = posts.filter(
			(post) => matchesSearch(post, trimmedSearch) && matchesTag(post, activeTag)
		).length;
		const params: Record<string, string> = {
			offset: String(offset),
			limit: String(pageSize)
		};
		if (trimmedSearch) {
			params.search = trimmedSearch;
		}
		if (activeTag) {
			params.tag = activeTag;
		}

		try {
			const res = await fetch(`/api/blog?${buildQuery(params)}`);
			if (!res.ok) {
				throw new Error('Failed to load more posts');
			}
			const payload: unknown = await res.json();
			const incoming = isBlogApiPayload(payload) ? (payload.posts ?? []) : [];
			const count = isBlogApiPayload(payload) ? (payload.count ?? null) : null;
			if (count !== null) {
				filterTotalCount = count;
				if (!trimmedSearch && !activeTag) {
					totalCount = count;
				}
			}
			if (incoming.length) {
				posts = dedupePosts(posts, incoming);
			} else if (count === null) {
				filterTotalCount = offset;
			}
		} catch {
			loadError = "Impossible de charger plus d'articles pour le moment.";
		} finally {
			loadingMore = false;
		}
	}

	const derivedTags = $derived(
		posts.flatMap((post) => post.tags).filter((tag, index, tags) => tags.indexOf(tag) === index)
	);
	const tagOptions = $derived(['all', ...derivedTags]);
	const trimmedSearch = $derived(searchQuery.trim().toLowerCase());
	const activeTag = $derived(selectedTag === 'all' ? null : selectedTag);
	const latest = $derived(posts.slice(0, Math.min(4, posts.length)));
	const archiveSource = $derived(posts.length > latest.length ? posts.slice(latest.length) : posts);
	const filteredLatest = $derived(latest.filter((post) => matchesSearch(post, trimmedSearch)));
	const filteredArchive = $derived(archiveSource.filter((post) => matchesTag(post, activeTag)));
	const matchesForFilter = $derived(
		posts.filter((post) => matchesSearch(post, trimmedSearch) && matchesTag(post, activeTag)).length
	);
	const hasMoreBase = $derived(posts.length < totalCount);
	const hasMoreForFilter = $derived(
		filterTotalCount === null ? hasMoreBase : matchesForFilter < filterTotalCount
	);
	const disableLoadMore = $derived(!hasMoreForFilter || loadingMore);
	const currentSignature = $derived(buildFilterSignature(trimmedSearch, activeTag));
	$effect(() => {
		if (currentSignature !== filterSignature) {
			filterSignature = currentSignature;
			filterTotalCount = null;
			loadError = '';
		}
	});
	const noResults = $derived(!filteredLatest.length && !filteredArchive.length);
</script>

<svelte:head>
	<title>Actus — DaVinciBot</title>
	<link rel="canonical" href="https://davincibot.fr/blog/" />
	<meta name="description" content="Dernières nouvelles, projets et coulisses de DaVinciBot." />
	<meta name="robots" content="index,follow" />
	<meta property="og:title" content="Actus — DaVinciBot" />
	<meta
		property="og:description"
		content="Dernières nouvelles, projets et coulisses de DaVinciBot."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://davincibot.fr/blog/" />
	<meta property="og:image" content="https://davincibot.fr/dvb_og_img.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Actus — DaVinciBot" />
	<meta
		name="twitter:description"
		content="Dernières nouvelles, projets et coulisses de DaVinciBot."
	/>
	<meta name="twitter:image" content="https://davincibot.fr/dvb_og_img.png" />
</svelte:head>

<Topbar />

<section class="pt-24 md:pt-28">
	<div class="px-6 md:px-16 lg:px-32">
		<header class="flex flex-col gap-2">
			<h1 class="text-3xl font-extrabold tracking-wide md:text-5xl">Actus</h1>
			<p class="text-dark-blue-gray md:text-lg">
				Dernières nouvelles, projets et coulisses de l'association.
			</p>
		</header>

		<section class="mt-3 space-y-8">
			<div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
				<h2 class="text-2xl font-semibold md:text-3xl">Derniers articles</h2>
				<!-- <span class="text-sm text-gray-500">
					{filteredLatest.length}/{latest.length} sélectionnés
				</span> -->
				<div class="flex flex-col gap-4 md:min-w-96">
					<div class="relative">
						<input
							bind:value={searchQuery}
							type="search"
							placeholder="Rechercher un article..."
							class="focus:border-dark-light-blue focus:ring-dark-light-blue w-full rounded-2xl border border-gray-700 bg-gray-900/60 px-4 py-3 pl-12 text-sm text-white placeholder-gray-500 transition focus:ring-1 focus:outline-none"
						/>
						<svg
							class="absolute top-3.5 left-4 h-5 w-5 text-gray-500"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<circle cx="11" cy="11" r="8" />
							<line x1="21" y1="21" x2="16.65" y2="16.65" />
						</svg>
					</div>
				</div>
			</div>
			{#if noResults}
				<div class="mt-10 rounded-2xl border border-gray-700 p-6 text-center text-gray-400">
					Aucun article ne correspond à vos critères de recherche.
				</div>
			{/if}
			{#if filteredLatest.length}
				{#if filteredLatest[0]}
					{@const featured = filteredLatest[0]}
					<a
						href={resolve(`/blog/${featured.slug}` as '/')}
						class="group hover:border-dark-light-blue grid grid-cols-1 items-stretch gap-6 overflow-hidden rounded-2xl border border-gray-700 transition-colors md:grid-cols-12"
					>
						<div class="relative bg-gray-800/40 md:col-span-7">
							<img
								alt={featured.title}
								src={featured.cover}
								class="h-72 w-full object-cover opacity-90 transition-opacity group-hover:opacity-100 md:h-full"
							/>
						</div>
						<div class="flex flex-col gap-3 self-center p-6 md:col-span-5">
							<div class="text-sm text-gray-400">
								{fmt(featured.date)}
							</div>
							<h3 class="text-2xl leading-tight font-bold group-hover:text-white md:text-3xl">
								{featured.title}
							</h3>
							{#if featured.tags.length}
								<ul class="mt-1 flex flex-wrap gap-2">
									{#each featured.tags.slice(0, 6) as tag (tag)}
										<li
											class="border-dark-light-blue/40 text-dark-light-blue bg-dark-light-blue/10 rounded-md border px-2 py-1 text-xs"
										>
											#{tag}
										</li>
									{/each}
								</ul>
							{/if}
							<p class="text-dark-blue-gray line-clamp-4">{featured.excerpt}</p>
							<div class="text-dark-light-blue mt-2">Lire l'article →</div>
						</div>
					</a>
				{/if}
				{#if filteredLatest.length > 1}
					<div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{#each filteredLatest.slice(1) as post (post.slug)}
							<a
								href={resolve(`/blog/${post.slug}` as '/')}
								class="hover:border-dark-light-blue group flex flex-col overflow-hidden rounded-2xl border border-gray-700 transition-colors"
							>
								<img src={post.coverSmall} alt={post.title} class="h-48 w-full object-cover" />
								<div class="flex flex-col gap-2 p-4">
									<div class="text-xs text-gray-400">{fmt(post.date)}</div>
									<h4 class="text-lg leading-snug font-semibold group-hover:text-white">
										{post.title}
									</h4>
									{#if post.tags.length}
										<ul class="text-dark-light-blue flex flex-wrap gap-1.5 text-[11px]">
											{#each post.tags.slice(0, 5) as tag (tag)}
												<li
													class="border-dark-light-blue/40 bg-dark-light-blue/10 rounded-full border px-2 py-0.5"
												>
													#{tag}
												</li>
											{/each}
										</ul>
									{/if}
									<p class="text-dark-blue-gray line-clamp-3 text-sm">{post.excerpt}</p>
									<span class="text-dark-light-blue mt-1 text-sm font-semibold">Lire →</span>
								</div>
							</a>
						{/each}
					</div>
				{/if}
			{/if}
			<section class="mt-16">
				<div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
					<div class="flex flex-col gap-3">
						<h2 class="text-2xl font-semibold md:text-3xl">Articles par tag</h2>
						{#if derivedTags.length}
							<div class="flex flex-wrap gap-2">
								{#each tagOptions as tag (tag)}
									<button
										type="button"
										onclick={() => (selectedTag = tag)}
										class={`rounded-full border px-4 py-1.5 text-sm transition ${
											tag === selectedTag
												? 'border-dark-light-blue bg-dark-light-blue/10 text-dark-light-blue'
												: 'border-gray-700 text-gray-400 hover:text-white'
										}`}
									>
										{tag === 'all' ? 'Tous les tags' : `#${tag}`}
									</button>
								{/each}
							</div>
						{/if}
					</div>
					<p class="text-sm text-gray-500 lg:max-w-md lg:text-right">
						Faites défiler horizontalement les archives filtrées par tag ou mot-clé.
					</p>
				</div>
				{#if filteredArchive.length}
					<div class="relative mt-8">
						<div
							class="scroll-rail flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
							aria-label="Articles filtrés"
						>
							{#each filteredArchive as post (post.slug)}
								<a
									href={resolve(`/blog/${post.slug}` as '/')}
									class="hover:border-dark-light-blue flex w-72 min-w-[18rem] shrink-0 snap-start flex-col rounded-2xl border border-gray-800 bg-gray-900/40 transition"
								>
									<img
										src={post.coverSmall}
										alt={post.title}
										class="h-44 w-full rounded-t-2xl object-cover"
									/>
									<div class="flex flex-col gap-3 p-4">
										<div class="text-xs text-gray-500">{fmt(post.date)}</div>
										<h4 class="line-clamp-2 text-lg leading-snug font-semibold">{post.title}</h4>
										<p class="text-dark-blue-gray line-clamp-3 text-sm">{post.excerpt}</p>
										{#if post.tags.length}
											<ul class="text-dark-light-blue flex flex-wrap gap-1.5 text-[11px]">
												{#each post.tags.slice(0, 4) as tag (tag)}
													<li
														class="border-dark-light-blue/40 bg-dark-light-blue/10 rounded-full border px-2 py-0.5"
													>
														#{tag}
													</li>
												{/each}
											</ul>
										{/if}
										<span class="text-dark-light-blue text-sm font-semibold">Lire →</span>
									</div>
								</a>
							{/each}
						</div>
					</div>
				{:else}
					<p class="mt-8 text-sm text-gray-400">Aucun article ne correspond à ce filtre.</p>
				{/if}
				{#if loadError}
					<p class="mt-4 text-sm text-red-400">{loadError}</p>
				{/if}
				{#if hasMoreForFilter}
					<button
						type="button"
						onclick={loadMorePosts}
						disabled={disableLoadMore}
						class="border-dark-light-blue text-dark-light-blue mt-4 rounded-full border px-6 py-2 text-sm font-semibold hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
					>
						{loadingMore ? 'Chargement…' : 'Charger plus d’articles'}
					</button>
				{:else}
					<p class="mt-4 text-xs text-gray-500">
						Tous les articles correspondant à ce filtre ont été chargés.
					</p>
				{/if}
			</section>
		</section>
	</div>
</section>

<Footer />

<style>
	.scroll-rail::-webkit-scrollbar-track {
		background: transparent;
	}
	.scroll-rail::-webkit-scrollbar-thumb {
		background: rgba(71, 85, 105, 0.6);
		border-radius: 9999px;
	}
</style>
