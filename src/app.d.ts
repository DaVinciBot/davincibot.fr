import type { Database } from '@davincibot/database-types';
import type { EffectivePermission } from '@davincibot/lib';
import type { ResolvedAuthSession, ResolvedAuthUser } from '@davincibot/lib/server/types';
import type { SupabaseClient } from '@supabase/supabase-js';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database> | null;
			safeGetSession: () => Promise<{
				session: ResolvedAuthSession | null;
				user: ResolvedAuthUser | null;
			}>;
			session: ResolvedAuthSession | null;
			user: ResolvedAuthUser | null;
			permissions: EffectivePermission[];
		}
		interface PageData {
			session: Pick<ResolvedAuthSession, 'id' | 'expires_at' | 'user_id'> | null;
			user: ResolvedAuthUser | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
