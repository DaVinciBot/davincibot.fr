<script lang="ts">
	import { resolve } from '$app/paths';
	import { Footer } from '@davincibot/components';
	import { Topbar } from '@davincibot/components';

	const brochureUrl = '/Dossier_Partenariat_DaVinciBot_2025.pdf'; // servi depuis static/

	const sponsors = [
		{
			name: 'Alstom',
			logo: '/assets/parte/Alstom_logo.svg',
			link: 'https://www.alstom.com/',
			blurb:
				"Leader mondial des solutions de mobilité intelligentes et durables. Notre collaboration est centrée sur l'innovation et l'excellence en ingénierie."
		},
		{
			name: 'Aisler',
			logo: '/assets/parte/Aisler.svg',
			link: 'https://aisler.net/',
			blurb:
				'Fabrication et assemblage de PCB de haute qualité en Europe, qui accélèrent nos cycles de développement matériel.'
		},
		{
			name: 'Mouser Electronics',
			logo: '/assets/parte/Mouser.svg',
			link: 'https://eu.mouser.com/educationalsales-emea/',
			blurb:
				"Fournisseur de semiconducteur et de composants électronique en tout genre, Mouser est un des plus grand distributeur mondiaux, avec près de 7 millions de références. Pour plus d'informations sur le programme de parrainage universitaire de Mouser Electronics, veuillez visiter le site ci-dessous !"
		},
		// {
		// 	name: 'Kurokesu',
		// 	logo: '/assets/parte/Kurokesu.svg',
		// 	link: 'https://www.kurokesu.com/home/',
		// 	blurb:
		// 		"Fabricant Lithuanien d'optiques, de capteurs et de caméras de haute performance, qui nous accompagne dans nos projets d'exploration visuelle et de vision par ordinateur."
		// },
		{
			name: 'Faulhaber',
			logo: '/assets/parte/faulhaber.svg',
			link: 'https://www.faulhaber.com/',
			blurb:
				"Systèmes d'entraînement de précision permettant un mouvement compact et efficace dans nos travaux de robotique et de mécatronique."
		},
		{
			name: 'RS',
			logo: '/assets/parte/RS.svg',
			link: 'https://www.rs-online.com/',
			blurb:
				'RS accompagne nos besoins de prototypage et de production avec des composants fiables et une livraison rapide pour nos projets.'
		},
		{
			name: 'Gotronic',
			logo: '/assets/parte/Gotronic.svg',
			link: 'https://www.gotronic.fr/',
			blurb:
				"Distributeur de confiance pour l'électronique et l'embarqué, au service de nos expérimentations et prototypes."
		},
		{
			name: 'Hauts de Seine',
			logo: '/assets/parte/HDS.svg',
			link: 'https://www.hauts-de-seine.fr/',
			blurb:
				"Partenaire engagé dans l'innovation étudiante et l'accompagnement des jeunes souhaitant s'investir dans des projets concrets."
		},
		{
			name: 'IFT',
			logo: '/assets/parte/IFT.svg',
			link: 'https://ift.devinci.fr/',
			blurb:
				"Partenaire sur des initiatives de recherche, d'enseignement et de transfert de technologie. Ils sont notre service parrain au sein de l'ESILV."
		},
		{
			name: 'Igus',
			logo: '/assets/parte/Igus.svg',
			link: 'https://www.igus.fr/',
			blurb:
				'Fournisseur de matériaux polymères innovants qui améliorent la durabilité et la performance de nos systèmes mécaniques.'
		},
		{
			name: 'Ker Juliette',
			logo: '/assets/parte/Ker_Juliette.svg',
			link: 'https://kerjuliette.fr/',
			blurb:
				"Partenaire local engagé dans la promotion de l'artisanat et de la culture bretonne, soutenant nos initiatives à Nantes."
		}
	];

	// Configuration de la grille d'arrière-plan (héros)
	const BG_COLS = 8;
	const BG_ROWS = 8;
	const bgTiles = Array.from({ length: BG_COLS * BG_ROWS }, (_, i) => {
		const sponsor = sponsors[i % sponsors.length];
		return {
			id: `${sponsor?.name ?? 'sponsor'}-${String(i)}`,
			logo: sponsor?.logo ?? '',
			name: sponsor?.name ?? ''
		};
	});
</script>

<svelte:head>
	<title>Partenaires — DaVinciBot</title>
	<meta
		name="description"
		content="Découvrez nos partenaires et sponsors, et téléchargez notre brochure de partenariat."
	/>
	<link rel="canonical" href="https://davincibot.fr/sponsors" />
	<meta
		name="keywords"
		content="partenaires, sponsors, collaboration, robotique, innovation, DaVinciBot, DVB"
	/>
	<meta name="robots" content="index, follow" />

	<meta property="og:title" content="Partenaires — DaVinciBot" />
	<meta
		property="og:description"
		content="Découvrez nos partenaires et sponsors, et téléchargez notre brochure de partenariat."
	/>
	<meta property="og:image" content="https://davincibot.fr/dvb_og_img.png" />
	<meta property="og:url" content="https://davincibot.fr/sponsors" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="DaVinciBot" />
	<meta property="og:locale" content="fr_FR" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="https://instagram.com/davincibot_pulv" />
	<meta name="twitter:creator" content="https://instagram.com/davincibot_pulv" />
</svelte:head>

<Topbar />

<!-- Hero -->
<section
	class="relative flex justify-center overflow-hidden px-4 pt-24 pb-12 sm:px-8 md:h-150 md:px-16 md:pt-32 lg:px-32 lg:pt-40"
>
	<!-- Grille d'arrière-plan en tuiles -->
	<div class="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
		<div
			class="bg-drift absolute -inset-16 mask-[radial-gradient(closest-side,rgba(0,0,0,.9),transparent_95%)] opacity-15"
		>
			<div
				class="grid place-items-center gap-10"
				style={`grid-template-columns: repeat(${String(BG_COLS)}, minmax(120px, 1fr));`}
			>
				{#each bgTiles as t (t.id)}
					<img
						src={t.logo}
						alt=""
						class="h-10 w-auto object-contain brightness-110 contrast-90 saturate-50 md:h-12 lg:h-14"
						loading="lazy"
					/>
				{/each}
			</div>
		</div>
	</div>

	<div class="relative m-auto max-w-5xl text-center">
		<h1 class="text-4xl font-extrabold tracking-wide sm:text-5xl md:text-6xl">Nos partenaires</h1>
		<p class="mt-5 text-base text-white/80 sm:text-lg">
			Nous menons des projets ambitieux grâce au soutien de partenaires engagés. Découvrez qui nous
			accompagne et comment nous collaborons.
		</p>
		<div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
			<a
				href={resolve(brochureUrl as '/')}
				download
				class="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
				aria-label="Télécharger notre brochure de partenariat"
			>
				Télécharger la brochure de partenariat
			</a>
			<a
				href="mailto:davincibot@devinci.fr"
				class="inline-flex items-center justify-center rounded-md border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
			>
				Contactez-nous
			</a>
		</div>
	</div>
</section>

<!-- Sponsors list -->
<section class="px-4 pb-20 sm:px-8 md:px-16 lg:px-32">
	<div class="mx-auto max-w-6xl">
		{#each sponsors as s, i (i)}
			<article
				class="grid items-center gap-8 border-t border-white/10 py-10 md:grid-cols-2 md:gap-12 md:py-14"
			>
				<!-- Logo -->
				<div class={`order-1 ${i % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
					<div
						class="mx-auto flex aspect-3/1 w-full max-w-md items-center justify-center rounded-lg border border-white/10 bg-white/5 p-6 md:aspect-4/1 md:max-w-none"
					>
						<img
							src={s.logo}
							alt={`${s.name} logo`}
							class="max-h-16 w-auto object-contain md:max-h-20"
							loading="lazy"
						/>
					</div>
				</div>

				<!-- Copy -->
				<div class={`order-2 ${i % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
					<h3 class="text-2xl font-bold md:text-3xl">{s.name}</h3>
					<p class="mt-3 leading-relaxed text-white/80">{s.blurb}</p>
					{#if s.link}
						<a
							href={s.link}
							target="_blank"
							rel="external noopener noreferrer"
							class="mt-4 inline-flex text-sm font-semibold text-white underline underline-offset-4 hover:text-white/80"
							aria-label={`Visiter le site de ${s.name}`}
						>
							Visiter le site
						</a>
					{/if}
				</div>
			</article>
		{/each}

		<!-- bottom divider -->
		<div class="border-t border-white/10"></div>
	</div>
</section>

<!-- CTA -->
<section class="px-4 pb-24 sm:px-8 md:px-16 lg:px-32">
	<div class="mx-auto max-w-4xl text-center">
		<h2 class="text-3xl font-extrabold md:text-4xl">Devenir partenaire</h2>
		<p class="mt-4 text-white/80">
			Envie de collaborer ? Téléchargez notre brochure pour découvrir les options de partenariat et
			les offres de visibilité.
		</p>
		<div class="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
			<a
				href={resolve(brochureUrl as '/')}
				download
				class="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
				aria-label="Télécharger notre brochure de partenariat"
			>
				Télécharger la brochure de partenariat
			</a>
			<a
				href="mailto:davincibot@devinci.fr"
				class="inline-flex items-center justify-center rounded-md border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
			>
				Nous écrire
			</a>
		</div>
	</div>
</section>

<Footer />

<style>
	@keyframes sponsors-drift {
		0% {
			transform: translate3d(0, 0, 0);
		}
		100% {
			transform: translate3d(-6%, -6%, 0);
		}
	}
	.bg-drift {
		animation: sponsors-drift 60s linear infinite;
	}
</style>
