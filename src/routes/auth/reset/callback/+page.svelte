<script lang="ts">
	import AuthForm from '$lib/components/utils/AuthForm.svelte';
	import { onMount } from 'svelte';

	let initializing = true;
	let error = '';

	onMount(async () => {
		const hash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : '';
		const params = new URLSearchParams(hash);
		const access_token = params.get('access_token') ?? '';
		const refresh_token = params.get('refresh_token') ?? '';
		const expires_in = params.get('expires_in');
		const expires_at = params.get('expires_at');

		if (!access_token || !refresh_token) {
			error =
				'Le lien de réinitialisation est invalide ou expiré. Veuillez demander un nouveau lien.';
			initializing = false;
			return;
		}

		const payload: Record<string, string | number> = { access_token, refresh_token };
		if (expires_in) payload.expires_in = Number(expires_in);
		if (expires_at) payload.expires_at = Number(expires_at);

		const response = await fetch('/auth/session-from-tokens', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});

		if (!response.ok) {
			const data = await response.json().catch(() => ({}));
			error =
				data?.error || "Impossible d'initialiser la session. Veuillez demander un nouveau lien.";
			initializing = false;
			return;
		}

		window.history.replaceState({}, '', window.location.pathname + window.location.search);
		initializing = false;
	});
</script>

<section class="min-h-screen bg-slate-800">
	{#if initializing}
		<div class="flex min-h-screen items-center justify-center text-white">Chargement...</div>
	{:else if error}
		<div class="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
			<p class="text-white">{error}</p>
			<a class="text-blue-300 hover:underline" href="/auth/reset"> Redemander un lien </a>
		</div>
	{:else}
		<AuthForm auth_type="reset" redirect_uri="/admin/profile" />
	{/if}
</section>

<style></style>
