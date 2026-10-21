// Le module virtuel $app/env/public de SvelteKit lit
// `globalThis.__sveltekit_dev.env` côté browser (conditions: ['browser'] dans
// vite.config.ts). Ce global n'existe qu'au runtime Kit : le définir ici évite
// un crash au chargement de tout module important $app/env/public (dont
// @davincibot/lib). Les tests qui ont besoin de valeurs précises continuent de
// mocker $app/env/public via vi.mock, qui prime sur ce stub.
(globalThis as Record<string, unknown>).__sveltekit_dev = { env: {} };
