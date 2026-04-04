import { json } from '@sveltejs/kit';
import { createUserClient } from '$lib/server/sso';

export const POST = async (event: any) => {
	const session = event.locals?.session;
	if (!session?.access_token) {
		return json({ error: 'Not authenticated' }, { status: 401 });
	}

	let payload: Record<string, unknown> = {};
	try {
		payload = await event.request.json();
	} catch {
		return json({ error: 'Invalid JSON payload' }, { status: 400 });
	}

	const client = createUserClient(session.access_token);
	const { data, error } = await client.functions.invoke('oidc-authorize', { body: payload });
	if (error) {
		return json({ error: error.message }, { status: 400 });
	}
	return json(data ?? {});
};
