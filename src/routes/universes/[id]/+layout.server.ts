import type { LayoutServerLoad } from './$types';
import {getProfileFromSession} from "../../../lib/helpers/getProfileFromSession";
import {mongodb} from "../../../lib/database/mongodb/db";

export const load: LayoutServerLoad = async (event) => {
    let returnValue : { universe: any, activatedPanels: any} = {
        universe: null,
        activatedPanels: [],
    }

    const {session, user} = await event.parent();

    if (!user || !session) {
        return returnValue;
    }

    const universe = await mongodb.universe.getById(event.params.id);

    if (universe == null) {
        return returnValue;
    }

    const universeId = universe._id.toString();


    if (universe.owner !== user.id) {
        return returnValue;
    }

    returnValue.universe = {
        ...universe,
        _id: universeId,
    }

    const activatedPanels = await mongodb.universe.activePanels(universeId);
    returnValue.activatedPanels = activatedPanels;


    return returnValue;
};
