import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
	const signInWithPassword = vi.fn();
	const rpc = vi.fn();

	const anonClient = {
		auth: {
			signInWithPassword
		}
	};

	const userClient = {
		schema: vi.fn(() => ({ rpc }))
	};

	return {
		signInWithPassword,
		rpc,
		createAnonClient: vi.fn(() => anonClient),
		createUserClient: vi.fn(() => userClient)
	};
});

vi.mock('$lib/server/sso', () => ({
	createAnonClient: mocks.createAnonClient,
	createUserClient: mocks.createUserClient
}));

import { POST } from '../../src/routes/auth/login/+server';

function makeEvent(payload: unknown, protocol: 'http:' | 'https:' = 'https:') {
	return {
		request: {
			json: vi.fn(async () => payload)
		},
		cookies: {
			set: vi.fn()
		},
		url: new URL(`${protocol}//davincibot.fr/auth/login`)
	};
}

describe('POST /auth/login', () => {
	beforeEach(() => {
		mocks.signInWithPassword.mockReset();
		mocks.rpc.mockReset();
		mocks.createAnonClient.mockClear();
		mocks.createUserClient.mockClear();
	});

	it('returns 400 for invalid payload', async () => {
		const event = makeEvent({ email: '', password: '' });

		const response = await POST(event as any);
		expect(response.status).toBe(400);
		expect(await response.json()).toEqual({ error: 'Missing email or password' });
	});

	it('returns 401 when credentials are rejected', async () => {
		mocks.signInWithPassword.mockResolvedValue({
			data: { session: null, user: null },
			error: { message: 'invalid credentials' }
		});

		const event = makeEvent({ email: 'USER@EXAMPLE.COM', password: 'secret' });
		const response = await POST(event as any);

		expect(response.status).toBe(401);
		expect(await response.json()).toEqual({ error: 'invalid credentials' });
		expect(mocks.signInWithPassword).toHaveBeenCalledWith({
			email: 'user@example.com',
			password: 'secret'
		});
	});

	it('creates a server session cookie for successful login', async () => {
		const expiresAt = Math.floor(Date.now() / 1000) + 3600;

		mocks.signInWithPassword.mockResolvedValue({
			data: {
				session: {
					access_token: 'access',
					refresh_token: 'refresh',
					expires_at: expiresAt
				},
				user: {
					id: 'u-1',
					email: 'user@example.com'
				}
			},
			error: null
		});
		mocks.rpc.mockResolvedValue({
			data: [{ session_id: 'sid', session_secret: 'secret' }],
			error: null
		});

		const event = makeEvent({ email: 'user@example.com', password: 'secret' });
		const response = await POST(event as any);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({
			ok: true,
			user: { id: 'u-1', email: 'user@example.com' }
		});
		expect(mocks.createUserClient).toHaveBeenCalledWith('access');
		expect(event.cookies.set).toHaveBeenCalledWith(
			'sid',
			'sid.secret',
			expect.objectContaining({ secure: true, path: '/', sameSite: 'lax', httpOnly: true })
		);
	});

	it('returns 500 when server session creation fails', async () => {
		const expiresAt = Math.floor(Date.now() / 1000) + 3600;

		mocks.signInWithPassword.mockResolvedValue({
			data: {
				session: {
					access_token: 'access',
					refresh_token: 'refresh',
					expires_at: expiresAt
				},
				user: { id: 'u-1', email: 'user@example.com' }
			},
			error: null
		});
		mocks.rpc.mockResolvedValue({
			data: null,
			error: { message: 'cannot create session' }
		});

		const event = makeEvent({ email: 'user@example.com', password: 'secret' });
		const response = await POST(event as any);

		expect(response.status).toBe(500);
		expect(await response.json()).toEqual({ error: 'cannot create session' });
	});
});
