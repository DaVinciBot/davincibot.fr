import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
	const rpc = vi.fn();
	const client = {
		schema: vi.fn(() => ({ rpc }))
	};

	return {
		rpc,
		client,
		createUserClient: vi.fn(() => client)
	};
});

vi.mock('$lib/server/sso', () => ({
	createUserClient: mocks.createUserClient
}));

import { POST } from '../../src/routes/auth/session-from-tokens/+server';

type SessionFromTokensEvent = Parameters<typeof POST>[0];
type JsonMock = ReturnType<typeof vi.fn<() => Promise<unknown>>>;
type CookieSetMock = ReturnType<typeof vi.fn>;
type SessionFromTokensTestEvent = SessionFromTokensEvent & {
	request: { json: JsonMock };
	cookies: { set: CookieSetMock };
};

function makeEvent(
	payload: unknown,
	protocol: 'http:' | 'https:' = 'https:'
): SessionFromTokensTestEvent {
	return {
		request: {
			json: vi.fn(() => Promise.resolve(payload))
		},
		cookies: {
			set: vi.fn()
		},
		url: new URL(`${protocol}//davincibot.fr/auth/session-from-tokens`)
	} as unknown as SessionFromTokensTestEvent;
}

describe('POST /auth/session-from-tokens', () => {
	beforeEach(() => {
		mocks.rpc.mockReset();
		mocks.client.schema.mockClear();
		mocks.createUserClient.mockClear();
	});

	it('returns 400 for invalid payload', async () => {
		const event = {
			request: { json: vi.fn(() => Promise.resolve({ access_token: '' })) },
			cookies: { set: vi.fn() },
			url: new URL('https://davincibot.fr/auth/session-from-tokens')
		} as unknown as SessionFromTokensTestEvent;

		const response = await POST(event);
		expect(response.status).toBe(400);
		expect(await response.json()).toEqual({ error: 'Missing access or refresh token' });
	});

	it('returns 400 when request body is not JSON', async () => {
		const event = makeEvent({});
		event.request.json = vi.fn(() => Promise.reject(new Error('invalid json')));

		const response = await POST(event);
		expect(response.status).toBe(400);
		expect(await response.json()).toEqual({ error: 'Invalid JSON payload' });
	});

	it('creates cookie and returns ok when session creation succeeds', async () => {
		mocks.rpc.mockResolvedValue({
			data: [{ session_id: 'sid', session_secret: 'secret' }],
			error: null
		});

		const event = makeEvent({
			access_token: 'access',
			refresh_token: 'refresh',
			expires_in: 3600
		});

		const response = await POST(event);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ ok: true });
		expect(mocks.createUserClient).toHaveBeenCalledWith('access');
		expect(mocks.rpc).toHaveBeenCalledTimes(1);
		expect(event.cookies.set).toHaveBeenCalledWith(
			'sid',
			'sid.secret',
			expect.objectContaining({
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: true
			})
		);
	});

	it('returns 400 when rpc call fails', async () => {
		mocks.rpc.mockResolvedValue({ data: null, error: { message: 'rpc error' } });
		const event = makeEvent({ access_token: 'access', refresh_token: 'refresh', expires_in: 3600 });

		const response = await POST(event);
		expect(response.status).toBe(400);
		expect(await response.json()).toEqual({ error: 'rpc error' });
	});

	it('returns 500 when rpc does not return identifiers', async () => {
		mocks.rpc.mockResolvedValue({ data: [{}], error: null });
		const event = makeEvent({ access_token: 'access', refresh_token: 'refresh', expires_in: 3600 });

		const response = await POST(event);
		expect(response.status).toBe(500);
		expect(await response.json()).toEqual({ error: 'Session creation failed' });
	});
});
