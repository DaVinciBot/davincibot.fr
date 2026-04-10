<script>
	import AuthForm from '$lib/components/utils/AuthForm.svelte';
	import { onMount } from 'svelte';

	let initializing = true;
	let error = '';

	onMount(async () => {
		const hash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : '';
		const hashParams = new URLSearchParams(hash);
		const queryParams = new URLSearchParams(window.location.search);

		const access_token = hashParams.get('access_token') ?? queryParams.get('access_token') ?? '';
		const refresh_token = hashParams.get('refresh_token') ?? queryParams.get('refresh_token') ?? '';
		const expires_in = hashParams.get('expires_in') ?? queryParams.get('expires_in');
		const expires_at = hashParams.get('expires_at') ?? queryParams.get('expires_at');
		const errorParam =
			hashParams.get('error_description') ||
			hashParams.get('error') ||
			queryParams.get('error_description') ||
			queryParams.get('error');

		if (errorParam) {
			error = decodeURIComponent(errorParam);
			initializing = false;
			return;
		}

		if (!access_token || !refresh_token) {
			error = "Le lien d'invitation est invalide ou expire. Veuillez demander un nouveau lien.";
			initializing = false;
			return;
		}

		const payload = { access_token, refresh_token };
		if (expires_in) payload.expires_in = Number(expires_in);
		if (expires_at) payload.expires_at = Number(expires_at);

		const response = await fetch('/auth/session-from-tokens', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});

		if (!response.ok) {
			const data = await response
				.json()
				.catch(async () => ({ error: (await response.text().catch(() => '')).trim() }));
			error =
				data?.error ||
				`Impossible d'initialiser la session (HTTP ${response.status}). Veuillez demander un nouveau lien.`;
			initializing = false;
			return;
		}

		window.history.replaceState({}, '', window.location.pathname + window.location.search);
		initializing = false;
	});
</script>

<section class="min-h-screen min-w-screen">
	{#if initializing}
		<div class="flex min-h-screen items-center justify-center text-white">Chargement...</div>
	{:else if error}
		<div class="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
			<p class="text-white">{error}</p>
			<a class="text-blue-300 hover:underline" href="/auth/login">Retour a la connexion</a>
		</div>
	{:else}
		<AuthForm auth_type="register" />
	{/if}
</section>

<style>
</style>
