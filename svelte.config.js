import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';



/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		prerender: {
			entries: [
				'/',
				'/robots.txt',
				'/blog',
				'/sponsors',
				'/contact',
				'/admin',
				'/caroussel',
				'/auth/sign-up',
				'/auth/login',
				'/auth/oauth',
				'/auth/reset',
				'/auth/reset/callback',
				'/admin/projects',
				'/admin/orders',
				'/admin/screen-share',
				'/admin/treso',
				'/admin/orders/new',
				'/admin/users/',
				'/admin/wip',
				'/admin/profile',
			]
		}
	},
	preprocess: vitePreprocess(),

};

export default config;
