<script lang="ts">
	import { userdata } from '$lib/store';
	import type { Snippet } from 'svelte';
	import '../app.css';

	interface LayoutUser {
		id: string;
		email?: string | null;
	}

	interface LayoutProps {
		data: {
			user?: LayoutUser | null;
		};
		children?: Snippet;
	}

	const { data, children }: LayoutProps = $props();

	const userFallback = $derived(
		data.user
			? {
					id: data.user.id,
					email: data.user.email ?? '',
					name: data.user.email ? data.user.email.split('@')[0] : ''
				}
			: null
	);
	const authUser = $derived(userFallback);

	$effect(() => {
		if (authUser) {
			userdata.set(authUser);
		} else {
			userdata.set(null);
		}
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
	{@render children?.()}
</div>
