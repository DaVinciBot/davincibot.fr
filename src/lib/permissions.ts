export const PERMISSIONS = [
	'members.profile.read.all',
	'members.profile.update.all',
	'members.projects.read.all',
	'members.projects.update.all',
	'members.invite.send',
	'members.profile.status.update',
	'iam.permissions.read.all',
	'iam.permissions.assign.all',
	'iam.permissions.assign.owned',
	'iam.permissions.revoke.all',
	'iam.permissions.revoke.owned',
	'training.catalog.read',
	'training.slot.read',
	'training.slot.cu',
	'training.registration.cru.self',
	'training.registration.read.all',
	'training.registration.cu.all',
	'training.presence.update',
	'training.summary_email.receive',
	'orders.cru.self',
	'orders.read.all',
	'orders.create.all',
	'orders.lifecycle.update.all',
	'projects.stats.read.all',
	'finance.read',
	'finance.write',
	'blog.draft.write',
	'blog.publish',
	'integration.smartshare.cast',
	'integration.discord.summary_webhook.send',
	'audit.logs.read',
	'audit.logs.read.security',
	'audit.events.export'
] as const;

export type Permission = (typeof PERMISSIONS)[number];

export interface PermissionUser {
	permissions?: readonly string[];
}

export function hasPermission(
	user: PermissionUser | null | undefined,
	permission: string
): boolean {
	if (!user || !Array.isArray(user.permissions)) {
		return false;
	}
	return user.permissions.includes(permission);
}

export function hasAnyPermission(
	userPermissions: readonly string[] = [],
	requiredPermissions: readonly string[] = []
): boolean {
	if (!Array.isArray(requiredPermissions) || requiredPermissions.length === 0) {
		return true;
	}
	if (!Array.isArray(userPermissions) || userPermissions.length === 0) {
		return false;
	}
	const permissionsSet = new Set(userPermissions);
	return requiredPermissions.some((permission) => permissionsSet.has(permission));
}
