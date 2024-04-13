import type { LayoutServerLoad } from './$types';
import {database} from "../../lib/database/db";
import { PROFILE_ID, FORCE_LOGIN } from "$env/static/private"
import {getProfileFromSession} from "../../lib/helpers/getProfileFromSession";

export const load: LayoutServerLoad = async (event) => {
    let returnValue : { universes: any} = {
        universes: null
    }

    const profile = await getProfileFromSession(event.locals.auth());
    if (!profile) {
        return returnValue;
    }

    returnValue.universes = await database.universes.getByOwner(profile.id);
    return returnValue;
};
