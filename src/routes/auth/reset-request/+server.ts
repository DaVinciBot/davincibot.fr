import { createAnonClient } from '$lib/server/sso';
import { json } from '@sveltejs/kit';

export const POST = async (event: any) => {
	let payload: { email?: string } = {};
	try {
		payload = await event.request.json();
	} catch {
		return json({ error: 'Invalid JSON payload' }, { status: 400 });
	}

	const email = payload.email?.trim().toLowerCase();
	if (!email) {
		return json({ error: 'Missing email' }, { status: 400 });
	}

	const anon = createAnonClient();
	const redirectTo = `${event.url.origin}/auth/confirm?next=/auth/reset/callback`;
	const { error } = await anon.auth.resetPasswordForEmail(email, { redirectTo });
	if (error) {
		return json({ error: error.message }, { status: 400 });
	}

	return json({ ok: true });
};
