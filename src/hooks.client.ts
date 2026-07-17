import { configureSupabaseClient } from '@davincibot/lib/supabase';

// davincibot.fr gère la session Supabase par cookies partagés .davincibot.fr
// (PKCE via @supabase/ssr) — contrairement à cash/formation (mode 'token').
configureSupabaseClient({ mode: 'cookie' });
