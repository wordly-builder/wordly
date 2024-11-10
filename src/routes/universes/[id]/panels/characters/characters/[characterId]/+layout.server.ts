import type {LayoutServerLoad} from "../../../../../../../../.svelte-kit/types/src/routes/$types";
import {mongodb} from "../../../../../../../lib/database/mongodb/db";

export const load: LayoutServerLoad = async (event) => {
    let returnValue: { character: any, template: any} = {
        character: null,
        template: null
    }
    const characterId = event.params.characterId;
    if (!characterId) {
        return returnValue;
    }

    const {charactersPanel} = await event.parent() as { charactersPanel: any };
    if (!charactersPanel) {
        return returnValue;
    }


    const character = await mongodb.characters.getById(characterId);

    if (!character || character.owner.toString() !== charactersPanel._id.toString()) {
        return returnValue;
    }

    const template = await mongodb.charactersTemplates.getById(character.template.toString());
    if (!template || template.owner.toString() !== charactersPanel._id.toString()) {
        return returnValue;
    }

    returnValue.character = {
        ...character,
        _id: character._id.toString(),
        owner: character.owner.toString(),
        template: character.template.toString(),
    }
    returnValue.template = {
        ...template,
        _id: template._id.toString(),
        owner: template.owner.toString()
    }
    return returnValue;
}
