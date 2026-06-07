import { BLOG_PAGE_SIZE, fetchBlogPosts } from '$lib/server/blogPosts.js';
import type { BlogSupabaseClient } from '$lib/server/blogPosts.js';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = false;

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	const offset = Number(url.searchParams.get('offset') ?? '0');
	const limit = Number(url.searchParams.get('limit') ?? BLOG_PAGE_SIZE);
	const search = url.searchParams.get('search') ?? '';
	const tag = url.searchParams.get('tag') ?? '';
	const blogSupabase = supabase as unknown as BlogSupabaseClient;

	try {
		const { posts, count } = await fetchBlogPosts(blogSupabase, {
			offset: Number.isFinite(offset) ? Math.max(offset, 0) : 0,
			limit: Number.isFinite(limit) ? limit : BLOG_PAGE_SIZE,
			search,
			tag
		});

		return json({ posts, count });
	} catch {
		return json({ posts: [], count: 0, error: 'Unable to load more posts' }, { status: 500 });
	}
};
