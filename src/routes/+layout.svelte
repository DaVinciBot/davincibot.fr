<script lang="ts">
	import { userdata } from '@davincibot/lib';
	import type { Snippet } from 'svelte';
	import '../app.css';

	interface LayoutUser {
		id: string;
		email?: string | null;
	}

	interface Props {
		data: {
			user?: LayoutUser | null;
		};
		children?: Snippet;
	}

	let { data, children }: Props = $props();

	const userFallback = $derived(
		data.user
			? {
					id: data.user.id,
					email: data.user.email ?? '',
					name: data.user.email ? (data.user.email.split('@')[0] ?? '') : '',
					avatar: '',
					projects: [],
					permissions: [],
					allProjects: null
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
	<link href="/favicon.png" rel="icon" type="image/png" />
	<link href="/favicon.png" rel="apple-touch-icon" />
	<link color="#000000" href="/favicon.png" rel="mask-icon" />
	<link href="/favicon.png" rel="shortcut icon" />

	<!-- font -->
	<link href="https://fonts.googleapis.com" rel="preconnect" />
	<link crossorigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
	<link
		href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="bg-dark-blue min-h-screen min-w-screen font-['Almarai'] text-white antialiased">
	{@render children?.()}
</div>
