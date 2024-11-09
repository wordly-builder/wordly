import type {LayoutServerLoad} from "../../../../../../../../.svelte-kit/types/src/routes/$types";
import {mongodb} from "../../../../../../../lib/database/mongodb/db";

export const load: LayoutServerLoad = async (event) => {
    let returnValue: { template: any } = {
        template: null,
    }
    const templateId = event.params.templateId;
    if (!templateId) {
        return returnValue;
    }

    const {charactersPanel} = await event.parent() as { charactersPanel: any };
    if (!charactersPanel) {
        return returnValue;
    }


    const template = await mongodb.charactersTemplates.getById(templateId);
    if (!template || template.owner.toString() !== charactersPanel._id.toString()) {
        return returnValue;
    }

    returnValue.template = {
        ...template,
        _id: templateId.toString(),
        owner: template.owner.toString()
    };
    return returnValue;
}
