# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
pnpm dlx sv create

# create a new project in my-app
pnpm dlx sv create my-app
```

## Developing

Pour lancer les 3 apps (`davincibot.fr`, `cash`, `formation`) sur un seul port local:

```bash
pnpm dev:all
```

Depuis `http://localhost:5174`:

- `/` -> `davincibot.fr`
- `/admin` -> `cash`
- `/formation` -> `formation`

Si tu veux utiliser la variante Traefik Docker:

```bash
pnpm dev:all:docker
```

Pour stopper les conteneurs Docker de dev:

```bash
pnpm dev:proxy:down
```

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm build
```

You can preview the production build with `pnpm preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## micro docs (will be moved)

- Year starts on 1st september (eg : CDR 2025 correspond to 1st september 2024 to 31th August 2025)
