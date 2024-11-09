import type {LayoutServerLoad} from "../../../../../../.svelte-kit/types/src/routes/$types";
import {getProfileFromSession} from "../../../../../lib/helpers/getProfileFromSession";
import {mongodb} from "../../../../../lib/database/mongodb/db";

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

    const charactersPanelList = await mongodb.charactersPanel.getByOwner(universe._id.toString());
    if (charactersPanelList.length === 0) {
        return returnValue;
    }
    const charactersPanel = {
        ...charactersPanelList[0],
        _id: charactersPanelList[0]._id.toString(),
        owner: charactersPanelList[0].owner.toString()
    };

    let characters = await mongodb.characters.getByOwner(charactersPanel._id.toString());
    characters = characters.map((character: any) => {
        return {
            ...character,
            _id: character._id.toString(),
            owner: character.owner.toString()
        }
    });


    let charactersTemplates = await mongodb.charactersTemplates.getByOwner(charactersPanel._id.toString());
    charactersTemplates = charactersTemplates.map((template: any) => {
        return {
            ...template,
            _id: template._id.toString(),
            owner: template.owner.toString()
        }
    });


    returnValue.charactersPanel = charactersPanel;
    returnValue.characters = characters;
    returnValue.charactersTemplates = charactersTemplates;
    return returnValue;
}
