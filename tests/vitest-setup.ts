// Le module virtuel $env/dynamic/public de SvelteKit lit
// `globalThis.__sveltekit_dev.env` côté browser (conditions: ['browser'] dans
// vite.config.ts). Ce global n'existe qu'au runtime Kit : le définir ici évite
// un crash au chargement de tout module important $env/dynamic/public (dont
// @davincibot/lib). Les tests qui ont besoin de valeurs précises continuent de
// mocker $env/dynamic/public via vi.mock, qui prime sur ce stub.
(globalThis as Record<string, unknown>).__sveltekit_dev = { env: {} };
