import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
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
