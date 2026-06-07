import type { Permission } from '$lib/permissions';
import type { AppSession, AppUser } from '$lib/server/sso';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database> | null;
			safeGetSession: () => Promise<{ session: AppSession | null; user: AppUser | null }>;
			session: AppSession | null;
			user: AppUser | null;
			permissions: Permission[];
		}
		interface PageData {
			session: AppSession | null;
			user: AppUser | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
