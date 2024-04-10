import { SvelteKitAuth } from "@auth/sveltekit"
import Google from "@auth/core/providers/google"
import { GOOGLE_ID, GOOGLE_SECRET} from "$env/static/private"
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {db} from "./lib/database";
import {database} from "./lib/database/db";

export const { handle, signIn, signOut } = SvelteKitAuth({
    providers: [Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })],
    adapter: DrizzleAdapter(db),
    callbacks: {
        async session({ session, user }) {
            session.user = {
                emailVerified: user.emailVerified,
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image
            }
            return session;
        },
        async signIn({ user, account, profile, email, credentials }) {
            if (!account)
                return false;

            if (account.provider === "google") {
                const existingProfile = await database.profiles.getByGoogleId(account.providerAccountId);

                if (existingProfile.length > 0) {
                    return true;
                }

                await database.profiles.create({
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
