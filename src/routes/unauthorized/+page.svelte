<script lang="ts">
	import { run } from 'svelte/legacy';

	import { page } from '$app/state';

	let redirect = $state('/');
	run(() => {
		redirect = page.url.searchParams.get('redirect') || '/';
	});
</script>

<section>
	<div class="flex flex-col items-center justify-center h-screen">
		<div class="flex flex-col items-center justify-center">
			<img src="/404.webp" alt="404" class="mx-auto w-1/2" />
			<h1 class="text-4xl font-bold text-gray-100">Accès refusé</h1>
			<p class="text-base text-light-blue/80">
				Vous n'avez pas les droits pour accéder à cette page.
			</p>
			<a href="/" class="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md">Retour</a>
		</div>
	</div>
</section>
