import type {LayoutServerLoad} from "../../../../../../.svelte-kit/types/src/routes/$types";
import {getProfileFromSession} from "../../../../../lib/helpers/getProfileFromSession";
import {database} from "../../../../../lib/database/db";

export const load: LayoutServerLoad = async (event) => {
    let returnValue : {charactersPanel: any, characters: any, charactersTemplates: any} = {
        charactersPanel: null,
        characters: null,
        charactersTemplates: null
    }

    const {session, universe} = await event.parent() as {session: any, universe: any};
    const profile = await getProfileFromSession(session);
    if (!profile || !universe) {
        return returnValue;
    }

    const charactersPanel = await database.panels.characters.getById(universe.charactersPanel);
    if (charactersPanel.length === 0) {
        return returnValue;
    }

    const characters = await database.characters.getByPanel(charactersPanel[0].id);
    const charactersTemplates = await database.charactersTemplates.getByPanel(charactersPanel[0].id);

    returnValue.charactersPanel = charactersPanel[0];
    returnValue.characters = characters;
    returnValue.charactersTemplates = charactersTemplates;
    return returnValue;
}
