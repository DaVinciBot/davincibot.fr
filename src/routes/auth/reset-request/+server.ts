import { createAnonClient } from '$lib/server/sso';
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
