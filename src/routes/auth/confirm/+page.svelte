<script>
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let status = $state('Confirmation en cours...');

	const sanitizeNext = (value) => {
		if (!value || typeof value !== 'string') {
			return '/';
		}
		return value.startsWith('/') ? value : '/';
	};

	onMount(async () => {
		const nextParam = sanitizeNext(page.url.searchParams.get('next'));
		const target = new URL(nextParam, window.location.origin);
		const hash = window.location.hash;

		const params = new URLSearchParams(window.location.hash.slice(1));
		const accessToken = params.get('access_token');
		const refreshToken = params.get('refresh_token');
		const expiresAt = params.get('expires_at');
		const expiresIn = params.get('expires_in');

		if (!accessToken || !refreshToken) {
			status = 'Lien invalide. Redirection en cours...';
			window.location.replace(target.toString());
			return;
		}

		try {
			const response = await fetch('/auth/session-from-tokens', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					access_token: accessToken,
					refresh_token: refreshToken,
					expires_at: expiresAt || undefined,
					expires_in: expiresIn || undefined
				})
			});

			if (!response.ok) {
				status = 'Impossible de valider la session. Redirection en cours...';
			}
		} catch {
			status = 'Erreur réseau. Redirection en cours...';
		}

		window.location.replace(`${target.toString()}${hash || ''}`);
	});
</script>

<section class="page">
	<div class="card">
		<h1>Confirmation</h1>
		<p>{status}</p>
	</div>
</section>

<style>
	:global(body) {
		margin: 0;
	}

	.page {
		min-height: 100vh;
		display: grid;
		place-items: center;
		background: linear-gradient(135deg, #f7f4ef, #f0f6ff);
		color: #1d1f23;
		font-family: 'Avenir Next', 'Trebuchet MS', sans-serif;
	}

	.card {
		background: #ffffff;
		padding: 32px 28px;
		border-radius: 16px;
		text-align: center;
		width: min(90vw, 460px);
		box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12);
	}

	h1 {
		margin: 0 0 12px;
		font-size: 22px;
		font-weight: 700;
	}

	p {
		margin: 0;
		color: #4c5a6a;
		font-size: 15px;
	}
</style>
