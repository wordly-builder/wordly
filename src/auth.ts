import { SvelteKitAuth } from "@auth/sveltekit"
import Google from "@auth/core/providers/google"
import { GOOGLE_ID, GOOGLE_SECRET, SUPABASE_API_URL, SUPABASE_SECRET } from "$env/static/private"
import {SupabaseAdapter} from "@auth/supabase-adapter";

export const { handle, signIn, signOut } = SvelteKitAuth({
    providers: [Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })],
    adapter: SupabaseAdapter({
        url: SUPABASE_API_URL,
        secret: SUPABASE_SECRET
    })
})
