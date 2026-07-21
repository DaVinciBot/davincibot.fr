<script lang="ts">
	import Renderer from '$lib/components/markdown/Renderer.svelte';
	import Footer from '$lib/components/share/Footer.svelte';
	import { Topbar } from '@davincibot/components';
	import type { MarkdownRoot } from '$lib/markdown/parse';
	import type { Json } from '@davincibot/database-types';

	interface ArticlePost {
		title: string;
		slug: string;
		meta: Record<string, Json | undefined>;
		body: string;
		ast: MarkdownRoot;
		updatedAt: string | null;
		publishedAt: string | null;
	}

	interface ArticlePageData {
		post: ArticlePost;
	}

	const { data }: { data: ArticlePageData } = $props() as { data: ArticlePageData };

	function getInitialPost(): ArticlePost {
		return data.post;
	}

	const post = getInitialPost();

	const isRecord = (value: Json | undefined): value is Record<string, Json | undefined> =>
		typeof value === 'object' && value !== null && !Array.isArray(value);

	function stringFromMeta(key: string): string | undefined {
		const value = post.meta[key];
		return typeof value === 'string' ? value : undefined;
	}

	function stringFromRecord(
		record: Record<string, Json | undefined> | null,
		key: string
	): string | undefined {
		const value = record?.[key];
		return typeof value === 'string' ? value : undefined;
	}

	function absoluteUrl(path: string): string {
		return path.startsWith('http') ? path : `https://davincibot.fr${path}`;
	}

	const authorMeta = isRecord(post.meta.author) ? post.meta.author : null;
	const authorName = stringFromRecord(authorMeta, 'name') ?? 'DaVinciBot';
	const authorRole = stringFromRecord(authorMeta, 'role');
	const excerpt = stringFromMeta('excerpt');
	const keywords =
		stringFromMeta('keywords') ?? 'DaVinciBot, association, robot, robotique, étudiant, esilv';
	const heroAlt = stringFromMeta('heroAlt') ?? post.title;
	const heroImage = stringFromMeta('heroImage') ?? '/assets/article/precoupe.jpg';
	const heroImageSocial = stringFromMeta('heroImageSocial') ?? heroImage;

	function formatDate(v: string | null): string | null {
		if (!v) {
			return null;
		}
		const d = new Date(v);
		if (Number.isNaN(d.getTime())) {
			return null;
		}
		return new Intl.DateTimeFormat('fr-FR', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		}).format(d);
	}

	const publishedLabel = formatDate(post.publishedAt);
	const updatedLabel = formatDate(post.updatedAt);
	const isoPublished = post.publishedAt ? new Date(post.publishedAt).toISOString() : null;
	const isoUpdated = post.updatedAt ? new Date(post.updatedAt).toISOString() : null;

	const canonical = `https://davincibot.fr/blog/${post.slug}/`;
	const heroSocialAbs = absoluteUrl(heroImageSocial);
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: excerpt,
		image: heroSocialAbs,
		datePublished: isoPublished ?? undefined,
		dateModified: isoUpdated ?? undefined,
		mainEntityOfPage: canonical,
		author:
			authorMeta && authorName
				? { '@type': 'Person', name: authorName }
				: { '@type': 'Organization', name: 'DaVinciBot' },
		publisher: {
			'@type': 'Organization',
			name: 'DaVinciBot',
			logo: {
				'@type': 'ImageObject',
				url: 'https://davincibot.fr/white_logo_notext.webp'
			}
		}
	};
	const jsonLdString = JSON.stringify(jsonLd).replace(/</g, '\\u003c');
</script>

<svelte:head>
	<link rel="canonical" href={canonical} />
	<title>{post.title}</title>
	<meta name="keywords" content={keywords} />
	<meta name="author" content={authorName} />
	<meta name="robots" content="index, follow" />
	{#if excerpt}
		<meta name="description" content={excerpt} />
	{/if}

	<meta property="og:url" content={`https://davincibot.fr/blog/${post.slug}`} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={post.title} />
	{#if excerpt}
		<meta property="og:description" content={excerpt} />
	{/if}
	<meta property="og:image" content={heroSocialAbs} />
	{#if isoPublished}
		<meta property="article:published_time" content={isoPublished} />
	{/if}
	{#if isoUpdated}
		<meta property="article:modified_time" content={isoUpdated} />
	{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="davincibot.fr" />
	<meta property="twitter:url" content={`https://davincibot.fr/blog/${post.slug}`} />
	<meta name="twitter:title" content={post.title} />
	<meta name="twitter:image" content={heroSocialAbs} />
	{#if excerpt}
		<meta name="twitter:description" content={excerpt} />
	{/if}
	<svelte:element this={'script'} type="application/ld+json">{jsonLdString}</svelte:element>
</svelte:head>

<Topbar />

<div class="4xl:-mt-80 -mt-5 md:-mt-8 lg:-mt-32 2xl:-mt-64">
	<img class="w-full bg-gray-500 opacity-50" alt={heroAlt} src={heroImage} />
</div>
<div
	class="via-dark-blue/70 to-dark-blue absolute -mt-28 w-full bg-linear-to-b from-white/0 from-0% via-1% to-5% pt-12 md:-mt-72 md:pt-0"
>
	<div class="flex h-full flex-col items-center gap-8 pt-5 md:mx-32 md:pt-28">
		<div class="mx-3 flex max-w-180 flex-col text-left">
			<div class="flex w-full flex-col gap-5">
				<h1 class="text-3xl font-extrabold tracking-[4.10px] md:pr-5 lg:text-4xl">
					{post.title}
				</h1>
				{#if excerpt}
					<p class="text-dark-blue-gray self-stretch tracking-wider md:pr-24 md:text-xl">
						{excerpt}
					</p>
				{/if}
				{#if authorMeta}
					<div class="flex items-center gap-2 text-sm text-gray-300 md:text-base">
						<span>Par {authorName}</span>
						{#if authorRole}
							<span class="opacity-80">— {authorRole}</span>
						{/if}
					</div>
				{/if}
				{#if publishedLabel ?? updatedLabel}
					<div class="mt-1 text-sm text-gray-400">
						{#if publishedLabel}
							<time datetime={isoPublished}>Publié le {publishedLabel}</time>
						{/if}
						{#if updatedLabel && updatedLabel !== publishedLabel}
							<span> • </span>
							<time datetime={isoUpdated}>Mis à jour le {updatedLabel}</time>
						{/if}
					</div>
				{/if}
			</div>

			<div class="my-6 flex justify-center gap-8">
				<article class="prose prose-invert md-article max-w-170">
					{#if post.ast}
						<Renderer tree={post.ast} />
					{:else}
						<div class="text-left whitespace-pre-wrap">
							{post.body}
						</div>
					{/if}
				</article>
			</div>
		</div>
	</div>
	<div class="my-12"></div>
	<Footer />
</div>
