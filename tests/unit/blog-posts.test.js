import { beforeEach, describe, expect, it, vi } from 'vitest';

/** @typedef {{ data: unknown[] | null, error: Error | null, count: number | null }} QueryResponse */
/** @typedef {import('vitest').Mock<(...args: unknown[]) => Query>} QueryMock */
/**
 * @typedef {{
 *   select: QueryMock,
 *   eq: QueryMock,
 *   lte: QueryMock,
 *   order: QueryMock,
 *   range: QueryMock,
 *   ilike: QueryMock,
 *   or: QueryMock,
 *   then: PromiseLike<QueryResponse>['then']
 * }} Query
 */

/** @type {QueryResponse} */
let nextResponse = { data: [], error: null, count: 0 };
/** @type {Query | null} */
let lastQuery = null;

/** @returns {Query} */
function createQuery() {
	/** @type {Query} */
	const query = {
		select: vi.fn(() => query),
		eq: vi.fn(() => query),
		lte: vi.fn(() => query),
		order: vi.fn(() => query),
		range: vi.fn(() => query),
		ilike: vi.fn(() => query),
		or: vi.fn(() => query),
		then: (resolve, reject) => Promise.resolve(nextResponse).then(resolve, reject)
	};

	return query;
}

const from = vi.fn((_table) => {
	void _table;
	lastQuery = createQuery();
	return lastQuery;
});

const supabase = {
	from
};

import {
	fetchBlogPosts,
	mapRowToPost,
	normalizeTags,
	stripMarkdown,
	toExcerpt
} from '../../src/lib/server/blogPosts.js';

function getLastQuery() {
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
		expect(toExcerpt('abcdef', 4)).toBe('abcd…');
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
					publish_date: '2025-01-01T00:00:00.000Z',
					data: {}
				}
			],
			error: null,
			count: 10
		};

		const result = await fetchBlogPosts(
			/** @type {Parameters<typeof fetchBlogPosts>[0]} */ (/** @type {unknown} */ (supabase)),
			{
			offset: 2,
			limit: 500,
			search: '%robot_',
			tag: '_code%'
			}
		);

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
			data: [{ id: 1, title: 'A', slug: 'a', body: '', data: {} }],
			error: null,
			count: null
		};

		const result = await fetchBlogPosts(
			/** @type {Parameters<typeof fetchBlogPosts>[0]} */ (/** @type {unknown} */ (supabase))
		);
		expect(result.count).toBe(1);
	});

	it('fetchBlogPosts throws query errors', async () => {
		nextResponse = {
			data: null,
			error: new Error('boom'),
			count: null
		};

		await expect(
			fetchBlogPosts(
				/** @type {Parameters<typeof fetchBlogPosts>[0]} */ (/** @type {unknown} */ (supabase))
			)
		).rejects.toThrow('boom');
	});
});
