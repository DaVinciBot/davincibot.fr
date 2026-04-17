
import { createBrowserClient, isBrowser } from '@supabase/ssr'
import { env } from '$env/dynamic/public'

const publicSupabaseUrl = env.PUBLIC_SUPABASE_URL ?? ''
const publicSupabaseKey = env.PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? ''

export const supabaseUrl = publicSupabaseUrl

if (isBrowser() && (!publicSupabaseUrl || !publicSupabaseKey)) {
    throw new Error('Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_PUBLISHABLE_KEY')
}

// Singleton browser client — used by browser-only components.
// Auth state is shared via cookies with the SSR client created in +layout.ts.
export const supabase = createBrowserClient(publicSupabaseUrl, publicSupabaseKey, {
    auth: {
        flowType: 'pkce',
    },
    cookieOptions: {
        domain: isBrowser() && window.location.hostname === 'localhost' ? undefined : '.davincibot.fr',
        path: '/',
        sameSite: 'lax',
        secure: isBrowser() && window.location.protocol === 'https:',
    }
})
