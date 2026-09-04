<script lang="ts">
	import { SITE, canonicalFor } from '@davincibot/lib';

	interface Props {
		/** Titre court : le suffixe « — DaVinciBot » est ajouté ici. */
		title: string;
		description: string;
		/** Chemin de la page, sans domaine (`/project/cohoma`). */
		path: string;
		/** Visuel de partage, chemin absolu depuis la racine du site. */
		image: string;
		keywords: string;
		/** Résumé plus court pour Twitter ; retombe sur `description`. */
		socialDescription?: string;
		/** Visuel du héros, préchargé pour tenir le LCP. */
		preload?: string;
	}

	let {
		title,
		description,
		path,
		image,
		keywords,
		socialDescription = '',
		preload = ''
	}: Props = $props();

	const fullTitle = $derived(`${title} — ${SITE.name}`);
	const url = $derived(canonicalFor(path));
	const imageUrl = $derived(image.startsWith('http') ? image : `${SITE.origin}${image}`);
	const social = $derived(socialDescription === '' ? description : socialDescription);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<meta name="author" content={SITE.name} />
	<meta name="robots" content="index, follow" />
	<link href={url} rel="canonical" />

	<meta content={fullTitle} property="og:title" />
	<meta content={social} property="og:description" />
	<meta content={imageUrl} property="og:image" />
	<meta content={url} property="og:url" />
	<meta content="website" property="og:type" />
	<meta content={SITE.name} property="og:site_name" />
	<meta content={SITE.locale} property="og:locale" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={social} />
	<meta name="twitter:image" content={imageUrl} />

	{#if preload}
		<link as="image" fetchpriority="high" href={preload} rel="preload" />
	{/if}
</svelte:head>
