import type { BlogSupabaseClient } from '$lib/server/blogPosts';
import { BLOG_PAGE_SIZE, fetchBlogPosts } from '$lib/server/blogPosts';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ setHeaders, locals: { supabase } }) => {
	const blogSupabase = supabase as unknown as BlogSupabaseClient;

	try {
		const { posts, count } = await fetchBlogPosts(blogSupabase, {
			offset: 0,
			limit: BLOG_PAGE_SIZE
		});
		const tags = Array.from(new Set(posts.flatMap((post) => post.tags)));

		setHeaders({ 'cache-control': 'public, max-age=60' });

		return {
			posts,
			tags,
			totalCount: count,
			pageSize: BLOG_PAGE_SIZE
		};
	} catch {
		setHeaders({ 'cache-control': 'public, max-age=60' });
		return {
			posts: [],
			tags: [],
			totalCount: 0,
			pageSize: BLOG_PAGE_SIZE
		};
	}
};
