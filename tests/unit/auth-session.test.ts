import { describe, expect, it } from 'vitest';

import { GET } from '../../src/routes/auth/session/+server';

type SessionEvent = Parameters<typeof GET>[0];

describe('GET /auth/session', () => {
	it('returns sanitized session and user payload', async () => {
		const response = await GET({
			locals: {
				session: {
					id: 'sid',
					expires_at: 1_700_000_000,
					user_id: 'u-1',
					access_token: 'hidden'
				},
				user: {
					id: 'u-1',
					email: 'user@example.com',
					app_metadata: { role: 'member' },
					user_metadata: { nickname: 'User' }
				}
			}
		} as unknown as SessionEvent);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({
			session: {
				id: 'sid',
				expires_at: 1_700_000_000,
				user_id: 'u-1'
			},
			user: {
				id: 'u-1',
				email: 'user@example.com',
				app_metadata: { role: 'member' },
				user_metadata: { nickname: 'User' }
			}
		});
	});

	it('returns null objects when locals session is missing', async () => {
		const response = await GET({ locals: {} } as unknown as SessionEvent);

		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({ session: null, user: null });
	});
});
