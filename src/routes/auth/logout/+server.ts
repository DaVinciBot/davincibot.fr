import { createAnonClient } from '$lib/server/sso';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	const rawSid = event.cookies.get('sid');
	const [sessionId = null, sessionSecret = null] = rawSid?.split('.', 2) ?? [];
	if (sessionId && sessionSecret) {
		const anon = createAnonClient();
		await anon.schema('sso').rpc('revoke_server_session', {
			p_session_id: sessionId,
			p_session_secret: sessionSecret
		});
	}

	event.cookies.delete('sid', { path: '/' });
	return json({ ok: true });
};
