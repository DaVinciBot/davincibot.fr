import { parseMarkdownToAst } from '$lib/markdown/parse';
import type { BlogSupabaseClient } from '$lib/server/blogPosts';
import { fetchBlogPostBySlug } from '$lib/server/blogPosts';
import { error as kitError } from '@sveltejs/kit';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import type { Json } from '@davincibot/database-types';
import type { PageServerLoad } from './$types';

export const prerender = false;

const isRecord = (value: Json | undefined): value is Record<string, Json | undefined> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

const stringFromMeta = (
	meta: Record<string, Json | undefined>,
	key: string
): string | undefined => {
	const value = meta[key];
	return typeof value === 'string' ? value : undefined;
};

async function renderMarkdown(markdown: string) {
	const rawHtml = await marked.parse(markdown);
	return sanitizeHtml(rawHtml, {
		allowedTags: sanitizeHtml.defaults.allowedTags.concat([
			'img',
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6',
			'pre',
			'code',
			'table',
			'thead',
			'tbody',
			'tr',
			'th',
			'td'
		]),
		allowedAttributes: {
			...sanitizeHtml.defaults.allowedAttributes,
			a: ['href', 'name', 'target', 'rel'],
			img: ['src', 'alt', 'title'],
			code: ['class']
		},
		transformTags: {
			a: sanitizeHtml.simpleTransform('a', { target: '_blank', rel: 'noopener noreferrer' })
		}
	});
}

export const load: PageServerLoad = async ({ params, setHeaders, locals: { supabase } }) => {
	if (!supabase) {
		kitError(404, 'Article introuvable');
	}

	const { slug } = params;
	const blogSupabase = supabase as unknown as BlogSupabaseClient;

	const { data, error: dbError } = await fetchBlogPostBySlug(blogSupabase, slug);

	if (dbError && dbError.code !== 'PGRST116') {
		kitError(500, dbError.message);
	}

	if (!data) {
		kitError(404, 'Article introuvable');
	}

	const meta = isRecord(data.data) ? data.data : {};
	const markdown =
		data.body ?? stringFromMeta(meta, 'content') ?? stringFromMeta(meta, 'body') ?? '';
	const html = await renderMarkdown(markdown);
	const ast = parseMarkdownToAst(markdown);

	setHeaders({ 'cache-control': 'public, max-age=60' });

	return {
		post: {
			title: data.title,
			slug: data.slug,
			meta,
			body: data.body ?? '',
			html,
			ast,
			updatedAt: data.last_update,
			publishedAt: data.publish_date
		}
	};
};
