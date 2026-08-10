import { building } from '$app/environment';
import { buildLoginUrl } from '@davincibot/lib';
import {
	SessionCache,
	createAnonClient,
	createUserClient,
	resolveSessionViaAuth,
	sidCookieName
} from '@davincibot/lib/server';
import type { ResolvedAuthSession, ResolvedAuthUser } from '@davincibot/lib/server/types';
import { error, redirect, type Handle, type RequestEvent } from '@sveltejs/kit';

const SESSION_CACHE_TTL_MS = 5 * 60 * 1000;
const SESSION_STALE_MAX_AGE_MS = 15 * 60 * 1000;
const sessionCache = new SessionCache<ResolvedAuthSession, ResolvedAuthUser>(
	SESSION_CACHE_TTL_MS,
	SESSION_STALE_MAX_AGE_MS
);

const clearSessionCookie = (event: RequestEvent) => {
	event.cookies.delete(sidCookieName(), { path: '/' });
};

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
	console.log(`event.url.pathname ${event.url.pathname}`);
	// Ne pas garder les routes d'authentification elles-mêmes : sur dev.*, le
	// login vit sur le même hôte, donc les exempter évite une boucle de redirect.
	if (event.url.pathname.startsWith('/auth/')) {
		return;
	}

	// Health check du déploiement : public, ne divulgue rien.
	if (event.url.pathname === '/health') {
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

	const result = await event.locals.supabase.rpc('has_permission', {
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

	const rawSid = event.cookies.get(sidCookieName());
	const [sessionId = null, sessionSecret = null] = rawSid?.split('.', 2) ?? [];
	let session: ResolvedAuthSession | null = null;
	let user: ResolvedAuthUser | null = null;

	if (rawSid && sessionId && sessionSecret) {
		const cached = sessionCache.getFresh(sessionId, sessionSecret);
		if (cached) {
			session = cached.session;
			user = cached.user;
		} else {
			const result = await resolveSessionViaAuth(event.fetch, rawSid);
			if (result.status === 'ok') {
				session = result.session;
				user = result.user;
				sessionCache.set(sessionId, result.session, result.user, sessionSecret);
			} else if (result.status === 'invalid') {
				clearSessionCookie(event);
			} else {
				// Service auth injoignable : on ressert l'entrée périmée du cache
				// tant que l'access token est encore valable, sans purger le cookie.
				const stale = sessionCache.getStale(sessionId, sessionSecret);
				if (stale) {
					session = stale.session;
					user = stale.user;
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
