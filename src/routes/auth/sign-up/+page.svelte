<script lang="ts">
	import { resolve } from '$app/paths';
	import AuthForm from '$lib/components/utils/AuthForm.svelte';
	import { onMount } from 'svelte';

	interface SessionPayload {
		access_token: string;
		refresh_token: string;
		expires_in?: number;
		expires_at?: number;
	}

	interface ErrorPayload {
		error?: string;
	}

	let initializing = $state(true);
	let error = $state('');
	let access_token = $state('');
	let refresh_token = $state('');

	function isErrorPayload(value: unknown): value is ErrorPayload {
		return typeof value === 'object' && value !== null && 'error' in value;
	}

	onMount(async () => {
		const hash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : '';
		const hashParams = new URLSearchParams(hash);
		const queryParams = new URLSearchParams(window.location.search);

		access_token = hashParams.get('access_token') ?? queryParams.get('access_token') ?? '';
		refresh_token = hashParams.get('refresh_token') ?? queryParams.get('refresh_token') ?? '';
		const expires_in = hashParams.get('expires_in') ?? queryParams.get('expires_in');
		const expires_at = hashParams.get('expires_at') ?? queryParams.get('expires_at');
		const errorParam =
			hashParams.get('error_description') ??
			hashParams.get('error') ??
			queryParams.get('error_description') ??
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

		const payload: SessionPayload = { access_token, refresh_token };
		if (expires_in) {
			payload.expires_in = Number(expires_in);
		}
		if (expires_at) {
			payload.expires_at = Number(expires_at);
		}

		const response = await fetch('/auth/session-from-tokens', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});

		if (!response.ok) {
			const data: unknown = await response
				.json()
				.catch(async () => ({ error: (await response.text().catch(() => '')).trim() }));
			error =
				isErrorPayload(data) && data.error
					? data.error
					: `Impossible d'initialiser la session (HTTP ${String(
							response.status
						)}). Veuillez demander un nouveau lien.`;
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
			<a class="text-blue-300 hover:underline" href={resolve('/auth/login')}>
				Retour a la connexion
			</a>
		</div>
	{:else}
		<AuthForm auth_type="register" {access_token} {refresh_token} />
	{/if}
</section>
