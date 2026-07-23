import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		conditions: ['browser']
	},
	test: {
		environment: 'jsdom',
		setupFiles: ['tests/vitest-setup.ts'],
		include: ['src/**/*.{test,spec}.{js,ts}', 'tests/unit/**/*.{test,spec}.{js,ts}'],
		exclude: ['tests/e2e/**'],
		coverage: {
			provider: 'v8',
			include: [
				'src/lib/permissions.ts',
				'src/lib/server/blogPosts.ts',
				'src/lib/markdown/parse.ts',
				'src/lib/utils.ts',
				'src/lib/config/site.ts',
				'src/lib/server/sso.ts',
				'src/routes/auth/session/+server.ts',
				'src/routes/auth/session-from-tokens/+server.ts',
				'src/routes/auth/login/+server.ts'
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
