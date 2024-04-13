import {database} from "../database/db";
import { PROFILE_ID, FORCE_LOGIN } from "$env/static/private"
import type {ProfileSelect} from "../database/schemas/profiles";

export async function getProfileFromSession(session: any) : Promise<ProfileSelect | null> {
    if (FORCE_LOGIN == 'true') {
        const profiles = await database.profiles.getById(+PROFILE_ID);
        if (profiles.length === 0) {
            return null;
        }
        return profiles[0];
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
