<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	let email = '';
	let loading = false;
	let message = '';

	const handleResetRequest = async () => {
		loading = true;
		const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `https://davincibot.fr/auth/reset/callback`
		});
		if (error) {
			alert(error.message);
		} else {
			message = 'Un e-mail de réinitialisation a été envoyé. Vérifiez votre boîte mail.';
		}
		loading = false;
	};
</script>

<section class="flex flex-col items-center justify-center min-h-screen px-6 py-8">
	<a class="flex items-center mb-6 text-2xl font-semibold text-white" href="/">
		<img class="h-20 mr-2" src="/white_logo.webp" alt="logo" />
	</a>
	<div class="w-full max-w-md p-6 bg-gray-800 border border-gray-700 rounded-lg shadow">
		<h1 class="mb-4 text-xl font-bold text-white">Réinitialiser le mot de passe</h1>
		{#if message}
			<p class="text-green-500">{message}</p>
		{:else}
			<form on:submit|preventDefault={handleResetRequest} class="space-y-4">
				<div>
					<label for="email" class="block mb-2 text-sm font-medium text-white">Votre email</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						required
						class="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
						placeholder="davincibot@devinci.fr"
					/>
				</div>
				<button
					type="submit"
					disabled={loading}
					class="w-full px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-primary-800 disabled:opacity-50"
				>
					{loading ? 'Envoi...' : 'Envoyer le lien de réinitialisation'}
				</button>
			</form>
		{/if}
	</div>
</section>

<style>
</style>
