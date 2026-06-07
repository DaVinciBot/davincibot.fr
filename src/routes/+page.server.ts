import { fetchBlogPosts } from '$lib/server/blogPosts';
import type { BlogPost, BlogSupabaseClient } from '$lib/server/blogPosts';
import type { PageServerLoad } from './$types';

export const csr = true;
export const ssr = false;
export const prerender = false;

interface HomePost {
	title: string;
	slug: string;
	cover: string;
	coverSmall: string;
	coverSocial: string;
	description: string;
	date: string | null;
	tags: string[];
}

const toHomePost = (post: BlogPost): HomePost => ({
	title: post.title,
	slug: post.slug,
	cover: post.cover,
	coverSmall: post.coverSmall,
	coverSocial: post.coverSocial,
	description: post.excerpt,
	date: post.date,
	tags: post.tags
});

export const load: PageServerLoad = async ({ setHeaders, locals: { supabase } }) => {
	const blogSupabase = supabase as unknown as BlogSupabaseClient;
	const { posts } = await fetchBlogPosts(blogSupabase, { offset: 0, limit: 10 });

	setHeaders({ 'cache-control': 'public, max-age=60' });

	return { posts: posts.map(toHomePost) };
};
