import type { LayoutServerLoad } from './$types';

const isPrivatePath = (pathname: string) =>
	pathname.startsWith('/admin') || pathname.startsWith('/profile');

export const load: LayoutServerLoad = async ({ locals, cookies, url }) => {
	const { session, user } = isPrivatePath(url.pathname)
		? await locals.safeGetSession()
		: { session: null, user: null };

	return {
		session,
		user,
		cookies: cookies.getAll()
	};
};
