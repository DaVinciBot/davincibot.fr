
import { createBrowserClient, isBrowser } from '@supabase/ssr'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY } from '$env/static/public'

export const supabaseUrl = PUBLIC_SUPABASE_URL

// Singleton browser client — used by browser-only components.
// Auth state is shared via cookies with the SSR client created in +layout.ts.
export const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
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
