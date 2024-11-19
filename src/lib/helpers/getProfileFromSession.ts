"use server";

import {postgres} from "../database/postgres/db";
import { env } from "$env/dynamic/private"
import type {ProfileSelect} from "../database/postgres/schemas/profiles";

export async function getProfileFromSession(session: any) : Promise<ProfileSelect | null> {
    if (env.FORCE_LOGIN == 'true') {
        if (env.PROFILE_ID != null) {
            const profiles = await postgres.profiles.getById(+env.PROFILE_ID);
            if (profiles.length === 0) {
                return null;
            }
            return profiles[0];
        }
    }

    if (!session || !session.user || !session.user.id) {
        return null;
    }

    const account = await postgres.auth.getAccountByUserId(session.user.id);
    if (account.length === 0) {
        return null;
    }

    let profiles: any[] = [];

    console.log(account[0].provider);
    if (account[0].provider === "google") {
        profiles = await postgres.profiles.getByGoogleId(account[0].providerAccountId);
    } else if (account[0].provider === "github") {
        profiles = await postgres.profiles.getByGithubId(account[0].providerAccountId);
    }

    if (profiles.length === 0) {
        return null;
    }

    return profiles[0];
}
