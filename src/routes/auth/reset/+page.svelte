<script lang="ts">
	import { resolve } from '$app/paths';

	interface ResetErrorPayload {
		error?: string;
	}

	let email = $state('');
	let loading = $state<boolean>(false);
	let message = $state('');

	function isResetErrorPayload(value: unknown): value is ResetErrorPayload {
		return typeof value === 'object' && value !== null && 'error' in value;
	}

	const handleResetRequest = async (event: SubmitEvent) => {
		event.preventDefault();
		loading = true;
		const response = await fetch('/auth/reset-request', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});
		if (!response.ok) {
			const payload: unknown = await response.json().catch(() => ({}));
			alert(
				isResetErrorPayload(payload) && payload.error
					? payload.error
					: 'Erreur lors de la demande de reinitialisation.'
			);
		} else {
			message = 'Un e-mail de réinitialisation a été envoyé. Vérifiez votre boîte mail.';
		}
		loading = false;
	};
</script>

<section class="flex min-h-screen flex-col items-center justify-center px-6 py-8">
	<a class="mb-6 flex items-center text-2xl font-semibold text-white" href={resolve('/')}>
		<img class="mr-2 h-20" src="/white_logo.webp" alt="logo" />
	</a>
	<div class="w-full max-w-md rounded-lg border border-gray-700 bg-gray-800 p-6 shadow">
		<h1 class="mb-4 text-xl font-bold text-white">Reinitialiser le mot de passe</h1>
		{#if message}
			<p class="text-green-500">{message}</p>
		{:else}
			<form onsubmit={handleResetRequest} class="space-y-4">
				<div>
					<label for="email" class="mb-2 block text-sm font-medium text-white">Votre email</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						required
						class="w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
						placeholder="davincibot@devinci.fr"
					/>
				</div>
				<button
					type="submit"
					disabled={loading}
					class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-white focus:ring-4 focus:outline-none disabled:opacity-50"
				>
					{loading ? 'Envoi...' : 'Envoyer le lien de réinitialisation'}
				</button>
			</form>
		{/if}
	</div>
</section>
