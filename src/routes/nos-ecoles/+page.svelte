<script lang="ts">
	import { Footer } from '@davincibot/components';
	import { Topbar } from '@davincibot/components';
	import { CTAButton } from '@davincibot/components';

	// Schools content for alternating sections
	const schools = [
		{
			slug: 'esilv',
			name: 'ESILV',
			subtitle: "École d'ingénieurs",
			description:
				"L'ESILV forme des ingénieurs généralistes tournés vers les technologies numériques et l’innovation. Les étudiants y développent des compétences en informatique, IA, data, finance, mécanique et énergie au travers d’une pédagogie par projets.",
			highlights: [
				'Accréditée CTI, grade de master',
				'Spécialisations: IA, data, fintech, mécatronique, énergie',
				'Forte proximité avec les entreprises et la recherche'
			],
			image: '/assets/img/esilv.webp',
			site: 'https://www.esilv.fr/'
		},
		{
			slug: 'emlv',
			name: 'EMLV',
			subtitle: 'École de management',
			description:
				"L'EMLV prépare aux métiers du management, du marketing et de la finance dans un contexte résolument digital. L’école met l’accent sur l’ouverture, la professionnalisation et le travail en équipe inter-écoles.",
			highlights: [
				'Programmes visés et grade de master',
				"Marketing digital, business development, finance d'entreprise",
				'Stages, alternance et projets concrets au cœur de la pédagogie'
			],
			image: '/assets/img/emlv.webp',
			site: 'https://www.emlv.fr/'
		},
		{
			slug: 'iim',
			name: 'IIM',
			subtitle: "Institut de l'Internet et du Multimédia",
			description:
				"L'IIM forme aux métiers de la création numérique: design, communication visuelle, jeu vidéo, animation 3D, web et communication digitale. Les étudiants alternent entre fondamentaux créatifs et réalisations professionnelles.",
			highlights: [
				'Parcours: Création & Design, Jeux vidéo, Animation 3D, Communication digitale',
				'Projets réels, workshops et pédagogie studio',
				'Forte culture de la collaboration inter-écoles'
			],
			image: '/assets/img/iim.webp',
			site: 'https://www.iim.fr/'
		}
	];
</script>

<Topbar />
<div class="flex min-h-screen flex-col">
	<div class="landing border-b border-gray-700">
		<div class="relative h-screen">
			<div class="flex h-full w-full items-end justify-center md:w-6/12 md:items-center">
				<div class="mt-16 mb-12 text-center md:mb-0">
					<div
						class="left-diagonal order-2 flex items-center justify-center px-6 py-10 sm:px-10 lg:order-1 lg:px-16"
					>
						<div class="z-20 w-full max-w-2xl text-center lg:text-left">
							<h1 class="text-5xl font-extrabold tracking-wide sm:text-6xl">
								Pôle Léonard de Vinci
							</h1>
							<p class="mt-6 text-lg text-white/90">
								Au cœur de La Défense, le Pôle Léonard de Vinci réunit trois écoles complémentaires
								— ESILV, EMLV et IIM. Ingénierie, management et création numérique se rencontrent au
								quotidien via une pédagogie par projets et une forte culture de
								l'interdisciplinarité.
							</p>

							<div
								class="mt-8 flex flex-col items-center justify-center gap-4 sm:w-125 sm:flex-row lg:justify-start"
							>
								<CTAButton href="#ecoles">Découvrir nos écoles</CTAButton>
								<CTAButton variant="secondary" href="https://www.devinci.fr/"
									>Site du Pôle</CTAButton
								>
							</div>

							<p class="mt-6 text-sm text-white/60">
								Découvrez l'écosystème pluridisciplinaire qui fait la force de nos projets
								étudiants.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div id="teaser">
				<img
					src="/assets/img/pulv_lc.webp"
					alt="Vue du campus du Pôle Léonard de Vinci"
					class="pointer-events-none absolute top-0 left-0 -z-10 h-full w-full object-cover opacity-50"
					loading="lazy"
				/>
			</div>
		</div>
	</div>

	<section id="ecoles" class="container mx-auto max-w-6xl space-y-20 px-6 py-16 sm:py-24">
		{#each schools as s, i (s.slug)}
			<article class="grid items-center gap-10 md:grid-cols-2">
				<div class={i % 2 === 0 ? '' : 'md:order-2'}>
					<div
						class="mx-auto flex aspect-square w-full max-w-md items-center justify-center rounded-lg border border-white/10 bg-white/5 p-6 md:aspect-2/1 md:max-w-none"
					>
						<img
							src={s.image}
							alt={`Logo ${s.name}`}
							class="max-h-56 w-auto object-contain md:max-h-52"
							loading="lazy"
						/>
					</div>
				</div>
				<div class={i % 2 === 0 ? '' : 'md:order-1'}>
					<h2 class="text-3xl font-bold sm:text-4xl">{s.name}</h2>
					<p class="mt-1 text-white/70">{s.subtitle}</p>
					<p class="mt-6 text-base leading-7 text-white/85">{s.description}</p>

					<ul class="mt-6 space-y-2 text-white/85">
						{#each s.highlights as h (h)}
							<li class="flex items-start gap-3">
								<span
									class="bg-dark-light-blue mt-0.5 h-5 w-5"
									style="-webkit-mask:url('/assets/img/icon/checked-document.svg') no-repeat center / contain; mask:url('/assets/img/icon/checked-document.svg') no-repeat center / contain;"
									aria-hidden="true"
								></span>
								<span>{h}</span>
							</li>
						{/each}
					</ul>

					<div class="mt-6">
						<a
							class="inline-flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4 hover:text-white/80"
							href={s.site}
							target="_blank"
							rel="external noopener noreferrer"
							aria-label={`Visiter le site de ${s.name}`}
						>
							En savoir plus sur {s.name}
							<span
								class="bg-dark-light-blue h-4 w-4"
								style="-webkit-mask:url('/assets/img/icon/link.svg') no-repeat center / contain; mask:url('/assets/img/icon/link.svg') no-repeat center / contain;"
								aria-hidden="true"
							></span>
						</a>
					</div>
				</div>
			</article>
		{/each}
	</section>

	<Footer />
</div>

<style>
	.landing {
		filter: brightness(0.8);
		height: 100vh;
		overflow: hidden;
	}

	.landing::after {
		content: '';
		height: 200vh;
		width: 100%;
		position: absolute;
		transform: rotate(25deg);
		top: -50%;
		left: -58%;
		z-index: 5;
		background-image: url('/assets/img/icon/plus-pattern-center.webp');
		background-size: 5%;
		background-repeat: repeat;
		opacity: 0.1;
		animation: move 300s ease-in infinite;
		z-index: 1;
	}
	#teaser::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-image: linear-gradient(
			115deg,
			rgba(1, 1, 40, 0.9) 20%,
			rgba(1, 1, 40, 0.5) 45%,
			rgba(1, 1, 40, 0) 50%
		);
		z-index: -1;
		background-blend-mode: multiply;
	}
	@keyframes move {
		100% {
			background-position: 0% 100%;
		}
	}
	@media (max-width: 768px) {
		.landing::after {
			background-size: 15%;
			transform: rotate(0deg);
			top: 70%;
			left: 0;
		}
		#teaser::after {
			background-image: linear-gradient(
				0deg,
				rgba(1, 1, 40, 0.9) 20%,
				rgba(1, 1, 40, 0.5) 40%,
				rgba(1, 1, 40, 0) 50%
			);
		}
	}
</style>
