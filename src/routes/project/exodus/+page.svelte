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
			value: '2024',
			label: 'Naissance du projet',
			description:
				"Lancé avec l'association DeVinci Fablab, le projet est maintenant exclusif à DaVinciBot."
		},
		{
			value: '12',
			label: 'Étudiants mobilisés',
			description:
				'Une équipe pluridisciplinaire qui réunit CAO, électronique, informatique embarquée et fabrication additive.'
		},
		{
			value: '3',
			label: 'Axes de conception',
			description:
				"Trois piliers guident chaque arbitrage : la légèreté, l'ergonomie et la polyvalence."
		},
		{
			value: '250 ms',
			label: 'Temps de réaction visé',
			description:
				"Délai maximal entre la détection d'un mouvement et l'assistance délivrée par les moteurs."
		}
	];

	const missionPillars: ProjectFeature[] = [
		{
			title: "Augmenter l'utilisateur",
			description:
				"Amplifier la force, la précision et l'endurance sans jamais imposer un geste : c'est l'intention qui commande, l'exosquelette qui suit."
		},
		{
			title: 'Préserver la liberté de mouvement',
			description:
				"Épouser les gestes de l'utilisateur, garantir un confort qui tient sur une journée entière et une prise en main immédiate."
		},
		{
			title: 'Renforcer la sécurité',
			description:
				"Anticiper les mouvements à risque et adapter l'assistance en temps réel, pour prévenir les troubles musculo-squelettiques avant qu'ils ne s'installent."
		}
	];

	const capabilities: ProjectFeature[] = [
		{
			title: "Détection de l'intention",
			description:
				"Capteurs de force et centrales inertielles mesurent l'effort à l'épaule ; un modèle embarqué en déduit le geste engagé avant qu'il ne soit terminé."
		},
		{
			title: 'Assistance proportionnelle',
			description:
				'Les moteurs brushless délivrent un couple recalculé en continu, dosé pour accompagner la charge sans jamais contrarier le mouvement.'
		},
		{
			title: "Réglage par l'utilisateur",
			description:
				"Un écran embarqué expose les profils d'assistance : chacun ajuste le niveau de soutien à sa morphologie et à la tâche du moment."
		}
	];

	const teamStreams: ProjectFeature[] = [
		{
			title: 'Conception mécanique',
			points: [
				"Modélisation 3D de chaque sous-ensemble de l'exosquelette",
				'Prototypage rapide par fabrication additive et soustractive',
				'Veille matériaux et procédés pour allier légèreté et robustesse'
			]
		},
		{
			title: 'Électronique et informatique embarquée',
			points: [
				'Conception des cartes qui pilotent les capteurs et les drivers moteurs',
				"Développement d'un contrôle moteur réactif, avec arrêt sûr en cas de défaut",
				'Réseau CAN et gestion énergétique de la structure complète'
			]
		},
		{
			title: 'Expérience utilisateur',
			points: [
				'Interface de paramétrage lisible, réglable sans notice',
				'Essais sur des morphologies variées pour élargir les retours terrain',
				'Campagnes de tests des pièces mécaniques sur banc de charge'
			]
		}
	];

	const milestones: ProjectMilestone[] = [
		{
			period: '2025-2026',
			title: 'Bras et liaison dorsale',
			description:
				'Recherche et développement sur la liaison dorsale et sur les bras motorisés par moteurs brushless.'
		},
		{
			period: '2026-2027',
			title: 'Développement du bassin',
			description:
				"Intégration d'un bassin aux prototypes existants et mise au point d'une IA de prédiction des mouvements."
		},
		{
			period: '2027-2028',
			title: 'Intégration des jambes',
			description:
				"Extension de la structure aux membres inférieurs et consolidation de l'ensemble déjà validé."
		},
		{
			period: '2028-2029',
			title: 'Version finale',
			description:
				"Tests d'endurance en conditions réelles et présentation du modèle final d'Exodus."
		}
	];

	const supportActions: ProjectAction[] = [
		{
			label: "Contacter l'équipe projet",
			href: 'mailto:davincibot@devinci.fr?subject=Projet%20Exodus',
			variant: 'primary'
		},
		{ label: 'Proposer un partenariat', href: '/sponsors', variant: 'secondary' },
		{ label: 'Découvrir DaVinciBot', href: '/', variant: 'secondary' }
	];
</script>

<ProjectHead
	description="Découvrez Exodus, l'exosquelette robotique développé par DaVinciBot pour assister celles et ceux qui portent des charges lourdes au quotidien."
	image="/assets/project/exodus/exodus.jpg"
	keywords="Exodus, exosquelette, DaVinciBot, robot d'assistance, port de charges, recherche"
	path="/project/exodus"
	preload="/assets/project/exodus/future_exodus.webp"
	socialDescription="Notre exosquelette robotique, conçu pour soulager le port de charges lourdes."
	title="Projet Exodus"
/>

<Topbar />

<main class="flex flex-col">
	<ProjectHero
		actions={heroActions}
		eyebrow="Projet Exodus"
		glow
		image="/assets/project/exodus/future_exodus.webp"
		imageAlt="Rendu de l'exosquelette Exodus développé par DaVinciBot"
		lede="DaVinciBot conçoit un exosquelette intelligent, dessiné pour les métiers qui portent au quotidien. Notre objectif : un équipement intuitif et réactif, capable de s'adapter en temps réel pour accompagner chaque mouvement avec précision."
		title="L'exosquelette pensé pour le port de charges lourdes"
	/>

	<ProjectSection compact>
		<FigureGrid figures={keyFigures} />
	</ProjectSection>

	<ProjectSection
		lede="Exodus vise à soulager les employés amenés à porter des charges lourdes tout au long de leur journée. Plusieurs défis se répondent : équilibrer puissance et légèreté, garantir une autonomie prolongée, et rester confortable après plusieurs heures de port. Notre réponse combine des matériaux avancés, une conception ergonomique et une prédiction des mouvements par apprentissage."
		title="Mission et contraintes"
	>
		<div class="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
			<FeatureGrid columns={1} items={missionPillars} />
			<SpecPanel
				description="Exodus s'articule autour d'une liaison dorsale et de deux bras. Des moteurs brushless dédiés à chaque épaule assurent une assistance précise, tandis qu'une structure en TPU offre légèreté et résistance. Le réseau CAN garantit une communication fluide entre les composants, et un écran intégré permet de régler les paramètres d'assistance en cours d'utilisation."
				items={[
					'Structure dorsale en TPU, pour la flexibilité',
					"Capteurs de force intégrés, pour doser l'assistance",
					'Moteurs brushless à chaque épaule, pour le couple',
					'Chaîne embarquée qui répond en moins de 250 ms'
				]}
				title="Architecture système"
			/>
		</div>
	</ProjectSection>

	<ProjectSection
		lede="Chaque sous-système est pensé pour se faire oublier : l'utilisateur porte sa charge, l'exosquelette s'occupe du reste."
		title="Capacités principales"
		tone="muted"
	>
		<FeatureGrid items={capabilities} />
	</ProjectSection>

	<ProjectSection
		lede="L'équipe Exodus mobilise les compétences des trois écoles du Pôle Léonard de Vinci. Nos méthodes agiles permettent un prototypage rapide, afin de confronter chaque hypothèse au besoin réel des utilisateurs."
		title="Organisation de l'équipe"
	>
		<FeatureGrid items={teamStreams} />
	</ProjectSection>

	<ProjectSection title="Feuille de route du projet" tone="muted" width="narrow">
		<Timeline {milestones} />
	</ProjectSection>

	<ProjectCta
		actions={supportActions}
		description="Matériaux, actionneurs, temps machine ou soutien financier : chaque appui accélère une année de développement. Vous souhaitez contribuer à un exosquelette pensé pour le terrain ? Parlons-en."
		title="Sponsoriser le projet Exodus"
	/>
</main>

<Footer />
