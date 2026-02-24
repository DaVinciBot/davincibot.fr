<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import { loadUserdata } from '$lib/utils';
	import { userdata } from '$lib/store';

	export let data;

	$: ({ supabase, session } = data);

	onMount(async () => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(async (event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
			if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
				await loadUserdata(supabase);
			} else if (event === 'SIGNED_OUT') {
				userdata.set(null);
				localStorage.removeItem('userdata_cache');
			}
		});

		await loadUserdata(supabase);

		return () => subscription.unsubscribe();
	});
</script>

<svelte:head>
	<!-- meta favicon -->
	<link rel="icon" type="image/png" href="/favicon.png" />
	<link rel="apple-touch-icon" href="/favicon.png" />
	<link rel="mask-icon" href="/favicon.png" color="#000000" />
	<link rel="shortcut icon" href="/favicon.png" />

	<!-- font -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="min-h-screen antialiased bg-dark-blue text-white min-w-screen font-['Almarai']">
	<slot />
</div>
