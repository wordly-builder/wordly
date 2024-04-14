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

    return json({template: createdTemplate[0]});
}
