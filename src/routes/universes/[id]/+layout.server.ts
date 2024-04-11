import type { LayoutServerLoad } from './$types';
import {database} from "../../../lib/database/db";
import { PROFILE_ID, FORCE_LOGIN } from "$env/static/private"

export const load: LayoutServerLoad = async (event) => {
    let returnValue : { universe: any} = {
        universe: null
    }

    // override profile id if FORCE_LOGIN is true
    if (FORCE_LOGIN == 'true') {
        const universe = await database.universes.getById(+event.params.id);
        if (universe.length === 0 || universe[0].owners !== +PROFILE_ID) {
            return returnValue;
        }
        returnValue.universe = universe[0];
        return returnValue;
    }


    const session = await event.locals.auth();
    if (!session || !session.user || !session.user.id) {
        return returnValue;
    }

    const account = await database.auth.getAccountByUserId(session.user.id);
    if (account.length === 0) {
        return returnValue;
    }

    const profile = await database.profiles.getByGoogleId(account[0].providerAccountId);
    if (profile.length === 0) {
        return returnValue;
    }

    const universe = await database.universes.getById(+event.params.id);

    if (universe.length === 0) {
        return returnValue;
    }

    if (universe[0].owners !== profile[0].id) {
        return returnValue;
    }

    returnValue.universe = universe[0];
    return returnValue;
};
