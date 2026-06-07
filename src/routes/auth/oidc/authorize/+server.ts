import { createUserClient } from '$lib/server/sso';
import { readJsonRecord } from '$lib/server/requestPayload';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const errorMessage = (error: unknown): string => {
	if (error instanceof Error) {
		return error.message;
	}
	if (typeof error === 'object' && error !== null && 'message' in error) {
		const message = (error as { message?: unknown }).message;
		return typeof message === 'string' ? message : 'OIDC authorization failed';
	}
	return 'OIDC authorization failed';
};

export const POST: RequestHandler = async (event) => {
	const session = event.locals.session;
	if (!session?.access_token) {
		return json({ error: 'Not authenticated' }, { status: 401 });
	}

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

	const client = createUserClient(session.access_token);
	const response = await client.functions.invoke<unknown>('oidc-authorize', { body: payload });
	if (response.error) {
		return json({ error: errorMessage(response.error) }, { status: 400 });
	}
	return json(response.data ?? {});
};
