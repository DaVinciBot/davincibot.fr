import { building } from '$app/environment';
import { createAnonClient, createUserClient, decodeJwt } from '$lib/server/sso';
import type { AppSession, AppUser } from '$lib/server/sso';
import type { Handle, RequestEvent } from '@sveltejs/kit';
import type { ServerSessionRow } from './database.types';

interface CachedSession {
	session: AppSession;
	user: AppUser;
	timestamp: number;
}

const SESSION_CACHE_TTL_MS = 5 * 60 * 1000;
const SESSION_REFRESH_GRACE_MS = 2 * 60 * 1000;
const sessionCache = new Map<string, CachedSession>();

const getCachedSession = (cacheKey: string): CachedSession | null => {
	const cached = sessionCache.get(cacheKey);
	if (!cached) {
		return null;
	}
	if (Date.now() - cached.timestamp > SESSION_CACHE_TTL_MS) {
		sessionCache.delete(cacheKey);
		return null;
	}
	return cached;
};

const clearSessionCookie = (event: RequestEvent) => {
	event.cookies.delete('sid', { path: '/' });
};

const makeSession = (
	sessionId: string,
	accessToken: string,
	refreshToken: string,
	expiresAt: number,
	userId: string
): AppSession => ({
	id: sessionId,
	access_token: accessToken,
	refresh_token: refreshToken,
	expires_at: expiresAt,
	user_id: userId
});

const makeUser = (accessToken: string, fallbackUserId: string): AppUser => {
	const jwt = decodeJwt(accessToken);

	return {
		id: jwt?.sub ?? fallbackUserId,
		email: jwt?.email ?? null,
		app_metadata: jwt?.app_metadata ?? {},
		user_metadata: jwt?.user_metadata ?? {}
	};
};

const getSessionRow = (data: ServerSessionRow[] | null): ServerSessionRow | null => data?.[0] ?? null;

export const handle: Handle = async ({ event, resolve }) => {
	if (building) {
		event.locals.supabase = null;
		event.locals.session = null;
		event.locals.user = null;
		event.locals.permissions = [];
		event.locals.safeGetSession = () => Promise.resolve({ session: null, user: null });

		return resolve(event, {
			filterSerializedResponseHeaders(name: string) {
				return name === 'content-range' || name === 'x-supabase-api-version';
			}
		});
	}

	const rawSid = event.cookies.get('sid');
	const [sessionId = null, sessionSecret = null] = rawSid?.split('.', 2) ?? [];
	let session: AppSession | null = null;
	let user: AppUser | null = null;

	if (sessionId && sessionSecret) {
		const cached = getCachedSession(sessionId);
		if (cached) {
			session = cached.session;
			user = cached.user;
		} else {
			const anon = createAnonClient();
			const { data, error } = await anon.schema('sso').rpc('get_server_session', {
				p_session_id: sessionId,
				p_session_secret: sessionSecret
			});
			const sessionRow = getSessionRow(data);
			if (error || !sessionRow || sessionRow.revoked_at) {
				clearSessionCookie(event);
			} else {
				const expiresAtMs = new Date(sessionRow.expires_at).getTime();
				let accessToken = sessionRow.access_token;
				let refreshToken = sessionRow.refresh_token;
				let expiresAt = sessionRow.expires_at;

				if (expiresAtMs - Date.now() < SESSION_REFRESH_GRACE_MS) {
					const { data: refreshed, error: refreshError } = await anon.auth.refreshSession({
						refresh_token: refreshToken
					});
					if (refreshError || !refreshed.session) {
						await anon.schema('sso').rpc('revoke_server_session', {
							p_session_id: sessionId,
							p_session_secret: sessionSecret
						});
						clearSessionCookie(event);
					} else {
						const refreshedExpiresAt =
							typeof refreshed.session.expires_at === 'number'
								? refreshed.session.expires_at
								: Math.floor(new Date(expiresAt).getTime() / 1000);
						accessToken = refreshed.session.access_token;
						refreshToken = refreshed.session.refresh_token;
						expiresAt = new Date(refreshedExpiresAt * 1000).toISOString();
						await anon.schema('sso').rpc('update_server_session_tokens', {
							p_session_id: sessionId,
							p_session_secret: sessionSecret,
							p_access_token: accessToken,
							p_refresh_token: refreshToken,
							p_expires_at: expiresAt
						});
						user = makeUser(accessToken, sessionRow.user_id);
						session = makeSession(
							sessionId,
							accessToken,
							refreshToken,
							refreshedExpiresAt,
							user.id
						);
						sessionCache.set(sessionId, { session, user, timestamp: Date.now() });
					}
				} else {
					user = makeUser(accessToken, sessionRow.user_id);
					session = makeSession(
						sessionId,
						accessToken,
						refreshToken,
						Math.floor(new Date(expiresAt).getTime() / 1000),
						user.id
					);
					sessionCache.set(sessionId, { session, user, timestamp: Date.now() });
				}
			}
		}
	}

	if (session?.access_token) {
		event.locals.supabase = createUserClient(session.access_token);
	} else {
		event.locals.supabase = createAnonClient();
	}

	event.locals.session = session;
	event.locals.user = user;
	event.locals.permissions = [];

	event.locals.safeGetSession = () => Promise.resolve({ session, user });

	return resolve(event, {
		filterSerializedResponseHeaders(name: string) {
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});
};
