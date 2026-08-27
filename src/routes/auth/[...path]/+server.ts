import { publicEnv } from '@davincibot/lib';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Legacy /auth/* : redirige vers le service auth en conservant le sous-chemin et
// la query. Couvre les anciens liens/favoris, les emails encore en vol (le
// fragment #access_token est préservé par le navigateur sur un 302) et l'URL
// d'autorisation OIDC de Rallly/Pangolin (/auth/oauth -> /oauth).
export const GET: RequestHandler = ({ params, url }) => {
	redirect(302, `${publicEnv.PUBLIC_AUTH_BASE_URL}/${params.path}${url.search}`);
};
