# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
bun create svelte@latest

# create a new project in my-app
bun create svelte@latest my-app
```

## Developing

Pour lancer les 3 apps (`davincibot.fr`, `cash`, `formation`) sur un seul port local:

```bash
npm run dev:all
```

Depuis `http://localhost:5174`:
- `/` -> `davincibot.fr`
- `/admin` -> `cash`
- `/formation` -> `formation`

Si tu veux utiliser la variante Traefik Docker:

```bash
npm run dev:all:docker
```

Pour stopper les conteneurs Docker de dev:

```bash
npm run dev:proxy:down
```

Once you've created a project and installed dependencies with `bun install`, start a development server:

```bash
bun run dev

# or start the server and open the app in a new browser tab
bun run dev -- --open
```

## Building

To create a production version of your app:

```bash
bun run build
```

You can preview the production build with `bun run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## micro docs (will be moved)

- Year starts on 1st september (eg : CDR 2025 correspond to 1st september 2024 to 31th August 2025)
