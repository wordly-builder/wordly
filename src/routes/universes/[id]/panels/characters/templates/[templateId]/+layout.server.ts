import type {LayoutServerLoad} from "../../../../../../../../.svelte-kit/types/src/routes/$types";
import {database} from "../../../../../../../lib/database/db";

export const load: LayoutServerLoad = async (event) => {
    let returnValue: { template: any } = {
        template: null
    }
    const templateId = event.params.templateId;
    if (!templateId) {
        return returnValue;
    }

    const {charactersPanel} = await event.parent() as { charactersPanel: any };
    if (!charactersPanel) {
        return returnValue;
    }


    const template = await database.charactersTemplates.getById(+templateId);

    if (template.length === 0 || template[0].panelId !== charactersPanel.id) {
        return returnValue;
    }

    returnValue.template = template[0];
    return returnValue;
}
