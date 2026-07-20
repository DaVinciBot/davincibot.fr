import { mount } from 'svelte';
import { describe, expect, it, vi } from 'vitest';

import { UserImportModal } from '@davincibot/components';

interface Permission {
	value: string;
	label: string;
}

interface PermissionPackage {
	label: string;
	perms: string[];
}

interface SubmitPayload {
	permissions: string[];
	project: string;
	users: { name: string; email: string; project: string }[];
}

interface UserImportModalProps {
	permissionCategories: Record<string, Permission[]>;
	permissionPackages: PermissionPackage[];
	projectOptions: { value: string; name: string }[];
	onSubmit: (payload: SubmitPayload) => Promise<void> | void;
	onClose: () => void;
}

describe('UserImportModal (components submodule)', () => {
	it('submits a valid simple user payload', async () => {
		const onSubmit = vi.fn(() => Promise.resolve());
		const onClose = vi.fn();
		const target = document.createElement('div');
		document.body.appendChild(target);
		const props: UserImportModalProps = {
			permissionCategories: {},
			permissionPackages: [],
			projectOptions: [{ value: 'project-1', name: 'Project 1' }],
			onSubmit,
			onClose
		};

		mount(UserImportModal, {
			target,
			props
		});

		const nameInput = target.querySelector('#simple-name');
		const emailInput = target.querySelector('#simple-email');
		const projectSelect = target.querySelector('#simple-project');
		const form = target.querySelector('form');

		if (
			!(nameInput instanceof HTMLInputElement) ||
			!(emailInput instanceof HTMLInputElement) ||
			!(projectSelect instanceof HTMLSelectElement) ||
			!(form instanceof HTMLFormElement)
		) {
			throw new Error('Expected form controls to be rendered');
		}

		nameInput.value = 'Alice';
		nameInput.dispatchEvent(new Event('input', { bubbles: true }));
		emailInput.value = 'alice@example.com';
		emailInput.dispatchEvent(new Event('input', { bubbles: true }));
		projectSelect.value = 'project-1';
		projectSelect.dispatchEvent(new Event('change', { bubbles: true }));

		form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

		await vi.waitFor(() => {
			expect(onSubmit).toHaveBeenCalledWith({
				permissions: [],
				project: '',
				users: [{ name: 'Alice', email: 'alice@example.com', project: 'project-1' }]
			});
			expect(onClose).toHaveBeenCalledTimes(1);
		});

		target.remove();
	});
});
