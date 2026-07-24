<script lang="ts">
	import { onMount } from 'svelte';

	const instructionSlides = [
		{
			title: 'Bienvenue sur SmartShare',
			content: 'Partagez votre écran facilement avec ce système de diffusion',
			icon: 'monitor'
		},
		{
			title: '1. Connectez-vous au Wi-Fi',
			content: "Assurez-vous d'être connecté au réseau Wi-Fi DVB",
			icon: 'wifi'
		},
		{
			title: "2. Accédez à l'interface",
			content: "Rendez-vous sur l'interface admin pour démarrer le partage d'écran",
			icon: 'screen'
		},
		{
			title: '3. Cliquez sur Caster',
			content: "Appuyez sur le bouton 'Caster' et sélectionnez votre écran à partager",
			icon: 'cast'
		},
		{
			title: 'En attente de connexion...',
			content: "Aucun partage d'écran en cours actuellement",
			icon: 'waiting'
		}
	];
	const fallbackSlide = instructionSlides[0] ?? {
		title: '',
		content: '',
		icon: 'waiting'
	};
	let current = $state(3);
	const currentSlide = $derived(instructionSlides[current] ?? fallbackSlide);

	function next() {
		current = (current + 1) % instructionSlides.length;
	}

	function prev() {
		current = (current - 1 + instructionSlides.length) % instructionSlides.length;
	}

	onMount(() => {
		const interval = setInterval(next, 8000); // Change slide every 8 seconds
		return () => {
			clearInterval(interval);
		}; // Cleanup on unmount
	});
</script>

<svelte:head>
	<title>SmartShare - Instructions de partage d'écran</title>
	<meta name="description" content="Instructions pour partager votre écran avec SmartShare" />
	<link href="/favicon.png" rel="icon" type="image/png" />

	<meta content="SmartShare - Instructions de partage d'écran" property="og:title" />
	<meta
		content="Instructions pour partager votre écran avec SmartShare"
		property="og:description"
	/>
	<meta content="/dvb_og_img.png" property="og:image" />

	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-8 text-white">
	<div class="w-full max-w-4xl">
		<!-- Main content area -->
		<div class="mb-12 text-center">
			<!-- Icon -->
			<div class="mb-8">
				{#if currentSlide.icon === 'monitor'}
					<svg
						class="mx-auto h-24 w-24 text-blue-400"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24"
					>
						<rect
							fill="none"
							height="12"
							rx="2"
							stroke="currentColor"
							stroke-width="2"
							width="18"
							x="3"
							y="4"
						/>
						<path d="M8 20h8" stroke="currentColor" stroke-linecap="round" stroke-width="2" />
						<path d="M12 16v4" stroke="currentColor" stroke-linecap="round" stroke-width="2" />
					</svg>
				{:else if currentSlide.icon === 'wifi'}
					<svg
						class="mx-auto h-24 w-24 text-green-400"
						fill="currentColor"
						stroke="currentColor"
						viewBox="0 0 24 26"
					>
						<path
							d="M10,19c0-1.1,.9-2,2-2s2,.9,2,2-.9,2-2,2-2-.9-2-2Zm8.36-4.24c.59-.59,.59-1.54,0-2.12-3.51-3.51-9.22-3.51-12.73,0-.59,.59-.59,1.54,0,2.12s1.54,.59,2.12,0c2.34-2.34,6.15-2.34,8.49,0,.29,.29,.68,.44,1.06,.44s.77-.15,1.06-.44Zm5.17-4.67c.6-.57,.62-1.52,.05-2.12-.09-.09-.18-.19-.27-.28-3.02-3.02-7.04-4.69-11.31-4.69S3.71,4.66,.69,7.68c-.09,.09-.18,.19-.27,.28-.57,.6-.55,1.55,.05,2.12,.6,.57,1.55,.55,2.12-.05l.22-.23c2.46-2.46,5.72-3.81,9.19-3.81s6.74,1.35,9.2,3.81l.22,.22c.29,.31,.69,.46,1.08,.46,.37,0,.75-.14,1.04-.41Z"
						/>
					</svg>
				{:else if currentSlide.icon === 'screen'}
					<svg
						class="mx-auto h-24 w-24 text-purple-400"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24"
					>
						<rect
							fill="none"
							height="10"
							rx="2"
							stroke="currentColor"
							stroke-width="2"
							width="16"
							x="4"
							y="4"
						/>
						<path d="M8 21h8" stroke="currentColor" stroke-linecap="round" stroke-width="2" />
						<path d="M12 17v4" stroke="currentColor" stroke-linecap="round" stroke-width="2" />
						<path d="M9 9l2 2 4-4" stroke="currentColor" stroke-linecap="round" stroke-width="2" />
					</svg>
				{:else if currentSlide.icon === 'cast'}
					<svg
						class="mx-auto h-24 w-24 text-orange-400"
						fill="currentColor"
						fill-rule="evenodd"
						height="512"
						version="1.1"
						viewBox="0 0 32 32"
						width="512"
						x="0"
						xmlns="http://www.w3.org/2000/svg"
						y="0"
						xml:space="preserve"
						><g
							><path
								d="M8.771 23.975h-4a3 3 0 0 1-3-3v-13a3 3 0 0 1 3-3h22a3 3 0 0 1 3 3v13a3 3 0 0 1-3 3h-4v.78a2.22 2.22 0 0 1-2.221 2.22h-9.558a2.22 2.22 0 0 1-2.221-2.22zm2 0v.78c0 .121.099.22.221.22h9.558a.22.22 0 0 0 .221-.22v-.78zm17-16v13a1 1 0 0 1-1 1h-22a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1h22a1 1 0 0 1 1 1zm-13 5.415-1.121 1.121a1 1 0 0 1-1.414-1.414l2.828-2.829a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1-1.415 1.414l-1.121-1.121v4.585a1 1 0 0 1-2 0z"
							></path></g
						></svg
					>
				{:else}
					<svg
						class="mx-auto h-24 w-24 text-yellow-400"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24"
					>
						<circle cx="12" cy="12" fill="none" r="10" stroke="currentColor" stroke-width="2" />
						<path d="M12 6v6l4 2" stroke="currentColor" stroke-linecap="round" stroke-width="2" />
					</svg>
				{/if}
			</div>

			<!-- Title -->
			<h1 class="mb-6 text-4xl font-bold md:text-6xl">
				{currentSlide.title}
			</h1>

			<!-- Content -->
			<p class="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300 md:text-2xl">
				{currentSlide.content}
			</p>
		</div>

		<!-- Navigation dots -->
		<div class="mb-8 flex justify-center space-x-3">
			{#each instructionSlides as slide, index (slide.title)}
				<button
					class="h-3 w-3 rounded-full transition-all duration-300 {index === current
						? 'bg-blue-400'
						: 'bg-gray-600'}"
					aria-label={`Go to slide ${String(index + 1)}: ${slide.title}`}
					onclick={() => {
						current = index;
					}}
					title="Go to slide {index + 1}"
				></button>
			{/each}
		</div>

		<!-- Manual navigation buttons -->
		<div class="flex justify-center space-x-4">
			<button
				class="flex items-center rounded-lg bg-gray-700 px-6 py-3 transition-colors duration-200 hover:bg-gray-600"
				onclick={prev}
			>
				<svg
					class="mr-2 h-5 w-5"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
				>
					<path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-linecap="round" stroke-width="2" />
				</svg>
				Précédent
			</button>
			<button
				class="flex items-center rounded-lg bg-gray-700 px-6 py-3 transition-colors duration-200 hover:bg-gray-600"
				onclick={next}
			>
				Suivant
				<svg
					class="ml-2 h-5 w-5"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
				>
					<path d="M9 18l6-6-6-6" stroke="currentColor" stroke-linecap="round" stroke-width="2" />
				</svg>
			</button>
		</div>
	</div>
</div>
