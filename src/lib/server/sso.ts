import { env } from '$env/dynamic/public';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';
import type { Database, Json } from '@davincibot/database-types';

export interface AppSession {
	id: string;
	access_token: string;
	expires_at: number;
	user_id: string;
}

export interface AppUser {
	id: string;
	email: string | null;
	app_metadata: Record<string, Json>;
	user_metadata: Record<string, Json>;
}

export interface DecodedJwt {
	sub?: string;
	email?: string | null;
	app_metadata?: Record<string, Json>;
	user_metadata?: Record<string, Json>;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

const toJsonRecord = (value: unknown): Record<string, Json> => {
	if (!isRecord(value)) {
		return {};
	}

	return Object.fromEntries(
		Object.entries(value).filter((entry): entry is [string, Json] => isJson(entry[1]))
	);
};

const isJson = (value: unknown): value is Json => {
	if (
		value === null ||
		typeof value === 'string' ||
		typeof value === 'number' ||
		typeof value === 'boolean'
	) {
		return true;
	}

	if (Array.isArray(value)) {
		return value.every(isJson);
	}

	if (!isRecord(value)) {
		return false;
	}

	return Object.values(value).every((nested) => nested === undefined || isJson(nested));
};

const readSupabasePublicEnv = () => {
	if (!env.PUBLIC_SUPABASE_URL || !env.PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
		throw new Error('Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_PUBLISHABLE_KEY');
	}

	return {
		url: env.PUBLIC_SUPABASE_URL,
		key: env.PUBLIC_SUPABASE_PUBLISHABLE_KEY
	};
};

export const createAnonClient = (): SupabaseClient<Database> => {
	const { url, key } = readSupabasePublicEnv();
	return createClient<Database>(url, key, {
		auth: { persistSession: false, autoRefreshToken: false }
	});
};

export const createUserClient = (accessToken: string): SupabaseClient<Database> => {
	const { url, key } = readSupabasePublicEnv();
	return createClient<Database>(url, key, {
		global: {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		},
		auth: { persistSession: false, autoRefreshToken: false }
	});
};

export const decodeJwt = (token: string): DecodedJwt | null => {
	try {
		const payload = token.split('.')[1];
		if (!payload) {
			return null;
		}
		const decoded = Buffer.from(payload, 'base64').toString('utf8');
		const parsed: unknown = JSON.parse(decoded);
		if (!isRecord(parsed)) {
			return null;
		}

		return {
			sub: typeof parsed.sub === 'string' ? parsed.sub : undefined,
			email: typeof parsed.email === 'string' ? parsed.email : null,
			app_metadata: toJsonRecord(parsed.app_metadata),
			user_metadata: toJsonRecord(parsed.user_metadata)
		};
	} catch {
		return null;
	}
};
