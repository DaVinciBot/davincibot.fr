<script lang="ts">
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
	import Footer from '$lib/components/share/Footer.svelte';
	import { Topbar } from '@davincibot/components';

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
			value: '2027',
			label: 'Édition CoHoMa IV',
			description:
				'Quatrième édition du challenge organisé par le Battle Lab Terre, dont les épreuves finales se tiennent en juin 2027.'
		},
		{
			value: '6',
			label: 'Étudiants mobilisés',
			description:
				"Une équipe pluridisciplinaire qui réunit mécatronique, IA, électronique et design d'expérience."
		},
		{
			value: '3',
			label: 'Sous-systèmes intégrés',
			description:
				'Navigation autonome, perception 3D et interface opérateur augmentée, développés en parallèle puis assemblés sur le châssis.'
		},
		{
			value: '12+',
			label: 'Capteurs embarqués',
			description:
				'LiDAR, caméras stéréo, IMU tactique, télémétrie GNSS et surveillance énergétique du robot.'
		}
	];

	const missionPillars: ProjectFeature[] = [
		{
			title: 'Augmenter le soldat',
			description:
				"Offrir une aide robotique capable d'explorer, de cartographier et de sécuriser les abords d'une zone d'intervention avant que l'équipe ne s'y engage."
		},
		{
			title: 'Assurer la cohabitation',
			description:
				"Concevoir une interface qui laisse l'humain au centre de la décision, tout en exploitant pleinement ce que le robot sait faire seul."
		},
		{
			title: 'Garder le rythme opérationnel',
			description:
				'Tenir un cycle de mission complet : plateforme robuste, déploiement en quelques minutes et autonomie énergétique suffisante.'
		}
	];

	const capabilities: ProjectFeature[] = [
		{
			title: 'Perception et fusion de données',
			description:
				'LiDAR 3D hémisphérique, caméras RGB-D et odométrie sont fusionnés pour produire une carte locale dense et détecter les menaces.'
		},
		{
			title: 'Navigation adaptative',
			description:
				"Planification hybride : le robot progresse seul sur les zones reconnues sûres, et l'opérateur reprend la main instantanément via logiciel de contrôle."
		},
		{
			title: 'Interaction homme-machine',
			description:
				"Interface tactile et casque X-AR affichent l'état du robot, les alertes terrain et les trajectoires proposées, sans noyer l'opérateur sous la donnée."
		}
	];

	const teamStreams: ProjectFeature[] = [
		{
			title: 'Robotique et mécatronique',
			points: [
				"Intégration d'un châssis à assistance électrique tout-terrain",
				'Suspension modulaire pour franchir les obstacles du parcours de qualification',
				"Gestion thermique et énergétique pour six heures d'autonomie"
			]
		},
		{
			title: 'Perception et IA embarquée',
			points: [
				'Segmentation 3D en temps réel pour distinguer alliés, obstacles et zones de danger',
				'Suivi de chemin sécurisé avec recalage SLAM et géorepérage',
				'Pipeline ROS 2 optimisé pour Jetson Orin'
			]
		},
		{
			title: 'Expérience opérateur',
			points: [
				'Interface qui hiérarchise les alertes critiques et simplifie la supervision des capteurs',
				'Visualisation AR pour projeter cartes et trajectoires dans le champ de vision',
				"Séquences d'entraînement gamifiées pour préparer l'opérateur avant la compétition"
			]
		}
	];

	const milestones: ProjectMilestone[] = [
		{
			period: 'Février 2026',
			title: 'Définition du cahier des charges',
			description:
				'Réception du cahier des charges du Battle Lab Terre, analyse des besoins opérationnels et arbitrage des contraintes techniques.'
		},
		{
			period: 'Juin 2026',
			title: 'Prototype terrain V1',
			description:
				'Assemblage du châssis, des capteurs principaux et de la téléopération sécurisée, suivi par une campagne de tests sur terrain accidenté.'
		},
		{
			period: 'Octobre 2026',
			title: 'Itération co-design',
			description:
				"Intégration des retours des instructeurs militaires : révision de l'IHM, modes de secours et checklists opérateur."
		},
		{
			period: 'Juin 2027',
			title: 'Qualification du challenge',
			description:
				'Présentation officielle du démonstrateur complet et passage des épreuves de cohabitation homme-machine.'
		}
	];

	const supportActions: ProjectAction[] = [
		{
			label: "Contacter l'équipe projet",
			href: 'mailto:davincibot@devinci.fr?subject=Projet%20CoHoMa',
			variant: 'primary'
		},
		{ label: 'Proposer un partenariat', href: '/sponsors', variant: 'secondary' },
		{ label: 'Découvrir DaVinciBot', href: '/', variant: 'secondary' }
	];
</script>

<ProjectHead
	description="Découvrez la plateforme semi-autonome développée par DaVinciBot pour le challenge CoHoMa : perception 3D, navigation adaptative et cohabitation homme-machine."
	image="/assets/project/cohoma/cohoma.png"
	keywords="CoHoMa, Cohabitation Homme Machine, DaVinciBot, robotique défense, Armée de Terre"
	path="/project/cohoma"
	preload="/assets/project/cohoma/cohoma.webp"
	socialDescription="Notre système robotique de cohabitation homme-machine, développé avec le Battle Lab Terre."
	title="Projet CoHoMa"
/>

<Topbar />

<main class="flex flex-col">
	<ProjectHero
		actions={heroActions}
		eyebrow="Projet CoHoMa"
		glow
		image="/assets/project/cohoma/cohoma.webp"
		imageAlt="Rendu 3D du robot CoHoMa développé par DaVinciBot"
		lede="DaVinciBot développe une plateforme robotique semi-autonome capable de partager la mission avec le soldat. Notre objectif : un éclaireur fiable, conscient de son environnement, qui assiste l'opérateur sans jamais le remplacer."
		title="Une coopération homme-machine taillée pour le terrain"
	/>

	<ProjectSection compact>
		<FigureGrid figures={keyFigures} />
	</ProjectSection>

	<ProjectSection
		lede="Le challenge CoHoMa met l'accent sur la collaboration entre l'humain et la machine. Chaque épreuve impose un tempo soutenu, l'identification rapide des menaces et la capacité à explorer des zones à visibilité limitée. Notre réponse combine perception 3D, navigation assistée et une interface opérateur qui guide sans saturer l'attention."
		title="Mission et contraintes"
	>
		<div class="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
			<FeatureGrid columns={1} items={missionPillars} />
			<SpecPanel
				description="Le robot s'articule autour d'un châssis motorisé quatre roues motrices, d'un mât capteurs modulaire et d'une baie électronique refroidie passivement. Des rails de montage permettent d'ajouter des charges utiles : bras robotique, capteurs NRBC, relais de communications. Une architecture ROS 2 distribue la prise de décision sur trois ordinateurs embarqués reliés par un réseau temps réel."
				items={[
					'Compute Jetson Orin et microcontrôleur redondant pour la sécurité',
					'Double réseau CAN pour la motorisation et les actionneurs secondaires',
					'Lien radio chiffré et 5G privée pour le retour vidéo et la télémétrie'
				]}
				title="Architecture système"
			/>
		</div>
	</ProjectSection>

	<ProjectSection
		lede="Chaque sous-système est pensé pour livrer une information exploitable en quelques secondes par l'opérateur, tout en respectant les règles d'engagement."
		title="Capacités principales"
		tone="muted"
	>
		<FeatureGrid items={capabilities} />
	</ProjectSection>

	<ProjectSection
		lede="L'équipe CoHoMa mobilise les compétences des trois écoles du Pôle Léonard de Vinci. Nos méthodes agiles se combinent à une approche V&V (Verification & Validation) inspirée de l'industrie de défense."
		title="Organisation de l'équipe"
	>
		<FeatureGrid items={teamStreams} />
	</ProjectSection>

	<ProjectSection title="Feuille de route 2025-2027" tone="muted" width="narrow">
		<Timeline {milestones} />
	</ProjectSection>

	<ProjectCta
		actions={supportActions}
		description="Nous cherchons des partenaires techniques, des mentors tactiques et des soutiens financiers pour accélérer le développement. Vous souhaitez contribuer à la prochaine génération de systèmes robotisés ? Parlons-en."
		title="Collaborer autour de CoHoMa"
	/>
</main>

<Footer />
