import { env } from '$env/dynamic/public';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Legacy /auth/* : redirige vers le service auth en conservant le sous-chemin et
// la query. Couvre les anciens liens/favoris, les emails encore en vol (le
// fragment #access_token est préservé par le navigateur sur un 302) et l'URL
// d'autorisation OIDC de Rallly/Pangolin (/auth/oauth -> /oauth).
export const GET: RequestHandler = ({ params, url }) => {
	const base = (env.PUBLIC_AUTH_BASE_URL || 'https://auth.davincibot.fr').replace(/\/$/, '');
	redirect(302, `${base}/${params.path}${url.search}`);
};
