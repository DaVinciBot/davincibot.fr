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
		session,
		user,
		cookies: cookies.getAll()
	};
};
