import { building } from '$app/environment';
import { buildLoginUrl } from '$lib/config/auth';
import { createAnonClient, createUserClient, decodeJwt } from '$lib/server/sso';
import type { AppSession, AppUser } from '$lib/server/sso';
import { error, redirect, type Handle, type RequestEvent } from '@sveltejs/kit';
import { createHash, timingSafeEqual } from 'node:crypto';
import type { ServerSessionRow } from './database.types';

interface CachedSession {
	session: AppSession;
	user: AppUser;
	timestamp: number;
	secretHash: string;
}

const SESSION_CACHE_TTL_MS = 5 * 60 * 1000;
const SESSION_REFRESH_GRACE_MS = 2 * 60 * 1000;
const sessionCache = new Map<string, CachedSession>();

const hashSecret = (secret: string): string => createHash('sha256').update(secret).digest('hex');

const secretMatches = (a: string, b: string): boolean => {
	const bufA = Buffer.from(a);
	const bufB = Buffer.from(b);
	return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
};

// Le cache est lié au secret : un même sessionId présenté avec un secret différent
// ne réutilise jamais l'entrée (sinon le secret ne serait plus vérifié).
const getCachedSession = (cacheKey: string, secret: string): CachedSession | null => {
	const cached = sessionCache.get(cacheKey);
	if (!cached) {
		return null;
	}
	if (Date.now() - cached.timestamp > SESSION_CACHE_TTL_MS) {
		sessionCache.delete(cacheKey);
		return null;
	}
	if (!secretMatches(cached.secretHash, hashSecret(secret))) {
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

const getSessionRow = (data: ServerSessionRow[] | null): ServerSessionRow | null =>
	data?.[0] ?? null;

/**
 * Garde d'accès aux environnements dev.* : exige d'être authentifié ET de
 * détenir infra.environments.access (résolu côté DB via has_permission, qui
 * unit rôles globaux actifs + override). Un utilisateur non connecté est
 * redirigé vers le login ; connecté sans la permission -> 403.
 */
async function guardDevEnvironment(
	event: RequestEvent,
	session: App.Locals['session'],
	user: App.Locals['user']
): Promise<void> {
	// Ne pas garder les routes d'authentification elles-mêmes : sur dev.*, le
	// login vit sur le même hôte, donc les exempter évite une boucle de redirect.
	if (event.url.pathname.startsWith('/auth/')) {
		return;
	}

	if (!session || !user) {
		redirect(302, buildLoginUrl(event.url.href));
	}

	if (!event.locals.supabase) {
		error(
			403,
			"Accès réservé à l'environnement de développement (infra.environments.access requis)."
		);
	}

	// Cast : la fonction RPC has_permission n'est pas encore dans les types
	// générés (Database) — ils seront régénérés après application de la migration.
	const rpcClient = event.locals.supabase as unknown as {
		rpc: (
			fn: string,
			args: Record<string, unknown>
		) => Promise<{ data: boolean | null; error: unknown }>;
	};
	const result = await rpcClient.rpc('has_permission', {
		p_permission: 'infra.environments.access'
	});

	if (result.error || !result.data) {
		error(
			403,
			"Accès réservé à l'environnement de développement (infra.environments.access requis)."
		);
	}
}

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
		const cached = getCachedSession(sessionId, sessionSecret);
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
						sessionCache.set(sessionId, {
							session,
							user,
							timestamp: Date.now(),
							secretHash: hashSecret(sessionSecret)
						});
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
					sessionCache.set(sessionId, {
						session,
						user,
						timestamp: Date.now(),
						secretHash: hashSecret(sessionSecret)
					});
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

	// Environnements de pré-production (dev.*) : accès réservé aux utilisateurs
	// authentifiés détenant infra.environments.access. Enforcement applicatif en
	// complément du reverse proxy.
	if (event.url.hostname.startsWith('dev.')) {
		await guardDevEnvironment(event, session, user);
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name: string) {
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});
};
