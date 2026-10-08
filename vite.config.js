import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			alias: { $lib: 'src/lib' },
			preprocess: vitePreprocess(),
			adapter: adapter(),
			prerender: {
				handleHttpError: ({ status, path, message }) => {
					if (path.startsWith('/auth/')) {
						return;
					}
					if (status === 404 && (path === '/formation' || path.startsWith('/formation/'))) {
						return;
					}

					throw new Error(message);
				}
			}
		})
	],
	server: {
		port: 5174,
		origin: 'http://localhost:5174',
		proxy: {
			'/admin': {
				target: 'http://localhost:5175',
				changeOrigin: true,
				ws: true
			},
			'/formation': {
				target: 'http://localhost:5176',
				changeOrigin: true,
				ws: true
			}
		}
	}
});
