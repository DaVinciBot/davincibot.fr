import { describe, expect, it } from 'vitest';

import {
	PERMISSIONS,
	hasPermission,
	type Permission,
	type PermissionUser
} from '../../src/lib/permissions';

const VIEW_ADMIN: Permission = 'iam.permissions.read.all';
const EDIT_MEMBERS: Permission = 'members.profile.update.all';
const EDIT_TRAININGS: Permission = 'training.slot.cu';
const VIEW_TRESO: Permission = 'finance.read';

describe('hasPermission', () => {
	it('returns false when user is missing', () => {
		expect(hasPermission(null, VIEW_ADMIN)).toBe(false);
	});

	it('returns false when permissions list is missing', () => {
		expect(hasPermission({}, VIEW_ADMIN)).toBe(false);
	});

	it('returns false when permission is missing', () => {
		expect(hasPermission({ permissions: [] }, VIEW_ADMIN)).toBe(false);
	});

	it('returns true when permission is present', () => {
		expect(hasPermission({ permissions: [VIEW_ADMIN] }, VIEW_ADMIN)).toBe(true);
	});

	it('handles additional permission constants consistently', () => {
		const user: PermissionUser = { permissions: [EDIT_MEMBERS, EDIT_TRAININGS] };
		expect(PERMISSIONS).toEqual(expect.arrayContaining([EDIT_MEMBERS, EDIT_TRAININGS, VIEW_TRESO]));
		expect(hasPermission(user, EDIT_MEMBERS)).toBe(true);
		expect(hasPermission(user, VIEW_TRESO)).toBe(false);
	});
});
