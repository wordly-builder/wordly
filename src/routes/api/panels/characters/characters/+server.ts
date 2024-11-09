// POST /api/panels/characters/characters/
// Create a new character
import {getProfileFromSession} from "../../../../../lib/helpers/getProfileFromSession";
import {postgres} from "../../../../../lib/database/postgres/db";

import {error, json} from "@sveltejs/kit";
import {mongodb} from "../../../../../lib/database/mongodb/db";
import type {Character, NewCharacter} from "../../../../../lib/database/mongodb/models/character.model";
import {newCharacter} from "../../../../../lib/database/mongodb/models/character.model";

export async function POST(req: any): Promise<Response> {
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

    // get first character template
    const templates = await mongodb.charactersTemplates.getByOwner(currentPanel._id.toString());
    const firstTemplate = templates[0];

    if (!firstTemplate) {
        throw error(404, 'Template not found');
    }

    const newChar = newCharacter(currentPanel._id.toString(), firstTemplate._id.toString());

    // create the default fields for the template
    const createdCharacter = await mongodb.characters.create(newChar);

    if (!createdCharacter) {
        throw error(500, 'Failed to create character');
    }

    return json(createdCharacter);
}
