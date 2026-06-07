import { createUserClient } from '$lib/server/sso';
import { readJsonRecord, readOptionalNumber, readOptionalString } from '$lib/server/requestPayload';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	try {
		let payload: Record<string, unknown>;
		try {
			const parsed = await readJsonRecord(event.request);
			if (!parsed) {
				return json({ error: 'Invalid JSON payload' }, { status: 400 });
			}
			payload = parsed;
		} catch {
			return json({ error: 'Invalid JSON payload' }, { status: 400 });
		}

		const accessToken = readOptionalString(payload, 'access_token')?.trim();
		const refreshToken = readOptionalString(payload, 'refresh_token')?.trim();
		if (!accessToken || !refreshToken) {
			return json({ error: 'Missing access or refresh token' }, { status: 400 });
		}

		const expiresAtParam = readOptionalNumber(payload, 'expires_at');
		const expiresInParam = readOptionalNumber(payload, 'expires_in');
		const expiresAtIso = (() => {
			if (expiresAtParam) {
				return new Date(expiresAtParam * 1000).toISOString();
			}
			if (expiresInParam) {
				return new Date(Date.now() + expiresInParam * 1000).toISOString();
			}
			return new Date(Date.now() + 60 * 60 * 1000).toISOString();
		})();

		const client = createUserClient(accessToken);
		const { data: inserted, error } = await client.schema('sso').rpc('create_server_session', {
			p_access_token: accessToken,
			p_refresh_token: refreshToken,
			p_expires_at: expiresAtIso
		});

		if (error) {
			return json({ error: error.message }, { status: 400 });
		}

		const createdSession = inserted[0];
		const sessionId = createdSession?.session_id;
		const sessionSecret = createdSession?.session_secret;
		if (!sessionId || !sessionSecret) {
			return json({ error: 'Session creation failed' }, { status: 500 });
		}

		const secure = event.url.protocol === 'https:';
		event.cookies.set('sid', `${sessionId}.${sessionSecret}`, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure,
			maxAge: Math.max(0, Math.floor((new Date(expiresAtIso).getTime() - Date.now()) / 1000))
		});

		return json({ ok: true });
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unexpected error';
		return json({ error: message }, { status: 500 });
	}
};
