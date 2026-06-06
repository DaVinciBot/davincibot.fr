import { describe, expect, it } from 'vitest';

import { PERMISSIONS, hasPermission } from '../../src/lib/permissions.js';

const VIEW_ADMIN = 'iam.permissions.read.all';
const EDIT_MEMBERS = 'members.profile.update.all';
const EDIT_TRAININGS = 'training.slot.cu';
const VIEW_TRESO = 'finance.read';

describe('hasPermission', () => {
	it('returns false when user is missing', () => {
		expect(hasPermission(null, VIEW_ADMIN)).toBe(false);
	});

	it('returns false when permissions list is missing', () => {
		expect(hasPermission({}, VIEW_ADMIN)).toBe(false);
	});

	it('returns false when permission is missing', () => {
		expect(hasPermission({ permissions: ['view_blog'] }, VIEW_ADMIN)).toBe(false);
	});

	it('returns true when permission is present', () => {
		expect(hasPermission({ permissions: [VIEW_ADMIN] }, VIEW_ADMIN)).toBe(true);
	});

	it('handles additional permission constants consistently', () => {
		const user = { permissions: [EDIT_MEMBERS, EDIT_TRAININGS] };
		expect(PERMISSIONS).toEqual(expect.arrayContaining([EDIT_MEMBERS, EDIT_TRAININGS, VIEW_TRESO]));
		expect(hasPermission(user, EDIT_MEMBERS)).toBe(true);
		expect(hasPermission(user, VIEW_TRESO)).toBe(false);
	});
});
