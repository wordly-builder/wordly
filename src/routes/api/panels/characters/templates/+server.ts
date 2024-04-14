// POST /api/panels/characters/templates/
// Create a new character template
import {getProfileFromSession} from "../../../../../lib/helpers/getProfileFromSession";
import {database} from "../../../../../lib/database/db";
import {error, json} from "@sveltejs/kit";

export async function POST(req: any) {
    const {panelId} = await req.request.json();
    const session = await req.locals.auth();
    const profile = await getProfileFromSession(session);

    if (!profile) {
        throw error(401, 'Unauthorized');
    }

    const universes = await database.universes.getByOwner(profile.id);
    const currentUniverse = universes.find((universe: any) => universe.charactersPanel === panelId);

    if (!currentUniverse) {
        throw error(403, 'Forbidden');
    }

    const createdTemplate = await database.charactersTemplates.create({panelId, name: "new template"});

    if (!createdTemplate) {
        throw error(500, 'Failed to create template');
    }

    // create the default fields for the template
    await database.charactersTemplates.fields.create({templateId: createdTemplate[0].id, name: "profile-picture", type: "image", column: 1, row: 1, columnSize: 1, rowSize: 2});
    await database.charactersTemplates.fields.create({templateId: createdTemplate[0].id, name: "name", type: "text", column: 2, row: 1, columnSize: 1, rowSize: 1});
    await database.charactersTemplates.fields.create({templateId: createdTemplate[0].id, name: "age", type: "text", column: 2, row: 2, columnSize: 1, rowSize: 1});
    await database.charactersTemplates.fields.create({templateId: createdTemplate[0].id, name: "description", type: "text", column: 1, row: 3, columnSize: 2, rowSize: 1});

    return json({template: createdTemplate[0]});
}
