import { json } from '@sveltejs/kit';
import { createUserClient } from '$lib/server/sso';

export const POST = async (event: any) => {
	const session = event.locals?.session;
	let payload: { password?: string; access_token?: string; refresh_token?: string } = {};
	try {
		payload = await event.request.json();
	} catch {
		return json({ error: 'Invalid JSON payload' }, { status: 400 });
	}

	const password = payload.password ?? '';
	if (!password) {
		return json({ error: 'Missing password' }, { status: 400 });
	}

	const accessToken = session?.access_token ?? payload.access_token;
	if (!accessToken) {
		return json({ error: 'Not authenticated' }, { status: 401 });
	}

	const client = createUserClient(accessToken);
	if (payload.refresh_token) {
		const { error } = await client.auth.setSession({
			access_token: accessToken,
			refresh_token: payload.refresh_token
		});
		if (error) {
			return json({ error: error.message }, { status: 400 });
		}
	}
	const { error } = await client.auth.updateUser({ password });
	if (error) {
		return json({ error: error.message }, { status: 400 });
	}

	return json({ ok: true });
};
