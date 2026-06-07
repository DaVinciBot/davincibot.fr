import { canonicalFor } from '$lib/config/site.js';
import { fetchPublishedBlogRows } from '$lib/server/blogPosts.js';
import type { BlogSupabaseClient } from '$lib/server/blogPosts.js';
import type { RequestHandler } from './$types';

export const prerender = false;

function xmlEscape(value = '') {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function urlTag(loc: string, lastmod: string | null, changefreq = 'weekly', priority = '0.7') {
	return `  <url>\n    <loc>${xmlEscape(loc)}</loc>\n${
		lastmod ? `    <lastmod>${xmlEscape(lastmod)}</lastmod>\n` : ''
	}    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

const staticPaths = [
	'/',
	'/blog/',
	'/contact/',
	'/projets/cohoma/',
	'/projets/coupe-de-robotique/',
	'/projets/exodus/',
	'/sponsors/',
	'/a-propos/',
	'/nos-ecoles/',
	'/legal/',
	'/legal/cgu',
	'/legal/donnees-personnelles',
	'/legal/mentions-legales'
];

export const GET: RequestHandler = async ({ locals: { supabase } }) => {
	const blogSupabase = supabase as unknown as BlogSupabaseClient;
	const urls: string[] = staticPaths.map((path) =>
		urlTag(canonicalFor(path), new Date().toISOString(), 'weekly', path === '/' ? '1.0' : '0.6')
	);

	try {
		const rows = await fetchPublishedBlogRows(blogSupabase);
		for (const row of rows) {
			const lastmod = new Date(row.publish_date ?? row.last_update ?? Date.now()).toISOString();
			urls.push(urlTag(canonicalFor(`/blog/${row.slug}/`), lastmod, 'monthly', '0.8'));
		}
	} catch {
		// Ignore sitemap blog failures; static URLs are still valid.
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join(
		'\n'
	)}\n</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
