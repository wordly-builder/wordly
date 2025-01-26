import { json, error } from '@sveltejs/kit';
import {postgres} from "../../../lib/database/postgres/db";
import {getProfileFromSession} from "../../../lib/helpers/getProfileFromSession";
import {mongodb} from "../../../lib/database/mongodb/db";

// POST /api/universes/
// Create a new universe
export async function POST({ request }: { request: Request }) {
    const {name, session} = await request.json();

    const user = await getProfileFromSession(session);
    if (!user) {
        throw error(401, 'Unauthorized');
    }

    const createdUniverseResponse = await mongodb.universe.create(name, user.id);

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

    const user = await getProfileFromSession(session);
    if (!user) {
        throw error(401, 'Unauthorized');
    }

    const universe = await mongodb.universe.getById(universeId);
    if (!universe || universe.owner !== user.id) {
        throw error(403, 'Forbidden');
    }

    await mongodb.universe.delete(universeId);
    return json({success: true});
}
