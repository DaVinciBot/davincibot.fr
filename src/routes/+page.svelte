<script lang="ts">
	import Carousel from '$lib/components/others/Carousel.svelte';
	import Card from '$lib/components/share/Card.svelte';
	import Footer from '$lib/components/share/Footer.svelte';
	import { CTAButton as CtaButton, Topbar } from '@davincibot/components';
	import AnimatedNumber from '$lib/components/utils/AnimatedNumber.svelte';

	import SponsorsCarousel from '$lib/components/others/SponsorsCarousel.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function getInitialPosts() {
		return data.posts;
	}

	const posts = getInitialPosts();
</script>

<svelte:head>
	<title>DaVinciBot</title>
	<meta name="description" content="DaVinciBot. L'association de robotique étudiante." />
	<meta name="keywords" content="DaVinciBot, association, robot, robotique, étudiant, esilv" />
	<meta name="author" content="DaVinciBot" />
	<meta name="robots" content="index, follow" />

	<!-- meta og -->
	<meta content="DaVinciBot" property="og:title" />
	<meta content="DaVinciBot. L'association de robotique étudiante." property="og:description" />
	<meta content="/dvb_og_img.png" property="og:image" />
	<meta content="https://davincibot.fr" property="og:url" />
	<meta content="website" property="og:type" />
	<meta content="DaVinciBot" property="og:site_name" />
	<meta content="fr_FR" property="og:locale" />

	<!-- meta twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@DaVinciBot" />
	<meta name="twitter:creator" content="@DaVinciBot" />
	<meta name="twitter:title" content="DaVinciBot" />
	<meta name="twitter:description" content="DaVinciBot. L'association de robotique étudiante." />
	<meta name="twitter:image" content="/dvb_og_img.png" />
	<meta name="twitter:image:alt" content="DaVinciBot" />
	<meta name="twitter:url" content="https://davincibot.fr" />
	<meta name="twitter:domain" content="davincibot.fr" />
	<meta name="twitter:card" content="summary_large_image" />

	<link
		as="image"
		fetchpriority="high"
		href="/assets/project/cdr/boombot_small.webp"
		rel="preload"
	/>
</svelte:head>

<Topbar />

<div class="flex h-full flex-col gap-8 px-4 pt-16 sm:px-8 md:px-16 md:pt-32 lg:px-32 lg:pt-48">
	<section class="justify-start">
		<div class="grid grid-cols-1 items-center gap-8 md:grid-cols-[2fr_1.5fr]">
			<div class="order-2 flex flex-col justify-start gap-4 overflow-hidden text-start md:order-1">
				<div class="flex flex-col gap-5">
					<h1 class="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
						Ingénieur par vocation <wbr /> Robotique par passion
					</h1>
					<p
						class="text-dark-blue-gray self-stretch text-justify text-lg tracking-wider sm:text-xl"
					>
						DaVinciBot rassemble des étudiants de l'ESILV, de l'EMLV et de l'IIM du Pôle
						Universitaire Léonard de Vinci autour d'activités, de projets innovants et de nombreuses
						formations, dans le but de faire exceller ses membres dans leurs études et leur vie
						professionnelle.
					</p>
				</div>
				<div class="flex w-full flex-col gap-4 sm:w-102 sm:flex-row sm:gap-6">
					<CtaButton href="#projets">Nos Projets</CtaButton>
					<CtaButton href="/soutenez-nous" variant="secondary">Soutenez nous</CtaButton>
				</div>
			</div>
			<img
				class="order-1 mx-auto mb-6 w-full scale-130 md:order-2 md:mb-0"
				alt="Robot de DaVinciBot pour la Coupe de France de Robotique"
				fetchpriority="high"
				height="720"
				loading="eager"
				src="/assets/project/cdr/boombot_small.webp"
				width="1280"
			/>
		</div>

		<div class="mt-8 flex w-full flex-col justify-center sm:w-10/12 md:w-9/12 lg:w-7/12 2xl:mt-0">
			<h2 class="text-base font-bold">Nos soutiens</h2>

			<SponsorsCarousel />
		</div>
	</section>

	<section class="mt-12 flex flex-col items-center justify-center">
		<div class="flex flex-col gap-12 text-left md:w-6/12 md:text-center">
			<h1 class="pr-5 text-6xl font-extrabold tracking-[4.10px]">Nos actualités</h1>
			<p class="text-dark-blue-gray self-stretch text-xl tracking-wider">
				DaVinciBot organise et participe à des événements de robotique, offrant à ses membres des
				occasions de se perfectionner et de relever des défis concrets. <br /><br />
				L'association propose des compétitions internes et externes, ainsi que des ateliers, permettant
				aux étudiants d'appliquer leurs connaissances et d'innover en robotique.
			</p>
		</div>
		<div class="my-10 max-w-full">
			{#if posts.length}
				<Carousel time={90}>
					{#each posts as p (p.slug)}
						<Card
							description={p.description}
							image={p.coverSmall}
							link={`/blog/${p.slug}`}
							title={p.title}
						/>
					{/each}
				</Carousel>
			{:else}
				<Carousel time={90}>
					<Card
						description="Nos dernières actus s'afficheront ici."
						image="/assets/article/precoupe.jpg"
						link="/blog/"
						title="Bientôt sur le blog"
					/>
				</Carousel>
			{/if}
		</div>
	</section>
	<section class="w-full">
		<div class="max-w-full px-4 py-12">
			<div class="flex w-full flex-col items-center justify-between gap-8 text-center md:flex-row">
				<div class="flex-1">
					<div class="text-4xl leading-none md:text-5xl lg:text-6xl">
						<AnimatedNumber duration={1500} target={4} />
					</div>
					<div class="text-dark-blue-gray mt-4 text-sm font-semibold tracking-wider uppercase">
						Écoles
					</div>
				</div>

				<div class="flex-1">
					<div class="text-4xl leading-none md:text-5xl lg:text-6xl">
						<AnimatedNumber duration={2000} prefix="+" target={10500} />
					</div>
					<div class="text-dark-blue-gray mt-4 text-sm font-semibold tracking-wider uppercase">
						Étudiants
					</div>
				</div>

				<div class="flex-1">
					<div class="text-4xl leading-none md:text-5xl lg:text-6xl">
						<AnimatedNumber duration={1500} target={7} />
					</div>
					<div class="text-dark-blue-gray mt-4 text-sm font-semibold tracking-wider uppercase">
						Campus
					</div>
				</div>
			</div>
		</div>
	</section>

	<section id="projets" class="mb-12 flex flex-col gap-4 pt-4 md:gap-0 md:pt-0">
		<div class="mb-12 w-full text-center">
			<h1 class="pr-5 text-6xl font-extrabold tracking-[4.10px]">Nos projets</h1>
		</div>

		<div class="max-w-full">
			<!-- Project 1: Coupe de France de Robotique -->
			<div class="grid grid-cols-1 items-center gap-6 py-6 md:grid-cols-[1fr_2fr]">
				<div class="w-full">
					<img
						class="mx-auto h-48 rounded-2xl object-cover md:h-56 md:w-full"
						alt="Notre robot lors de la Coupe de France de Robotique 2024"
						src="/assets/project/cdr/CDR_small.webp"
					/>
				</div>
				<div class="flex h-full flex-col justify-center text-center md:text-left">
					<h1 class="text-2xl font-extrabold md:text-3xl">Coupe de France de Robotique</h1>
					<p
						class="text-blue-gray dark:text-dark-blue-gray py-2 text-justify sm:text-left md:text-xl"
					>
						La Coupe de France de Robotique est une compétition annuelle où des équipes d'étudiants
						conçoivent, construisent et programment des robots pour accomplir des tâches
						spécifiques. DaVinciBot participe chaque année à cet événement prestigieux, mettant en
						avant les compétences et l'innovation de ses membres.
					</p>
					<div class="mt-4 sm:w-44">
						<CtaButton href="/project/coupe-de-robotique">Découvrir</CtaButton>
					</div>
				</div>
			</div>

			<!-- Project 2: TRAVELERS (image on right for md+ screens) -->
			<div class="grid grid-cols-1 items-center gap-6 py-6 md:grid-cols-[2fr_1fr]">
				<div class="w-full md:order-last">
					<img
						class="mx-auto h-48 rounded-2xl object-cover md:h-56 md:w-full"
						alt="Travelers"
						src="/assets/project/cohoma/cohoma_small.webp"
					/>
				</div>
				<div
					class="mt-6 flex h-full flex-col justify-center text-center md:order-first md:mt-0 md:text-left"
				>
					<h1 class="text-2xl font-extrabold md:text-3xl">CoHoMa</h1>
					<p
						class="text-blue-gray dark:text-dark-blue-gray py-2 text-justify sm:text-left md:text-xl"
					>
						En collaboration avec l'Armée de Terre Française, nous participons au challenge CoHoMa
						(Cohabitation Homme-Machine). Ce projet vise à développer un système robotique capable
						d'interagir de manière semi-autonome avec son environnement, et ainsi de réduire la
						charge de l'opérateur.
					</p>
					<div class="mt-4 sm:w-44">
						<CtaButton href="/project/cohoma">Découvrir</CtaButton>
					</div>
				</div>
			</div>

			<!-- Project 3: Exodus -->
			<div class="grid grid-cols-1 items-center gap-6 py-6 md:grid-cols-[1fr_2fr]">
				<div class="w-full">
					<img
						class="mx-auto h-48 rounded-2xl object-cover md:h-56 md:w-full"
						alt="Exodus"
						src="/assets/project/exodus/exodus_small.webp"
					/>
				</div>
				<div class="flex h-full flex-col justify-center text-center md:text-left">
					<h1 class="text-2xl font-extrabold md:text-3xl">Exodus</h1>
					<p
						class="text-blue-gray dark:text-dark-blue-gray py-2 text-justify sm:text-left md:text-xl"
					>
						Nous entrons dans la deuxième année de développement d'Exodus, notre exosquelette de
						soutien. Ce projet vise à assister les utilisateurs dans leurs tâches physiques, en
						améliorant leur endurance et en diminuant la fatigue.
					</p>
					<div class="mt-4 sm:w-44">
						<CtaButton href="/project/exodus">Découvrir</CtaButton>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

<Footer />

<style>
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
</style>
