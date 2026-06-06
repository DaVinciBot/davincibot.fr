<script>
	import Carousel from '$lib/components/others/Carousel.svelte';
	import Card from '$lib/components/share/Card.svelte';
	import Footer from '$lib/components/share/Footer.svelte';
	import Topbar from '$lib/components/share/Topbar.svelte';
	import AnimatedNumber from '$lib/components/utils/AnimatedNumber.svelte';
	import CtaButton from '$lib/components/utils/CTAButton.svelte';

	import SponsorsCarousel from '$lib/components/others/SponsorsCarousel.svelte';

	// SSR data from +page.server.js
	/** @type {{data: any}} */
	const { data } = $props();

	function getInitialPosts() {
		return data?.posts ?? [];
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
	<meta property="og:title" content="DaVinciBot" />
	<meta property="og:description" content="DaVinciBot. L'association de robotique étudiante." />
	<meta property="og:image" content="/dvb_og_img.png" />
	<meta property="og:url" content="https://davincibot.fr" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="DaVinciBot" />
	<meta property="og:locale" content="fr_FR" />

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
		rel="preload"
		as="image"
		href="/assets/project/cdr/boombot_small.webp"
		fetchpriority="high"
	/>
</svelte:head>

<Topbar />

<div class="flex flex-col h-full gap-8 px-4 pt-16 sm:px-8 md:px-16 lg:px-32 md:pt-32 lg:pt-48">
	<section class="justify-start">
		<div class="grid grid-cols-1 md:grid-cols-[2fr_1.5fr] items-center gap-8">
			<div class="flex flex-col justify-start order-2 gap-4 overflow-hidden text-start md:order-1">
				<div class="flex flex-col gap-5">
					<h1 class="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
						Ingénieur par vocation <wbr /> Robotique par passion
					</h1>
					<p
						class="self-stretch text-lg tracking-wider sm:text-xl text-dark-blue-gray text-justify"
					>
						DaVinciBot rassemble des étudiants de l'ESILV, de l'EMLV et de l'IIM du Pôle
						Universitaire Léonard de Vinci autour d'activités, de projets innovants et de nombreuses
						formations, dans le but de faire exceller ses membres dans leurs études et leur vie
						professionnelle.
					</p>
				</div>
				<div class="flex flex-col w-full gap-4 sm:flex-row sm:gap-6 sm:w-102">
					<CtaButton href="#projets">Nos Projets</CtaButton>
					<CtaButton variant="secondary" href="/soutenez-nous">Soutenez nous</CtaButton>
				</div>
			</div>
			<img
				src="/assets/project/cdr/boombot_small.webp"
				alt="Robot de DaVinciBot pour la Coupe de France de Robotique"
				width="1280"
				height="720"
				loading="eager"
				fetchpriority="high"
				class="order-1 w-full mx-auto mb-6 md:mb-0 md:order-2 scale-130"
			/>
		</div>

		<div class="flex flex-col justify-center w-full mt-8 2xl:mt-0 sm:w-10/12 md:w-9/12 lg:w-7/12">
			<h2 class="text-base font-bold">Nos soutiens</h2>

			<SponsorsCarousel />
		</div>
	</section>

	<section class="flex flex-col items-center justify-center mt-12">
		<div class="flex flex-col gap-12 text-left md:text-center md:w-6/12">
			<h1 class="text-6xl font-extrabold tracking-[4.10px] pr-5">Nos actualités</h1>
			<p class="self-stretch text-xl tracking-wider text-dark-blue-gray">
				DaVinciBot organise et participe à des événements de robotique, offrant à ses membres des
				occasions de se perfectionner et de relever des défis concrets. <br /><br />
				L'association propose des compétitions internes et externes, ainsi que des ateliers, permettant
				aux étudiants d'appliquer leurs connaissances et d'innover en robotique.
			</p>
		</div>
		<div class="max-w-full my-10">
			{#if posts.length}
				<Carousel time={90}>
					{#each posts as p (p.slug)}
						<Card
							title={p.title}
							description={p.description}
							image={p.coverSmall}
							link={`/blog/${p.slug}`}
						/>
					{/each}
				</Carousel>
			{:else}
				<Carousel time={90}>
					<Card
						title="Bientôt sur le blog"
						description="Nos dernières actus s'afficheront ici."
						image="/assets/article/precoupe.jpg"
						link="/blog/"
					/>
				</Carousel>
			{/if}
		</div>
	</section>
	<section class="w-full">
		<div class="max-w-full px-4 py-12">
			<div class="flex flex-col items-center justify-between w-full gap-8 text-center md:flex-row">
				<div class="flex-1">
					<div class="text-4xl leading-none md:text-5xl lg:text-6xl">
						<AnimatedNumber target={4} duration={1500} />
					</div>
					<div class="mt-4 text-sm font-semibold tracking-wider uppercase text-dark-blue-gray">
						Écoles
					</div>
				</div>

				<div class="flex-1">
					<div class="text-4xl leading-none md:text-5xl lg:text-6xl">
						<AnimatedNumber prefix="+" target={10500} duration={2000} />
					</div>
					<div class="mt-4 text-sm font-semibold tracking-wider uppercase text-dark-blue-gray">
						Étudiants
					</div>
				</div>

				<div class="flex-1">
					<div class="text-4xl leading-none md:text-5xl lg:text-6xl">
						<AnimatedNumber target={7} duration={1500} />
					</div>
					<div class="mt-4 text-sm font-semibold tracking-wider uppercase text-dark-blue-gray">
						Campus
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="flex flex-col gap-4 pt-4 mb-12 md:pt-0 md:gap-0" id="projets">
		<div class="w-full mb-12 text-center">
			<h1 class="text-6xl font-extrabold tracking-[4.10px] pr-5">Nos projets</h1>
		</div>

		<div class="max-w-full">
			<!-- Project 1: Coupe de France de Robotique -->
			<div class="grid grid-cols-1 md:grid-cols-[1fr_2fr] items-center gap-6 py-6">
				<div class="w-full">
					<img
						class="object-cover h-48 mx-auto md:w-full md:h-56 rounded-2xl"
						alt="Notre robot lors de la Coupe de France de Robotique 2024"
						src="/assets/project/cdr/CDR_small.webp"
					/>
				</div>
				<div class="flex flex-col justify-center h-full text-center md:text-left">
					<h1 class="text-2xl font-extrabold md:text-3xl">Coupe de France de Robotique</h1>
					<p
						class="py-2 text-justify md:text-xl text-blue-gray dark:text-dark-blue-gray sm:text-left"
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
			<div class="grid grid-cols-1 md:grid-cols-[2fr_1fr] items-center gap-6 py-6">
				<div class="w-full md:order-last">
					<img
						class="object-cover h-48 mx-auto md:w-full md:h-56 rounded-2xl"
						alt="Travelers"
						src="/assets/project/cohoma/cohoma_small.webp"
					/>
				</div>
				<div
					class="flex flex-col justify-center h-full mt-6 text-center md:text-left md:mt-0 md:order-first"
				>
					<h1 class="text-2xl font-extrabold md:text-3xl">CoHoMa</h1>
					<p
						class="py-2 text-justify md:text-xl text-blue-gray dark:text-dark-blue-gray sm:text-left"
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
			<div class="grid grid-cols-1 md:grid-cols-[1fr_2fr] items-center gap-6 py-6">
				<div class="w-full">
					<img
						class="object-cover h-48 mx-auto md:w-full md:h-56 rounded-2xl"
						alt="Exodus"
						src="/assets/project/exodus/exodus_small.webp"
					/>
				</div>
				<div class="flex flex-col justify-center h-full text-center md:text-left">
					<h1 class="text-2xl font-extrabold md:text-3xl">Exodus</h1>
					<p
						class="py-2 text-justify md:text-xl text-blue-gray dark:text-dark-blue-gray sm:text-left"
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
