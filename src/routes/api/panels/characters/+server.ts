import {getProfileFromSession} from "../../../../lib/helpers/getProfileFromSession";
import {error, json} from "@sveltejs/kit";
import {database} from "../../../../lib/database/db";

// POST /api/panels/characters/
// Create a new character panel
export async function POST({ request }: { request: Request }) {
    const {universeId, session} = await request.json();
    const profile = await getProfileFromSession(session);
    const universe = await database.universes.getById(universeId);

    if (!profile) {
        throw error(401, 'Unauthorized');
    }

    if (universe.length === 0) {
        throw error(404, 'Universe not found');
    }

    if (universe[0].owners !== profile.id) {
        throw error(401, 'Unauthorized');
    }

    if (universe[0].charactersPanel !== null) {
        throw error(400, 'Characters panel already exists');
    }

    const createdPanel = await database.panels.characters.create();

    if (!createdPanel) {
        throw error(500, 'Failed to create panel');
    }

    await database.universes.linkCharactersPanel(universeId, createdPanel[0].id);

    return json({panel: createdPanel[0]});
}
