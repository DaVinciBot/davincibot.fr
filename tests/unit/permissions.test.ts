import { describe, expect, it } from 'vitest';

import {
	GLOBAL_PERMISSIONS,
	hasPermission,
	type GlobalPermission,
	type PermissionUser
} from '../../src/lib/permissions';

const VIEW_ADMIN: GlobalPermission = 'iam.roles.manage';
const EDIT_MEMBERS: GlobalPermission = 'members.profile.update.all';
const EDIT_TRAININGS: GlobalPermission = 'training.slot.manage';
const VIEW_TRESO: GlobalPermission = 'finance.read';

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
		expect(GLOBAL_PERMISSIONS).toEqual(
			expect.arrayContaining([EDIT_MEMBERS, EDIT_TRAININGS, VIEW_TRESO])
		);
		expect(hasPermission(user, EDIT_MEMBERS)).toBe(true);
		expect(hasPermission(user, VIEW_TRESO)).toBe(false);
	});
});
