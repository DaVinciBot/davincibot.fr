import { describe, expect, it } from 'vitest';

import { PERMISSIONS, hasPermission } from '../../src/lib/permissions.js';

describe('hasPermission', () => {
	it('returns false when user is missing', () => {
		expect(hasPermission(null, PERMISSIONS.VIEW_ADMIN)).toBe(false);
	});

	it('returns false when permissions list is missing', () => {
		expect(hasPermission({}, PERMISSIONS.VIEW_ADMIN)).toBe(false);
	});

	it('returns false when permission is missing', () => {
		expect(hasPermission({ permissions: ['view_blog'] }, PERMISSIONS.VIEW_ADMIN)).toBe(false);
	});

	it('returns true when permission is present', () => {
		expect(hasPermission({ permissions: [PERMISSIONS.VIEW_ADMIN] }, PERMISSIONS.VIEW_ADMIN)).toBe(true);
	});

	it('handles additional permission constants consistently', () => {
		const user = { permissions: [PERMISSIONS.EDIT_MEMBERS, PERMISSIONS.EDIT_TRAININGS] };
		expect(hasPermission(user, PERMISSIONS.EDIT_MEMBERS)).toBe(true);
		expect(hasPermission(user, PERMISSIONS.VIEW_TRESO)).toBe(false);
	});
});
