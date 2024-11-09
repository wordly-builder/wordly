import type {LayoutServerLoad} from "../../../../../../../../.svelte-kit/types/src/routes/$types";
import {postgres} from "../../../../../../../lib/database/postgres/db";
import {mongodb} from "../../../../../../../lib/database/mongodb/db";
import {ObjectId} from "mongodb";

export const load: LayoutServerLoad = async (event) => {
    let returnValue: { character: any} = {
        character: null,
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

    returnValue.character = {
        ...character,
        _id: character._id.toString(),
        owner: character.owner.toString(),
        template: character.template.toString(),
    }
    return returnValue;
}
