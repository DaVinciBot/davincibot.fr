import { json } from '@sveltejs/kit';
import { createAnonClient, createUserClient } from '$lib/server/sso';

export const POST = async (event: any) => {
	let payload: { email?: string; password?: string } = {};
	try {
		payload = await event.request.json();
	} catch {
		return json({ error: 'Invalid JSON payload' }, { status: 400 });
	}

	const email = payload.email?.trim().toLowerCase();
	const password = payload.password ?? '';
	if (!email || !password) {
		return json({ error: 'Missing email or password' }, { status: 400 });
	}

	const anon = createAnonClient();
	const { data, error } = await anon.auth.signInWithPassword({ email, password });
	if (error || !data?.session || !data?.user) {
		return json({ error: error?.message ?? 'Invalid credentials' }, { status: 401 });
	}

	const userClient = createUserClient(data.session.access_token);
	const expiresAtIso = new Date(data.session.expires_at * 1000).toISOString();
	const { data: inserted, error: insertError } = await userClient
		.schema('sso')
		.rpc('create_server_session', {
			p_access_token: data.session.access_token,
			p_refresh_token: data.session.refresh_token,
			p_expires_at: expiresAtIso
		});

	const sessionId = inserted?.[0]?.session_id ?? inserted?.session_id;
	const sessionSecret = inserted?.[0]?.session_secret ?? inserted?.session_secret;
	if (insertError || !sessionId || !sessionSecret) {
		return json({ error: insertError?.message ?? 'Failed to create session' }, { status: 500 });
	}

	const maxAge = Math.max(0, data.session.expires_at - Math.floor(Date.now() / 1000));
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
