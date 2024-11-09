import { json, error } from '@sveltejs/kit';
import {postgres} from "../../../lib/database/postgres/db";
import {getProfileFromSession} from "../../../lib/helpers/getProfileFromSession";
import {mongodb} from "../../../lib/database/mongodb/db";

// POST /api/universes/
// Create a new universe
export async function POST({ request }: { request: Request }) {
    const {name, session} = await request.json();

    const profile = await getProfileFromSession(session);
    if (!profile) {
        throw error(401, 'Unauthorized');
    }

    const createdUniverseResponse = await mongodb.universe.create(name, profile.id);

    if (!createdUniverseResponse) {
        throw error(500, 'Failed to create universe');
    }

    const createdUniverse = await mongodb.universe.getById(createdUniverseResponse._id.toString());
    return json({universe: createdUniverse});
}

// DELETE /api/universes/
// Delete a universe
export async function DELETE(req: any) {
    // get params
    const universeId = req.url.searchParams.get('id')
    const session = await req.locals.auth();

    const profile = await getProfileFromSession(session);
    if (!profile) {
        throw error(401, 'Unauthorized');
    }

    const universe = await postgres.universes.getById(universeId);
    if (universe.length === 0 || universe[0].owners !== profile.id) {
        throw error(403, 'Forbidden');
    }

    await postgres.universes.delete(universeId);
    return json({success: true});
}
