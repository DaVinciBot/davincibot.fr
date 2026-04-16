import { expect, test } from '@playwright/test';

test('application responds on home route', async ({ request }) => {
	const response = await request.get('/');
	expect(response.status()).toBeLessThan(500);
});
