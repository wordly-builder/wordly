import type { PageServerLoad } from './$types';
import {database} from "../../lib/database/db";

export const load: PageServerLoad = async (event) => {
    let returnValue : { universe: any} = {
        universe: null
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

    console.log(event.params.id);
    const universe = await database.universes.getById(event.params.id);
    console.log(universe);

    // check if the user is the owner of the universe
    if (universe.owner !== profile[0].id) {
        return returnValue;
    }

    returnValue.universe = universe;
    return returnValue;
};
