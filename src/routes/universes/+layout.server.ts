import type { LayoutServerLoad } from './$types';
import {postgres} from "../../lib/database/postgres/db";
import {env} from "$env/dynamic/private"
import {getProfileFromSession} from "../../lib/helpers/getProfileFromSession";
import {mongodb} from "../../lib/database/mongodb/db";

export const load: LayoutServerLoad = async (event) => {
    let returnValue : { universes: any} = {
        universes: null
    }

    const {session} = await event.parent();

    if (env.FORCE_LOGIN) {
        const force_profile = await getProfileFromSession(session)
        if (force_profile == null) {
            await postgres.profiles.create({
                googleId: "none",
                githubId: "none",
                name: "admin",
                email: "admin@outlook.com",
                image: "https://i.imgur.com/eh3WREx.png",
            });
        }
    }

    const profile = await getProfileFromSession(session);
    if (!profile) {
        return returnValue;
    }

    const universes = await mongodb.universe.getByOwner(profile.id);

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
