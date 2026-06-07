import { SITE } from '$lib/config/site.js';
import type { RequestHandler } from './$types';

export const prerender = false;

export const GET: RequestHandler = () => {
	const body = [
		'User-agent: *',
		'Allow: /',
		'Disallow: /admin/',
		'Disallow: /caroussel/',
		`Sitemap: ${SITE.origin}/sitemap.xml`
	].join('\n');

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
