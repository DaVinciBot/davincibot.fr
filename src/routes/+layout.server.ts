import type { LayoutServerLoad } from './$types';

const isPrivatePath = (pathname: string) =>
	pathname.startsWith('/admin') || pathname.startsWith('/profile');

export const load: LayoutServerLoad = async ({ locals, cookies, url }) => {
	const { session, user } = await locals.safeGetSession();

	let userProfile = null;
	let permissions: string[] = [];

	if (user?.id && isPrivatePath(url.pathname)) {
		const { data, error } = await locals.supabase
			.from('profiles')
			.select('username, avatar_url, permissions, member_of(project(id, name, debut))')
			.eq('id', user.id)
			.single();

		if (!error && data) {
			permissions = (data.permissions as string[]) || [];
			userProfile = {
				email: user.email || '',
				name: data.username || (user.email ? user.email.split('@')[0] : ''),
				avatar: data.avatar_url || `https://avatar.iran.liara.run/public?username=${user.id}`,
				id: user.id,
				projects: ((data.member_of as any[]) || []).map((m: any) => ({
					id: m?.project?.id,
					name: m?.project?.name,
					debut: m?.project?.debut || '0000-00-00'
				})),
				permissions,
				allProjects: null as any[] | null
			};

			if (permissions.includes('view_admin')) {
				userProfile.projects.push({ id: 0, name: 'Association', debut: '2014-09-01' });
				const { data: projects, error: projectsError } = await locals.supabase
					.from('projects')
					.select('id, name, debut');
				if (!projectsError) {
					userProfile.allProjects = (projects || []).map((p: any) => ({
						value: p.id,
						name: p.name,
						debut: p.debut
					}));
				}
			}
		}
	}

	(locals as any).permissions = permissions;

	return {
		session,
		user,
		userProfile,
		permissions,
		cookies: cookies.getAll()
	};
};
