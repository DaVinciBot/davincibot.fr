import { json } from '@sveltejs/kit';
import { createAnonClient } from '$lib/server/sso';

export const POST = async (event: any) => {
	const rawSid = event.cookies.get('sid');
	const [sessionId, sessionSecret] = rawSid ? rawSid.split('.') : [null, null];
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
