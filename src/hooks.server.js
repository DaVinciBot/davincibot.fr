import { createServerClient } from '@supabase/ssr'
import { PERMISSIONS } from '$lib/permissions';
import { error } from '@sveltejs/kit';

const PUBLIC_SUPABASE_URL = "https://lxilsopqfrtwsitzalkm.supabase.co/"
const PUBLIC_SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4aWxzb3BxZnJ0d3NpdHphbGttIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk0NzUyNDUsImV4cCI6MTk4NTA1MTI0NX0.8TLXDbdJDIrDONJlqE639jvExH-kdBUIkJhtBFwhMCo"

export async function handle({ event, resolve }) {
    event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY, {
        cookies: {
            getAll: () => event.cookies.getAll(),
            setAll: (cookiesToSet) => {
                cookiesToSet.forEach(({ name, value, options }) => {
                    event.cookies.set(name, value, {
                        ...options,
                        path: '/',
                        // Use .davincibot.fr for production shared cookies, omit for localhost
                        domain: process.env.NODE_ENV === 'development' || event.url.hostname === 'localhost' ? undefined : '.davincibot.fr',
                        sameSite: 'lax',
                        secure: process.env.NODE_ENV === 'production'
                    })
                })
            },
        },
    })

    event.locals.safeGetSession = async () => {
        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession()
        if (!session) {
            return { session: null, user: null }
        }

        const {
            data: { user },
            error,
        } = await event.locals.supabase.auth.getUser()
        if (error) {
            return { session: null, user: null }
        }

        return { session, user }
    }

    // Auth Guard for /admin routes
    if (event.url.pathname.startsWith('/admin')) {
        const { session, user } = await event.locals.safeGetSession();

        if (!session || !user) {
            console.log(`[Auth] No valid session for access to ${event.url.pathname}`);
            throw error(401, 'Unauthorized');
        }

        // Allow /admin/profile for any authenticated user
        if (event.url.pathname === '/admin/profile') {
            // Authorized
        } else {
            // Fetch Permissions
            const { data: profile, error: profileError } = await event.locals.supabase
                .from('profiles')
                .select('permissions')
                .eq('id', user.id)
                .single();

            if (profileError || !profile || !profile.permissions || !profile.permissions.includes(PERMISSIONS.VIEW_ADMIN)) {
                console.log(`[Auth] User ${user.email} (${user.id}) denied access to ${event.url.pathname} [${event.request.method}]. Reason: Missing permission VIEW_ADMIN`);
                throw error(401, 'Unauthorized');
            }
        }
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range' || name === 'x-supabase-api-version'
        },
    })
}
