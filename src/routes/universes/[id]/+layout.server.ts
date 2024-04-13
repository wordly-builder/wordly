import type { LayoutServerLoad } from './$types';
import {database} from "../../../lib/database/db";
import { PROFILE_ID, FORCE_LOGIN } from "$env/static/private"
import {getProfileFromSession} from "../../../lib/helpers/getProfileFromSession";

export const load: LayoutServerLoad = async (event) => {
    let returnValue : { universe: any} = {
        universe: null
    }

    const session = await event.locals.auth();
    const profile = await getProfileFromSession(session);
    if (!profile) {
        return returnValue;
    }

    const universe = await database.universes.getById(+event.params.id);

    if (universe.length === 0) {
        return returnValue;
    }

    if (universe[0].owners !== profile.id) {
        return returnValue;
    }

    returnValue.universe = universe[0];
    return returnValue;
};
