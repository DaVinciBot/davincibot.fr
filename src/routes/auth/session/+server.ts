import { json } from '@sveltejs/kit';

export const GET = async (event: any) => {
	const session = event.locals?.session ?? null;
	const user = event.locals?.user ?? null;

	return json({
		session: session
			? {
					id: session.id,
					expires_at: session.expires_at,
					user_id: session.user_id
				}
			: null,
		user: user
			? {
					id: user.id,
					email: user.email ?? null,
					app_metadata: user.app_metadata ?? {},
					user_metadata: user.user_metadata ?? {}
				}
			: null
	});
};
