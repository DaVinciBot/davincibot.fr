import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Mock } from 'vitest';

import type { BlogRow } from '../../src/database.types';
import {
	fetchBlogPosts,
	mapRowToPost,
	normalizeTags,
	stripMarkdown,
	toExcerpt,
	type BlogSupabaseClient
} from '../../src/lib/server/blogPosts';

interface QueryResponse {
	data: BlogRow[] | null;
	error: Error | null;
	count: number | null;
}

interface SingleQueryResponse {
	data: BlogRow | null;
	error: { code?: string; message: string } | null;
}

type QueryMock = Mock<(...args: unknown[]) => Query>;
type SingleQueryMock = Mock<(...args: unknown[]) => PromiseLike<SingleQueryResponse>>;

interface Query extends PromiseLike<QueryResponse> {
	select: QueryMock;
	eq: QueryMock;
	limit: QueryMock;
	lte: QueryMock;
	order: QueryMock;
	range: QueryMock;
	ilike: QueryMock;
	or: QueryMock;
	single: SingleQueryMock;
}

let nextResponse: QueryResponse = { data: [], error: null, count: 0 };
let lastQuery: Query | null = null;

class MockQuery implements Query {
	select: QueryMock = vi.fn((): Query => this);
	eq: QueryMock = vi.fn((): Query => this);
	limit: QueryMock = vi.fn((): Query => this);
	lte: QueryMock = vi.fn((): Query => this);
	order: QueryMock = vi.fn((): Query => this);
	range: QueryMock = vi.fn((): Query => this);
	ilike: QueryMock = vi.fn((): Query => this);
	or: QueryMock = vi.fn((): Query => this);
	single: SingleQueryMock = vi.fn((): PromiseLike<SingleQueryResponse> => {
		const firstRow = nextResponse.data?.[0] ?? null;
		return Promise.resolve({ data: firstRow, error: null });
	});

	then<TResult1 = QueryResponse, TResult2 = never>(
		onfulfilled?: ((value: QueryResponse) => TResult1 | PromiseLike<TResult1>) | null,
		onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
	): PromiseLike<TResult1 | TResult2> {
		return Promise.resolve(nextResponse).then(onfulfilled, onrejected);
	}
}

function createQuery(): Query {
	return new MockQuery();
}

const from = vi.fn((_table: 'blog') => {
	void _table;
	const query = createQuery();
	lastQuery = query;
	return query;
});

const supabase = {
	from
} satisfies BlogSupabaseClient;

function getLastQuery(): Query {
	if (!lastQuery) {
		throw new Error('Expected a query to be created');
	}
	return lastQuery;
}

describe('blog posts helpers', () => {
	beforeEach(() => {
		nextResponse = { data: [], error: null, count: 0 };
		lastQuery = null;
		from.mockClear();
	});

	it('stripMarkdown removes markdown syntax', () => {
		const plain = stripMarkdown('## Bonjour **le monde**\n\n[link](https://example.com) `code`');
		expect(plain).toBe('Bonjour le monde link code');
	});

	it('toExcerpt truncates and appends ellipsis when needed', () => {
		expect(toExcerpt('abcdef', 4)).toBe('abcd\u2026');
		expect(toExcerpt('', 4)).toBe('');
	});

	it('normalizeTags returns unique tags preserving first casing', () => {
		expect(normalizeTags('Robotique,robotique #Code ; code')).toEqual(['Robotique', 'Code']);
		expect(normalizeTags(undefined)).toEqual([]);
	});

	it('mapRowToPost applies cover fallbacks and metadata', () => {
		const post = mapRowToPost({
			id: 12,
			title: 'Titre',
			slug: 'titre',
			body: '**Texte**',
			last_update: '2025-01-10T10:00:00.000Z',
			data: { tag: 'Alpha,beta,alpha' }
		});

		expect(post.cover).toBe('/assets/article/precoupe.jpg');
		expect(post.coverSmall).toBe(post.cover);
		expect(post.coverSocial).toBe(post.cover);
		expect(post.author).toBe('DaVinciBot');
		expect(post.plainBody).toBe('Texte');
		expect(post.tags).toEqual(['Alpha', 'beta']);
	});

	it('fetchBlogPosts builds filtered query and caps page size', async () => {
		nextResponse = {
			data: [
				{
					id: 1,
					title: 'A',
					slug: 'a',
					body: 'Hello',
					state: 'published',
					publish_date: '2025-01-01T00:00:00.000Z',
					last_update: null,
					data: {}
				}
			],
			error: null,
			count: 10
		};

		const result = await fetchBlogPosts(supabase, {
			offset: 2,
			limit: 500,
			search: '%robot_',
			tag: '_code%'
		});

		expect(supabase.from).toHaveBeenCalledWith('blog');
		const query = getLastQuery();
		expect(query.eq).toHaveBeenCalledWith('state', 'published');
		expect(query.range).toHaveBeenCalledWith(2, 51);
		expect(query.ilike).toHaveBeenCalledWith('data->>tag', '%code%');
		expect(query.or).toHaveBeenCalledWith(
			'title.ilike.%robot%,body.ilike.%robot%,data->>excerpt.ilike.%robot%'
		);

		const firstLteCall = query.lte.mock.calls[0];
		if (!firstLteCall || typeof firstLteCall[1] !== 'string') {
			throw new Error('Expected publish date filter to be recorded');
		}
		const nowIso = firstLteCall[1];
		expect(Number.isNaN(Date.parse(nowIso))).toBe(false);
		expect(result.count).toBe(10);
		expect(result.posts).toHaveLength(1);
	});

	it('fetchBlogPosts falls back to posts length when count is null', async () => {
		nextResponse = {
			data: [
				{
					id: 1,
					title: 'A',
					slug: 'a',
					body: '',
					state: 'published',
					publish_date: null,
					last_update: null,
					data: {}
				}
			],
			error: null,
			count: null
		};

		const result = await fetchBlogPosts(supabase);
		expect(result.count).toBe(1);
	});

	it('fetchBlogPosts throws query errors', async () => {
		nextResponse = {
			data: null,
			error: new Error('boom'),
			count: null
		};

		await expect(fetchBlogPosts(supabase)).rejects.toThrow('boom');
	});
});
