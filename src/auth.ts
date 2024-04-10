import { SvelteKitAuth } from "@auth/sveltekit"
import Google from "@auth/core/providers/google"
import { GOOGLE_ID, GOOGLE_SECRET} from "$env/static/private"
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {db} from "./lib/database";
import {database} from "./lib/db";

export const { handle, signIn, signOut } = SvelteKitAuth({
    providers: [Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })],
    adapter: DrizzleAdapter(db),
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (!account)
                return false;

            if (account.provider === "google") {
                const existingProfile = await database.profiles.getByGoogleId(account.providerAccountId);

                if (existingProfile.length > 0) {
                    return true;
                }

                await database.profiles.createProfile({
                    googleId: account.providerAccountId,
                    name: user.name ? user.name : "unknown",
                    email: user.email ? user.email : "unknown",
                    image: user.image ? user.image : "",
                });
            }

            return true;
        },
    }
})
