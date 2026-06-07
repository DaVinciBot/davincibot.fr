import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
	createClient: vi.fn()
}));

vi.mock('$env/dynamic/public', () => ({
	env: {
		PUBLIC_SUPABASE_URL: 'https://example.supabase.co',
		PUBLIC_SUPABASE_PUBLISHABLE_KEY: 'pk-test'
	}
}));

vi.mock('@supabase/supabase-js', () => ({
	createClient: mocks.createClient
}));

import { createAnonClient, createUserClient, decodeJwt } from '../../src/lib/server/sso';

describe('server sso helpers', () => {
	beforeEach(() => {
		mocks.createClient.mockReset();
		mocks.createClient.mockReturnValue({ client: true });
	});

	it('createAnonClient creates a stateless supabase client', () => {
		const client = createAnonClient();

		expect(client).toEqual({ client: true });
		expect(mocks.createClient).toHaveBeenCalledWith('https://example.supabase.co', 'pk-test', {
			auth: { persistSession: false, autoRefreshToken: false }
		});
	});

	it('createUserClient attaches bearer authorization header', () => {
		createUserClient('access-token');

		expect(mocks.createClient).toHaveBeenCalledWith('https://example.supabase.co', 'pk-test', {
			global: {
				headers: {
					Authorization: 'Bearer access-token'
				}
			},
			auth: { persistSession: false, autoRefreshToken: false }
		});
	});

	it('decodeJwt decodes payload from a valid token', () => {
		const payload = Buffer.from(JSON.stringify({ sub: 'u-1', email: 'a@b.c' })).toString('base64');
		const token = `header.${payload}.sig`;

		expect(decodeJwt(token)).toEqual({
			sub: 'u-1',
			email: 'a@b.c',
			app_metadata: {},
			user_metadata: {}
		});
	});

	it('decodeJwt returns null for malformed tokens', () => {
		expect(decodeJwt('invalid')).toBeNull();
		expect(decodeJwt('header..sig')).toBeNull();
	});
});
