import { createUserClient } from '$lib/server/sso';
import { json } from '@sveltejs/kit';

type TokenPayload = {
	access_token?: string;
	refresh_token?: string;
	expires_in?: number;
	expires_at?: number;
};

const parseNumber = (value: unknown) => {
	if (typeof value === 'number') return Number.isFinite(value) ? value : null;
	if (typeof value === 'string' && value.trim()) {
		const parsed = Number(value);
		return Number.isFinite(parsed) ? parsed : null;
	}
	return null;
};

export const POST = async (event: any) => {
	try {
		let payload: TokenPayload = {};
		try {
			payload = await event.request.json();
		} catch {
			return json({ error: 'Invalid JSON payload' }, { status: 400 });
		}

		const accessToken = payload.access_token?.trim();
		const refreshToken = payload.refresh_token?.trim();
		if (!accessToken || !refreshToken) {
			return json({ error: 'Missing access or refresh token' }, { status: 400 });
		}

		const expiresAtParam = parseNumber(payload.expires_at);
		const expiresInParam = parseNumber(payload.expires_in);
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

		const sessionId = inserted?.[0]?.session_id ?? inserted?.session_id;
		const sessionSecret = inserted?.[0]?.session_secret ?? inserted?.session_secret;
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
