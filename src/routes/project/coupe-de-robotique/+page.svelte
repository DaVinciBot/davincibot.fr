<script lang="ts">
	import Carousel from '$lib/components/others/Carousel.svelte';
	import Footer from '$lib/components/share/Footer.svelte';
	import ResultCard from '$lib/components/share/ResultCard.svelte';
	import Topbar from '$lib/components/share/Topbar.svelte';
	import CtaButton from '$lib/components/utils/CTAButton.svelte';

	import FarmingMars from '$lib/components/share/Logo/FarmingMars.svelte';
	import TheCherryOnTheCake from '$lib/components/share/Logo/TheCherryOnTheCake.svelte';
	import TheShowMustGoOnLogo from '$lib/components/share/Logo/TheShowMustGoOnLogo.svelte';

	import SponsorsCarousel from '$lib/components/others/SponsorsCarousel.svelte';
	import Activity from '$lib/components/share/icon/Activity.svelte';
	import Compass from '$lib/components/share/icon/Compass.svelte';
	import EyeOpen from '$lib/components/share/icon/EyeOpen.svelte';
	import FindUsLogo from '$lib/components/share/icon/FindUsLogo.svelte';
	import Signal from '$lib/components/share/icon/Signal.svelte';

	const cdrImg = '/assets/project/cdr/CDR.webp';
	const precoupeImg = '/assets/article/precoupe.webp';
	const coupe23Img = '/assets/project/cdr/IMG_1179.webp';
</script>

<svelte:head>
	<title>Projet Coupe de France de Robotique — DaVinciBot</title>
	<meta
		name="description"
		content="Découvrez les robots développés par DaVinciBot pour la Coupe de France de Robotique"
	/>
	<meta name="keywords" content="DaVinciBot, Coupe de France de Robotique, étudiant." />
	<meta name="author" content="DaVinciBot" />
	<meta name="robots" content="index, follow" />

	<!-- meta og -->
	<meta property="og:title" content="Projet Coupe de France de Robotique — DaVinciBot" />
	<meta
		property="og:description"
		content="DaVinciBot participe à la Coupe de France de Robotique"
	/>
	<meta property="og:image" content="/assets/project/cdr/CDR.jpg" />
	<meta property="og:url" content="https://davincibot.fr/project/coupe-de-robotique" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="DaVinciBot" />
	<meta property="og:locale" content="fr_FR" />

	<!-- meta twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Projet Coupe de France de Robotique — DaVinciBot" />
	<meta
		name="twitter:description"
		content="Focus sur notre participation à la Coupe de France de Robotique."
	/>
	<meta name="twitter:image" content="/assets/project/cdr/CDR.jpg" />

	<link
		rel="preload"
		as="image"
		href="/assets/project/cdr/boombot_small.webp"
		fetchpriority="high"
	/>
</svelte:head>

<Topbar />

<div
	class="mx-auto flex h-full w-full max-w-screen-2xl flex-col gap-12 px-4 pt-20 sm:px-6 md:px-10 md:pt-28 lg:px-16 lg:pt-36"
>
	<div class="justify-start">
		<div class="grid grid-cols-1 items-center gap-10 md:grid-cols-[2fr_1.5fr]">
			<div class="order-2 flex flex-col justify-start gap-6 text-start md:order-1">
				<div class="flex flex-col gap-5">
					<h1 class="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
						La Coupe de France de Robotique
					</h1>
					<p class="text-dark-blue-gray self-stretch text-lg leading-relaxed sm:text-xl">
						DaVinciBot participe depuis plus de 10 ans à cette compétition organisée par Planète
						Sciences avec tous les ans une nouvelle équipe, un nouveau thème et de nouveaux défis à
						réaliser.
					</p>
				</div>
				<div class="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:gap-6">
					<CtaButton>Nos Projets</CtaButton>
					<CtaButton variant="secondary">Soutenez nous</CtaButton>
				</div>
			</div>
			<img
				src="/assets/project/cdr/boombot_small.webp"
				alt="Robot de DaVinciBot pour la Coupe de France de Robotique"
				width="1280"
				height="720"
				loading="eager"
				fetchpriority="high"
				class="order-1 mx-auto mb-6 w-full max-w-md object-contain md:order-2 md:mb-0 md:max-h-105 md:max-w-full lg:max-h-120"
			/>
		</div>

		<div class="mt-8 flex w-full flex-col justify-center sm:w-10/12 md:w-9/12 lg:w-7/12 2xl:mt-0">
			<h2 class="text-base font-bold">Nos soutiens</h2>

			<SponsorsCarousel />
		</div>
	</div>
	<section class="flex w-full flex-col gap-6 px-2 py-10 sm:px-0">
		<div class="flex flex-col items-center gap-2 text-center">
			<h2 class="text-3xl font-extrabold sm:text-4xl">Nos chiffres clés</h2>
			<p class="text-dark-blue-gray text-base leading-relaxed sm:text-lg">
				Un aperçu rapide de l'engagement annuel de l'équipe CDR.
			</p>
		</div>
		<div class="grid w-full grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8 lg:gap-10">
			<div class="flex flex-col items-center gap-2 rounded-2xl p-4 text-center">
				<h2 class="text-4xl font-extrabold sm:text-5xl lg:text-6xl">8</h2>
				<p class="text-dark-blue-gray text-lg font-semibold tracking-wide">Robots</p>
			</div>
			<div class="flex flex-col items-center gap-2 rounded-2xl p-4 text-center">
				<h2 class="text-4xl font-extrabold sm:text-5xl lg:text-6xl">2000&nbsp;€</h2>
				<p class="text-dark-blue-gray text-lg font-semibold tracking-wide">Budget</p>
			</div>
			<div class="flex flex-col items-center gap-2 rounded-2xl p-4 text-center">
				<h2 class="text-4xl font-extrabold sm:text-5xl lg:text-6xl">12</h2>
				<p class="text-dark-blue-gray text-lg font-semibold tracking-wide">Membres</p>
			</div>
		</div>
	</section>
	<div class="mt-12 flex flex-col items-center justify-center">
		<div class="relative mx-auto w-full max-w-2xl text-center">
			<h1 class="text-4xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
				Nos classements
			</h1>
			<p class="text-dark-blue-gray mt-5 text-base leading-relaxed sm:text-lg">
				DaVinciBot organise et participe à des événements de robotique, offrant à ses membres des
				occasions de se perfectionner et de relever des défis concrets. <br /> <br />
				L'association propose des compétitions internes et externes, ainsi que des ateliers, permettant
				aux étudiants d'appliquer leurs connaissances et d'innover en robotique.
			</p>
		</div>
		<div class="my-10 max-w-full">
			<Carousel time={90}>
				<ResultCard
					title="2025 - The Show Must Go On"
					rank_and_points="36/103 "
					image={cdrImg}
					logo={TheShowMustGoOnLogo}
					marginLeft="30"
					marginBottom="20"
				/>
				<ResultCard
					title="2024 - Farming Mars"
					rank_and_points="44e/186 - 157 pts"
					image={precoupeImg}
					logo={FarmingMars}
					marginLeft="35"
					marginBottom="35"
				/>
				<ResultCard
					title="2023 - The Cherry on the Cake"
					rank_and_points="46e/100 - 150 pts"
					image={coupe23Img}
					logo={TheCherryOnTheCake}
					marginLeft="50"
					marginBottom="35"
				/>
				<!-- <ResultCard
					title={'2022 - Age of Bots'}
					rank_and_points={''}
					image={cdrImg}
					logo={AgeOfBots}
					marginLeft={'20'}
					marginBottom={'5'}
				/>
				<ResultCard
					title={'2019'}
					rank_and_points={'54e/160 - 327 pts'}
					image={cdrImg}
					logo={AgeOfBots}
					marginLeft={'20'}
					marginBottom={'5'}
				/> -->
			</Carousel>
		</div>
	</div>
	<section class="w-full pt-12 pb-16 sm:pt-16 md:pt-20 lg:pt-24">
		<div class="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 sm:px-6 md:gap-12">
			<div class="max-w-2xl space-y-3 text-center md:space-y-4">
				<h2 class="text-4xl font-extrabold sm:text-5xl">Nos technologies</h2>
				<p class="text-dark-blue-gray mb-0 text-lg">
					Avec les années notre robot a accumulé de nombreuses technologies permettant d'être
					toujours plus efficace lors de la Coupe de France de Robotique.
				</p>
			</div>

			<div
				class="relative -mt-2 grid w-full gap-10 md:-mt-4 md:grid-cols-[minmax(18rem,24rem)_minmax(20rem,28rem)_minmax(18rem,24rem)] md:items-center lg:-mt-6 lg:grid-cols-[minmax(20rem,30rem)_minmax(22rem,32rem)_minmax(20rem,30rem)]"
			>
				<div
					class="flex flex-col items-center gap-10 text-center md:items-center md:justify-between md:gap-20 md:text-center"
				>
					<div class="flex flex-col items-center gap-2 md:-translate-x-6 lg:-translate-x-8">
						<span class="flex h-11 w-11 items-center justify-center">
							<EyeOpen />
						</span>
						<div class="max-w-xs space-y-1 md:max-w-sm lg:max-w-md">
							<h3 class="text-xl leading-tight font-semibold lg:text-2xl">Lidar</h3>
							<p class="text-dark-blue-gray text-sm leading-relaxed lg:text-base">
								Un lidar 2D détecte les robots de l'équipe adverse.
							</p>
						</div>
					</div>
					<div class="flex flex-col items-center gap-2 md:-translate-x-1 lg:-translate-x-2">
						<span class="flex h-11 w-11 items-center justify-center">
							<Signal />
						</span>
						<div class="max-w-xs space-y-1 md:max-w-sm lg:max-w-md">
							<h3 class="text-xl leading-tight font-semibold lg:text-2xl">Inter Com</h3>
							<p class="text-dark-blue-gray text-sm leading-relaxed lg:text-base">
								Le système de communication fait maison entre nos différents robots.
							</p>
						</div>
					</div>
				</div>
				<div class="flex justify-center">
					<div
						class="relative aspect-square w-full max-w-[24rem] sm:max-w-120 lg:max-w-140 xl:max-w-152"
					>
						<div
							class="bg-dark-blue-gray/15 absolute inset-x-12 bottom-1.5 h-[4.2rem] rounded-full blur-lg sm:bottom-2 sm:h-[4.8rem] lg:h-[5.6rem]"
						></div>
						<img
							src="/assets/project/cdr/boombot_small.webp"
							alt="Robot bleu DaVinciBot"
							class="relative z-10 h-full w-full object-contain drop-shadow-[0_30px_45px_rgba(2,50,255,0.28)]"
							loading="lazy"
						/>
					</div>
				</div>
				<div
					class="flex flex-col items-center gap-10 text-center md:items-center md:justify-between md:gap-20 md:text-center"
				>
					<div class="flex flex-col items-center gap-2 md:translate-x-6 lg:translate-x-8">
						<span class="flex h-11 w-11 items-center justify-center">
							<Compass />
						</span>
						<div class="max-w-xs space-y-1 md:max-w-sm lg:max-w-md">
							<h3 class="text-xl leading-tight font-semibold lg:text-2xl">Roues encodeuses</h3>
							<p class="text-dark-blue-gray text-sm leading-relaxed lg:text-base">
								Des roues munies d'encodeurs fournissent en permanence la position du robot.
							</p>
						</div>
					</div>
					<div class="flex flex-col items-center gap-2 md:-translate-x-1 lg:-translate-x-2">
						<span class="flex h-11 w-11 items-center justify-center">
							<Activity />
						</span>
						<div class="max-w-xs space-y-1 md:max-w-sm lg:max-w-md">
							<h3 class="text-xl leading-tight font-semibold lg:text-2xl">Brain</h3>
							<p class="text-dark-blue-gray text-sm leading-relaxed lg:text-base">
								La librairie qui orchestre toutes les actions en parallèle et sécurise chaque cycle.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-6 flex flex-col items-center justify-center gap-3 text-center">
				<span class="flex h-12 w-12 items-center justify-center">
					<FindUsLogo />
				</span>
				<span class="text-sm font-semibold tracking-[0.35em] uppercase"> Retrouvez-nous </span>
				<p class="text-dark-blue-gray text-base">12 Av. Léonard de Vinci</p>
				<p class="text-dark-blue-gray text-base">92400 Courbevoie</p>
			</div>
		</div>
	</section>
</div>

<Footer />
