import { json, error } from '@sveltejs/kit';
import {database} from "../../../lib/database/db";
import {getProfileFromSession} from "../../../lib/helpers/getProfileFromSession";

// POST /api/universes/
// Create a new universe
export async function POST({ request }: { request: Request }) {
    const {name, session} = await request.json();

    const profile = await getProfileFromSession(session);
    if (!profile) {
        throw error(401, 'Unauthorized');
    }

    const createdUniverse = await database.universes.create({name, owners: profile.id});
    return json({universe: createdUniverse[0]});
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

    const universe = await database.universes.getById(universeId);
    if (universe.length === 0 || universe[0].owners !== profile.id) {
        throw error(403, 'Forbidden');
    }

    await database.universes.delete(universeId);
    return json({success: true});
}
