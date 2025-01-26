import type { LayoutServerLoad } from './$types';
import {postgres} from "../../lib/database/postgres/db";
import {env} from "$env/dynamic/private"
import {getProfileFromSession} from "../../lib/helpers/getProfileFromSession";
import {mongodb} from "../../lib/database/mongodb/db";

export const load: LayoutServerLoad = async (event) => {
    let returnValue : { universes: any} = {
        universes: null
    }

    const {session, user} = await event.parent();
    if (!user || !session) {
        return returnValue;
    }

    const universes = await mongodb.universe.getByOwner(user.id);

    returnValue.universes = [];
    for (let universe of universes) {
        const universeId = universe._id.toString();
        returnValue.universes.push({
            ...universe,
            _id: universeId,
        });
    }

    return returnValue;
};
