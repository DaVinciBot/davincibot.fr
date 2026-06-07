import { createAnonClient, createUserClient } from '$lib/server/sso';
import { readJsonRecord, readOptionalString } from '$lib/server/requestPayload';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
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

	const email = readOptionalString(payload, 'email')?.trim().toLowerCase();
	const password = readOptionalString(payload, 'password') ?? '';
	if (!email || !password) {
		return json({ error: 'Missing email or password' }, { status: 400 });
	}

	const anon = createAnonClient();
	const { data, error } = await anon.auth.signInWithPassword({ email, password });
	if (error) {
		return json({ error: error.message }, { status: 401 });
	}
	const sessionExpiresAt =
		typeof data.session.expires_at === 'number'
			? data.session.expires_at
			: Math.floor(Date.now() / 1000);

	const userClient = createUserClient(data.session.access_token);
	const expiresAtIso = new Date(sessionExpiresAt * 1000).toISOString();
	const { data: inserted, error: insertError } = await userClient
		.schema('sso')
		.rpc('create_server_session', {
			p_access_token: data.session.access_token,
			p_refresh_token: data.session.refresh_token,
			p_expires_at: expiresAtIso
		});

	const createdSession = inserted?.[0];
	const sessionId = createdSession?.session_id;
	const sessionSecret = createdSession?.session_secret;
	if (insertError || !sessionId || !sessionSecret) {
		return json({ error: insertError?.message ?? 'Failed to create session' }, { status: 500 });
	}

	const maxAge = Math.max(0, sessionExpiresAt - Math.floor(Date.now() / 1000));
	const secure = event.url.protocol === 'https:';
	event.cookies.set('sid', `${sessionId}.${sessionSecret}`, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure,
		maxAge
	});

	return json({ ok: true, user: { id: data.user.id, email: data.user.email } });
};
