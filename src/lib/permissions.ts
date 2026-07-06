// Référentiel RBAC (voir Supabased/docs/RBAC_REFERENCE.md).
// - GLOBAL_PERMISSIONS : enum public.global_permission (permissions transverses).
// - GLOBAL_ROLES / PROJECT_ROLES : enums public.global_role / public.project_role.
// - PROJECT_PERMISSIONS : enum public.project_permission (scopé-projet, distinct).
// Les permissions effectives d'un utilisateur sont résolues côté DB (fonction
// has_permission, qui unit rôles globaux actifs + override profiles.permissions)
// et exposées au front sous forme de liste ; hasPermission()/hasAnyPermission()
// ne font qu'un includes() sur cette liste déjà résolue.

export const GLOBAL_PERMISSIONS = [
	// members.*
	'members.profile.read.all',
	'members.profile.update.all',
	'members.invite.send',
	'members.profile.status.update',
	'members.projects.update.all',
	// iam.*
	'iam.roles.manage',
	'iam.overrides.manage',
	// training.*
	'training.catalog.read',
	'training.slot.read',
	'training.slot.manage',
	'training.registration.manage.self',
	'training.registration.read.all',
	'training.registration.manage.all',
	'training.presence.update',
	'training.summary_email.receive',
	'training.summary.discord.send',
	'training.story.discord.send',
	// orders.*
	'orders.manage.self',
	'orders.read.all',
	'orders.create.all',
	'orders.lifecycle.update.all',
	// stats.* / finance.*
	'stats.read.all',
	'finance.read',
	'finance.write',
	// blog.*
	'blog.draft.write',
	'blog.publish',
	// integration.*
	'integration.smartshare.cast',
	// audit.*
	'audit.logs.read',
	'audit.logs.read.security',
	'audit.events.export',
	// infra.*
	'infra.environments.access'
] as const;

export type GlobalPermission = (typeof GLOBAL_PERMISSIONS)[number];

/** Permissions scopées-projet — enum public.project_permission (distinct). */
export const PROJECT_PERMISSIONS = [
	'orders.read.project',
	'orders.lifecycle.update.project',
	'members.projects.read.project'
] as const;

export type ProjectPermission = (typeof PROJECT_PERMISSIONS)[number];

/** Rôles globaux — enum public.global_role (rang décroissant). */
export const GLOBAL_ROLES = [
	'super_admin',
	'president',
	'directorate',
	'secretary',
	'treasurer',
	'project_director',
	'training_director',
	'digital_department',
	'communication_director',
	'content_writer',
	'member',
	'guest'
] as const;

export type GlobalRole = (typeof GLOBAL_ROLES)[number];

/** Rôles projet — enum public.project_role. */
export const PROJECT_ROLES = ['cdp', 'project_member'] as const;

export type ProjectRole = (typeof PROJECT_ROLES)[number];

/** Libellés FR (affichage uniquement, jamais une source d'autorisation). */
export const GLOBAL_ROLE_LABELS_FR: Record<GlobalRole, string> = {
	super_admin: 'Super administrateur',
	president: 'Président·e',
	directorate: 'Bureau',
	secretary: 'Secrétaire',
	treasurer: 'Trésorièr·e',
	project_director: 'Responsable projets',
	training_director: 'Responsable formation',
	digital_department: 'Pôle numérique',
	communication_director: 'Responsable communication',
	content_writer: 'Rédacteur·ice',
	member: 'Membre',
	guest: 'Invité·e'
};

export const PROJECT_ROLE_LABELS_FR: Record<ProjectRole, string> = {
	cdp: 'Chef de projet (CDP)',
	project_member: 'Membre du projet'
};

export type EffectivePermission = GlobalPermission | ProjectPermission;

export interface PermissionUser {
	permissions?: readonly EffectivePermission[];
}

export function hasPermission(
	user: PermissionUser | null | undefined,
	permission: EffectivePermission
): boolean {
	if (!user || !Array.isArray(user.permissions)) {
		return false;
	}
	return user.permissions.includes(permission);
}

export function hasAnyPermission(
	userPermissions: readonly EffectivePermission[] = [],
	requiredPermissions: readonly EffectivePermission[] = []
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
