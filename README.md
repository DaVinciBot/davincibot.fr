# davincibot.fr

Site public de DaVinciBot (SvelteKit + Svelte 5), servi à la racine du domaine
`davincibot.fr`. C'est aussi le repo qui porte les scripts « lancer toutes les apps » du monorepo local.

Apps voisines : [`cash`](https://github.com/DaVinciBot/cash) (`/admin`),
[`formation`](https://github.com/DaVinciBot/formation) (`/formation`),
[`auth`](https://github.com/DaVinciBot/auth) (`auth.davincibot.fr`).

## Prérequis

- Node `24.11.0` (`.nvmrc`), pnpm `11.5.2` (épinglé par `packageManager`)
- Un `NPM_TOKEN` (PAT GitHub avec `read:packages`) exporté dans le shell : les dépendances `@davincibot/*` viennent de
  GitHub Packages (privé, registre déclaré dans `.npmrc`). Sans lui, `pnpm install` échoue. Voir
  [DaVinciBot/packages](https://github.com/DaVinciBot/packages).

## Configuration

Copier `.env.example` en `.env` — il est commenté variable par variable :

```sh
PUBLIC_SUPABASE_URL=https://project.supabase.co
PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xx
# Service auth central (prod : https://auth.davincibot.fr)
PUBLIC_AUTH_BASE_URL=http://localhost:5177
# Préfixe optionnel des noms de cookies, vide en prod
PUBLIC_COOKIE_PREFIX=
```

Les variables obligatoires sont vérifiées au démarrage : s'il en manque une, le serveur refuse de démarrer en listant
lesquelles. `SUPABASE_SECRET_KEY` et les `DEV_RBAC_*` ne servent qu'au panneau RBAC de développement
(`/api/dev/rbac`), jamais en staging ni en prod. En prod derrière le proxy : `ORIGIN`,
`ADDRESS_HEADER=x-forwarded-for`, `XFF_DEPTH=1`.

L'authentification est déléguée au service `auth` : pour un parcours de login complet en local, il faut aussi faire
tourner l'app `auth` sur le port 5177.

## Développement

```sh
pnpm install
pnpm dev            # http://localhost:5174
pnpm dev -- --open
```

Le serveur de dev du site proxifie `/admin` vers `http://localhost:5175` (cash) et `/formation` vers
`http://localhost:5176` (formation) : une fois les apps lancées, tout est joignable depuis `http://localhost:5174`.

Lancer toutes les apps d'un coup (web + admin + formation + auth), les repos voisins étant clonés à côté de celui-ci :

```sh
pnpm dev:all
```

Chaque app garde son port : `5174` web, `5175` admin, `5176` formation, `5177` auth.

Variante Traefik / Docker : `pnpm dev:all:docker` lance les mêmes quatre apps plus un Traefik
(`docker-compose.dev.yml`, routes dans `traefik/dynamic.yml`) qui regroupe le site, cash et formation derrière
`http://localhost:5173` (`/` → web, `/admin` → cash, `/formation` → formation). `auth` reste sur `5177` ; le dashboard
Traefik est sur `http://localhost:8080`.

```sh
pnpm dev:all:docker
pnpm dev:proxy        # le Traefik seul
pnpm dev:proxy:down   # stopper les conteneurs
```

## Pages

- `/`, `/a-propos`, `/nos-ecoles`, `/sponsors`, `/contact`
- Projets : `/project/cohoma`, `/project/coupe-de-robotique`, `/project/exodus`
- Blog : `/blog`, `/blog/[slug]` (API de pagination / recherche : `/api/blog`)
- Légal : `/legal`, `/legal/cgu`, `/legal/donnees-personnelles`, `/legal/mentions-legales`
- `/auth/*` : redirection 302 des anciens liens vers le service `auth` (sous-chemin et query conservés)
- `/unauthorized`, `/sitemap.xml`, `/robots.txt`, `/health`, `/api/dev/rbac`

## Qualité et build

```sh
pnpm check         # svelte-kit sync + svelte-check
pnpm lint          # prettier --check + eslint --max-warnings=0
pnpm format        # eslint --fix + prettier --write
pnpm build         # svelte-kit sync && vite build
pnpm preview       # 127.0.0.1:4173
pnpm ci-workflow   # check + lint + test:unit + build (les étapes de la CI)
```

## Tests

```sh
pnpm test:unit     # vitest run --coverage
pnpm test:e2e      # playwright test
pnpm test          # les deux
```

- **Unitaires** (Vitest, jsdom) : `tests/unit/` et `src/**/*.{test,spec}.ts`. Couvrent les articles du blog et le
  parseur Markdown, les permissions, la config du site, le cache de session, le client du service auth, les RPC `sso`,
  les utilitaires et la modale d'import de membres. Rapport de couverture v8 dans `coverage/`, avec des seuils à 50 %
  sur les fichiers listés dans `vitest.config.ts`.
- **E2E** (Playwright, `tests/e2e/*.e2e.ts`) : un smoke test qui vérifie que `/` répond, contre
  `pnpm build && pnpm preview` sur le port 4173. En local, installer le navigateur une fois :
  `pnpm exec playwright install chromium`.

## CI

Les workflows de `.github/workflows` appellent les workflows réutilisables de
[DaVinciBot/shared-workflows](https://github.com/DaVinciBot/shared-workflows), épinglés en `@v7.2.0` :

- `ci.yml` — push et PR vers `dev`, `staging`, `main`, `release/**`, `hotfix/**` : `pnpm check`, `pnpm lint`,
  `pnpm test:unit`, `pnpm build` (ignoré quand seuls des `.md` changent).
- `e2e.yml` — `pnpm test:e2e` sur push vers `staging` / `main` et sur les PR vers `staging`, `main`, `release/**`,
  `hotfix/**`.
- `container.yml` — build, lint et scan de l'image Docker à chaque push / PR ; publiée sur GHCR seulement sur push.
- `security-scan.yml` — revue des dépendances, Trivy et Checkov sur push / PR, et chaque lundi.
- `deploy.yml` — déploiement manuel de staging et de prod (voir plus bas).

Les dépendances privées sont installées avec le secret d'organisation `PACKAGES_READ_TOKEN` (`secrets: inherit`), passé
comme `NPM_TOKEN` à `pnpm install` et comme secret BuildKit `npm_token` au build Docker. Pour construire l'image en
local :

```sh
docker build --secret id=npm_token,env=NPM_TOKEN -t davincibot.fr .
```

## Branches et déploiement

On travaille sur une branche, PR vers `dev`, puis on promeut `dev` → `staging` → `main`.

Build `adapter-node`, image publiée sur GHCR (`ghcr.io/davincibot/davincibot.fr`) avec deux tags par push : le nom de
la branche et `sha-<commit>`. L'image tourne sur le VPS de Helsinki, derrière Caddy, et c'est **Watchtower** qui la met
à jour : le workflow réutilisable `deploy.yml` appelle son API HTTP pour l'image visée, puis attend que `/health`
réponde 200. Personne ne se connecte au VPS pour déployer (voir
[DaVinciBot/vps-helsinki-srv](https://github.com/DaVinciBot/vps-helsinki-srv)).

| Environnement | Image                   | URL                             | Déclenchement                                        |
| ------------- | ----------------------- | ------------------------------- | ---------------------------------------------------- |
| dev           | `davincibot.fr:dev`     | `https://dev.davincibot.fr`     | automatique après un push sur `dev`                  |
| staging       | `davincibot.fr:staging` | `https://staging.davincibot.fr` | manuel : workflow **Deploy**, `environment: staging` |
| prod          | `davincibot.fr:main`    | `https://davincibot.fr`         | manuel : workflow **Deploy**, `environment: prod`    |

Staging tape le projet Supabase de production : c'est une répétition de déploiement, pas un bac à sable. Le workflow
**Deploy** accepte un `image_tag` explicite (ex. `sha-<commit>`) ; Watchtower ne met à jour que les conteneurs dont
l'image correspond au tag du `docker-compose.yml` sur le VPS.
