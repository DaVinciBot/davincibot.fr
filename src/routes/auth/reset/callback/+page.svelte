<script lang="ts">
	import AuthForm from '$lib/components/utils/AuthForm.svelte';
	import { onMount } from 'svelte';

	let accessToken = $state('');
	let refreshToken = $state('');

	onMount(() => {
		const params = new URLSearchParams(window.location.hash.slice(1));
		accessToken = params.get('access_token') ?? '';
		refreshToken = params.get('refresh_token') ?? '';
	});
</script>

<section class="min-h-screen bg-slate-800">
	<AuthForm
		auth_type="reset"
		redirect_uri="/admin/profile"
		access_token={accessToken}
		refresh_token={refreshToken}
	/>
</section>
