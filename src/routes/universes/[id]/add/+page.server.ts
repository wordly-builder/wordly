import type {ServerLoad} from "@sveltejs/kit/src/exports/public";
import {mongodb} from "../../../../lib/database/mongodb/db";

export const load: ServerLoad = async (event) => {
    const params = await event.params;
    const universe = params.id;

    if (!universe) {
        return {
            panels: []
        }
    }

    let inactivePanelsNames = await mongodb.universe.inactivePanels(universe);

    return {
        inactivePanels: inactivePanelsNames
    }
}