import { createUserClient } from '$lib/server/sso';
import { readJsonRecord, readOptionalString } from '$lib/server/requestPayload';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async (event) => {
	const session = event.locals.session;
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

	const password = readOptionalString(payload, 'password') ?? '';
	if (!password) {
		return json({ error: 'Missing password' }, { status: 400 });
	}

	const accessToken = session?.access_token ?? readOptionalString(payload, 'access_token');
	if (!accessToken) {
		return json({ error: 'Not authenticated' }, { status: 401 });
	}

	const client = createUserClient(accessToken);
	const refreshToken = readOptionalString(payload, 'refresh_token');
	if (refreshToken) {
		const { error } = await client.auth.setSession({
			access_token: accessToken,
			refresh_token: refreshToken
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
