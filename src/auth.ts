import { SvelteKitAuth } from "@auth/sveltekit"
import Google from "@auth/core/providers/google"
import { GOOGLE_ID, GOOGLE_SECRET} from "$env/static/private"
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {db} from "./lib/database";

export const { handle, signIn, signOut } = SvelteKitAuth({
    providers: [Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })],
    adapter: DrizzleAdapter(db)
})
