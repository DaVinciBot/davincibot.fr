# davincibot.fr

Site public de DaVinciBot (SvelteKit + Svelte 5), servi à la racine du domaine
`davincibot.fr`. C'est aussi le repo qui porte les scripts « lancer toutes les apps » du monorepo local.

Apps voisines : [`cash`](https://github.com/DaVinciBot/cash) (`/admin`),
[`formation`](https://github.com/DaVinciBot/formation) (`/formation`),
[`auth`](https://github.com/davincibot/auth) (`auth.davincibot.fr`).

## Prérequis

- Node `24.11.0` (`.nvmrc`), pnpm `11.5.2` (épinglé par `packageManager`)
- Un `NPM_TOKEN` (PAT GitHub avec `read:packages`) exporté dans le shell : les dépendances `@davincibot/*` viennent de
  GitHub Packages (privé). Voir
  [DaVinciBot/packages](https://github.com/DaVinciBot/packages).

## Configuration

Copier `.env.example` en `.env` :

```sh
PUBLIC_SUPABASE_URL=https://project.supabase.co
PUBLIC_SUPABASE_PUBLISHABLE_KEY=local-anon-key
# Service auth central (prod : https://auth.davincibot.fr)
PUBLIC_AUTH_BASE_URL=http://localhost:5177
# Préfixe optionnel des noms de cookies, vide en prod
PUBLIC_COOKIE_PREFIX=
```

L'authentification est déléguée au service `auth` : pour un parcours de login complet en local, il faut aussi faire
tourner l'app `auth` sur le port 5177.

## Développement

```sh
pnpm install
pnpm dev            # http://localhost:5174
pnpm dev -- --open
```

Lancer les 3 sites d'un coup (web + admin + formation) :

```sh
pnpm dev:all
```

Chaque app garde son port (`5174` web, `5175` admin, `5176` formation) ; le service `auth` (`5177`) n'est pas inclus, le
démarrer à part depuis `../auth`.

Variante Traefik / Docker, qui regroupe tout derrière
`http://localhost:5174` (`/` → web, `/admin` → cash, `/formation` → formation) :

```sh
pnpm dev:all:docker
pnpm dev:proxy:down   # stopper les conteneurs
```

## Qualité et build

```sh
pnpm check        # svelte-check
pnpm lint         # prettier --check + eslint --max-warnings=0
pnpm format       # prettier --write
pnpm test:unit    # vitest run --coverage
pnpm test:e2e     # playwright
pnpm build        # svelte-kit sync && vite build
pnpm preview      # 127.0.0.1:4173
pnpm ci           # check + lint + test:unit + build (ce que fait la CI)
```

## Déploiement

Build `adapter-node`, image Docker publiée sur GHCR puis déployée par Dokploy (service Swarm derrière Traefik). Les
workflows de `.github/workflows` appellent les workflows réutilisables de
[DaVinciBot/shared-workflows](https://github.com/DaVinciBot/shared-workflows).
