import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import GitHub from "@auth/core/providers/github"
import { env } from '$env/dynamic/private';
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {db} from "./lib/database/postgres";
import {postgres} from "./lib/database/postgres/db";

export const { handle, signIn, signOut } = SvelteKitAuth({
    trustHost: true,
    secret: env.AUTH_SECRET,
    providers: [
        Google({ clientId: env.GOOGLE_ID, clientSecret: env.GOOGLE_SECRET }),
        GitHub({ clientId: env.GITHUB_ID, clientSecret: env.GITHUB_SECRET})
    ],
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

            if (account.provider === "google" || account.provider === "github") {
                let existingProfile = [];

                if (account.provider === "google") {
                    existingProfile = await postgres.profiles.getByGoogleId(account.providerAccountId);
                }

                if (account.provider === "github") {
                    existingProfile = await postgres.profiles.getByGithubId(account.providerAccountId);
                }

                if (existingProfile.length > 0) {
                    return true;
                }

                const newProfile = {
                    googleId: account.provider === "google" ? account.providerAccountId : null,
                    githubId: account.provider === "github" ? account.providerAccountId : null,
                    name: user.name ? user.name : "unknown",
                    email: user.email ? user.email : "unknown",
                    image: user.image ? user.image : "",
                }
                console.log(newProfile);

                await postgres.profiles.create(newProfile);
            }

            return true;
        },
    }
})
