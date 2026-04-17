import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,ts}', 'tests/unit/**/*.{test,spec}.{js,ts}'],
		exclude: ['tests/e2e/**'],
		coverage: {
			provider: 'v8',
			include: [
				'src/lib/permissions.js',
				'src/lib/server/blogPosts.js',
				'src/lib/markdown/parse.js',
				'src/lib/utils.js',
				'src/lib/config/site.js',
				'src/lib/server/sso.ts',
				'src/routes/auth/session/+server.ts',
				'src/routes/auth/session-from-tokens/+server.ts',
				'src/routes/auth/login/+server.ts',
				'src/lib/components/modals/UserImportModal.svelte'
			],
			reporter: ['text', 'html', 'lcov'],
			thresholds: {
				lines: 50,
				functions: 50,
				branches: 50,
				statements: 50
			}
		}
	}
});
