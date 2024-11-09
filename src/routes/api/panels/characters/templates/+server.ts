import {getProfileFromSession} from "../../../../../lib/helpers/getProfileFromSession";
import {postgres} from "../../../../../lib/database/postgres/db";
import {error, json} from "@sveltejs/kit";
import {mongodb} from "../../../../../lib/database/mongodb/db";
import {ObjectId} from "mongodb";

// POST /api/panels/characters/templates/
// Create a new character template
export async function POST(req: any) {
    const {panelId} = await req.request.json();
    const session = await req.locals.auth();
    const profile = await getProfileFromSession(session);

    if (!profile) {
        throw error(401, 'Unauthorized');
    }
    const currentPanel = await mongodb.charactersPanel.getById(panelId);

    if (!currentPanel) {
        throw error(404, 'Panel not found');
    }

    const universes = await mongodb.universe.getByOwner(profile.id);
    const currentUniverse = await mongodb.universe.getById(currentPanel.owner.toString());

    if (!currentUniverse || !universes.find((universe: any) => universe._id.toString() === currentUniverse._id.toString())) {
        throw error(403, 'Forbidden');
    }

    const createdTemplate = await mongodb.charactersTemplates.create("new template", panelId);

    if (!createdTemplate) {
        throw error(500, 'Failed to create template');
    }

    return json({template: createdTemplate});
}

// PUT /api/panels/characters/templates/
// Update a character template
export async function PUT(req: any) {
    const {template} = await req.request.json();
    const session = await req.locals.auth();
    const profile = await getProfileFromSession(session);

    if (!profile) {
        throw error(401, 'Unauthorized');
    }

    const currentPanel = await mongodb.charactersPanel.getById(template.owner.toString());
    if (!currentPanel) {
        throw error(404, 'Panel not found');
    }

    const universes = await mongodb.universe.getByOwner(profile.id);

    const currentUniverse = await mongodb.universe.getById(currentPanel.owner.toString());

    if (!currentUniverse || !universes.find((universe: any) => universe._id.toString() === currentUniverse._id.toString())) {
        throw error(403, 'Forbidden');
    }

    // create the default fields for the template
    let templateWithId = {
        ...template,
        _id: new ObjectId(template._id),
        owner: new ObjectId(template.owner),
    };
    const isTemplateUpdated = await mongodb.charactersTemplates.update(templateWithId);

    if (!isTemplateUpdated) {
        throw error(500, 'Failed to update template');
    }
    return json(true);
}
