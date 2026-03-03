<script lang="ts">
	import { page } from '$app/state';
	import CTAButton from '$lib/components/utils/CTAButton.svelte';

	let redirect = '/';
	$: redirect = page.url.searchParams.get('redirect') || '/';
</script>

<section class="flex min-h-[calc(100vh-8rem)] items-center justify-center px-6 py-12">
	<div class="max-w-xl space-y-6 text-center">
		<p class="text-3xl font-bold text-white">Accès refusé</p>
		<p class="text-base text-light-blue/80">
			Vous n'avez pas les droits pour accéder à cette page.
		</p>
		<div class="flex justify-center">
			<CTAButton href={redirect} variant="secondary">Retour</CTAButton>
		</div>
	</div>
</section>
