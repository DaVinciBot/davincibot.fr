import { building } from '$app/environment';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	if (building) {
		return {
			session: null,
			user: null,
			cookies: []
		};
	}

	const { session, user } = await locals.safeGetSession();

	return {
		// Jamais de token dans les données de page : le navigateur n'en a pas besoin.
		session: session
			? { id: session.id, expires_at: session.expires_at, user_id: session.user_id }
			: null,
		user,
		cookies: cookies.getAll()
	};
};
