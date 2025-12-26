<script>
	import Carousel from '$lib/components/others/Carousel.svelte';
	import Card from '$lib/components/share/Card.svelte';
	import Topbar from '$lib/components/share/Topbar.svelte';
	import CtaButton from '$lib/components/utils/CTAButton.svelte';
	import Footer from '$lib/components/share/Footer.svelte';
	import Renderer from '$lib/components/markdown/Renderer.svelte';

	export let data;
	const { post } = data;
	const heroImage = post?.meta?.heroImage;

	function formatDate(v) {
		if (!v) return null;
		const d = new Date(v);
		if (Number.isNaN(d.getTime())) return null;
		return new Intl.DateTimeFormat('fr-FR', {
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		}).format(d);
	}

	const publishedLabel = formatDate(post?.publishedAt);
	const updatedLabel = formatDate(post?.updatedAt);
	const isoPublished = post?.publishedAt ? new Date(post.publishedAt).toISOString() : null;
	const isoUpdated = post?.updatedAt ? new Date(post.updatedAt).toISOString() : null;

	const canonical = `https://davincibot.fr/blog/${post.slug}/`;
	const heroAbs =
		heroImage && (heroImage.startsWith('http') ? heroImage : `https://davincibot.fr${heroImage}`);
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: post?.meta?.excerpt || undefined,
		image: heroAbs || undefined,
		datePublished: isoPublished || undefined,
		dateModified: isoUpdated || undefined,
		mainEntityOfPage: canonical,
		author: post?.meta?.author?.name
			? { '@type': 'Person', name: post.meta.author.name }
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
</script>

<svelte:head>
	<link rel="canonical" href={canonical} />
	<title>{post.title}</title>
	<meta
		name="keywords"
		content={post?.meta?.keywords || 'DaVinciBot, association, robot, robotique, étudiant, esilv'}
	/>
	<meta name="author" content={post?.meta?.author?.name || 'DaVinciBot'} />
	<meta name="robots" content="index, follow" />
	{#if post?.meta?.excerpt}
		<meta name="description" content={post.meta.excerpt} />
	{/if}

	<meta property="og:url" content={`https://davincibot.fr/blog/${post.slug}`} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={post.title} />
	{#if post?.meta?.excerpt}
		<meta property="og:description" content={post.meta.excerpt} />
	{/if}
	{#if heroImage}
		<meta
			property="og:image"
			content={heroImage.startsWith('http') ? heroImage : `https://davincibot.fr${heroImage}`}
		/>
	{/if}
	{#if isoPublished}
		<meta property="article:published_time" content={isoPublished} />
	{/if}
	{#if isoUpdated}
		<meta property="article:modified_time" content={isoUpdated} />
	{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="davincibot.fr" />
	<meta property="twitter:url" content="https://davincibot.fr/blog/{post.slug}" />
	<meta name="twitter:title" content={post.title} />
	{#if post?.meta?.excerpt}
		<meta name="twitter:description" content={post.meta.excerpt} />
	{/if}
	{#if heroImage}
		<meta name="twitter:image" content={heroAbs} />
	{/if}

	<!-- JSON-LD Article -->
	<script type="application/ld+json">
{JSON.stringify(jsonLd)}
	</script>
</svelte:head>

<Topbar />

<div class="-mt-5 md:-mt-8 lg:-mt-32 2xl:-mt-64 4xl:-mt-80">
	<img
		class="w-full bg-gray-500 opacity-50"
		alt={post?.meta?.heroAlt || post?.title || 'Article'}
		src={heroImage}
	/>
</div>
<div
	class="-mt-28 md:-mt-72 pt-12 md:pt-0 absolute w-full bg-gradient-to-b from-white/0 from-0% via-1% via-dark-blue/70 via-2% via-3% via-4% to-5% via-1% via-4% to-dark-blue"
>
	<div class="flex flex-col items-center h-full gap-8 pt-5 md:pt-28 md:mx-32">
		<div class="flex flex-col text-left max-w-[720px] mx-3">
			<div class="flex flex-col w-full gap-5">
				<h1 class="text-3xl lg:text-4xl font-extrabold tracking-[4.10px] md:pr-5">
					{post.title}
				</h1>
				{#if post?.meta?.excerpt}
					<p class="self-stretch tracking-wider md:text-xl text-dark-blue-gray md:pr-24">
						{post.meta.excerpt}
					</p>
				{/if}
				{#if post?.meta?.author}
					<div class="flex items-center gap-2 text-sm text-gray-300 md:text-base">
						<span>Par {post.meta.author.name}</span>
						{#if post.meta.author.role}
							<span class="opacity-80">— {post.meta.author.role}</span>
						{/if}
					</div>
				{/if}
				{#if publishedLabel || updatedLabel}
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

			<div class="flex justify-center gap-8 my-6">
				<article class="prose prose-invert max-w-[680px] md-article">
					{#if post?.ast}
						<Renderer tree={post.ast} />
					{:else}
						<div class="text-left" class:sr-only={!post?.html}>
							{@html post.html}
						</div>
					{/if}
				</article>
			</div>
		</div>
	</div>
	<div class="my-12"></div>
	<Footer />
</div>
