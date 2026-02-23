
import { createBrowserClient, isBrowser } from '@supabase/ssr'

const PUBLIC_SUPABASE_URL = "https://lxilsopqfrtwsitzalkm.supabase.co/"
const PUBLIC_SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4aWxzb3BxZnJ0d3NpdHphbGttIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk0NzUyNDUsImV4cCI6MTk4NTA1MTI0NX0.8TLXDbdJDIrDONJlqE639jvExH-kdBUIkJhtBFwhMCo"

export const supabaseUrl = PUBLIC_SUPABASE_URL

// Use the singleton pattern for the browser client to avoid creating multiple instances
export const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY, {
    cookieOptions: {
        domain: isBrowser() && window.location.hostname === 'localhost' ? undefined : '.davincibot.fr',
        path: '/',
        sameSite: 'lax',
        secure: isBrowser() && window.location.protocol === 'https:',
    }
})
