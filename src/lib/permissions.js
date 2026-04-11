export const PERMISSIONS = {
	VIEW_ADMIN: 'view_admin',
	VIEW_ALL_ORDERS: 'view_all_orders',
	VIEW_MEMBERS: 'view_members',
	VIEW_PROJECTS_ORDERS: 'view_projects_orders',
	VIEW_TRAININGS: 'view_trainings',
	VIEW_TRESO: 'view_treso',
	EDIT_BLOG: 'edit_blog',
	EDIT_BLOG_DRAFT: 'edit_blog_draft',
	EDIT_MEMBERS: 'edit_members',
	EDIT_ORDERS: 'edit_orders',
	EDIT_PROJECTS_ORDERS: 'edit_projects_orders',
	EDIT_TRAININGS: 'edit_trainings',
	EDIT_TRESO: 'edit_treso'
};

/**
 * Check if a user has a specific permission.
 * @param {Object} user - The user object from userdata store.
 * @param {string} permission - The permission to check.
 * @returns {boolean} True if the user has the permission.
 */
export function hasPermission(user, permission) {
	if (!user || !user.permissions) {
		return false;
	}
	return user.permissions.includes(permission);
}
