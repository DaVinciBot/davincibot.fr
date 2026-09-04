<script lang="ts">
	import Activity from '$lib/components/icon/Activity.svelte';
	import Compass from '$lib/components/icon/Compass.svelte';
	import EyeOpen from '$lib/components/icon/EyeOpen.svelte';
	import FindUsLogo from '$lib/components/icon/FindUsLogo.svelte';
	import Signal from '$lib/components/icon/Signal.svelte';
	import Carousel from '$lib/components/others/Carousel.svelte';
	import SponsorsCarousel from '$lib/components/others/SponsorsCarousel.svelte';
	import {
		FeatureGrid,
		FigureGrid,
		ProjectCta,
		ProjectHead,
		ProjectHero,
		ProjectSection,
		SpecPanel,
		Timeline,
		type ProjectAction,
		type ProjectFeature,
		type ProjectFigure,
		type ProjectMilestone
	} from '$lib/components/project';
	import ResultCard from '$lib/components/ResultCard.svelte';
	import Footer from '$lib/components/share/Footer.svelte';
	import FarmingMars from '$lib/components/share/Logo/FarmingMars.svelte';
	import TheCherryOnTheCake from '$lib/components/share/Logo/TheCherryOnTheCake.svelte';
	import TheShowMustGoOnLogo from '$lib/components/share/Logo/TheShowMustGoOnLogo.svelte';
	import AgeOfBots from '$lib/components/share/Logo/AgeOfBots.svelte';
	import { Topbar } from '@davincibot/components';
	import type { Component } from 'svelte';

	const cdrImg = '/assets/project/cdr/CDR.webp';
	const precoupeImg = '/assets/article/precoupe.webp';
	const coupe23Img = '/assets/project/cdr/IMG_1179.webp';

	const heroActions: ProjectAction[] = [
		{ label: 'Échanger avec nous', href: '/contact', variant: 'primary' },
		{
			label: "Suivre l'avancement",
			href: 'https://www.linkedin.com/company/davincibot/',
			variant: 'secondary'
		}
	];

	const keyFigures: ProjectFigure[] = [
		{
			value: '10+',
			label: 'Années de participation',
			description:
				'DaVinciBot aligne une équipe à chaque édition, avec une nouvelle promotion aux commandes.'
		},
		{
			value: '8',
			label: 'Robots construits',
			description:
				'Huit générations de plateformes, chacune repensée autour du règlement de son année.'
		},
		{
			value: '12',
			label: "Membres dans l'équipe",
			description:
				'Mécanique, électronique, informatique et stratégie de match travaillent sur le même robot.'
		},
		{
			value: '2 000 €',
			label: 'Budget par saison',
			description:
				"Pièces, cartes électroniques et matière première, financés par nos partenaires et par l'école."
		}
	];

	const missionPillars: ProjectFeature[] = [
		{
			title: 'Marquer sans intervention',
			description:
				"Les cent secondes du match se déroulent en autonomie complète : pas de télécommande, pas de reprise en main. Tout se décide avant l'appui sur le bouton de départ."
		},
		{
			title: 'Ne jamais percuter',
			description:
				"Le robot surveille en permanence l'adversaire et notre second robot : un contact coûte bien plus cher au classement que les points auxquels on renonce."
		},
		{
			title: 'Transmettre le savoir-faire',
			description:
				"L'équipe se renouvelle chaque année. Code, CAO et procédures de match sont documentés pour que la promotion suivante reparte du robot précédent, pas de zéro."
		}
	];

	/** Les quatre briques présentées autour du visuel du robot. */
	interface Technology {
		icon: Component<Record<string, unknown>>;
		title: string;
		description: string;
		/** Décalage horizontal pour épouser la silhouette du robot au centre. */
		offset: string;
	}

	const leftTechnologies: Technology[] = [
		{
			icon: EyeOpen,
			title: 'LiDAR',
			description:
				"Un LiDAR 2D balaie le plateau en continu et déclenche l'arrêt dès qu'un robot adverse entre dans la zone de sécurité.",
			offset: 'md:-translate-x-6 lg:-translate-x-8'
		},
		{
			icon: Signal,
			title: 'Inter Com',
			description:
				"Notre liaison radio maison : les deux robots s'échangent position et intentions pour se répartir les actions sans se gêner.",
			offset: 'md:-translate-x-1 lg:-translate-x-2'
		}
	];

	const rightTechnologies: Technology[] = [
		{
			icon: Compass,
			title: 'Roues encodeuses',
			description:
				"Deux roues folles équipées d'encodeurs donnent la position du robot en permanence, sans se laisser tromper par le patinage des roues motrices.",
			offset: 'md:translate-x-6 lg:translate-x-8'
		},
		{
			icon: Activity,
			title: 'Brain',
			description:
				'La librairie qui orchestre toutes les actions en parallèle, arbitre leurs priorités et sécurise chaque cycle de match.',
			offset: 'md:translate-x-1 lg:translate-x-2'
		}
	];

	const teamStreams: ProjectFeature[] = [
		{
			title: 'Mécanique et CAO',
			points: [
				"Conception de la base roulante et des actionneurs propres au thème de l'année",
				'Usinage, impression 3D et découpe laser réalisés au fablab',
				'Bancs de test pour valider chaque mécanisme avant son intégration'
			]
		},
		{
			title: 'Électronique et embarqué',
			points: [
				'Cartes de puissance et de distribution conçues en interne',
				'Asservissement et odométrie exécutés sur microcontrôleur',
				'Diagnostic embarqué pour identifier une panne entre deux matchs'
			]
		},
		{
			title: 'Stratégie et informatique',
			points: [
				'Brain : orchestration des actions et gestion des priorités',
				'Évitement dynamique à partir des relevés du LiDAR',
				'Simulation de matchs pour comparer les stratégies de points'
			]
		}
	];

	const milestones: ProjectMilestone[] = [
		{
			period: 'Septembre',
			title: 'Découverte du règlement',
			description:
				"Planète Sciences publie le thème de l'année : analyse des actions, comptage des points et premiers arbitrages de stratégie."
		},
		{
			period: 'Décembre',
			title: 'Prototypes et base roulante',
			description:
				'La base roulante se déplace et se repère sur le plateau, pendant que les mécanismes du thème sont mis au point séparément.'
		},
		{
			period: 'Mars',
			title: 'Pré-coupe',
			description:
				'Première confrontation en conditions réelles : un week-end de matchs qui révèle les fragilités pendant que la finale est encore loin.'
		},
		{
			period: 'Mai',
			title: 'Finale nationale',
			description:
				"Trois jours d'homologation et de matchs face à une centaine d'équipes venues de toute la France."
		}
	];

	const supportActions: ProjectAction[] = [
		{
			label: "Contacter l'équipe projet",
			href: 'mailto:davincibot@devinci.fr?subject=Coupe%20de%20France%20de%20Robotique',
			variant: 'primary'
		},
		{ label: 'Proposer un partenariat', href: '/sponsors', variant: 'secondary' },
		{ label: 'Découvrir DaVinciBot', href: '/', variant: 'secondary' }
	];
</script>

<ProjectHead
	description="Découvrez les robots conçus par DaVinciBot pour la Coupe de France de Robotique : base roulante autonome, LiDAR, odométrie et stratégie de match."
	image="/assets/project/cdr/CDR.jpg"
	keywords="DaVinciBot, Coupe de France de Robotique, Planète Sciences, robotique étudiante"
	path="/project/coupe-de-robotique"
	preload="/assets/project/cdr/boombot_small.webp"
	socialDescription="Notre participation à la Coupe de France de Robotique, saison après saison."
	title="Projet Coupe de France de Robotique"
/>

<Topbar />

<!-- eslint-disable @typescript-eslint/no-confusing-void-expression -- {@render} est vu comme une expression void imbriquée par la règle ; les snippets sont pourtant la bonne forme ici -->

<!-- Défini hors du composant : un {#snippet} placé directement sous une balise
     de composant lui serait passé comme prop. -->
{#snippet technologyColumn(items: Technology[])}
	<div class="flex flex-col items-center gap-10 text-center md:justify-between md:gap-20">
		{#each items as tech (tech.title)}
			{@const Icon = tech.icon}
			<div class="flex flex-col items-center gap-2 {tech.offset}">
				<span class="flex h-11 w-11 items-center justify-center">
					<Icon />
				</span>
				<div class="max-w-xs space-y-1 md:max-w-sm lg:max-w-md">
					<h3 class="text-xl leading-tight font-semibold lg:text-2xl">{tech.title}</h3>
					<p class="text-sm leading-relaxed text-white/70 lg:text-base">{tech.description}</p>
				</div>
			</div>
		{/each}
	</div>
{/snippet}

<main class="flex flex-col">
	<ProjectHero
		actions={heroActions}
		eyebrow="Projet Coupe de France de Robotique"
		frame="plain"
		glow
		image="/assets/project/cdr/boombot_small.webp"
		imageAlt="Robot de DaVinciBot pour la Coupe de France de Robotique"
		lede="DaVinciBot participe depuis plus de dix ans à la compétition organisée par Planète Sciences. Chaque saison rebat les cartes : nouvelle équipe, nouveau thème, nouveaux défis et un robot entièrement repensé en neuf mois."
		title="Un robot autonome conçu, câblé et programmé chaque année"
	/>

	<ProjectSection compact title="Nos soutiens" tone="muted">
		<SponsorsCarousel />
	</ProjectSection>

	<ProjectSection compact>
		<FigureGrid figures={keyFigures} />
	</ProjectSection>

	<ProjectSection
		lede="Le règlement change tous les ans : un plateau, une poignée d'actions à réaliser en cent secondes, et deux robots par équipe qui doivent cohabiter sans se percuter. Tout se joue sur la régularité — un robot rapide qui s'arrête au premier imprévu marque moins qu'un robot qui termine chacun de ses matchs."
		title="Mission et contraintes"
	>
		<div class="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
			<FeatureGrid columns={1} items={missionPillars} />
			<SpecPanel
				description="Le robot repose sur une base roulante motorisée, un étage électronique qui regroupe alimentation et cartes de puissance, et un étage supérieur qui accueille les actionneurs propres au thème de l'année. Un ordinateur embarqué exécute Brain, notre orchestrateur d'actions, pendant que les microcontrôleurs gardent la main sur l'asservissement et sur les sécurités."
				items={[
					'Base roulante asservie sur roues encodeuses',
					'LiDAR 2D pour la détection des robots adverses',
					'Cartes de puissance et de distribution conçues en interne',
					'Inter Com, notre liaison radio entre les deux robots'
				]}
				title="Architecture du robot"
			/>
		</div>
	</ProjectSection>

	<ProjectSection
		align="center"
		lede="Au fil des saisons, le robot a accumulé des briques que l'on reprend chaque année et que l'on affine. Voici celles qui font la différence pendant un match."
		title="Nos technologies"
		tone="muted"
	>
		<div
			class="grid w-full gap-10 md:grid-cols-[minmax(18rem,24rem)_minmax(20rem,28rem)_minmax(18rem,24rem)] md:items-center lg:grid-cols-[minmax(20rem,30rem)_minmax(22rem,32rem)_minmax(20rem,30rem)]"
		>
			{@render technologyColumn(leftTechnologies)}
			<div class="flex justify-center">
				<div
					class="relative aspect-square w-full max-w-[24rem] sm:max-w-120 lg:max-w-140 xl:max-w-152"
				>
					<div
						class="bg-dark-blue-gray/15 absolute inset-x-12 bottom-1.5 h-[4.2rem] rounded-full blur-lg sm:bottom-2 sm:h-[4.8rem] lg:h-[5.6rem]"
						aria-hidden="true"
					></div>
					<img
						class="relative z-10 h-full w-full object-contain drop-shadow-[0_30px_45px_rgba(2,50,255,0.28)]"
						alt="Robot bleu de DaVinciBot, vu de face"
						loading="lazy"
						src="/assets/project/cdr/boombot_small.webp"
					/>
				</div>
			</div>
			{@render technologyColumn(rightTechnologies)}
		</div>
	</ProjectSection>

	<ProjectSection
		lede="L'équipe réunit les compétences des trois écoles du Pôle Léonard de Vinci autour d'un seul objet : le robot qui entrera sur le plateau au mois de mai."
		title="Organisation de l'équipe"
	>
		<FeatureGrid items={teamStreams} />
	</ProjectSection>

	<ProjectSection
		lede="Neuf mois séparent la publication du règlement de la finale. Le calendrier ci-dessous se répète, saison après saison."
		title="Le rythme d'une saison"
		tone="muted"
		width="narrow"
	>
		<Timeline {milestones} />
	</ProjectSection>

	<ProjectSection
		align="center"
		lede="Chaque édition laisse une trace : un thème, un classement et une liste de choses à corriger pour l'année suivante."
		title="Notre palmarès"
	>
		<Carousel time={60}>
			<ResultCard
				image={cdrImg}
				logo={TheShowMustGoOnLogo}
				marginBottom="20"
				marginLeft="30"
				rank_and_points="36e/188"
				title="2025 - The Show Must Go On"
			/>
			<ResultCard
				image={precoupeImg}
				logo={FarmingMars}
				marginBottom="35"
				marginLeft="35"
				rank_and_points="44e/186 - 157 pts"
				title="2024 - Farming Mars"
			/>
			<ResultCard
				image={coupe23Img}
				logo={TheCherryOnTheCake}
				marginBottom="35"
				marginLeft="50"
				rank_and_points="46e/170 - 150 pts"
				title="2023 - The Cherry on the Cake"
			/>
			<ResultCard
				image={cdrImg}
				logo={AgeOfBots}
				marginBottom="5"
				marginLeft="20"
				rank_and_points="36e/78 - 132 pts"
				title="2022 - Age of Bots"
			/>
			<ResultCard image={cdrImg} rank_and_points="54e/166 - 327 pts" title="2019 - Atom Factory" />
		</Carousel>
	</ProjectSection>

	<ProjectCta
		actions={supportActions}
		description="Pièces mécaniques, cartes électroniques, temps machine ou soutien financier : nos partenaires rendent la saison possible. Vous souhaitez accompagner une équipe étudiante jusqu'à la finale ? Parlons-en."
		title="Soutenir la saison qui vient"
	>
		<div class="flex flex-col items-center gap-3">
			<a
				class="flex h-12 w-12 items-center justify-center"
				href="https://github.com/DaVinciBot/CoupeDeRobotique"
			>
				<FindUsLogo />
			</a>
			<span class="text-sm font-semibold tracking-[0.35em] uppercase">Retrouvez-nous</span>
		</div>
	</ProjectCta>
</main>

<Footer />
