"use server";

import {postgres} from "../database/postgres/db";
import { PROFILE_ID, FORCE_LOGIN } from "$env/static/private"
import type {ProfileSelect} from "../database/postgres/schemas/profiles";

export async function getProfileFromSession(session: any) : Promise<ProfileSelect | null> {
    if (FORCE_LOGIN == 'true') {
        if (PROFILE_ID != null) {
            const profiles = await postgres.profiles.getById(+PROFILE_ID);
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

    const profiles = await postgres.profiles.getByGoogleId(account[0].providerAccountId);
    if (profiles.length === 0) {
        return null;
    }

    return profiles[0];
}
