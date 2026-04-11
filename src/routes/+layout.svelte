<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { userdata } from '$lib/store';

	export let data;

	$: userProfile = data.userProfile;
	$: userFallback = data.user
		? {
				id: data.user.id,
				email: data.user.email || '',
				name: data.user.email ? data.user.email.split('@')[0] : ''
			}
		: null;
	$: authUser = userProfile || userFallback;

	onMount(() => {
		if (authUser) {
			userdata.set(authUser);
		} else {
			userdata.set(null);
		}
	});

	$: {
		if (authUser) {
			userdata.set(authUser);
		} else {
			userdata.set(null);
		}
	}
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
