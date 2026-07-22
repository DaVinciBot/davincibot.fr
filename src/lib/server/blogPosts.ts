import type { BlogRow, Json } from '@davincibot/database-types';

export const BLOG_PAGE_SIZE = 20;

export interface BlogPost {
	id: number | null;
	title: string;
	slug: string;
	cover: string;
	coverSmall: string;
	coverSocial: string;
	date: string | null;
	author: string;
	excerpt: string;
	body: string;
	plainBody: string;
	tags: string[];
}

export interface FetchBlogPostsOptions {
	offset?: number;
	limit?: number;
	search?: string;
	tag?: string;
}

export interface FetchBlogPostsResult {
	posts: BlogPost[];
	count: number;
}

interface BlogQueryResult {
	data: BlogRow[] | null;
	error: { message: string } | null;
	count: number | null;
}

interface BlogSingleQueryResult {
	data: BlogRow | null;
	error: { code?: string; message: string } | null;
}

interface BlogQuery extends PromiseLike<BlogQueryResult> {
	eq(column: string, value: string): BlogQuery;
	ilike(column: string, value: string): BlogQuery;
	limit(count: number): BlogQuery;
	lte(column: string, value: string): BlogQuery;
	or(filter: string): BlogQuery;
	order(column: string, options: { ascending: boolean; nullsFirst?: boolean }): BlogQuery;
	range(from: number, to: number): BlogQuery;
	single(): PromiseLike<BlogSingleQueryResult>;
}

interface BlogTable {
	select(columns: string, options?: { count?: 'exact' }): BlogQuery;
}

export interface BlogSupabaseClient {
	from(table: 'blog'): BlogTable;
}

const isRecord = (value: Json | undefined): value is Record<string, Json | undefined> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

const stringFromMeta = (
	meta: Record<string, Json | undefined>,
	key: string
): string | undefined => {
	const value = meta[key];
	return typeof value === 'string' ? value : undefined;
};

export function stripMarkdown(md = '') {
	return md
		.replace(/```[\s\S]*?```/g, '')
		.replace(/`([^`]+)`/g, '$1')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/^\s{0,3}(#+|>|[-*+] )\s?/gm, '')
		.replace(/\*\*([^*]+)\*\*|__([^_]+)__/g, '$1$2')
		.replace(/\*([^*]+)\*|_([^_]+)_/g, '$1$2')
		.replace(/\s+/g, ' ')
		.trim();
}

export function toExcerpt(text = '', len = 180) {
	if (!text) {
		return '';
	}
	const clean = stripMarkdown(text);
	return clean.length > len ? `${clean.slice(0, len).trimEnd()}\u2026` : clean;
}

export function normalizeTags(raw: unknown): string[] {
	if (typeof raw !== 'string') {
		return [];
	}
	const seen = new Set<string>();
	return raw
		.split(/[#;,|\n\t ]+/)
		.map((tag) => tag.trim())
		.filter((tag) => {
			if (!tag) {
				return false;
			}
			const key = tag.toLowerCase();
			if (seen.has(key)) {
				return false;
			}
			seen.add(key);
			return true;
		});
}

export function mapRowToPost(row: Partial<BlogRow>): BlogPost {
	const meta = isRecord(row.data) ? row.data : {};
	const body = row.body ?? '';
	const cover = stringFromMeta(meta, 'heroImage') ?? '/assets/article/precoupe.jpg';
	const coverSmall = stringFromMeta(meta, 'heroImageSmall') ?? cover;
	const coverSocial = stringFromMeta(meta, 'heroImageSocial') ?? cover;
	const excerpt = stringFromMeta(meta, 'excerpt') ?? toExcerpt(body);
	const date = row.publish_date ?? row.last_update ?? null;
	const tags = normalizeTags(meta.tag);

	return {
		id: row.id ?? null,
		title: row.title ?? '',
		slug: row.slug ?? '',
		cover,
		coverSmall,
		coverSocial,
		date,
		author: stringFromMeta(meta, 'author') ?? 'DaVinciBot',
		excerpt,
		body,
		plainBody: stripMarkdown(body),
		tags
	};
}

function sanitiseLikeValue(value = '') {
	return value.replace(/%/g, '').replace(/_/g, '').trim();
}

export async function fetchBlogPosts(
	supabase: BlogSupabaseClient | null,
	{ offset = 0, limit = BLOG_PAGE_SIZE, search = '', tag = '' }: FetchBlogPostsOptions = {}
): Promise<FetchBlogPostsResult> {
	if (!supabase) {
		return { posts: [], count: 0 };
	}

	const nowIso = new Date().toISOString();
	const cappedLimit = Math.min(Math.max(limit, 1), 50);
	let query = supabase
		.from('blog')
		.select('*', { count: 'exact' })
		.eq('state', 'published')
		.lte('publish_date', nowIso)
		.order('publish_date', { ascending: false })
		.range(offset, offset + cappedLimit - 1);

	const safeTag = sanitiseLikeValue(tag);
	if (safeTag) {
		query = query.ilike('data->>tag', `%${safeTag}%`);
	}

	const safeSearch = sanitiseLikeValue(search);
	if (safeSearch) {
		const term = `%${safeSearch}%`;
		query = query.or(`title.ilike.${term},body.ilike.${term},data->>excerpt.ilike.${term}`);
	}

	const { data, error, count } = await query;

	if (error) {
		throw new Error(error.message);
	}

	const posts = (data ?? []).map(mapRowToPost);

	return {
		posts,
		count: count ?? posts.length
	};
}

export async function fetchBlogPostBySlug(
	supabase: BlogSupabaseClient | null,
	slug: string
): Promise<BlogSingleQueryResult> {
	if (!supabase) {
		return { data: null, error: null };
	}

	const result = await supabase.from('blog').select('*').eq('slug', slug).single();
	return result;
}

export async function fetchPublishedBlogRows(
	supabase: BlogSupabaseClient | null,
	limit?: number
): Promise<BlogRow[]> {
	if (!supabase) {
		return [];
	}

	let query = supabase
		.from('blog')
		.select('*')
		.eq('state', 'published')
		.order('publish_date', { ascending: false, nullsFirst: false });

	if (typeof limit === 'number') {
		query = query.limit(limit);
	}

	const { data, error } = await query;
	if (error) {
		throw new Error(error.message);
	}

	return data ?? [];
}
