import type {LayoutServerLoad} from "../../../../../../../../.svelte-kit/types/src/routes/$types";
import {postgres} from "../../../../../../../lib/database/postgres/db";

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


    const character = await postgres.characters.getById(+characterId);

    if (character.length === 0 || character[0].panelId !== charactersPanel.id) {
        return returnValue;
    }

    returnValue.character = character[0];
    return returnValue;
}
