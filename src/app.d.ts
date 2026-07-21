import type { EffectivePermission } from '@davincibot/lib';
import type { AppSession, AppUser } from '@davincibot/lib/server';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@davincibot/database-types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database> | null;
			safeGetSession: () => Promise<{ session: AppSession | null; user: AppUser | null }>;
			session: AppSession | null;
			user: AppUser | null;
			permissions: EffectivePermission[];
		}
		interface PageData {
			session: Pick<AppSession, 'id' | 'expires_at' | 'user_id'> | null;
			user: AppUser | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
