import {database} from "../database/db";
import { PROFILE_ID, FORCE_LOGIN } from "$env/static/private"
import type {ProfileSelect} from "../database/schemas/profiles";
import {text} from "drizzle-orm/pg-core/index";

export async function getProfileFromSession(session: any) : Promise<ProfileSelect | null> {
    if (FORCE_LOGIN == 'true') {
        if (PROFILE_ID != null) {
            const profiles = await database.profiles.getById(+PROFILE_ID);
            if (profiles.length === 0) {
                return null;
            }
            return profiles[0];
        }
    }

    if (!session || !session.user || !session.user.id) {
        return null;
    }

    const account = await database.auth.getAccountByUserId(session.user.id);
    if (account.length === 0) {
        return null;
    }

    const profiles = await database.profiles.getByGoogleId(account[0].providerAccountId);
    if (profiles.length === 0) {
        return null;
    }

    return profiles[0];
}
