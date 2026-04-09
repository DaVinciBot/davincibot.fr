import { createAnonClient, createUserClient } from '$lib/server/sso';
import { type EmailOtpType } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';

export const GET = async (event: any) => {
	const { url } = event;
	const token_hash =
		(url.searchParams.get('token_hash') as string) ?? (url.searchParams.get('token') as string);
	const type = url.searchParams.get('type') as EmailOtpType | null;
	const next = url.searchParams.get('next') ?? '/';

	const redirectTo = new URL(url);
	redirectTo.pathname = next;
	redirectTo.searchParams.delete('token_hash');
	redirectTo.searchParams.delete('token');
	redirectTo.searchParams.delete('type');

	if (token_hash && type) {
		const anon = createAnonClient();
		const { data, error } = await anon.auth.verifyOtp({ token_hash, type });
		if (!error && data?.session && data?.user) {
			const userClient = createUserClient(data.session.access_token);
			const expiresAtIso = new Date(data.session.expires_at * 1000).toISOString();
			const { data: inserted } = await userClient.schema('sso').rpc('create_server_session', {
				p_access_token: data.session.access_token,
				p_refresh_token: data.session.refresh_token,
				p_expires_at: expiresAtIso
			});

			const sessionId = inserted?.[0]?.session_id ?? inserted?.session_id;
			const sessionSecret = inserted?.[0]?.session_secret ?? inserted?.session_secret;
			if (sessionId && sessionSecret) {
				const maxAge = Math.max(0, data.session.expires_at - Math.floor(Date.now() / 1000));
				const secure = url.protocol === 'https:';
				event.cookies.set('sid', `${sessionId}.${sessionSecret}`, {
					path: '/',
					httpOnly: true,
					sameSite: 'lax',
					secure,
					maxAge
				});
			}

			redirectTo.searchParams.delete('next');
			throw redirect(303, redirectTo);
		}
	}

	redirectTo.pathname = '/';
	throw redirect(303, redirectTo);
};
