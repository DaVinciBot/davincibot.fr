<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<section>
	<div class="flex h-screen flex-col items-center justify-center">
		<div class="flex flex-col items-center justify-center">
			<img class="mx-auto w-1/2" alt="404" src="/404.webp" />
			<h1 class="text-4xl font-bold text-gray-100">Accès refusé</h1>
			<p class="text-light-blue/80 text-base">
				Vous n'avez pas les droits pour accéder à cette page.
			</p>
			<a class="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white" href={resolve('/')}>Retour</a>
		</div>
	</div>
</section>
